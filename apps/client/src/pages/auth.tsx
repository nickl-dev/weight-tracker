import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Activity } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser, clearError } from "@/features/auth.slice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import {
  PasswordRequirements,
  isValidPassword
} from "@/components/password-requirements";

function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/60 blur-3xl" />
      <svg
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        className="absolute bottom-24 left-0 h-40 w-full text-primary/20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M0 100H300l20-10 20 10h60l25-70 35 140 30-70h80l20-10 20 10h140l25-70 35 140 30-70h380" />
      </svg>
    </div>
  );
}

export default function Auth() {
  const { loading, error, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isRegister = mode === "register";
  const canSubmit =
    email && password && (!isRegister || isValidPassword(password));

  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: replace with Supabase auth
    dispatch(setUser({ id: "1", email }));
  };

  function toggle() {
    setMode(isRegister ? "login" : "register");
    dispatch(clearError());
  }

  return (
    <div className="isolate flex min-h-[calc(100vh-10rem)] items-center justify-center">
      <Background />
      <Card className="w-full max-w-sm bg-card/80 backdrop-blur">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Activity size={20} />
          </div>
          <CardTitle className="text-2xl">
            {isRegister ? "Create your account" : "Welcome back"}
          </CardTitle>
          <CardDescription>
            {isRegister
              ? "Start tracking your progress today."
              : "Log in to keep your streak going."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {isRegister && <PasswordRequirements password={password} />}
            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}

            <Button type="submit" disabled={!canSubmit} className="w-full">
              {loading ? <Spinner /> : isRegister ? "Sign up" : "Log in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={toggle}
              className="font-medium text-primary hover:underline"
            >
              {isRegister ? "Log in" : "Register"}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
