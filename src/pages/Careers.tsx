
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CareerApplicationModal from '../components/CareerApplicationModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Briefcase, Calendar } from 'lucide-react';
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
      
      <div className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Join Our Team</h1>
            <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto">
              Be part of Nepal's leading travel company and help create unforgettable experiences 
              for travelers from around the world.
            </p>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-foreground">Why Work With Us?</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
              <Card className="text-center bg-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Users className="h-10 w-10 md:h-12 md:w-12 mx-auto text-primary mb-4" />
                  <CardTitle className="text-card-foreground">Great Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm md:text-base">Work with passionate professionals in the travel industry</p>
                </CardContent>
              </Card>

              <Card className="text-center bg-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Briefcase className="h-10 w-10 md:h-12 md:w-12 mx-auto text-primary mb-4" />
                  <CardTitle className="text-card-foreground">Career Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm md:text-base">Opportunities for professional development and advancement</p>
                </CardContent>
              </Card>

              <Card className="text-center bg-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <MapPin className="h-10 w-10 md:h-12 md:w-12 mx-auto text-primary mb-4" />
                  <CardTitle className="text-card-foreground">Travel Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm md:text-base">Discounted travel packages and familiarization trips</p>
                </CardContent>
              </Card>

              <Card className="text-center bg-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Clock className="h-10 w-10 md:h-12 md:w-12 mx-auto text-primary mb-4" />
                  <CardTitle className="text-card-foreground">Work-Life Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm md:text-base">Flexible working arrangements and comprehensive benefits</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Current Openings */}
        <section className="py-12 md:py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-foreground">Current Openings</h2>
            
            {loading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Loading job openings...</p>
              </div>
            ) : careers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No job openings available at the moment.</p>
                <p className="text-muted-foreground">Please check back later or contact us directly.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {careers.map((career) => (
                  <Card key={career.id} className="bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-2 text-card-foreground">{career.title}</h3>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-2 text-primary" />
                            {career.department}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-primary" />
                            {career.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-primary" />
                            {career.job_type}
                          </div>
                          {career.application_deadline && (
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-primary" />
                              Deadline: {new Date(career.application_deadline).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {career.salary_range && (
                        <Badge variant="secondary" className="mb-4">
                          {career.salary_range}
                        </Badge>
                      )}
                      
                      <Button 
                        onClick={() => handleApplyClick(career)}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        Apply Now
                      </Button>
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
