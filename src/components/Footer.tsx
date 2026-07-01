/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Heart, Facebook, Instagram, Linkedin, Youtube, ArrowRight, CheckCircle } from "lucide-react";

interface FooterProps {
  onSearchCategory: (category: any) => void;
  setActiveTab: (tab: string) => void;
  onOpenAdvisorChat: () => void;
}

export default function Footer({ onSearchCategory, setActiveTab, onOpenAdvisorChat }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleCategoryClick = (cat: any) => {
    onSearchCategory(cat);
    setActiveTab("search");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="gc-footer" className="bg-[#E7DFD4]/35 border-t border-[#E7DFD4]/75 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#E7DFD4]/60">
          
          {/* Logo Column */}
          <div className="md:col-span-4 text-left">
            <div className="flex items-center gap-2 mb-4 cursor-pointer" onClick={() => { setActiveTab("home"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <div className="w-8 h-8 rounded-full bg-[#6D7A56] flex items-center justify-center text-[#FAF6EE]">
                <Heart className="w-4 h-4 fill-[#FAF6EE]/15" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-[#2D3325]">
                GoldenCare
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#5C6450] leading-relaxed max-w-sm">
              GoldenCare is a human-centered advisor service designed to guide families through senior living, memory care, and independent housing options with absolute simplicity and care.
            </p>
          </div>

          {/* Quick Links Column 1 */}
          <div className="md:col-span-2 text-left">
            <h4 className="text-xs font-mono font-bold tracking-wider text-[#6D7A56] uppercase mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Assisted Living", value: "Assisted Living" },
                { label: "Memory Care", value: "Memory Care" },
                { label: "Independent Living", value: "Independent Living" }
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleCategoryClick(link.value)}
                    className="text-xs sm:text-sm text-[#5C6450] hover:text-[#2D3325] transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenAdvisorChat}
                  className="text-xs sm:text-sm text-[#5C6450] hover:text-[#2D3325] transition-colors cursor-pointer text-left"
                >
                  Private Care Match
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div className="md:col-span-2 text-left">
            <h4 className="text-xs font-mono font-bold tracking-wider text-[#6D7A56] uppercase mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", tab: "home" },
                { label: "Vetting Standards", tab: "home" },
                { label: "Contact Advisor", click: onOpenAdvisorChat },
                { label: "Careers", tab: "home" }
              ].map((link, idx) => (
                <li key={idx}>
                  {link.click ? (
                    <button
                      onClick={link.click}
                      className="text-xs sm:text-sm text-[#5C6450] hover:text-[#2D3325] transition-colors cursor-pointer text-left"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <button
                      onClick={() => { setActiveTab(link.tab); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="text-xs sm:text-sm text-[#5C6450] hover:text-[#2D3325] transition-colors cursor-pointer text-left"
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column 3 */}
          <div className="md:col-span-2 text-left">
            <h4 className="text-xs font-mono font-bold tracking-wider text-[#6D7A56] uppercase mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {["Care Guides", "Cost Calculator", "Family FAQs", "Planning Checklists"].map((link) => (
                <li key={link}>
                  <button
                    onClick={onOpenAdvisorChat}
                    className="text-xs sm:text-sm text-[#5C6450] hover:text-[#2D3325] transition-colors cursor-pointer text-left"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-2 text-left">
            <h4 className="text-xs font-mono font-bold tracking-wider text-[#6D7A56] uppercase mb-4">
              Newsletter Signup
            </h4>
            
            {subscribed ? (
              <div className="flex items-center gap-1.5 text-[#5A6844] font-medium text-xs py-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Subscribed! Thank you.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex items-center mt-2">
                <input
                  id="footer-email-input"
                  type="email"
                  required
                  placeholder="Type a newsletter..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAF6EE] border border-[#E7DFD4] rounded-full pl-4 pr-10 py-2.5 text-xs text-[#2D3325] placeholder-[#8F9884] focus:outline-none focus:border-[#6D7A56]"
                />
                <button
                  id="btn-footer-subscribe"
                  type="submit"
                  className="absolute right-1.5 top-1.5 w-7.5 h-7.5 bg-[#5A6844] text-[#FAF6EE] rounded-full flex items-center justify-center hover:bg-[#485435] transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Socials and Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs font-mono text-[#8F9884]">
            &copy; {new Date().getFullYear()} GoldenCare Inc. All rights reserved. Vetted senior care matching.
          </p>
          
          <div className="flex gap-4 items-center">
            {[
              { icon: <Facebook className="w-4 h-4" />, url: "#" },
              { icon: <Instagram className="w-4 h-4" />, url: "#" },
              { icon: <Linkedin className="w-4 h-4" />, url: "#" },
              { icon: <Youtube className="w-4 h-4" />, url: "#" }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#FAF6EE] border border-[#E7DFD4] flex items-center justify-center text-[#5C6450] hover:text-[#5A6844] hover:border-[#6D7A56] transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
