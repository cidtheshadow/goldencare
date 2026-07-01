/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      id: "test-1",
      quote: "“GoldenCare made the process so easy. Our advisor was a lifesaver.”",
      author: "Priya S.",
      role: "Daughter of resident",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "test-2",
      quote: "“Found the perfect home for Mom. The simplicity is unmatched.”",
      author: "Rahul K.",
      role: "Son of resident",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "test-3",
      quote: "“Peace of mind knowing they are background checked.”",
      author: "Amit D.",
      role: "Guardianship client",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <section id="gc-testimonials" className="bg-[#FAF6EE] py-16 md:py-20 border-t border-[#E7DFD4]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-[#6D7A56] uppercase">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#2D3325] mt-3">
            What Families Are Saying
          </h2>
          <p className="text-sm text-[#5C6450] mt-2">
            Read first-hand stories from families who found relief and guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              id={t.id}
              className="bg-[#E3ECE1]/40 hover:bg-[#E3ECE1]/60 transition-all duration-300 rounded-[2rem] p-8 text-left border border-[#D1E0CE]/25 flex flex-col justify-between hover:shadow-sm"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#5A6844] text-[#5A6844]" />
                  ))}
                </div>
                
                <p className="font-serif text-lg text-[#2D3325] leading-relaxed mb-6 font-medium">
                  {t.quote}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={t.image}
                  alt={t.author}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border border-[#FAF6EE] shadow-sm shrink-0"
                />
                <div>
                  <h4 className="text-sm font-semibold text-[#2D3325]">{t.author}</h4>
                  <p className="text-[11px] text-[#5C6450] font-mono">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
