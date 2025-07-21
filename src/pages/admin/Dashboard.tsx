
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, MessageSquare, Award, Plane, Globe, Mail, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

const Dashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [
        { count: inquiriesCount },
        { count: blogsCount },
        { count: testimonialsCount },
        { count: awardsCount },
        { count: teamCount },
        { count: careersCount }
      ] = await Promise.all([
        supabase.from('inquiries').select('*', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }),
        supabase.from('awards').select('*', { count: 'exact', head: true }),
        supabase.from('team_members').select('*', { count: 'exact', head: true }),
        supabase.from('careers').select('*', { count: 'exact', head: true })
      ]);

      return {
        inquiries: inquiriesCount || 0,
        blogs: blogsCount || 0,
        testimonials: testimonialsCount || 0,
        awards: awardsCount || 0,
        team: teamCount || 0,
        careers: careersCount || 0
      };
    }
  });

  const { data: recentInquiries } = useQuery({
    queryKey: ['recent-inquiries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data || [];
    }
  });

  const statsData = [
    { title: 'Total Inquiries', value: stats?.inquiries || 0, icon: Mail, color: 'text-blue-600' },
    { title: 'Blog Posts', value: stats?.blogs || 0, icon: FileText, color: 'text-green-600' },
    { title: 'Testimonials', value: stats?.testimonials || 0, icon: MessageSquare, color: 'text-purple-600' },
    { title: 'Awards', value: stats?.awards || 0, icon: Award, color: 'text-yellow-600' },
    { title: 'Team Members', value: stats?.team || 0, icon: Users, color: 'text-red-600' },
    { title: 'Job Openings', value: stats?.careers || 0, icon: TrendingUp, color: 'text-indigo-600' }
  ];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome to Prabas Travels CMS</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statsData.map((stat, index) => (
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
                {recentInquiries?.map((inquiry) => (
                  <div key={inquiry.id} className="flex justify-between items-center p-3 bg-muted rounded">
                    <div>
                      <p className="font-medium">{inquiry.name}</p>
                      <p className="text-sm text-muted-foreground">{inquiry.subject}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
                {!recentInquiries?.length && (
                  <p className="text-muted-foreground text-center py-4">No recent inquiries</p>
                )}
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
                  Update About Us
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
