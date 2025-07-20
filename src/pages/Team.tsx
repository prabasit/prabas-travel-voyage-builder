
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TeamSection from '../components/TeamSection';

const Team = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24">
        <TeamSection />
      </div>
      <Footer />
    </div>
  );
};

export default Team;
