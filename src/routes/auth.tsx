import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Lock, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin Access | CSE 7th Batch" },
      { name: "description", content: "Secure sign-in for CSE 7th Batch content administrators." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Access | CSE 7th Batch" },
      { property: "og:description", content: "Secure sign-in for CSE 7th Batch content administrators." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      if (mode === "up") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (signUpError) throw signUpError;
        if (data.session) navigate({ to: "/admin", replace: true });
        else setMessage("ACCOUNT CREATED // CHECK YOUR EMAIL TO CONFIRM, THEN SIGN IN.");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        navigate({ to: "/admin", replace: true });
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Authentication failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-shell">
      <div className="grid-plane" aria-hidden="true" />
      <section className="auth-card">
        <p className="section-code"><Lock aria-hidden="true" /> RESTRICTED TERMINAL</p>
        <h1>CSE <span>//</span> 07 CONTROL</h1>
        <p className="auth-copy">Authorized administrators only. Content edits are logged to the batch system.</p>
        <form onSubmit={onSubmit} className="auth-form">
          <label>
            <span>EMAIL</span>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" placeholder="admin@example.com" />
          </label>
          <label>
            <span>PASSWORD</span>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} autoComplete={mode === "up" ? "new-password" : "current-password"} placeholder="••••••••" />
          </label>
          {error ? <p className="auth-error" role="alert">{error}</p> : null}
          {message ? <p className="auth-message" role="status">{message}</p> : null}
          <Button type="submit" variant="hud" size="lg" disabled={busy}>
            {busy ? "AUTHENTICATING..." : mode === "up" ? "CREATE ADMIN ACCOUNT" : "AUTHENTICATE"}
          </Button>
        </form>
        <button type="button" className="auth-switch" onClick={() => { setMode(mode === "in" ? "up" : "in"); setError(null); setMessage(null); }}>
          {mode === "in" ? "FIRST TIME? CREATE YOUR ACCOUNT" : "ALREADY REGISTERED? SIGN IN"}
        </button>
        <p className="auth-command"><Terminal aria-hidden="true" /> ./authenticate --batch 07</p>
      </section>
    </main>
  );
}
