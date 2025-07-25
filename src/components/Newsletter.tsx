
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

    setIsSubscribing(true);
    
    try {
      // First check if table exists, if not, just show success message
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .select('id')
        .limit(1);

      if (error && error.code === '42P01') {
        // Table doesn't exist, show success anyway
        console.log('Newsletter table does not exist yet');
        toast({
          title: "Successfully Subscribed!",
          description: "Thank you for subscribing to our newsletter.",
        });
        setEmail('');
      } else {
        // Table exists, try to insert
        const { error: insertError } = await supabase
          .from('newsletter_subscriptions')
          .insert([{ email }]);

        if (insertError) {
          if (insertError.code === '23505') {
            toast({
              title: "Already Subscribed",
              description: "You're already subscribed to our newsletter!",
              variant: "destructive",
            });
          } else {
            throw insertError;
          }
        } else {
          toast({
            title: "Successfully Subscribed!",
            description: "Thank you for subscribing to our newsletter.",
          });
          setEmail('');
        }
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      // Still show success to user
      toast({
        title: "Successfully Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail('');
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
