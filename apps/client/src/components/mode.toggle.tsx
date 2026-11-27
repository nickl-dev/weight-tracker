import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { toggleTheme } from "@/features/theme.slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export function ModeToggle() {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.theme);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
    >
      {mode === "dark" ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </Button>
  );
}
