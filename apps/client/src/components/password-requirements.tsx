import { Check, Circle } from "lucide-react";

const rules = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "One number", test: (p: string) => /\d/.test(p) }
];

export const isValidPassword = (p: string) => rules.every((r) => r.test(p));

export function PasswordRequirements({ password }: { password: string }) {
  return (
    <ul className="grid gap-1.5 text-sm">
      {rules.map((r) => {
        const ok = r.test(password);
        return (
          <li
            key={r.label}
            className={`flex items-center gap-2 transition-colors ${
              ok ? "text-emerald-600" : "text-muted-foreground"
            }`}
          >
            {ok ? <Check className="size-4" /> : <Circle className="size-4" />}
            {r.label}
          </li>
        );
      })}
    </ul>
  );
}
