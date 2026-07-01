/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Calendar, Trash2, X, Clock, MapPin, Heart } from "lucide-react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import CareConcierge from "./components/CareConcierge";
import InteriorSection from "./components/InteriorSection";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

import CommunitySearch from "./components/CommunitySearch";
import AdvisorChat from "./components/AdvisorChat";
import BookingModal from "./components/BookingModal";

import { Community, TourBooking, CareType } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home"); // "home" or "search"
  const [searchCategory, setSearchCategory] = useState<CareType | "all">("all");
  const [showAdvisorChat, setShowAdvisorChat] = useState<boolean>(false);
  const [selectedCommunityForTour, setSelectedCommunityForTour] = useState<Community | null>(null);
  const [bookedTours, setBookedTours] = useState<TourBooking[]>([]);
  const [showMyToursModal, setShowMyToursModal] = useState<boolean>(false);

  // Load bookings from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("goldencare_bookings");
      if (stored) {
        setBookedTours(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error loading bookings from localStorage:", e);
    }
  }, []);

  // Save tour booking
  const handleSaveBooking = (booking: TourBooking) => {
    const updated = [...bookedTours, booking];
    setBookedTours(updated);
    try {
      localStorage.setItem("goldencare_bookings", JSON.stringify(updated));
    } catch (e) {
      console.error("Error saving booking to localStorage:", e);
    }
  };

  // Delete scheduled tour
  const handleDeleteTour = (id: string) => {
    const filtered = bookedTours.filter((t) => t.id !== id);
    setBookedTours(filtered);
    try {
      localStorage.setItem("goldencare_bookings", JSON.stringify(filtered));
    } catch (e) {
      console.error("Error removing booking from localStorage:", e);
    }
  };

  const handleSearchSubmit = (query: string) => {
    // Treat search submit as checking all matching
    setSearchCategory("all");
    setActiveTab("search");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectCategory = (category: CareType | "all") => {
    setSearchCategory(category);
    setActiveTab("search");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EE] font-sans antialiased">
      
      {/* Dynamic Header */}
      <Header
        activeTab={activeTab === "home" ? searchCategory : "search"}
        setActiveTab={(tab) => {
          if (tab === "home") {
            setActiveTab("home");
            setSearchCategory("all");
          } else {
            setActiveTab("search");
            setSearchCategory(tab as CareType);
          }
        }}
        onSearchCategory={(cat) => handleSelectCategory(cat)}
        onOpenAdvisorChat={() => setShowAdvisorChat(true)}
      />

      {/* Floating Scheduled Tours Widget */}
      {bookedTours.length > 0 && (
        <button
          id="btn-floating-tours"
          onClick={() => setShowMyToursModal(true)}
          className="fixed bottom-6 left-6 z-40 bg-[#5A6844] hover:bg-[#485435] text-[#FAF6EE] px-4.5 py-3 rounded-full shadow-lg flex items-center gap-2 text-xs font-semibold tracking-wider font-mono cursor-pointer animate-bounce duration-1000"
        >
          <Calendar className="w-4 h-4" />
          <span>My Scheduled Tours ({bookedTours.length})</span>
        </button>
      )}

      {/* Main Assembly */}
      <main className="flex-1">
        {activeTab === "home" ? (
          /* ================= LANDING HOME SCREEN ================= */
          <div id="home-view-container">
            <Hero
              onSearchSubmit={handleSearchSubmit}
              onSelectCategory={handleSelectCategory}
              setActiveTab={setActiveTab}
            />
            <Stats />
            <CareConcierge onOpenAdvisorChat={() => setShowAdvisorChat(true)} />
            <InteriorSection onExploreClick={() => handleSelectCategory("all")} />
            <Testimonials />
          </div>
        ) : (
          /* ================= EXPLORE COMMUNITIES SEARCH SCREEN ================= */
          <div id="search-view-container" className="animate-fade-in">
            <CommunitySearch
              initialCategory={searchCategory}
              onBookTour={(community) => setSelectedCommunityForTour(community)}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSearchCategory={(cat) => handleSelectCategory(cat)}
        setActiveTab={setActiveTab}
        onOpenAdvisorChat={() => setShowAdvisorChat(true)}
      />

      {/* ================= MODALS & OVERLAYS ================= */}

      {/* 1. AI Advisor Chat Sidebar */}
      {showAdvisorChat && (
        <AdvisorChat onClose={() => setShowAdvisorChat(false)} />
      )}

      {/* 2. Tour Booking Scheduler Modal */}
      {selectedCommunityForTour && (
        <BookingModal
          community={selectedCommunityForTour}
          onClose={() => setSelectedCommunityForTour(null)}
          onSaveBooking={handleSaveBooking}
        />
      )}

      {/* 3. "My Scheduled Tours" Management Modal */}
      {showMyToursModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF6EE] rounded-[2rem] shadow-2xl border border-[#E7DFD4] w-full max-w-md overflow-hidden transform animate-scale-up text-left">
            
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#E7DFD4]/50 flex justify-between items-center bg-[#E3ECE1]/30">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#5A6844]" />
                <h3 className="font-serif text-lg font-bold text-[#2D3325]">Scheduled Site Tours</h3>
              </div>
              <button
                onClick={() => setShowMyToursModal(false)}
                className="p-1.5 text-[#5C6450] hover:bg-[#E7DFD4]/50 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="p-6 max-h-[380px] overflow-y-auto space-y-4">
              {bookedTours.map((tour) => (
                <div
                  key={tour.id}
                  id={tour.id}
                  className="bg-white border border-[#E7DFD4] rounded-2xl p-4.5 space-y-3 relative flex justify-between items-start"
                >
                  <div className="space-y-1.5 pr-8">
                    <h4 className="font-serif font-bold text-[#2D3325] leading-tight">
                      {tour.communityName}
                    </h4>
                    
                    <div className="flex items-center gap-2 text-xs text-[#5C6450]">
                      <Clock className="w-3.5 h-3.5 text-[#6D7A56] shrink-0" />
                      <span>{tour.date} at {tour.timeSlot}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#5C6450]">
                      <MapPin className="w-3.5 h-3.5 text-[#6D7A56] shrink-0" />
                      <span className="truncate">Confirming checklist emailed</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteTour(tour.id)}
                    title="Cancel scheduled tour reservation"
                    className="absolute top-4 right-4 p-2 text-[#8F9884] hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer action */}
            <div className="p-6 border-t border-[#E7DFD4]/50 bg-white flex justify-end">
              <button
                onClick={() => setShowMyToursModal(false)}
                className="bg-[#5A6844] text-[#FAF6EE] text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-[#485435] transition-all cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
