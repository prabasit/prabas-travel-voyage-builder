
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, DollarSign, Calendar, Users } from 'lucide-react';

interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  job_type: string;
  salary_range: string;
  description: string;
  requirements: string;
  benefits: string;
  application_deadline: string;
  is_active: boolean;
  created_at: string;
}

interface CareerJobCardProps {
  career: Career;
  onApply: (career: Career) => void;
}

const CareerJobCard: React.FC<CareerJobCardProps> = ({ career, onApply }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isDeadlinePassed = career.application_deadline && 
    new Date(career.application_deadline) < new Date();

  return (
    <Card className="hover:shadow-lg transition-all duration-300 h-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl font-bold text-primary mb-2">
              {career.title}
            </CardTitle>
            <div className="flex flex-wrap gap-2 mb-3">
              {career.department && (
                <Badge variant="secondary" className="text-xs">
                  <Users className="h-3 w-3 mr-1" />
                  {career.department}
                </Badge>
              )}
              {career.job_type && (
                <Badge variant="outline" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {career.job_type}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
          {career.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-primary" />
              <span>{career.location}</span>
            </div>
          )}
          {career.salary_range && (
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-primary" />
              <span>{career.salary_range}</span>
            </div>
          )}
          {career.application_deadline && (
            <div className="flex items-center sm:col-span-2">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              <span>
                Deadline: {formatDate(career.application_deadline)}
                {isDeadlinePassed && (
                  <Badge variant="destructive" className="ml-2 text-xs">
                    Expired
                  </Badge>
                )}
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {career.description && (
          <div>
            <h4 className="font-semibold mb-2 text-primary">Job Description</h4>
            <div className="text-sm text-muted-foreground prose prose-sm">
              {career.description.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-2 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}
        
        {career.requirements && (
          <div>
            <h4 className="font-semibold mb-2 text-primary">Requirements</h4>
            <div className="text-sm text-muted-foreground">
              {career.requirements.split('\n').map((item, index) => (
                <div key={index} className="mb-1 last:mb-0 flex">
                  <span className="mr-2">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {career.benefits && (
          <div>
            <h4 className="font-semibold mb-2 text-primary">Benefits</h4>
            <div className="text-sm text-muted-foreground">
              {career.benefits.split('\n').map((benefit, index) => (
                <div key={index} className="mb-1 last:mb-0 flex">
                  <span className="mr-2">•</span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="pt-4 border-t">
          <Button 
            onClick={() => onApply(career)}
            className="w-full"
            disabled={isDeadlinePassed}
          >
            {isDeadlinePassed ? 'Application Deadline Passed' : 'Apply Now'}
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground text-center">
          Posted on {formatDate(career.created_at)}
        </p>
      </CardContent>
    </Card>
  );
};

export default CareerJobCard;
