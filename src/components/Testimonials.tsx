import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      quote: "Maple Staffing Solutions has been our primary workforce provider in the Brampton corridor for years. During peak seasonal cycles, their dispatch team provided reliable, certified forklift drivers within 24 hours. The communication has been exemplary.",
      name: "Mark Henderson",
      designation: "Logistics Operations Director",
      company: "GTA Distribution & Cold Storage",
      location: "Brampton, ON"
    },
    {
      id: 2,
      quote: "As an employer with strict ISO compliance and health & safety standards, finding dependable machine operators can be daunting. Maple pre-screens and ensures every candidate arrives equipped with WHMIS training and CSA safety boots.",
      name: "Priya Sharma",
      designation: "Senior Plant Human Resources Manager",
      company: "Apex Precision Components",
      location: "Mississauga, ON"
    },
    {
      id: 3,
      quote: "I arrived in Ontario looking for full-time work in warehousing. The Maple Staffing team treated me with respect, evaluated my Raymond Reach certification, and placed me on a steady morning shift that became a permanent direct-hire position.",
      name: "David O'Connor",
      designation: "Inventory Lead (Former Candidate Placement)",
      company: "Commercial Logistics Hub",
      location: "Toronto, ON"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-20 sm:py-24 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <div className="text-xs font-bold text-[#159B78] uppercase tracking-wider">
            Verified Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
            Trusted by Employers & Candidates
          </h2>
          <p className="text-base text-slate-600">
            Real feedback from partners and professionals across the Greater Toronto Area.
          </p>
        </div>

        {/* Testimonial Presentation Card */}
        <div className="max-w-4xl mx-auto bg-[#F6F8F7] border border-slate-200/80 rounded-3xl p-8 sm:p-12 relative shadow-xs">
          <Quote className="w-12 h-12 text-[#159B78]/25 mb-4" />
          
          <div className="flex items-center gap-1 text-amber-400 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>

          <p className="text-base sm:text-xl text-[#10243A] font-medium leading-relaxed mb-8 italic">
            “{current.quote}”
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-200/80 pt-6">
            <div>
              <div className="font-bold text-base text-[#10243A]">{current.name}</div>
              <div className="text-xs sm:text-sm text-slate-600">{current.designation}</div>
              <div className="text-xs text-[#159B78] font-medium mt-0.5">{current.company} · {current.location}</div>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="text-xs font-mono text-slate-500 px-2">
                {currentIndex + 1} / {testimonials.length}
              </div>

              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
