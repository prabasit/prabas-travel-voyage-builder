
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import ContactSection from '../components/ContactSection';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ServicesSection />
      <AboutSection />
      <TestimonialsCarousel />
      <ContactSection />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
