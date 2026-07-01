import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import ServicesGrid from "./components/ServicesGrid";
import HowItWorks from "./components/HowItWorks";
import CaregiverVetting from "./components/CaregiverVetting";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import ConsultationModal from "./components/ConsultationModal";
import Auth from "./components/Auth";

export default function App() {
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleConsultationSubmit = (data: any) => {
    console.log("Consultation Request:", data);
    // In a real app, this would send to Firebase/Backend
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EE] font-sans antialiased">
      
      <Header
        onOpenConsultation={() => setShowConsultationModal(true)}
        onOpenAdvisorChat={() => setShowConsultationModal(true)} // Reusing consultation for now
        onOpenAuth={() => setShowAuthModal(true)}
      />

      <main className="flex-1">
        <Hero onOpenConsultation={() => setShowConsultationModal(true)} />
        <Stats />
        <ServicesGrid />
        <HowItWorks />
        <CaregiverVetting />
        <Testimonials />
        <FAQ />
      </main>

      <Footer
        onSearchCategory={() => {}}
        setActiveTab={() => {}}
        onOpenAdvisorChat={() => setShowConsultationModal(true)}
      />

      {/* Overlays */}
      {showConsultationModal && (
        <ConsultationModal 
          onClose={() => setShowConsultationModal(false)} 
          onSubmit={handleConsultationSubmit}
        />
      )}

      {showAuthModal && (
        <Auth onClose={() => setShowAuthModal(false)} />
      )}

    </div>
  );
}
