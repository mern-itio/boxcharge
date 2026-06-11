import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  ssr: false,
  component: AuthPage,
  head: () => ({ meta: [{ title: "Sign in — BoxCharge Admin" }] }),
});

type AuthMode = "signin" | "signup" | "forgot";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        toast.success("Signed in");
        navigate({ to: "/admin" });
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created — check your email to confirm.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success("Password reset email sent — check your inbox.");
      }
    } catch (err) {
      const text = err instanceof Error ? err.message : "Authentication failed";
      const friendly = text.toLowerCase().includes("weak") || text.toLowerCase().includes("pwned")
        ? "That password is known to be unsafe. Please choose a stronger, unique password."
        : text;
      setMessage(friendly);
      toast.error(friendly);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/admin" });
      if (result.error) throw result.error instanceof Error ? result.error : new Error(String(result.error));
      if (!result.redirected) navigate({ to: "/admin" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Google sign in failed");
      setLoading(false);
    }
  }

  const heading =
    mode === "signin"
      ? "Admin sign in"
      : mode === "signup"
        ? "Create account"
        : "Reset password";
  const sub =
    mode === "signin"
      ? "Access the BoxCharge content dashboard."
      : mode === "signup"
        ? "Sign up, then ask an admin to grant access."
        : "We'll send you a link to reset your password.";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border/60 bg-card/40 p-6 shadow-xl backdrop-blur">
        <h1 className="text-xl font-semibold">{heading}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{sub}</p>

        {mode !== "forgot" && (
          <>
            <Button
              type="button"
              variant="outline"
              className="mt-5 w-full"
              onClick={handleGoogle}
              disabled={loading}
            >
              Continue with Google
            </Button>

            <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
            </div>
          </>
        )}

        <form onSubmit={handleEmail} className="space-y-3">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {mode !== "forgot" && (
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {mode === "signin" && (
                  <button
                    type="button"
                    className="text-xs text-muted-foreground hover:text-foreground"
                    onClick={() => { setMode("forgot"); setMessage(null); }}
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? "..."
              : mode === "signin"
                ? "Sign in"
                : mode === "signup"
                  ? "Create account"
                  : "Send reset link"}
          </Button>
        </form>

        {message && (
          <p className="mt-3 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {message}
          </p>
        )}

        {mode === "forgot" ? (
          <button
            type="button"
            className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-foreground"
            onClick={() => { setMode("signin"); setMessage(null); }}
          >
            ← Back to sign in
          </button>
        ) : (
          <button
            type="button"
            className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-foreground"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          >
            {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
          </button>
        )}

        <div className="mt-6 text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">← Back to site</Link>
        </div>
      </div>
    </div>
  );
}
