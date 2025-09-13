import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Github, Users, CheckCircle, Shield, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GitHubData {
  username: string;
  name: string;
  email: string | null;
  bio: string;
  location: string;
  avatar_url: string;
  verification_score: number;
  can_verify_student: boolean;
  can_verify_mentor: boolean;
  mentor_tier: string;
  skill_analysis: {
    primary_skills: string[];
    expertise_level: Record<string, string>;
  };
}

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<"student" | "mentor">("student");
  const [githubUsername, setGithubUsername] = useState("");
  const { toast } = useToast();

  const handleGitHubAuth = async () => {
    if (!githubUsername.trim()) {
      toast({
        title: "Error",
        description: "Please enter your GitHub username",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call with mock data based on the provided response
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockGitHubData: GitHubData = {
        username: githubUsername,
        name: "Student Name",
        email: "student@college.edu",
        bio: "Computer Science Student passionate about development",
        location: "Campus City",
        avatar_url: `https://github.com/${githubUsername}.png`,
        verification_score: 85,
        can_verify_student: true,
        can_verify_mentor: userType === "mentor",
        mentor_tier: "Advanced",
        skill_analysis: {
          primary_skills: ["React", "JavaScript", "Python"],
          expertise_level: {
            "React": "Advanced",
            "JavaScript": "Expert",
            "Python": "Intermediate"
          }
        }
      };

      // Store user data in localStorage
      const userData = {
        ...mockGitHubData,
        userType,
        credibilityScore: mockGitHubData.verification_score,
        isVerified: userType === "student" ? mockGitHubData.can_verify_student : mockGitHubData.can_verify_mentor,
        joinedAt: new Date().toISOString(),
      };

      localStorage.setItem("campusmate_user", JSON.stringify(userData));

      toast({
        title: "Authentication Successful!",
        description: `Welcome to CampusMate as a ${userType}`,
      });

      // Redirect to appropriate dashboard
      window.location.href = userType === "student" ? "/student" : "/mentor";
      
    } catch (error) {
      toast({
        title: "Authentication Failed",
        description: "Unable to verify your GitHub profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-campus-blue-light via-background to-campus-green-light p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary">
              <Users className="h-7 w-7 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Join CampusMate
          </h1>
          <p className="text-muted-foreground mt-2">
            Connect with verified mentors and students
          </p>
        </div>

        <Card className="border-0 shadow-strong bg-gradient-card">
          <CardHeader className="text-center">
            <CardTitle>Get Started</CardTitle>
            <CardDescription>
              Verify your identity with GitHub to join our trusted community
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-medium">I want to join as:</Label>
              <RadioGroup value={userType} onValueChange={(value: "student" | "mentor") => setUserType(value)}>
                <div className="flex items-center space-x-3 p-4 rounded-lg border bg-background/50">
                  <RadioGroupItem value="student" id="student" />
                  <div className="flex items-center gap-3 flex-1">
                    <CheckCircle className="h-5 w-5 text-campus-blue" />
                    <div>
                      <Label htmlFor="student" className="font-medium">Student / Seeker</Label>
                      <p className="text-sm text-muted-foreground">Get help with assignments and projects</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border bg-background/50">
                  <RadioGroupItem value="mentor" id="mentor" />
                  <div className="flex items-center gap-3 flex-1">
                    <Shield className="h-5 w-5 text-campus-green" />
                    <div>
                      <Label htmlFor="mentor" className="font-medium">Mentor / Helper</Label>
                      <p className="text-sm text-muted-foreground">Share skills and earn money</p>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="github">GitHub Username</Label>
              <Input
                id="github"
                placeholder="your-github-username"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
                className="border-input"
              />
              <p className="text-xs text-muted-foreground">
                We'll analyze your GitHub profile to verify your skills and credibility
              </p>
            </div>

            <Button 
              onClick={handleGitHubAuth}
              disabled={isLoading}
              className="w-full"
              variant="hero"
              size="lg"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Verifying Profile...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Github className="h-5 w-5" />
                  Verify with GitHub
                </div>
              )}
            </Button>

            <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium flex items-center gap-2">
                <Star className="h-4 w-4 text-verification-gold" />
                Verification Benefits
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>✓ Trusted community of verified users</li>
                <li>✓ Skill-based matching and credibility scores</li>
                <li>✓ Secure payments and escrow protection</li>
                <li>✓ Build portable reputation for your career</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By joining, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}