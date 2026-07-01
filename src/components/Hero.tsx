/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { CareType } from "../types";

interface HeroProps {
  onSearchSubmit: (query: string) => void;
  onSelectCategory: (category: CareType | 'all') => void;
  setActiveTab: (tab: string) => void;
}

export default function Hero({ onSearchSubmit, onSelectCategory, setActiveTab }: HeroProps) {
  const [searchVal, setSearchVal] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      onSearchSubmit(searchVal);
    } else {
      onSelectCategory("all");
    }
    setActiveTab("search");
  };

  const sampleSearches = [
    { label: "Assisted Living", value: "Assisted Living" as CareType },
    { label: "Memory Care", value: "Memory Care" as CareType },
    { label: "Independent Living", value: "Independent Living" as CareType }
  ];

  return (
    <section id="gc-hero" className="relative overflow-hidden bg-[#FAF6EE] pt-8 pb-16 md:py-24">
      {/* Absolute Decorative Blobs to mirror the design */}
      <div className="absolute -top-12 -left-16 w-64 h-64 bg-[#E3ECE1] rounded-full blur-2xl opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#E7DFD4]/50 rounded-[40%_60%_30%_70%] blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Search */}
          <div className="md:col-span-7 flex flex-col justify-center text-left">
            <span className="text-xs font-mono font-bold tracking-widest text-[#6D7A56] uppercase mb-4 block">
              ✦ Vetted Senior Living Network
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2D3325] leading-[1.1] mb-6">
              Brilliant Simplicity.<br />
              <span className="text-[#5A6844]">Find Your Perfect Senior Care.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#5C6450] max-w-xl mb-8 leading-relaxed">
              Personalized guidance for families, simplified search for communities. Discover care options near you that are fully background-checked and premium-vetted.
            </p>

            {/* Floating Search Container */}
            <form 
              id="hero-search-form"
              onSubmit={handleSubmit}
              className="w-full max-w-lg bg-[#FAF6EE] sm:bg-white rounded-2xl sm:rounded-full p-2 border border-[#E7DFD4] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col sm:flex-row gap-2"
            >
              <div className="flex-1 flex items-center gap-3 px-4 py-2 sm:py-0">
                <Search className="w-5 h-5 text-[#6D7A56] shrink-0" />
                <input
                  id="hero-search-input"
                  type="text"
                  placeholder="Search Service Type (e.g., Assisted Living)"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="w-full bg-transparent text-[#2D3325] text-sm focus:outline-none placeholder-[#8F9884]"
                />
              </div>
              <button
                id="btn-hero-search"
                type="submit"
                className="bg-[#5A6844] text-[#FAF6EE] text-sm font-semibold px-8 py-3.5 rounded-xl sm:rounded-full hover:bg-[#485435] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
              >
                Search
              </button>
            </form>

            {/* Quick tags */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-mono text-[#8F9884]">Popular:</span>
              {sampleSearches.map((search) => (
                <button
                  key={search.label}
                  id={`tag-${search.value.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => {
                    onSelectCategory(search.value);
                    setActiveTab("search");
                  }}
                  className="text-xs font-medium text-[#5C6450] bg-[#6D7A56]/10 px-3 py-1.5 rounded-full hover:bg-[#6D7A56]/20 transition-all cursor-pointer"
                >
                  {search.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Custom Image Mask */}
          <div className="md:col-span-5 flex justify-center relative">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-full md:aspect-square max-w-[420px]">
              
              {/* Back Soft Blob Frame */}
              <div className="absolute inset-0 bg-[#E3ECE1] rounded-[60%_40%_50%_50%_/_45%_55%_45%_55%] scale-105 rotate-6 animate-pulse" />
              
              {/* Image Frame with Precise Mask matching mockup */}
              <div className="absolute inset-2 bg-[#FAF6EE] rounded-[41%_59%_43%_57%_/_54%_45%_55%_46%] overflow-hidden shadow-lg border-2 border-[#FAF6EE]">
                <img
                  id="hero-img-seniors"
                  src="https://images.unsplash.com/photo-1566241477600-ac026ad43874?auto=format&fit=crop&w=800&q=80"
                  alt="Senior couple gardening together in a beautiful sunlit backyard"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Decorative circle tag */}
              <div className="absolute -bottom-4 -left-4 bg-[#FAF6EE] p-3 rounded-2xl shadow-md border border-[#E7DFD4]/60 flex items-center gap-2 max-w-[150px]">
                <div className="w-8 h-8 rounded-full bg-[#E3ECE1] flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[#5A6844]" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-mono font-bold text-[#8F9884] uppercase tracking-wider">Located</p>
                  <p className="text-xs font-semibold text-[#2D3325]">SF & Oakland</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
