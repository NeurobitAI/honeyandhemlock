import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  LayoutDashboard, 
  User, 
  Settings, 
  LogOut, 
  Search, 
  Bell 
} from 'lucide-react';

interface Script {
  id: number;
  title: string;
  uploadedBy: string;
  status: 'pending' | 'assigned' | 'approved' | 'declined';
  assignedJudge?: string;
  dateSubmitted: string;
  feedback?: string;
  paymentStatus: 'paid' | 'pending';
}

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'read';
}

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [scripts, setScripts] = useState<Script[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for metrics
  const metrics = {
    totalUsers: 1250,
    userGrowth: 15.3,
    totalPayments: 324000,
    paymentGrowth: 8.7,
    scriptUploads: 430,
    scriptGrowth: -2.4,
    assignedScripts: 300,
    pendingScripts: 130,
    totalJudges: 15,
    newJudges: 3
  };

  const recentActivity = [
    { id: 1, type: 'approval', message: 'Script "Solitary" approved by Judge Sarah', time: '2 hours ago' },
    { id: 2, type: 'payment', message: 'Payment received from User #1203', time: '3 hours ago' },
    { id: 3, type: 'registration', message: 'Judge John Smith registered', time: '5 hours ago' },
    { id: 4, type: 'assignment', message: 'Script "Spaceman" assigned to Judge Mike', time: '1 day ago' },
    { id: 5, type: 'decline', message: 'Script "Untitled" declined by Judge Lisa', time: '1 day ago' }
  ];

  useEffect(() => {
    // Check if user is admin
    if (!user || (user.role !== 'admin' && !user.isAdmin)) {
      navigate('/admin');
      return;
    }

    const savedScripts = JSON.parse(localStorage.getItem('scripts') || '[]');
    const savedContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    setScripts(savedScripts);
    setContacts(savedContacts);
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'approval': return '🟢';
      case 'decline': return '🔴';
      case 'payment': return '🟡';
      case 'registration': return '🔵';
      case 'assignment': return '🟠';
      default: return '⚪';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Users Card */}
        <Card className="bg-[#282828] border-none relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Registered Users</p>
                <p className="text-3xl font-bold text-white mt-2">{metrics.totalUsers.toLocaleString()}</p>
                <p className="text-sm mt-2">
                  <span className={`${metrics.userGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {metrics.userGrowth > 0 ? '+' : ''}{metrics.userGrowth}% 
                  </span>
                  <span className="text-gray-400 ml-1">Since Last Month</span>
                </p>
              </div>
              <div className="w-12 h-12 bg-[#FFB300] rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-black" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payments Card */}
        <Card className="bg-[#282828] border-none relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Total Payments Received</p>
                <p className="text-3xl font-bold text-white mt-2">₹{metrics.totalPayments.toLocaleString()}</p>
                <p className="text-sm mt-2">
                  <span className={`${metrics.paymentGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {metrics.paymentGrowth > 0 ? '+' : ''}{metrics.paymentGrowth}% 
                  </span>
                  <span className="text-gray-400 ml-1">Since Last Month</span>
                </p>
              </div>
              <div className="w-12 h-12 bg-[#FFB300] rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-lg">₹</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Script Uploads Card */}
        <Card className="bg-[#282828] border-none relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Scripts Uploaded</p>
                <p className="text-3xl font-bold text-white mt-2">{metrics.scriptUploads}</p>
                <p className="text-sm mt-2">
                  <span className={`${metrics.scriptGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {metrics.scriptGrowth > 0 ? '+' : ''}{metrics.scriptGrowth}% 
                  </span>
                  <span className="text-gray-400 ml-1">Since Last Month</span>
                </p>
              </div>
              <div className="w-12 h-12 bg-[#FFB300] rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-lg">📄</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scripts Assignment Card */}
        <Card className="bg-[#282828] border-none">
          <CardHeader>
            <CardTitle className="text-white">Scripts Assignment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Assigned to Judges</span>
                <span className="text-2xl font-bold text-white">{metrics.assignedScripts}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Pending Assignment</span>
                <span className="text-2xl font-bold text-[#FFB300]">{metrics.pendingScripts}</span>
              </div>
              <div className="mt-4">
                <Progress 
                  value={(metrics.assignedScripts / (metrics.assignedScripts + metrics.pendingScripts)) * 100} 
                  className="h-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Judges Registered Card */}
        <Card className="bg-[#282828] border-none">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Judges Registered</p>
                <p className="text-3xl font-bold text-white mt-2">{metrics.totalJudges}</p>
                <p className="text-sm mt-2">
                  <span className="text-green-400">+{metrics.newJudges}</span>
                  <span className="text-gray-400 ml-1">New This Month</span>
                </p>
              </div>
              <div className="w-12 h-12 bg-[#FFB300] rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-black" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Actions */}
        <Card className="bg-[#282828] border-none">
          <CardHeader>
            <CardTitle className="text-white">Recent Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <span className="text-lg">{getActivityIcon(activity.type)}</span>
                  <div className="flex-1">
                    <p className="text-sm text-white">{activity.message}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Progress */}
        <Card className="bg-[#282828] border-none">
          <CardHeader>
            <CardTitle className="text-white">Total Payment Progress</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#404040"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#FFB300"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${70 * 3.14159} ${(100 - 70) * 3.14159}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">70%</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm text-center">Payment goal reached</p>
          </CardContent>
        </Card>

        {/* Recent Activity Details */}
        <Card className="bg-[#282828] border-none">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <span className="text-sm">{getActivityIcon(activity.type)}</span>
                  <div className="flex-1">
                    <p className="text-xs text-white leading-tight">{activity.message}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#232323] text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#282828] min-h-screen p-6 flex flex-col">
        {/* User Profile */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#FFB300] rounded-full flex items-center justify-center mb-3">
            <User className="w-8 h-8 text-black" />
          </div>
          <h3 className="text-white font-semibold">{user?.email?.split('@')[0] || 'Admin'}</h3>
          <p className="text-gray-400 text-sm">Administrator</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'judges', label: 'Judges', icon: User },
              { id: 'scripts', label: 'Scripts', icon: () => <span>📄</span> },
              { id: 'payments', label: 'Payments', icon: () => <span>💳</span> },
              { id: 'analytics', label: 'Analytics', icon: () => <span>📊</span> },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-[#FFB300] text-black'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center space-x-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-[#FFB300] h-16 px-6 flex items-center justify-between">
          <h1 className="text-xl font-bold text-black">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 text-black" />
            </div>
            <div className="relative">
              <Bell className="w-5 h-5 text-black" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
            </div>
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-[#FFB300]" />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab !== 'dashboard' && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-white mb-4">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
              </h2>
              <p className="text-gray-400">This section is under development.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
