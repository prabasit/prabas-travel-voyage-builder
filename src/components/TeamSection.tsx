
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Linkedin, Twitter, Facebook } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  email: string;
  phone: string;
  image_url: string;
  social_links: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  is_active: boolean;
  display_order: number;
}

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      
      if (data && data.length > 0) {
        setTeamMembers(data);
      } else {
        // Fallback team members if CMS is empty
        setTeamMembers([
          {
            id: '1',
            name: 'Ram Bahadur Thapa',
            position: 'CEO & Founder',
            bio: 'Passionate about Nepal tourism with over 15 years of experience in the travel industry.',
            email: 'ram@flightsnepal.com',
            phone: '+977-9841234567',
            image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
            social_links: {
              linkedin: 'https://linkedin.com/in/ramthapa',
              twitter: 'https://twitter.com/ramthapa',
              facebook: 'https://facebook.com/ramthapa'
            },
            is_active: true,
            display_order: 1
          },
          {
            id: '2',
            name: 'Sita Sharma',
            position: 'Operations Manager',
            bio: 'Expert in tour operations and customer service with a deep knowledge of Nepal.',
            email: 'sita@flightsnepal.com',
            phone: '+977-9851234567',
            image_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b412?w=300&h=300&fit=crop',
            social_links: {
              linkedin: 'https://linkedin.com/in/sitasharma',
              facebook: 'https://facebook.com/sitasharma'
            },
            is_active: true,
            display_order: 2
          },
          {
            id: '3',
            name: 'Bikash Gurung',
            position: 'Senior Guide',
            bio: 'Professional trekking guide with extensive experience in Himalayan expeditions.',
            email: 'bikash@flightsnepal.com',
            phone: '+977-9861234567',
            image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
            social_links: {
              linkedin: 'https://linkedin.com/in/bikashgurung',
              twitter: 'https://twitter.com/bikashgurung'
            },
            is_active: true,
            display_order: 3
          },
          {
            id: '4',
            name: 'Anjali Rai',
            position: 'Customer Relations',
            bio: 'Dedicated to providing exceptional customer service and travel assistance.',
            email: 'anjali@flightsnepal.com',
            phone: '+977-9871234567',
            image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
            social_links: {
              linkedin: 'https://linkedin.com/in/anjalirai',
              facebook: 'https://facebook.com/anjalirai'
            },
            is_active: true,
            display_order: 4
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <Linkedin className="h-4 w-4" />;
      case 'twitter':
        return <Twitter className="h-4 w-4" />;
      case 'facebook':
        return <Facebook className="h-4 w-4" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <section id="team" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the passionate professionals behind your perfect journey
            </p>
          </div>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Team</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet the passionate professionals behind your perfect journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={member.image_url}
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2">
                    {member.social_links && Object.entries(member.social_links).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                      >
                        {getSocialIcon(platform)}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl">{member.name}</CardTitle>
                <Badge variant="secondary" className="w-fit">{member.position}</Badge>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">{member.bio}</p>
                
                <div className="space-y-2">
                  {member.email && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${member.email}`} className="hover:text-primary transition-colors">
                        {member.email}
                      </a>
                    </div>
                  )}
                  {member.phone && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a href={`tel:${member.phone}`} className="hover:text-primary transition-colors">
                        {member.phone}
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
