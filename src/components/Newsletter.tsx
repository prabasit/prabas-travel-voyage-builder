
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { validateEmail, sanitizeInput } from '@/utils/security';
import { Send } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    const sanitizedEmail = sanitizeInput(email);
    
    // Validate email
    if (!validateEmail(sanitizedEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if email already exists
      const { data: existingSubscription, error: checkError } = await supabase
        .from('newsletter_subscriptions')
        .select('email')
        .eq('email', sanitizedEmail)
        .eq('is_active', true)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (existingSubscription) {
        toast({
          title: "Already Subscribed",
          description: "This email is already subscribed to our newsletter",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Subscribe to newsletter
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{
          email: sanitizedEmail,
          is_active: true,
          subscribed_at: new Date().toISOString()
        }]);

      if (error) {
        throw error;
      }

      toast({
        title: "Subscribed Successfully!",
        description: "Thank you for subscribing to our newsletter",
      });

      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription Failed",
        description: "Failed to subscribe. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 md:py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Stay Updated with Our Newsletter
          </h2>
          <p className="text-primary-foreground/90 mb-8 text-lg">
            Get the latest travel deals, destination guides, and exclusive offers delivered to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-background text-foreground"
              required
              disabled={isSubmitting}
              maxLength={254}
            />
            <Button 
              type="submit" 
              variant="secondary"
              disabled={isSubmitting}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                  Subscribing...
                </div>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Subscribe
                </>
              )}
            </Button>
          </form>
          
          <p className="text-sm text-primary-foreground/70 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
