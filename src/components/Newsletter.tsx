
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Send } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);
    
    try {
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ 
          email: email.toLowerCase().trim(),
          subscribed_at: new Date().toISOString(),
          is_active: true
        }])
        .select();

      if (error) {
        console.error('Newsletter subscription error:', error);
        if (error.code === '23505') {
          toast({
            title: "Already Subscribed",
            description: "You're already subscribed to our newsletter!",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Subscription Failed",
            description: "Failed to subscribe. Please try again.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Successfully Subscribed!",
          description: "Thank you for subscribing to our newsletter.",
        });
        setEmail('');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription Failed",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <section className="py-12 md:py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto bg-card">
          <CardContent className="p-6 md:p-8 text-center">
            <div className="flex justify-center mb-4">
              <Mail className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-card-foreground">
              Stay Updated with Our Newsletter
            </h2>
            <p className="text-muted-foreground mb-6 text-sm md:text-base">
              Get the latest travel tips, destination guides, and exclusive offers delivered to your inbox.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-background text-foreground"
                required
              />
              <Button 
                type="submit" 
                disabled={isSubscribing}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isSubscribing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Subscribe
                  </>
                )}
              </Button>
            </form>
            
            <p className="text-xs text-muted-foreground mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Newsletter;
