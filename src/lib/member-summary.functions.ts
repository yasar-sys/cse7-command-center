import { createServerFn } from "@tanstack/react-start";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText, Output } from "ai";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createLovableAiGatewayRunIdFetch } from "./ai-gateway.server";

const SummaryInput = z.object({
  name: z.string().min(1),
  role: z.string().nullable(),
  activities: z.array(z.string()),
  achievements: z.array(z.string()),
  tone: z.enum(["terminal", "formal"]),
});

export const generateMemberSummary = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => SummaryInput.parse(input))
  .handler(async ({ data, context }) => {
    const { data: roleRows, error: roleError } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin");
    if (roleError) throw new Error(roleError.message);
    if (!roleRows?.length) throw new Error("Only administrators can generate summaries.");

    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("AI is not configured for this project.");

    const activities = data.activities.filter(Boolean);
    const achievements = data.achievements.filter(Boolean);
    if (!activities.length && !achievements.length) {
      throw new Error("Add at least one activity or achievement first.");
    }

    const runIdFetch = createLovableAiGatewayRunIdFetch();
    const lovable = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey: key,
      headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
      fetch: runIdFetch.fetch,
    });

    const style =
      data.tone === "terminal"
        ? "Match a futuristic terminal/command-center voice: crisp, confident, lightly technical. No emojis, no ASCII art."
        : "Use a clear, professional, warm voice suitable for a university profile.";

    const result = streamText({
      model: lovable.responses("openai/gpt-6-astra"),
      output: Output.object({
        schema: z.object({
          summary: z.string(),
          highlights: z.array(z.string()),
        }),
      }),
      prompt: [
        "Write a polished profile summary for a Computer Science & Engineering batch member.",
        style,
        "Use ONLY the facts provided. Never invent achievements, dates, grades, organisations or numbers.",
        "summary: 2-3 sentences, max ~60 words. highlights: up to 4 short phrases, each under 10 words, drawn from the given items.",
        "",
        `Name: ${data.name}`,
        data.role ? `Role: ${data.role}` : "",
        activities.length ? `Activities:\n- ${activities.join("\n- ")}` : "",
        achievements.length ? `Achievements:\n- ${achievements.join("\n- ")}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });

    const output = await result.output;
    return {
      summary: output.summary.trim(),
      highlights: output.highlights.map((item) => item.trim()).filter(Boolean).slice(0, 4),
    };
  });
