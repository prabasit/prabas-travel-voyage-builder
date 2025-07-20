
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TeamSection = () => {
  const teamMembers = [
    {
      name: 'Rajesh Prabas',
      position: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      email: 'rajesh@prabastravel.com',
      phone: '+977-9851234567',
      bio: 'With over 25 years in the travel industry, Rajesh founded Prabas Travels with a vision to showcase Nepal\'s beauty to the world.'
    },
    {
      name: 'Sita Sharma',
      position: 'Operations Manager',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      email: 'sita@prabastravel.com',
      phone: '+977-9851234568',
      bio: 'Sita ensures smooth operations and exceptional customer service for all our travel packages and tours.'
    },
    {
      name: 'Kumar Thapa',
      position: 'Senior Trek Guide',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      email: 'kumar@prabastravel.com',
      phone: '+977-9851234569',
      bio: 'Licensed trekking guide with 15+ years experience leading expeditions to Everest Base Camp and Annapurna Circuit.'
    },
    {
      name: 'Maya Gurung',
      position: 'Cultural Tourism Specialist',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      email: 'maya@prabastravel.com',
      phone: '+977-9851234570',
      bio: 'Expert in Nepal\'s rich cultural heritage, Maya designs authentic cultural experiences and heritage tours.'
    },
    {
      name: 'Pemba Sherpa',
      position: 'Mountain Expedition Leader',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
      email: 'pemba@prabastravel.com',
      phone: '+977-9851234571',
      bio: 'Experienced mountaineer and expedition leader specializing in high-altitude adventures and technical climbs.'
    },
    {
      name: 'Priya Adhikari',
      position: 'Customer Relations Manager',
      image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=300&h=300&fit=crop&crop=face',
      email: 'priya@prabastravel.com',
      phone: '+977-9851234572',
      bio: 'Dedicated to ensuring every client has an exceptional experience from booking to return home.'
    }
  ];

  return (
    <section id="team" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Meet Our Team</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our experienced team of travel professionals, guides, and local experts are passionate 
            about creating unforgettable experiences for every traveler.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="relative mb-6">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-primary font-semibold mb-4">{member.position}</p>
                <p className="text-muted-foreground text-sm mb-6">{member.bio}</p>
                
                <div className="flex justify-center space-x-4">
                  <Button size="sm" variant="outline" className="p-2">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="p-2">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="p-2">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Company Culture */}
        <div className="mt-20 text-center">
          <Card className="max-w-4xl mx-auto p-8 bg-primary/5">
            <CardContent className="space-y-6">
              <h3 className="text-3xl font-bold">Our Culture & Values</h3>
              <p className="text-lg text-muted-foreground">
                At Prabas Travels, we believe in sustainable tourism, cultural preservation, and creating 
                meaningful connections between travelers and local communities. Our team is committed to 
                responsible travel practices that benefit both visitors and the destinations we serve.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">Safety First</div>
                  <p className="text-sm text-muted-foreground">Every expedition prioritizes traveler safety</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">Local Expertise</div>
                  <p className="text-sm text-muted-foreground">Deep knowledge of Nepal's culture and terrain</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">Sustainable Tourism</div>
                  <p className="text-sm text-muted-foreground">Supporting local communities and environment</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
