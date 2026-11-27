import { Link, useNavigate } from "react-router-dom";
import { Scale, LogOut } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/features/auth.slice";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./mode.toggle";

export default function Navbar() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Scale size={18} />
          </span>
          Weighty
        </Link>

        <div className="flex">
          {user && (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="flex items-center gap-3">
                <span className="hidden text-sm text-muted-foreground sm:block">
                  {user.email}
                </span>
                <Avatar className="h-9 w-9 ring-2">
                  <AvatarImage src={user.avatarUrl} alt={user.email} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.email[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          )}

          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
