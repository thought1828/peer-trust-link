import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VerificationBadge } from "@/components/ui/verification-badge";
import { CredibilityMeter } from "@/components/ui/credibility-meter";
import { PlusCircle, Search, Clock, DollarSign, User, Star, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  status: "open" | "in_progress" | "completed";
  applications: number;
  category: string;
}

interface Mentor {
  id: string;
  name: string;
  avatar: string;
  skills: string[];
  hourlyRate: number;
  rating: number;
  completedTasks: number;
  credibilityScore: number;
  isVerified: boolean;
  tier: "Basic" | "Advanced" | "Expert";
}

export default function StudentDashboard() {
  const [user, setUser] = useState<any>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("campusmate_user") || "null");
    if (!userData || userData.userType !== "student") {
      window.location.href = "/auth";
      return;
    }
    setUser(userData);

    // Load mock data
    loadMockTasks();
    loadMockMentors();
  }, []);

  const loadMockTasks = () => {
    const mockTasks: Task[] = [
      {
        id: "1",
        title: "React Component Debug Help",
        description: "Need help debugging a React component that's not rendering properly",
        budget: 500,
        deadline: "2025-09-15",
        status: "open",
        applications: 3,
        category: "Programming"
      },
      {
        id: "2", 
        title: "Data Structures Assignment",
        description: "Help with implementing binary search tree in Java",
        budget: 800,
        deadline: "2025-09-18",
        status: "in_progress",
        applications: 1,
        category: "Computer Science"
      }
    ];
    setTasks(mockTasks);
  };

  const loadMockMentors = () => {
    const mockMentors: Mentor[] = [
      {
        id: "1",
        name: "Alex Kumar",
        avatar: "/placeholder.svg",
        skills: ["React", "JavaScript", "Node.js"],
        hourlyRate: 800,
        rating: 4.9,
        completedTasks: 45,
        credibilityScore: 92,
        isVerified: true,
        tier: "Expert"
      },
      {
        id: "2",
        name: "Priya Sharma",
        avatar: "/placeholder.svg", 
        skills: ["Python", "Data Science", "Machine Learning"],
        hourlyRate: 600,
        rating: 4.7,
        completedTasks: 28,
        credibilityScore: 85,
        isVerified: true,
        tier: "Advanced"
      }
    ];
    setMentors(mockMentors);
  };

  const handleCreateTask = () => {
    setIsCreatingTask(true);
    // Mock task creation
    setTimeout(() => {
      toast({
        title: "Task Created!",
        description: "Your task has been posted and mentors can now apply",
      });
      setIsCreatingTask(false);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-campus-blue text-white";
      case "in_progress": return "bg-warning-orange text-white";
      case "completed": return "bg-campus-green text-white";
      default: return "bg-muted";
    }
  };

  if (!user) return null;

  return (
    <Layout userType="student">
      <div className="container py-8 px-4 space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
            <p className="text-muted-foreground mt-2">
              Find the perfect mentor for your next project
            </p>
          </div>
          <div className="flex items-center gap-4">
            <CredibilityMeter score={user.credibilityScore} size="sm" />
            <VerificationBadge type="student" />
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="tasks">My Tasks</TabsTrigger>
            <TabsTrigger value="mentors">Find Mentors</TabsTrigger>
            <TabsTrigger value="create">Post Task</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-campus-blue-light rounded-lg">
                      <Clock className="h-5 w-5 text-campus-blue" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">2</p>
                      <p className="text-sm text-muted-foreground">Active Tasks</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-campus-green-light rounded-lg">
                      <DollarSign className="h-5 w-5 text-campus-green" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">₹1,300</p>
                      <p className="text-sm text-muted-foreground">Total Spent</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-verification-gold/20 rounded-lg">
                      <Star className="h-5 w-5 text-verification-gold" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">4.8</p>
                      <p className="text-sm text-muted-foreground">Avg Rating</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Tasks */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Tasks</CardTitle>
                <CardDescription>Your latest task requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(task.status)}>
                            {task.status.replace('_', ' ')}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {task.applications} applications
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{task.budget}</p>
                        <p className="text-sm text-muted-foreground">Budget</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Tasks</h2>
              <Button variant="hero" className="gap-2">
                <PlusCircle className="h-4 w-4" />
                New Task
              </Button>
            </div>
            
            <div className="grid gap-4">
              {tasks.map((task) => (
                <Card key={task.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">{task.title}</h3>
                          <Badge className={getStatusColor(task.status)}>
                            {task.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{task.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
                          <span>{task.applications} applications received</span>
                          <Badge variant="outline">{task.category}</Badge>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <p className="text-xl font-bold text-campus-green">₹{task.budget}</p>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mentors" className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search mentors by skills..." className="pl-10" />
                </div>
              </div>
              <Button variant="outline">Filters</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mentors.map((mentor) => (
                <Card key={mentor.id} className="hover:shadow-medium transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="h-16 w-16 rounded-full"
                      />
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold flex items-center gap-2">
                              {mentor.name}
                              {mentor.isVerified && <VerificationBadge type="mentor" size="sm" />}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Star className="h-4 w-4 text-verification-gold fill-current" />
                              <span className="text-sm font-medium">{mentor.rating}</span>
                              <span className="text-sm text-muted-foreground">
                                ({mentor.completedTasks} tasks)
                              </span>
                            </div>
                          </div>
                          <Badge variant={mentor.tier === "Expert" ? "default" : "secondary"}>
                            {mentor.tier}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-1">
                            {mentor.skills.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          <CredibilityMeter score={mentor.credibilityScore} size="sm" />
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-campus-green">
                            ₹{mentor.hourlyRate}/hr
                          </span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                            <Button variant="campus" size="sm">
                              Hire
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post a New Task</CardTitle>
                <CardDescription>
                  Describe your task and get help from verified mentors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Task Title</label>
                  <Input placeholder="e.g., Debug React Component Issue" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea 
                    placeholder="Provide detailed description of what you need help with..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Budget (₹)</label>
                    <Input type="number" placeholder="500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Deadline</label>
                    <Input type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Input placeholder="e.g., Programming, Design, Mathematics" />
                </div>

                <Button 
                  onClick={handleCreateTask}
                  disabled={isCreatingTask}
                  className="w-full"
                  variant="hero"
                  size="lg"
                >
                  {isCreatingTask ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Creating Task...
                    </div>
                  ) : (
                    "Post Task"
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}