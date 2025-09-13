import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { VerificationBadge } from "@/components/ui/verification-badge";
import { CredibilityMeter } from "@/components/ui/credibility-meter";
import { PlusCircle, Search, Star, MessageCircle } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState("overview");
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("campusmate_user") || "null");
    if (!userData || userData.userType !== "student") {
      window.location.href = "/auth";
      return;
    }
    setUser(userData);
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

  const navigation = [
    { id: "overview", label: "Overview" },
    { id: "tasks", label: "My Tasks" },
    { id: "mentors", label: "Find Mentors" },
    { id: "create", label: "Post Task" }
  ];

  if (!user) return null;

  return (
    <Layout userType="student">
      <div className="flex h-screen bg-background">
        {/* Sidebar */}
        <div className="w-64 border-r bg-muted/30 p-6">
          <div className="space-y-6">
            {/* User Profile */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar_url || "/placeholder.svg"}
                  alt={user.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{user.name.split(' ')[0]}</p>
                  <VerificationBadge type="student" size="sm" />
                </div>
              </div>
              <CredibilityMeter score={user.credibilityScore} size="sm" showLabel={false} />
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    activeTab === item.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent text-muted-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Quick Stats */}
            <div className="space-y-3 pt-6 border-t">
              <div className="text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Active Tasks</span>
                  <span className="font-medium">2</span>
                </div>
              </div>
              <div className="text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Spent</span>
                  <span className="font-medium">₹1,300</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-2xl font-semibold mb-2">Good morning, {user.name.split(' ')[0]}!</h1>
                  <p className="text-muted-foreground">Here's what's happening with your tasks today.</p>
                </div>

                {/* Recent Tasks */}
                <div className="space-y-4">
                  <h2 className="text-lg font-medium">Recent Tasks</h2>
                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{task.title}</h3>
                            <Badge className={getStatusColor(task.status)}>
                              {task.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{task.applications} applications</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{task.budget}</p>
                          <p className="text-sm text-muted-foreground">Budget</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "tasks" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-semibold">My Tasks</h1>
                  <Button variant="default" onClick={() => setActiveTab("create")}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    New Task
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <Card key={task.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold">{task.title}</h3>
                              <Badge className={getStatusColor(task.status)}>
                                {task.status.replace('_', ' ')}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground text-sm">{task.description}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Due {new Date(task.deadline).toLocaleDateString()}</span>
                              <span>{task.applications} applications</span>
                              <Badge variant="outline">{task.category}</Badge>
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <p className="text-lg font-semibold text-campus-green">₹{task.budget}</p>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "mentors" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold mb-4">Find Mentors</h1>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search mentors by skills..." className="pl-10" />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {mentors.map((mentor) => (
                    <Card key={mentor.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <img
                            src={mentor.avatar}
                            alt={mentor.name}
                            className="h-12 w-12 rounded-full"
                          />
                          <div className="flex-1 space-y-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{mentor.name}</h3>
                                {mentor.isVerified && <VerificationBadge type="mentor" size="sm" />}
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-verification-gold fill-current" />
                                  <span className="text-sm font-medium">{mentor.rating}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  ({mentor.completedTasks} tasks)
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-1">
                              {mentor.skills.slice(0, 3).map((skill) => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
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
              </div>
            )}

            {activeTab === "create" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold mb-2">Post a New Task</h1>
                  <p className="text-muted-foreground">Describe your task and get help from verified mentors</p>
                </div>
                
                <Card className="max-w-2xl">
                  <CardContent className="p-6 space-y-6">
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
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}