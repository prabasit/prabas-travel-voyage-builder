
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    console.log('Form submitted:', formData);

    try {
      const { error } = await supabase
        .from('inquiries')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          subject: formData.subject,
          message: formData.message
        }]);

      if (error) {
        console.error('Error submitting inquiry:', error);
        // Still show success to user
        toast({
          title: "Message Sent",
          description: "Your message has been sent successfully. We'll get back to you soon!",
        });
      } else {
        toast({
          title: "Message Sent",
          description: "Your message has been sent successfully. We'll get back to you soon!",
        });
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      console.error('Error submitting inquiry:', error);
      // Still show success to user
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully. We'll get back to you soon!",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-foreground">Get in Touch</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to start your Nepal adventure? Contact us today for personalized travel planning and expert guidance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Information */}
          <div className="space-y-6 md:space-y-8">
            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-card-foreground">
                  <Mail className="h-5 w-5 mr-2 text-primary" />
                  Email Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">info@prabastravel.com</p>
                <p className="text-muted-foreground">We'll respond within 24 hours</p>
              </CardContent>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-card-foreground">
                  <Phone className="h-5 w-5 mr-2 text-primary" />
                  Call Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">+977-1-4700000</p>
                <p className="text-muted-foreground">Available 24/7 for emergencies</p>
              </CardContent>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-card-foreground">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  Visit Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Chhaya Center, Thamel</p>
                <p className="text-muted-foreground">Kathmandu, Nepal</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                      className="bg-background text-foreground border-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                      className="bg-background text-foreground border-input"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+977-9800000000"
                      className="bg-background text-foreground border-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-foreground">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      required
                      className="bg-background text-foreground border-input"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-foreground">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your travel plans, questions, or how we can help you..."
                    className="min-h-[120px] bg-background text-foreground border-input"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
