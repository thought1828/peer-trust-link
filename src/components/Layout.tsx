import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Shield, Menu, Bell, Search } from "lucide-react";
import { VerificationBadge } from "@/components/ui/verification-badge";

interface LayoutProps {
  children: ReactNode;
  userType?: "student" | "mentor" | "admin" | null;
}

export function Layout({ children, userType }: LayoutProps) {
  const user = JSON.parse(localStorage.getItem("campusmate_user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("campusmate_user");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-primary">
              <Users className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
              CampusMate
            </span>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Button variant="ghost" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2">
                  <img
                    src={user.avatar_url || "/placeholder.svg"}
                    alt={user.name}
                    className="h-7 w-7 rounded-full"
                  />
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
                <Button variant="hero" size="sm">
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t bg-muted/20">
        <div className="container py-6 px-6">
          <div className="flex items-center justify-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-gradient-primary">
              <Users className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-medium">CampusMate</span>
          </div>
        </div>
      </footer>
    </div>
  );
}