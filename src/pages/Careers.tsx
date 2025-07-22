
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CareerApplicationModal from '../components/CareerApplicationModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Users, Briefcase } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  job_type: string;
  description: string;
  requirements: string;
  salary_range: string;
  application_deadline: string;
  is_active: boolean;
}

const Careers = () => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const { data, error } = await supabase
        .from('careers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCareers(data || []);
    } catch (error) {
      console.error('Error fetching careers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyClick = (career: Career) => {
    setSelectedCareer(career);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Be part of Nepal's leading travel company and help create unforgettable experiences 
              for travelers from around the world.
            </p>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Why Work With Us?</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <Card className="text-center">
                <CardHeader>
                  <Users className="h-12 w-12 mx-auto text-primary mb-4" />
                  <CardTitle>Great Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Work with passionate professionals in the travel industry</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Briefcase className="h-12 w-12 mx-auto text-primary mb-4" />
                  <CardTitle>Career Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Opportunities for professional development and advancement</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <MapPin className="h-12 w-12 mx-auto text-primary mb-4" />
                  <CardTitle>Travel Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Discounted travel packages and familiarization trips</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Clock className="h-12 w-12 mx-auto text-primary mb-4" />
                  <CardTitle>Work-Life Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Flexible working arrangements and comprehensive benefits</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Current Openings */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Current Openings</h2>
            
            {loading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4">Loading job openings...</p>
              </div>
            ) : careers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No job openings available at the moment.</p>
                <p className="text-muted-foreground">Please check back later or contact us directly.</p>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-6">
                {careers.map((career) => (
                  <Card key={career.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-semibold mb-2">{career.title}</h3>
                          <div className="flex items-center space-x-4 text-muted-foreground">
                            <span className="flex items-center">
                              <Briefcase className="h-4 w-4 mr-1" />
                              {career.department}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {career.location}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {career.job_type}
                            </span>
                          </div>
                        </div>
                        <Button onClick={() => handleApplyClick(career)}>
                          Apply Now
                        </Button>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{career.description}</p>
                      
                      {career.salary_range && (
                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>Salary Range:</strong> {career.salary_range}
                        </p>
                      )}
                      
                      {career.application_deadline && (
                        <p className="text-sm text-muted-foreground mb-4">
                          <strong>Application Deadline:</strong> {new Date(career.application_deadline).toLocaleDateString()}
                        </p>
                      )}
                      
                      <div>
                        <h4 className="font-semibold mb-2">Requirements:</h4>
                        <div className="text-muted-foreground">
                          {career.requirements.split('\n').map((req, index) => (
                            <p key={index} className="mb-1">• {req}</p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      
      <Footer />
      
      <CareerApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        career={selectedCareer}
      />
    </div>
  );
};

export default Careers;
