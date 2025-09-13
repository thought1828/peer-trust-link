import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, Star, CheckCircle, ArrowRight, Github, Zap } from "lucide-react";

const Index = () => {
  useEffect(() => {
    // Check if user is already logged in and redirect
    const user = JSON.parse(localStorage.getItem("campusmate_user") || "null");
    if (user) {
      window.location.href = user.userType === "student" ? "/student" : "/mentor";
    }
  }, []);

  const handleGetStarted = () => {
    window.location.href = "/auth";
  };

  const features = [
    {
      icon: Shield,
      title: "Verified Community",
      description: "GitHub-verified students and mentors with credibility scores",
      color: "text-campus-blue"
    },
    {
      icon: Users,
      title: "Skill Matching",
      description: "AI-powered matching based on verified skills and expertise",
      color: "text-campus-green"
    },
    {
      icon: Star,
      title: "Reputation System",
      description: "Build portable reputation through successful collaborations",
      color: "text-verification-gold"
    }
  ];

  const stats = [
    { label: "Verified Students", value: "1,200+" },
    { label: "Expert Mentors", value: "300+" },
    { label: "Tasks Completed", value: "3,400+" },
    { label: "Success Rate", value: "96%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-campus-blue-light via-background to-campus-green-light">
      {/* Header */}
      <header className="container py-6 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary">
              <Users className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              CampusMate
            </span>
          </div>
          <Button variant="outline" onClick={handleGetStarted}>
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Connect with{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Verified Mentors
              </span>{" "}
              on Campus
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The trusted marketplace for students to find skilled mentors and complete projects with confidence. 
              Build your reputation while earning or learning.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={handleGetStarted}
              className="gap-2"
            >
              Get Started with GitHub
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              Learn More
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 pt-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose CampusMate?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built for students, by students. Experience the future of campus collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-medium bg-gradient-card hover:shadow-strong transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-xl bg-muted/30 w-fit">
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-medium bg-gradient-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-campus-blue-light">
                    <CheckCircle className="h-6 w-6 text-campus-blue" />
                  </div>
                  <CardTitle>For Students</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center font-semibold">1</div>
                  <p>Post your task with budget and deadline</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center font-semibold">2</div>
                  <p>Review applications from verified mentors</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center font-semibold">3</div>
                  <p>Work together and build your reputation</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-medium bg-gradient-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-campus-green-light">
                    <Shield className="h-6 w-6 text-campus-green" />
                  </div>
                  <CardTitle>For Mentors</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-secondary text-white text-sm flex items-center justify-center font-semibold">1</div>
                  <p>Browse tasks matching your skills</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-secondary text-white text-sm flex items-center justify-center font-semibold">2</div>
                  <p>Apply with your proposal and rate</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-secondary text-white text-sm flex items-center justify-center font-semibold">3</div>
                  <p>Earn money while helping peers succeed</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16 px-4">
        <Card className="border-0 shadow-strong bg-gradient-hero text-white">
          <CardContent className="p-12 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
              <p className="text-lg opacity-90">
                Join thousands of students building their reputation and earning through verified collaborations.
              </p>
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={handleGetStarted}
                className="gap-2"
              >
                <Zap className="h-5 w-5" />
                Verify with GitHub
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container py-8 px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">CampusMate</span>
            </div>
            <p className="text-muted-foreground">
              Building the future of campus collaboration, one verified connection at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
