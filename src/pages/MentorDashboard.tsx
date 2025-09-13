import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VerificationBadge } from "@/components/ui/verification-badge";
import { CredibilityMeter } from "@/components/ui/credibility-meter";
import { Search, DollarSign, Star, Filter, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Task {
  id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  student: string;
  studentRating: number;
  category: string;
  timePosted: string;
  urgency: "low" | "medium" | "high";
}

interface Application {
  id: string;
  taskId: string;
  taskTitle: string;
  proposedRate: number;
  message: string;
  status: "pending" | "accepted" | "rejected";
  submittedAt: string;
}

export default function MentorDashboard() {
  const [user, setUser] = useState<any>(null);
  const [availableTasks, setAvailableTasks] = useState<Task[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [earnings] = useState({ total: 15200, thisMonth: 3400 });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("campusmate_user") || "null");
    if (!userData || userData.userType !== "mentor") {
      window.location.href = "/auth";
      return;
    }
    setUser(userData);
    loadMockTasks();
    loadMockApplications();
  }, []);

  const loadMockTasks = () => {
    const mockTasks: Task[] = [
      {
        id: "1",
        title: "React Component Debug Help",
        description: "Need help debugging a React component that's not rendering properly. The issue seems to be with state management.",
        budget: 500,
        deadline: "2025-09-15",
        student: "Rahul Gupta",
        studentRating: 4.2,
        category: "Programming",
        timePosted: "2 hours ago",
        urgency: "high"
      },
      {
        id: "2",
        title: "Python Data Analysis Project",
        description: "Help with analyzing a dataset using pandas and creating visualizations with matplotlib.",
        budget: 800,
        deadline: "2025-09-18",
        student: "Sneha Patel",
        studentRating: 4.8,
        category: "Data Science",
        timePosted: "4 hours ago",
        urgency: "medium"
      },
      {
        id: "3",
        title: "Web Design Consultation",
        description: "Need guidance on improving UI/UX for a college project website. Looking for design feedback.",
        budget: 600,
        deadline: "2025-09-20",
        student: "Arjun Singh",
        studentRating: 4.5,
        category: "Design",
        timePosted: "1 day ago",
        urgency: "low"
      }
    ];
    setAvailableTasks(mockTasks);
  };

  const loadMockApplications = () => {
    const mockApplications: Application[] = [
      {
        id: "1",
        taskId: "1",
        taskTitle: "React Component Debug Help",
        proposedRate: 450,
        message: "I have 3+ years of React experience and can help debug this quickly.",
        status: "pending",
        submittedAt: "1 hour ago"
      },
      {
        id: "2",
        taskId: "2", 
        taskTitle: "Java Algorithm Implementation",
        proposedRate: 700,
        message: "Expert in algorithms and data structures. Can complete in 2 days.",
        status: "accepted",
        submittedAt: "2 days ago"
      }
    ];
    setApplications(mockApplications);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "bg-destructive text-white";
      case "medium": return "bg-warning-orange text-white";
      case "low": return "bg-campus-green text-white";
      default: return "bg-muted";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-warning-orange text-white";
      case "accepted": return "bg-campus-green text-white";
      case "rejected": return "bg-destructive text-white";
      default: return "bg-muted";
    }
  };

  const navigation = [
    { id: "overview", label: "Overview" },
    { id: "browse", label: "Browse Tasks" },
    { id: "applications", label: "My Applications" },
    { id: "profile", label: "Profile" }
  ];

  if (!user) return null;

  return (
    <Layout userType="mentor">
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
                  <VerificationBadge type="mentor" size="sm" />
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
                  <span className="text-muted-foreground">This Month</span>
                  <span className="font-medium">₹{earnings.thisMonth.toLocaleString()}</span>
                </div>
              </div>
              <div className="text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Earned</span>
                  <span className="font-medium">₹{earnings.total.toLocaleString()}</span>
                </div>
              </div>
              <div className="text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-verification-gold fill-current" />
                    <span className="font-medium">4.9</span>
                  </div>
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
                  <p className="text-muted-foreground">Here are some new opportunities for you.</p>
                </div>

                {/* Earnings Summary */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center p-4 border rounded-lg bg-card">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <DollarSign className="h-5 w-5 text-campus-green" />
                      <span className="text-lg font-semibold">₹{earnings.thisMonth.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">This Month</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-card">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-campus-blue" />
                      <span className="text-lg font-semibold">23</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Tasks Completed</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-card">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Star className="h-5 w-5 text-verification-gold fill-current" />
                      <span className="text-lg font-semibold">4.9</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                  </div>
                </div>

                {/* Latest Opportunities */}
                <div className="space-y-4">
                  <h2 className="text-lg font-medium">Latest Opportunities</h2>
                  <div className="space-y-3">
                    {availableTasks.slice(0, 3).map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-muted/30 transition-colors">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{task.title}</h3>
                            <Badge className={getUrgencyColor(task.urgency)}>
                              {task.urgency}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">By {task.student} • {task.timePosted}</p>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="font-semibold text-campus-green">₹{task.budget}</p>
                          <Button variant="campus" size="sm">Apply</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "browse" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold mb-4">Browse Tasks</h1>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search tasks..." className="pl-10" />
                      </div>
                    </div>
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filters
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {availableTasks.map((task) => (
                    <Card key={task.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-3">
                                <h3 className="font-semibold text-lg">{task.title}</h3>
                                <Badge className={getUrgencyColor(task.urgency)}>
                                  {task.urgency}
                                </Badge>
                                <Badge variant="outline">{task.category}</Badge>
                              </div>
                              <p className="text-muted-foreground">{task.description}</p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>By <strong>{task.student}</strong></span>
                                <span className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-current text-verification-gold" />
                                  {task.studentRating}
                                </span>
                                <span>{task.timePosted}</span>
                                <span>Due {new Date(task.deadline).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div className="text-right space-y-2">
                              <p className="text-2xl font-bold text-campus-green">₹{task.budget}</p>
                              <Button variant="campus" size="sm">
                                Apply Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "applications" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold mb-2">My Applications</h1>
                  <p className="text-muted-foreground">{applications.filter(a => a.status === 'pending').length} pending applications</p>
                </div>

                <div className="space-y-4">
                  {applications.map((application) => (
                    <Card key={application.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold">{application.taskTitle}</h3>
                              <Badge className={getStatusColor(application.status)}>
                                {application.status}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground text-sm">{application.message}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Applied {application.submittedAt}</span>
                              <span>Proposed: ₹{application.proposedRate}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            {application.status === "pending" && (
                              <Button variant="outline" size="sm">Edit</Button>
                            )}
                            {application.status === "accepted" && (
                              <Button variant="campus" size="sm">Start Work</Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold mb-2">Mentor Profile</h1>
                  <p className="text-muted-foreground">Manage your skills and rates</p>
                </div>
                
                <Card className="max-w-2xl">
                  <CardContent className="p-6 space-y-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={user.avatar_url}
                        alt={user.name}
                        className="h-16 w-16 rounded-full"
                      />
                      <div className="space-y-1">
                        <h3 className="text-xl font-semibold">{user.name}</h3>
                        <p className="text-muted-foreground text-sm">{user.bio}</p>
                        <div className="flex items-center gap-2">
                          <VerificationBadge type="mentor" />
                          <Badge variant="outline">{user.mentor_tier} Mentor</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Primary Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {user.skill_analysis?.primary_skills?.map((skill: string) => (
                            <Badge key={skill} variant="default">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <CredibilityMeter score={user.credibilityScore} />

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Hourly Rate (₹)</label>
                          <Input type="number" placeholder="800" className="mt-1" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Availability</label>
                          <Input placeholder="Available weekdays" className="mt-1" />
                        </div>
                      </div>

                      <Button variant="default" className="w-full">
                        Update Profile
                      </Button>
                    </div>
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