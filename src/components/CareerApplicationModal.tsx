
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload } from 'lucide-react';

interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  job_type: string;
  description: string;
  requirements: string;
}

interface CareerApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  career: Career | null;
}

const CareerApplicationModal = ({ isOpen, onClose, career }: CareerApplicationModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cover_letter: '',
    resume_url: ''
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
    if (!career) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('job_applications')
        .insert({
          career_id: career.id,
          applicant_name: formData.name,
          applicant_email: formData.email,
          applicant_phone: formData.phone,
          cover_letter: formData.cover_letter,
          resume_url: formData.resume_url,
          position_title: career.title
        });

      if (error) throw error;

      toast({
        title: "Application Submitted",
        description: "Your application has been submitted successfully. We'll contact you soon!",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        cover_letter: '',
        resume_url: ''
      });
      onClose();
    } catch (error) {
      console.error('Application submission error:', error);
      toast({
        title: "Submission Failed",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!career) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for {career.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Job Details */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{career.title}</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
              <span><strong>Department:</strong> {career.department}</span>
              <span><strong>Location:</strong> {career.location}</span>
              <span><strong>Type:</strong> {career.job_type}</span>
            </div>
            <p className="text-sm mb-3">{career.description}</p>
            <div>
              <strong className="text-sm">Requirements:</strong>
              <p className="text-sm text-muted-foreground">{career.requirements}</p>
            </div>
          </div>

          {/* Application Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="cover_letter">Cover Letter *</Label>
              <Textarea
                id="cover_letter"
                name="cover_letter"
                value={formData.cover_letter}
                onChange={handleInputChange}
                placeholder="Tell us why you're the perfect fit for this role..."
                className="min-h-[120px]"
                required
              />
            </div>

            <div>
              <Label htmlFor="resume_url">Resume/CV URL</Label>
              <Input
                id="resume_url"
                name="resume_url"
                value={formData.resume_url}
                onChange={handleInputChange}
                placeholder="https://drive.google.com/... or dropbox link"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Please provide a link to your resume (Google Drive, Dropbox, etc.)
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CareerApplicationModal;
