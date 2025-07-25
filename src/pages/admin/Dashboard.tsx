
import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, MessageSquare, Award, Mail, Settings, Shield, Plane, Globe } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const [stats, setStats] = useState({
    teamMembers: 0,
    blogPosts: 0,
    testimonials: 0,
    awards: 0,
    inquiries: 0,
    pages: 0,
    admins: 0,
    newsletters: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [teamRes, blogRes, testimonialsRes, awardsRes, inquiriesRes, pagesRes, adminsRes, newslettersRes] = await Promise.all([
        supabase.from('team_members').select('*', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }),
        supabase.from('awards').select('*', { count: 'exact', head: true }),
        supabase.from('inquiries').select('*', { count: 'exact', head: true }),
        supabase.from('pages').select('*', { count: 'exact', head: true }),
        supabase.from('admin_users').select('*', { count: 'exact', head: true }),
        supabase.from('newsletter_subscriptions').select('*', { count: 'exact', head: true })
      ]);

      setStats({
        teamMembers: teamRes.count || 0,
        blogPosts: blogRes.count || 0,
        testimonials: testimonialsRes.count || 0,
        awards: awardsRes.count || 0,
        inquiries: inquiriesRes.count || 0,
        pages: pagesRes.count || 0,
        admins: adminsRes.count || 0,
        newsletters: newslettersRes.count || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statCards = [
    { title: 'Team Members', value: stats.teamMembers, icon: Users, color: 'text-blue-600' },
    { title: 'Blog Posts', value: stats.blogPosts, icon: FileText, color: 'text-green-600' },
    { title: 'Testimonials', value: stats.testimonials, icon: MessageSquare, color: 'text-purple-600' },
    { title: 'Awards', value: stats.awards, icon: Award, color: 'text-yellow-600' },
    { title: 'Inquiries', value: stats.inquiries, icon: Mail, color: 'text-red-600' },
    { title: 'Pages', value: stats.pages, icon: Settings, color: 'text-indigo-600' },
    { title: 'Admin Users', value: stats.admins, icon: Shield, color: 'text-gray-600' },
    { title: 'Newsletter Subs', value: stats.newsletters, icon: Mail, color: 'text-cyan-600' }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to Prabas Travels Admin Panel</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <Card key={stat.title}>
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
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <a href="/admin/team" className="p-3 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-colors">
                  <Users className="h-6 w-6 mx-auto mb-1 text-blue-600" />
                  <span className="text-sm">Add Team Member</span>
                </a>
                <a href="/admin/blogs" className="p-3 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors">
                  <FileText className="h-6 w-6 mx-auto mb-1 text-green-600" />
                  <span className="text-sm">Write Blog</span>
                </a>
                <a href="/admin/testimonials" className="p-3 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition-colors">
                  <MessageSquare className="h-6 w-6 mx-auto mb-1 text-purple-600" />
                  <span className="text-sm">Add Testimonial</span>
                </a>
                <a href="/admin/awards" className="p-3 bg-yellow-50 rounded-lg text-center hover:bg-yellow-100 transition-colors">
                  <Award className="h-6 w-6 mx-auto mb-1 text-yellow-600" />
                  <span className="text-sm">Add Award</span>
                </a>
                <a href="/admin/admin-management" className="p-3 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors">
                  <Shield className="h-6 w-6 mx-auto mb-1 text-gray-600" />
                  <span className="text-sm">Manage Admins</span>
                </a>
                <a href="/admin/flights-nepal" className="p-3 bg-sky-50 rounded-lg text-center hover:bg-sky-100 transition-colors">
                  <Plane className="h-6 w-6 mx-auto mb-1 text-sky-600" />
                  <span className="text-sm">FlightsNepal</span>
                </a>
                <a href="/admin/prabas-holidays" className="p-3 bg-emerald-50 rounded-lg text-center hover:bg-emerald-100 transition-colors">
                  <Globe className="h-6 w-6 mx-auto mb-1 text-emerald-600" />
                  <span className="text-sm">Prabas Holidays</span>
                </a>
                <a href="/admin/inquiries" className="p-3 bg-red-50 rounded-lg text-center hover:bg-red-100 transition-colors">
                  <Mail className="h-6 w-6 mx-auto mb-1 text-red-600" />
                  <span className="text-sm">View Inquiries</span>
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Database</span>
                  <span className="text-green-600 font-medium">Connected</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Admin Panel</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Newsletter System</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Last Updated</span>
                  <span className="text-muted-foreground">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
