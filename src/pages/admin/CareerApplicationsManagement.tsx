
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Phone, Calendar, ExternalLink, Eye, CheckCircle, XCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface JobApplication {
  id: string;
  career_id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  cover_letter: string;
  resume_url: string;
  position_title: string;
  status: string;
  created_at: string;
}

const CareerApplicationsManagement = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Error",
        description: "Failed to load job applications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setApplications(prev => 
        prev.map(app => app.id === id ? { ...app, status } : app)
      );

      toast({
        title: "Status Updated",
        description: `Application status changed to ${status}`,
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { variant: 'secondary' as const, label: 'Pending' },
      reviewed: { variant: 'default' as const, label: 'Reviewed' },
      shortlisted: { variant: 'default' as const, label: 'Shortlisted' },
      rejected: { variant: 'destructive' as const, label: 'Rejected' },
      hired: { variant: 'default' as const, label: 'Hired' }
    };
    
    const config = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (loading) {
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
          <h1 className="text-3xl font-bold">Job Applications</h1>
          <p className="text-muted-foreground">Manage and review job applications</p>
        </div>

        <div className="grid gap-6">
          {applications.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No job applications yet.</p>
              </CardContent>
            </Card>
          ) : (
            applications.map((application) => (
              <Card key={application.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{application.applicant_name}</CardTitle>
                      <p className="text-muted-foreground mt-1">{application.position_title}</p>
                    </div>
                    {getStatusBadge(application.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{application.applicant_email}</span>
                    </div>
                    {application.applicant_phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{application.applicant_phone}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Applied on {new Date(application.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {application.resume_url && (
                      <div className="flex items-center space-x-2">
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        <a 
                          href={application.resume_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          View Resume
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Application Details - {application.applicant_name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Position Applied For:</h4>
                            <p>{application.position_title}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Cover Letter:</h4>
                            <div className="bg-muted/50 p-4 rounded-lg">
                              <p className="whitespace-pre-wrap">{application.cover_letter}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2">Contact Information:</h4>
                              <p>Email: {application.applicant_email}</p>
                              {application.applicant_phone && (
                                <p>Phone: {application.applicant_phone}</p>
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Application Date:</h4>
                              <p>{new Date(application.created_at).toLocaleDateString()}</p>
                            </div>
                          </div>
                          {application.resume_url && (
                            <div>
                              <h4 className="font-semibold mb-2">Resume:</h4>
                              <a 
                                href={application.resume_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary hover:underline flex items-center"
                              >
                                <ExternalLink className="h-4 w-4 mr-1" />
                                View Resume
                              </a>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>

                    <div className="flex space-x-2">
                      {application.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateApplicationStatus(application.id, 'reviewed')}
                          >
                            Mark Reviewed
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => updateApplicationStatus(application.id, 'shortlisted')}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Shortlist
                          </Button>
                        </>
                      )}
                      {application.status === 'reviewed' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => updateApplicationStatus(application.id, 'shortlisted')}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Shortlist
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => updateApplicationStatus(application.id, 'rejected')}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      {application.status === 'shortlisted' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => updateApplicationStatus(application.id, 'hired')}
                          >
                            Mark Hired
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => updateApplicationStatus(application.id, 'rejected')}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default CareerApplicationsManagement;
