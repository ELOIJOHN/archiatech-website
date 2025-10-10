import React, { useState } from 'react';
import { Cpu, Zap, Cog, Users, Code, Rocket, CheckCircle, ArrowRight, Menu, Mail, Phone, MapPin, Star, TrendingUp, Shield } from 'lucide-react';
import HeroVideo from "./components/HeroVideo";

// ... (ContactForm component remains unchanged)

export default function ArchiAtechWebsite() {
  const [currentVideoUrl, setCurrentVideoUrl] = useState('/videos/archiatech-hero.mp4');

  const handleVideoChange = (newVideoUrl) => {
    if (newVideoUrl) {
      setCurrentVideoUrl(newVideoUrl);
      // Optional: scroll to the video player
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const services = [
    {
      icon: <Cog className="w-7 h-7" />,
      title: "Support & Déploiement IT",
      description: "Installation, configuration et déploiement de postes de travail.",
      gradient: "from-red-500 to-red-600",
      videoUrl: "/videos/service-it-support.mp4" // Example URL
    },
    {
      icon: <Cpu className="w-7 h-7" />,
      title: "Conseil & Intégration IA",
      description: "Solutions d'intelligence artificielle appliquées à vos processus.",
      gradient: "from-red-600 to-red-700",
      videoUrl: "/videos/service-ia-integration.mp4" // Example URL
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Automatisation Workflows",
      description: "RPA, connecteurs, API pour optimiser vos processus.",
      gradient: "from-red-500 to-red-600",
      videoUrl: "/videos/service-automation.mp4" // Example URL
    },
    // ... add videoUrl for other services
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ... Navigation ... */}
      
      <main>
        {/* Hero Section Premium */}
        <section id="hero" className="pt-32 pb-24 px-6 relative overflow-hidden">
          {/* ... other hero content ... */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* ... left column ... */}
            <div className="flex justify-center md:justify-end">
               {/* The HeroVideo component now receives the video URL from the state */}
               <HeroVideo videoUrl={currentVideoUrl} />
            </div>
          </div>
        </section>

        {/* Services Section Premium */}
        <section id="services" className="py-24 px-6 bg-white">
          {/* ... section title ... */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group relative bg-white p-8 rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => handleVideoChange(service.videoUrl)}
              >
                {/* ... service card content ... */}
                <a className="relative text-red-600 font-semibold flex items-center group-hover:gap-2 transition-all">
                  Voir la démo
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ... Other sections ... */}
      </main>

      {/* ... Footer ... */}
    </div>
  );
}