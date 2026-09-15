import { createFileRoute } from "@tanstack/react-router";
import { BatchHeadquarters } from "@/components/batch-headquarters";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CSE 7th Batch | Computer Science & Engineering" },
      { name: "description", content: "Official digital space of the CSE 7th Batch — members, memories, projects, achievements and the journey beyond." },
      { property: "og:title", content: "CSE 7th Batch | Computer Science & Engineering" },
      { property: "og:description", content: "Official digital space of the CSE 7th Batch — members, memories, projects, achievements and the journey beyond." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: BatchHeadquarters,
});
