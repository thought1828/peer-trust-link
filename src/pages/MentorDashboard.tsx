import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VerificationBadge } from "@/components/ui/verification-badge";
import { CredibilityMeter } from "@/components/ui/credibility-meter";
import { Search, DollarSign, Clock, Star, TrendingUp, BookOpen, Users, Filter } from "lucide-react";
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
  const [earnings, setEarnings] = useState({ total: 15200, thisMonth: 3400 });

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

  if (!user) return null;

  return (
    <Layout userType="mentor">
      <div className="container py-8 px-4 space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
            <p className="text-muted-foreground mt-2">
              Help students and grow your earnings
            </p>
          </div>
          <div className="flex items-center gap-4">
            <CredibilityMeter score={user.credibilityScore} size="sm" />
            <VerificationBadge type="mentor" />
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="browse">Browse Tasks</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-campus-green-light rounded-lg">
                      <DollarSign className="h-5 w-5 text-campus-green" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">₹{earnings.total.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Total Earned</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-campus-blue-light rounded-lg">
                      <TrendingUp className="h-5 w-5 text-campus-blue" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">₹{earnings.thisMonth.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">This Month</p>
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
                      <p className="text-2xl font-bold">4.9</p>
                      <p className="text-sm text-muted-foreground">Rating</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-campus-blue-light rounded-lg">
                      <BookOpen className="h-5 w-5 text-campus-blue" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">23</p>
                      <p className="text-sm text-muted-foreground">Tasks Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle>Latest Opportunities</CardTitle>
                <CardDescription>New tasks that match your skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableTasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{task.title}</h4>
                          <Badge className={getUrgencyColor(task.urgency)}>
                            {task.urgency}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">{task.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>By {task.student}</span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-current text-verification-gold" />
                            {task.studentRating}
                          </span>
                          <Badge variant="outline">{task.category}</Badge>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <p className="font-semibold text-campus-green">₹{task.budget}</p>
                        <Button variant="campus" size="sm">Apply</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="browse" className="space-y-6">
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

            <div className="grid gap-4">
              {availableTasks.map((task) => (
                <Card key={task.id} className="hover:shadow-medium transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-lg">{task.title}</h3>
                            <Badge className={getUrgencyColor(task.urgency)}>
                              {task.urgency} priority
                            </Badge>
                            <Badge variant="outline">{task.category}</Badge>
                          </div>
                          <p className="text-muted-foreground">{task.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Posted by <strong>{task.student}</strong></span>
                            <span className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-current text-verification-gold" />
                              {task.studentRating}
                            </span>
                            <span>{task.timePosted}</span>
                            <span>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <p className="text-2xl font-bold text-campus-green">₹{task.budget}</p>
                          <Button variant="campus" size="sm" className="w-full">
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Applications</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{applications.filter(a => a.status === 'pending').length} pending</span>
              </div>
            </div>

            <div className="grid gap-4">
              {applications.map((application) => (
                <Card key={application.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{application.taskTitle}</h3>
                          <Badge className={getStatusColor(application.status)}>
                            {application.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{application.message}</p>
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
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mentor Profile</CardTitle>
                <CardDescription>Manage your skills and rates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <img
                    src={user.avatar_url}
                    alt={user.name}
                    className="h-20 w-20 rounded-full"
                  />
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold">{user.name}</h3>
                    <p className="text-muted-foreground">{user.bio}</p>
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

                  <Button variant="hero" className="w-full">
                    Update Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}