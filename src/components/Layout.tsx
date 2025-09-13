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
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CampusMate
              </span>
            </div>
            
            {user && (
              <nav className="hidden md:flex items-center gap-6">
                <Button variant="ghost" size="sm" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Tasks
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Users className="h-4 w-4" />
                  Mentors
                </Button>
                {userType === "admin" && (
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Shield className="h-4 w-4" />
                    Admin
                  </Button>
                )}
              </nav>
            )}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Button variant="ghost" size="sm">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={user.avatar_url || "/placeholder.svg"}
                      alt={user.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium">{user.name}</p>
                      <div className="flex items-center gap-1">
                        {user.userType === "student" && <VerificationBadge type="student" size="sm" />}
                        {user.userType === "mentor" && <VerificationBadge type="mentor" size="sm" />}
                      </div>
                    </div>
                  </div>
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
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t bg-muted/30">
        <div className="container py-8 px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-primary">
                <Users className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold">CampusMate</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting students with verified mentors across campus
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}