
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Users, Briefcase } from 'lucide-react';

const Careers = () => {
  // This will be connected to database once Supabase is integrated
  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Travel Consultant',
      department: 'Sales',
      location: 'Kathmandu',
      type: 'Full-time',
      description: 'We are looking for an experienced travel consultant to join our team...',
      requirements: ['5+ years experience in travel industry', 'Excellent communication skills', 'Knowledge of travel booking systems']
    },
    {
      id: 2,
      title: 'Digital Marketing Specialist',
      department: 'Marketing',
      location: 'Kathmandu',
      type: 'Full-time',
      description: 'Join our marketing team to help promote our travel services...',
      requirements: ['3+ years digital marketing experience', 'SEO/SEM knowledge', 'Social media expertise']
    }
  ];

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
            
            <div className="max-w-4xl mx-auto space-y-6">
              {jobOpenings.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-semibold mb-2">{job.title}</h3>
                        <div className="flex items-center space-x-4 text-muted-foreground">
                          <span className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-1" />
                            {job.department}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {job.type}
                          </span>
                        </div>
                      </div>
                      <Button>Apply Now</Button>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{job.description}</p>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Careers;
