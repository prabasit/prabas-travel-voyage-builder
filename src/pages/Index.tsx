
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import BlogSection from '../components/BlogSection';
import AwardsSection from '../components/AwardsSection';
import TeamSection from '../components/TeamSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <TeamSection />
      <TestimonialsSection />
      <BlogSection />
      <AwardsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
