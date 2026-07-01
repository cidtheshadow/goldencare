/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Menu, X, Heart, ShieldCheck } from "lucide-react";
import { CareType } from "../types";

interface HeaderProps {
  onSearchCategory: (category: CareType | 'all') => void;
  onOpenAdvisorChat: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({
  onSearchCategory,
  onOpenAdvisorChat,
  activeTab,
  setActiveTab
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Assisted Living", value: "Assisted Living" as CareType },
    { label: "Memory Care", value: "Memory Care" as CareType },
    { label: "Independent Living", value: "Independent Living" as CareType },
  ];

  const handleNavClick = (val: CareType) => {
    setActiveTab(val);
    onSearchCategory(val);
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    setActiveTab("home");
    onSearchCategory("all");
    setMobileMenuOpen(false);
  };

  return (
    <header id="gc-header" className="sticky top-0 z-40 bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#E7DFD4]/55 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div 
            id="gc-logo" 
            className="flex items-center gap-2.5 cursor-pointer select-none group"
            onClick={handleLogoClick}
          >
            <div className="w-10 h-10 rounded-full bg-[#6D7A56] flex items-center justify-center text-[#FAF6EE] shadow-sm group-hover:scale-105 transition-transform duration-300">
              <Heart className="w-5 h-5 fill-[#FAF6EE]/10" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#2D3325]">
                GoldenCare
              </span>
              <div className="flex items-center gap-1 text-[9px] font-mono text-[#6D7A56] uppercase tracking-widest mt-[-2px]">
                <ShieldCheck className="w-2.5 h-2.5" /> 100% Vetted
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav id="gc-desktop-nav" className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                id={`nav-${item.value.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => handleNavClick(item.value)}
                className={`text-sm font-medium tracking-wide transition-colors relative py-2 cursor-pointer ${
                  activeTab === item.value
                    ? "text-[#6D7A56] font-semibold"
                    : "text-[#5C6450] hover:text-[#2D3325]"
                }`}
              >
                {item.label}
                {activeTab === item.value && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6D7A56] rounded-full" />
                )}
              </button>
            ))}
            <button
              id="nav-resources"
              onClick={onOpenAdvisorChat}
              className="text-sm font-medium tracking-wide text-[#5C6450] hover:text-[#2D3325] cursor-pointer"
            >
              Resources
            </button>
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-4">
            <button
              id="btn-nav-advisor"
              onClick={onOpenAdvisorChat}
              className="text-xs font-mono font-medium tracking-wider text-[#6D7A56] border border-[#6D7A56]/30 px-3.5 py-2 rounded-full hover:bg-[#6D7A56]/5 transition-all cursor-pointer"
            >
              Care Advisor (AI)
            </button>
            <button
              id="btn-get-started"
              onClick={() => {
                setActiveTab("search");
                onSearchCategory("all");
              }}
              className="bg-[#5A6844] text-[#FAF6EE] text-sm font-medium px-6 py-2.5 rounded-full hover:bg-[#485435] transition-all duration-300 shadow-sm hover:shadow cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              id="btn-mobile-chat"
              onClick={onOpenAdvisorChat}
              className="p-2 text-[#5C6450] bg-[#6D7A56]/10 rounded-full cursor-pointer"
            >
              <Heart className="w-5 h-5 text-[#6D7A56]" />
            </button>
            <button
              id="btn-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#2D3325] hover:bg-[#E7DFD4]/20 rounded-lg transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="gc-mobile-drawer" className="md:hidden bg-[#F7F4EB] border-b border-[#E7DFD4]/50 animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.value}
                id={`mobile-nav-${item.value.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => handleNavClick(item.value)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  activeTab === item.value
                    ? "bg-[#6D7A56]/10 text-[#6D7A56]"
                    : "text-[#5C6450] hover:bg-[#E7DFD4]/20 hover:text-[#2D3325]"
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              id="mobile-nav-resources"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdvisorChat();
              }}
              className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-[#5C6450] hover:bg-[#E7DFD4]/20 hover:text-[#2D3325]"
            >
              Resources & FAQs
            </button>
            <div className="pt-4 border-t border-[#E7DFD4]/50 flex flex-col gap-3 px-4">
              <button
                id="mobile-btn-advisor"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdvisorChat();
                }}
                className="w-full text-center border border-[#6D7A56]/40 text-[#6D7A56] py-2.5 rounded-full text-sm font-medium bg-[#FAF6EE]"
              >
                Chat with Care Advisor (AI)
              </button>
              <button
                id="mobile-btn-search"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveTab("search");
                  onSearchCategory("all");
                }}
                className="w-full text-center bg-[#5A6844] text-[#FAF6EE] py-3 rounded-full text-sm font-medium shadow-sm"
              >
                Explore Communities
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
