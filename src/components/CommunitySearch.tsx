/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from "react";
import { Search, MapPin, DollarSign, Award, Star, ListFilter, ClipboardCheck, ArrowLeft, Phone, CalendarCheck } from "lucide-react";
import { Community, CareType } from "../types";
import { communitiesData } from "../data/communities";

interface CommunitySearchProps {
  initialCategory: CareType | 'all';
  onBookTour: (community: Community) => void;
}

export default function CommunitySearch({ initialCategory, onBookTour }: CommunitySearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CareType | "all">(initialCategory);
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(6000);
  const [activeDetailId, setActiveDetailId] = useState<string | null>(null);

  // Set selected category when prop changes
  useMemo(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const cities = useMemo(() => {
    const list = new Set(communitiesData.map((c) => c.city));
    return ["all", ...Array.from(list)];
  }, []);

  // Filter Communities
  const filteredCommunities = useMemo(() => {
    return communitiesData.filter((c) => {
      // Search text match
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        c.name.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.amenities.some(a => a.toLowerCase().includes(query)) ||
        c.features.some(f => f.toLowerCase().includes(query));

      // Care type match
      const matchesCategory = 
        selectedCategory === "all" || 
        c.careTypes.includes(selectedCategory as CareType);

      // City match
      const matchesCity = 
        selectedCity === "all" || 
        c.city === selectedCity;

      // Price match
      const matchesPrice = c.startingPrice <= maxPrice;

      return matchesSearch && matchesCategory && matchesCity && matchesPrice;
    });
  }, [searchQuery, selectedCategory, selectedCity, maxPrice]);

  const activeDetailCommunity = useMemo(() => {
    return communitiesData.find((c) => c.id === activeDetailId) || null;
  }, [activeDetailId]);

  return (
    <div id="gc-search-module" className="bg-[#FAF6EE] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {activeDetailCommunity ? (
          /* ================= DETAIL VIEW ================= */
          <div id="community-detail-panel" className="bg-white rounded-[2.5rem] shadow-xl border border-[#E7DFD4] overflow-hidden text-left animate-scale-up">
            
            {/* Detail Header / Back button */}
            <div className="px-6 py-5 bg-[#E3ECE1]/40 border-b border-[#E7DFD4]/50 flex items-center justify-between">
              <button
                onClick={() => setActiveDetailId(null)}
                className="flex items-center gap-2 text-sm font-semibold text-[#5A6844] hover:text-[#2D3325] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Search results
              </button>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#6D7A56] uppercase tracking-wider">
                <Award className="w-4 h-4 fill-[#6D7A56]/10" /> 100% Background Checked & Vetted
              </div>
            </div>

            <div className="grid md:grid-cols-12 gap-0">
              {/* Photo */}
              <div className="md:col-span-5 h-[320px] md:h-full relative min-h-[350px]">
                <img
                  src={activeDetailCommunity.imageUrl}
                  alt={activeDetailCommunity.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#FAF6EE]/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-mono font-bold text-[#6D7A56] border border-[#E7DFD4]">
                  SF & Bay Area Network
                </div>
              </div>

              {/* Info text */}
              <div className="md:col-span-7 p-8 md:p-12 space-y-6">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {activeDetailCommunity.careTypes.map((type) => (
                      <span key={type} className="text-[10px] font-mono font-bold bg-[#6D7A56]/10 text-[#6D7A56] px-2.5 py-1 rounded-full uppercase tracking-wide">
                        {type}
                      </span>
                    ))}
                  </div>
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D3325]">
                    {activeDetailCommunity.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[#5C6450]">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#6D7A56] shrink-0" />
                      <span>{activeDetailCommunity.address}, {activeDetailCommunity.city}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[#5A6844] text-[#5A6844]" />
                      <span className="font-semibold text-[#2D3325]">{activeDetailCommunity.rating}</span>
                      <span>({activeDetailCommunity.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-b border-[#E7DFD4]/50 py-5 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-mono font-bold text-[#8F9884] uppercase tracking-wider">Starting Price</p>
                    <p className="text-xl font-bold text-[#5A6844] mt-1">${activeDetailCommunity.startingPrice} <span className="text-xs font-normal text-[#5C6450]">/mo</span></p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono font-bold text-[#8F9884] uppercase tracking-wider">License Status</p>
                    <p className="text-sm font-semibold text-[#2D3325] mt-1 flex items-center gap-1">
                      <ClipboardCheck className="w-4 h-4 text-emerald-600 inline shrink-0" /> Fully Compliant
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-bold text-[#2D3325]">About Community</h3>
                  <p className="text-sm text-[#5C6450] leading-relaxed">
                    {activeDetailCommunity.description}
                  </p>
                </div>

                {/* Amenities & Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div>
                    <h4 className="text-xs font-mono font-bold text-[#6D7A56] uppercase tracking-wider mb-3">
                      Premium Amenities
                    </h4>
                    <ul className="space-y-2">
                      {activeDetailCommunity.amenities.map((item) => (
                        <li key={item} className="text-xs sm:text-sm text-[#2D3325] flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#6D7A56] rounded-full shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-[#6D7A56] uppercase tracking-wider mb-3">
                      Clinical Vetting & Care
                    </h4>
                    <ul className="space-y-2">
                      {activeDetailCommunity.features.map((item) => (
                        <li key={item} className="text-xs sm:text-sm text-[#2D3325] flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#5A6844] rounded-full shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-6 border-t border-[#E7DFD4]/50 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`tel:${activeDetailCommunity.phone}`}
                    className="flex-1 border border-[#E7DFD4] text-[#5C6450] py-3.5 rounded-xl text-sm font-semibold hover:bg-[#FAF6EE] transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-[#6D7A56]" /> Call Front Desk
                  </a>
                  <button
                    onClick={() => onBookTour(activeDetailCommunity)}
                    className="flex-1 bg-[#5A6844] text-[#FAF6EE] py-3.5 rounded-xl text-sm font-semibold hover:bg-[#485435] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <CalendarCheck className="w-4 h-4" /> Book Tour with Calendar
                  </button>
                </div>

              </div>
            </div>

          </div>
        ) : (
          /* ================= MAIN SEARCH VIEW ================= */
          <div className="space-y-8 text-left">
            
            {/* Filter Panel Heading */}
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D3325] tracking-tight">
                Vetted Senior Communities
              </h2>
              <p className="text-sm text-[#5C6450] mt-1.5">
                Every listed home has passed our background checks, credential audits, and on-site health compliance checks.
              </p>
            </div>

            {/* Comprehensive Filter Controls */}
            <div id="filter-controls-container" className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E7DFD4] shadow-xs space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                
                {/* Text search */}
                <div className="md:col-span-4 relative">
                  <Search className="absolute left-3 w-4 h-4 text-[#6D7A56] top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="search-input-box"
                    type="text"
                    placeholder="Search by keywords, amenities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#FAF6EE] border border-[#E7DFD4] rounded-full pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#2D3325] focus:outline-none focus:border-[#6D7A56]"
                  />
                </div>

                {/* Care Type Select */}
                <div className="md:col-span-3 flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#6D7A56] shrink-0">Care:</span>
                  <select
                    id="filter-select-care"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as CareType | 'all')}
                    className="w-full bg-[#FAF6EE] border border-[#E7DFD4] rounded-full px-4 py-2.5 text-xs sm:text-sm text-[#2D3325] focus:outline-none focus:border-[#6D7A56] cursor-pointer"
                  >
                    <option value="all">All Service Types</option>
                    <option value="Assisted Living">Assisted Living</option>
                    <option value="Memory Care">Memory Care</option>
                    <option value="Independent Living">Independent Living</option>
                  </select>
                </div>

                {/* City Select */}
                <div className="md:col-span-2.5 flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#6D7A56] shrink-0">City:</span>
                  <select
                    id="filter-select-city"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-[#FAF6EE] border border-[#E7DFD4] rounded-full px-4 py-2.5 text-xs sm:text-sm text-[#2D3325] focus:outline-none focus:border-[#6D7A56] cursor-pointer"
                  >
                    <option value="all">All Cities</option>
                    {cities.filter(c => c !== "all").map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Max Price Slider */}
                <div className="md:col-span-2.5 flex flex-col gap-1 px-2">
                  <div className="flex justify-between text-[11px] font-mono font-bold text-[#6D7A56] uppercase">
                    <span>Max Budget</span>
                    <span>${maxPrice}/mo</span>
                  </div>
                  <input
                    id="filter-price-range"
                    type="range"
                    min="3000"
                    max="6000"
                    step="100"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full accent-[#5A6844] cursor-pointer h-1.5 bg-[#E7DFD4] rounded-lg"
                  />
                </div>

              </div>

              {/* Categories fast-filter pills */}
              <div className="pt-3 border-t border-[#E7DFD4]/50 flex flex-wrap gap-2 items-center">
                <span className="text-xs font-mono font-bold text-[#8F9884] uppercase tracking-wider mr-2">Quick Care Filter:</span>
                {[
                  { label: "All Communities", value: "all" },
                  { label: "Assisted Living", value: "Assisted Living" },
                  { label: "Memory Care", value: "Memory Care" },
                  { label: "Independent Living", value: "Independent Living" }
                ].map((pill) => (
                  <button
                    key={pill.value}
                    onClick={() => setSelectedCategory(pill.value as CareType | 'all')}
                    className={`text-xs px-4 py-2 rounded-full font-medium transition-all cursor-pointer ${
                      selectedCategory === pill.value
                        ? "bg-[#6D7A56] text-[#FAF6EE] shadow-sm"
                        : "bg-[#FAF6EE] text-[#5C6450] hover:bg-[#6D7A56]/10 border border-[#E7DFD4]"
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>

            </div>

            {/* Results Grid */}
            <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                <p className="text-xs font-mono text-[#8F9884] uppercase tracking-widest font-semibold">
                  Found {filteredCommunities.length} Vetted Partners
                </p>
                {filteredCommunities.length === 0 && (
                  <button 
                    onClick={() => { setSearchQuery(""); setSelectedCategory("all"); setSelectedCity("all"); setMaxPrice(6000); }}
                    className="text-xs text-[#6D7A56] underline font-semibold cursor-pointer"
                  >
                    Reset all filters
                  </button>
                )}
              </div>

              {filteredCommunities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {filteredCommunities.map((c) => (
                    <div
                      key={c.id}
                      id={c.id}
                      className="bg-white rounded-[2rem] overflow-hidden border border-[#E7DFD4] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group hover:-translate-y-1"
                    >
                      {/* Photo card top */}
                      <div className="relative h-56 overflow-hidden bg-gray-100">
                        <img
                          src={c.imageUrl}
                          alt={c.name}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
                          {c.careTypes.map((type) => (
                            <span key={type} className="text-[9px] font-mono font-bold bg-[#FAF6EE]/95 backdrop-blur text-[#6D7A56] px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#E7DFD4]/50">
                              {type}
                            </span>
                          ))}
                        </div>
                        <div className="absolute bottom-3.5 right-3.5 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-[#2D3325] flex items-center gap-1 border border-[#E7DFD4]/40">
                          <Star className="w-3.5 h-3.5 fill-[#5A6844] text-[#5A6844]" />
                          <span>{c.rating}</span>
                        </div>
                      </div>

                      {/* Content bottom */}
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="font-serif text-xl font-bold text-[#2D3325] tracking-tight group-hover:text-[#6D7A56] transition-colors leading-tight">
                              {c.name}
                            </h3>
                            <div className="text-right shrink-0">
                              <span className="text-[9px] font-mono font-bold text-[#8F9884] uppercase tracking-wider block">From</span>
                              <span className="text-base font-bold text-[#5A6844]">${c.startingPrice}<span className="text-[10px] font-normal text-[#5C6450]">/mo</span></span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1.5 text-xs text-[#5C6450]">
                            <MapPin className="w-3.5 h-3.5 text-[#6D7A56] shrink-0" />
                            <span>{c.address}, {c.city}</span>
                          </div>

                          <p className="text-xs text-[#5C6450] leading-relaxed line-clamp-2 pt-1">
                            {c.description}
                          </p>
                        </div>

                        {/* High Vetted List */}
                        <div className="border-t border-[#E7DFD4]/40 pt-4 flex flex-wrap gap-1.5">
                          {c.amenities.slice(0, 3).map((a) => (
                            <span key={a} className="text-[10px] bg-[#E3ECE1]/40 text-[#5C6450] px-2.5 py-1 rounded-lg">
                              • {a}
                            </span>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="pt-2 grid grid-cols-2 gap-2.5">
                          <button
                            onClick={() => setActiveDetailId(c.id)}
                            className="border border-[#E7DFD4] text-[#5C6450] py-2.5 rounded-xl text-xs font-semibold hover:bg-[#FAF6EE] transition-all cursor-pointer"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => onBookTour(c)}
                            className="bg-[#5A6844] text-[#FAF6EE] py-2.5 rounded-xl text-xs font-semibold hover:bg-[#485435] transition-all cursor-pointer shadow-xs text-center"
                          >
                            Book a Tour
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                /* Empty state */
                <div className="bg-white border border-[#E7DFD4] rounded-3xl p-12 text-center max-w-md mx-auto space-y-4">
                  <Award className="w-12 h-12 text-[#8F9884] mx-auto opacity-55" />
                  <h3 className="font-serif text-lg font-bold text-[#2D3325]">No communities match criteria</h3>
                  <p className="text-xs text-[#5C6450] leading-relaxed">
                    We currently don't have vetted partner homes matching this exact cost, category, or city combination. Please extend your filters or consult a Care Advisor for offline matching.
                  </p>
                  <button
                    onClick={() => { setSearchQuery(""); setSelectedCategory("all"); setSelectedCity("all"); setMaxPrice(6000); }}
                    className="bg-[#5A6844] text-[#FAF6EE] text-xs font-medium px-4 py-2 rounded-full hover:bg-[#485435] transition-all cursor-pointer"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
