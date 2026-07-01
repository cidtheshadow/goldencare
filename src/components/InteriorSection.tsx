/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Compass, Star, Calendar } from "lucide-react";

interface InteriorSectionProps {
  onExploreClick: () => void;
}

export default function InteriorSection({ onExploreClick }: InteriorSectionProps) {
  const steps = [
    {
      icon: <Compass className="w-5 h-5 text-[#5A6844]" />,
      title: "Filter by Care",
      desc: "Instantly compare Assisted Living, Memory Care, or Independent options."
    },
    {
      icon: <Star className="w-5 h-5 text-[#5A6844]" />,
      title: "Verified Reviews",
      desc: "Read first-hand accounts from residents and families."
    },
    {
      icon: <Calendar className="w-5 h-5 text-[#5A6844]" />,
      title: "Book Live Tours",
      desc: "Secure site tours with one click on our integrated calendar."
    }
  ];

  return (
    <section id="gc-interior" className="bg-[#FAF6EE] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          {/* Image Left (Arch Shaped) */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-80 h-96 sm:w-96 sm:h-[450px] md:w-full max-w-[380px]">
              
              {/* Thin beige background container */}
              <div className="absolute inset-0 bg-[#E7DFD4] rounded-t-full rounded-b-3xl scale-102" />
              
              {/* Arch Mask for Image */}
              <div className="absolute inset-2 bg-[#FAF6EE] rounded-t-full rounded-b-2xl overflow-hidden shadow-lg">
                <img
                  id="interior-img-community"
                  src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80"
                  alt="Sunny high-end senior dining area matching visual mockup"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-500"
                />
              </div>

            </div>
          </div>

          {/* Text Right */}
          <div className="md:col-span-7 text-left flex flex-col justify-center">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2D3325] leading-tight mb-6">
              Discover Brilliant<br />
              <span className="text-[#5A6844]">Simplicity in Care.</span>
            </h2>
            
            <p className="text-base sm:text-lg text-[#5C6450] mb-8 leading-relaxed">
              Our platform makes finding the right senior care home completely effortless. Browse comprehensive profiles, compare pricing structures transparently, and verify licensing compliance.
            </p>

            <div className="space-y-6 mb-8">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-[#6D7A56]/10 flex items-center justify-center shrink-0 mt-0.5">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#2D3325]">{step.title}</h4>
                    <p className="text-xs sm:text-sm text-[#5C6450] mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <button
                id="btn-explore-communities"
                onClick={onExploreClick}
                className="bg-[#5A6844] text-[#FAF6EE] text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-[#485435] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                Explore Communities
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
