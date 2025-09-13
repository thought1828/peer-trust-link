import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { VerificationBadge } from "@/components/ui/verification-badge";
import { CredibilityMeter } from "@/components/ui/credibility-meter";
import { Search, Shield, Users, AlertTriangle, CheckCircle, XCircle, TrendingUp, DollarSign } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  type: "student" | "mentor";
  credibilityScore: number;
  isVerified: boolean;
  joinDate: string;
  lastActive: string;
  status: "active" | "suspended" | "pending";
  tasksCompleted: number;
}

interface Dispute {
  id: string;
  taskTitle: string;
  student: string;
  mentor: string;
  issue: string;
  priority: "low" | "medium" | "high";
  status: "open" | "investigating" | "resolved";
  createdAt: string;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 1247,
    activeUsers: 892,
    totalTasks: 3456,
    totalEarnings: 234500,
    pendingVerifications: 12,
    openDisputes: 3
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("campusmate_user") || "null");
    // For demo, allow any user to access admin
    if (!userData) {
      window.location.href = "/auth";
      return;
    }
    setUser(userData);
    loadMockData();
  }, []);

  const loadMockData = () => {
    const mockUsers: User[] = [
      {
        id: "1",
        name: "Priya Sharma",
        email: "priya@college.edu",
        type: "mentor",
        credibilityScore: 92,
        isVerified: true,
        joinDate: "2024-08-15",
        lastActive: "2 hours ago",
        status: "active",
        tasksCompleted: 45
      },
      {
        id: "2",
        name: "Rahul Kumar",
        email: "rahul@college.edu", 
        type: "student",
        credibilityScore: 78,
        isVerified: false,
        joinDate: "2024-09-01",
        lastActive: "1 day ago",
        status: "pending",
        tasksCompleted: 8
      },
      {
        id: "3",
        name: "Sneha Patel",
        email: "sneha@college.edu",
        type: "mentor",
        credibilityScore: 88,
        isVerified: true,
        joinDate: "2024-07-20",
        lastActive: "5 hours ago",
        status: "active",
        tasksCompleted: 32
      }
    ];

    const mockDisputes: Dispute[] = [
      {
        id: "1",
        taskTitle: "React Component Debug",
        student: "Rahul Kumar",
        mentor: "Priya Sharma",
        issue: "Work not delivered on time",
        priority: "high",
        status: "open",
        createdAt: "2025-09-12"
      },
      {
        id: "2",
        taskTitle: "Python Data Analysis",
        student: "Arjun Singh",
        mentor: "Sneha Patel",
        issue: "Quality concerns with deliverable",
        priority: "medium",
        status: "investigating",
        createdAt: "2025-09-10"
      }
    ];

    setUsers(mockUsers);
    setDisputes(mockDisputes);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-campus-green text-white";
      case "pending": return "bg-warning-orange text-white";
      case "suspended": return "bg-destructive text-white";
      default: return "bg-muted";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-white";
      case "medium": return "bg-warning-orange text-white";
      case "low": return "bg-campus-green text-white";
      default: return "bg-muted";
    }
  };

  const getDisputeStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-destructive text-white";
      case "investigating": return "bg-warning-orange text-white";
      case "resolved": return "bg-campus-green text-white";
      default: return "bg-muted";
    }
  };

  if (!user) return null;

  return (
    <Layout userType="admin">
      <div className="container py-8 px-4 space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage users, verify accounts, and resolve disputes
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="disputes">Disputes</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-campus-blue" />
                    <div>
                      <p className="text-xl font-bold">{stats.totalUsers}</p>
                      <p className="text-xs text-muted-foreground">Total Users</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-campus-green" />
                    <div>
                      <p className="text-xl font-bold">{stats.activeUsers}</p>
                      <p className="text-xs text-muted-foreground">Active Users</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-campus-blue" />
                    <div>
                      <p className="text-xl font-bold">{stats.totalTasks}</p>
                      <p className="text-xs text-muted-foreground">Total Tasks</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-verification-gold" />
                    <div>
                      <p className="text-xl font-bold">₹{stats.totalEarnings.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Total Volume</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-warning-orange" />
                    <div>
                      <p className="text-xl font-bold">{stats.pendingVerifications}</p>
                      <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <div>
                      <p className="text-xl font-bold">{stats.openDisputes}</p>
                      <p className="text-xs text-muted-foreground">Disputes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Users</CardTitle>
                  <CardDescription>Newly registered accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {users.slice(0, 3).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{user.type}</Badge>
                            <Badge className={getStatusColor(user.status)}>
                              {user.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <p>Score: {user.credibilityScore}%</p>
                          <p>{user.lastActive}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Open Disputes</CardTitle>
                  <CardDescription>Issues requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {disputes.filter(d => d.status === "open").map((dispute) => (
                      <div key={dispute.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{dispute.taskTitle}</h4>
                          <Badge className={getPriorityColor(dispute.priority)}>
                            {dispute.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{dispute.issue}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">
                            {dispute.student} vs {dispute.mentor}
                          </span>
                          <Button variant="outline" size="sm">Review</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search users..." className="pl-10" />
                </div>
              </div>
              <Button variant="outline">Filter</Button>
            </div>

            <div className="grid gap-4">
              {users.map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{user.name}</h3>
                          <Badge variant="outline">{user.type}</Badge>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                          {user.isVerified && <VerificationBadge type={user.type} size="sm" />}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p className="font-medium">{user.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Joined</p>
                            <p className="font-medium">{new Date(user.joinDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Tasks</p>
                            <p className="font-medium">{user.tasksCompleted}</p>
                          </div>
                        </div>

                        <CredibilityMeter score={user.credibilityScore} size="sm" />
                      </div>

                      <div className="flex gap-2">
                        {user.status === "pending" && (
                          <>
                            <Button variant="campus" size="sm">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button variant="destructive" size="sm">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {user.status === "active" && (
                          <Button variant="outline" size="sm">
                            Suspend
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="disputes" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Dispute Management</h2>
              <div className="flex items-center gap-2">
                <Badge className="bg-destructive text-white">
                  {disputes.filter(d => d.status === "open").length} Open
                </Badge>
                <Badge className="bg-warning-orange text-white">
                  {disputes.filter(d => d.status === "investigating").length} In Progress
                </Badge>
              </div>
            </div>

            <div className="grid gap-4">
              {disputes.map((dispute) => (
                <Card key={dispute.id}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-lg">{dispute.taskTitle}</h3>
                            <Badge className={getDisputeStatusColor(dispute.status)}>
                              {dispute.status}
                            </Badge>
                            <Badge className={getPriorityColor(dispute.priority)}>
                              {dispute.priority} priority
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">{dispute.issue}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                        <div>
                          <p className="text-sm text-muted-foreground">Student</p>
                          <p className="font-medium">{dispute.student}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Mentor</p>
                          <p className="font-medium">{dispute.mentor}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Created</p>
                          <p className="font-medium">{new Date(dispute.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {dispute.status === "open" && (
                          <Button variant="campus" size="sm">
                            Start Investigation
                          </Button>
                        )}
                        {dispute.status === "investigating" && (
                          <Button variant="success" size="sm">
                            Resolve Dispute
                          </Button>
                        )}
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button variant="ghost" size="sm">Contact Parties</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="verification" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Verification</CardTitle>
                <CardDescription>Review and approve user verifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Pending Verifications</h3>
                  <p className="text-muted-foreground">
                    All user accounts are currently verified through the automated GitHub analysis system.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}