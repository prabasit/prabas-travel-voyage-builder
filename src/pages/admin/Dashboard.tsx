
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, MessageSquare, Award, Plane, Globe } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const stats = [
    { title: 'Total Inquiries', value: '156', icon: Users, color: 'text-blue-600' },
    { title: 'Blog Posts', value: '23', icon: FileText, color: 'text-green-600' },
    { title: 'Testimonials', value: '89', icon: MessageSquare, color: 'text-purple-600' },
    { title: 'Awards', value: '12', icon: Award, color: 'text-yellow-600' },
    { title: 'Flight Bookings', value: '2,435', icon: Plane, color: 'text-red-600' },
    { title: 'Holiday Packages', value: '67', icon: Globe, color: 'text-indigo-600' }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome to Prabas Travels CMS</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted rounded">
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-muted-foreground">Everest Base Camp Trek</p>
                  </div>
                  <span className="text-sm text-muted-foreground">2 hours ago</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded">
                  <div>
                    <p className="font-medium">Sarah Smith</p>
                    <p className="text-sm text-muted-foreground">Thailand Package</p>
                  </div>
                  <span className="text-sm text-muted-foreground">5 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <button className="w-full text-left p-3 hover:bg-muted rounded transition-colors">
                  Add New Blog Post
                </button>
                <button className="w-full text-left p-3 hover:bg-muted rounded transition-colors">
                  Manage Team Members
                </button>
                <button className="w-full text-left p-3 hover:bg-muted rounded transition-colors">
                  Update Services
                </button>
                <button className="w-full text-left p-3 hover:bg-muted rounded transition-colors">
                  View All Testimonials
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
