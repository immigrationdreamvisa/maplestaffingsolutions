import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, Star, Sparkles } from 'lucide-react';

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
    <section className="py-20 sm:py-28 bg-[#F5EBD0]/35 border-t border-[#F5EBD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14 space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5EBD0] text-xs font-bold text-[#590907] uppercase tracking-widest border border-[#A5A79B]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#7F011F]" />
            <span>Verified Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#590907] tracking-tight font-heading">
            Trusted by Employers & Candidates
          </h2>
          <p className="text-base sm:text-lg text-[#590907]/80 font-body">
            Real feedback from partners and professionals across the Greater Toronto Area and national markets.
          </p>
        </motion.div>

        {/* Testimonial Presentation Card in Wine Red & Sand theme */}
        <div className="max-w-4xl mx-auto bg-[#F3F3E7] border border-[#F5EBD0] rounded-3xl p-8 sm:p-14 relative shadow-[0_12px_36px_rgba(89,9,7,0.08)]">
          
          {/* Quotation Mark */}
          <div className="w-14 h-14 rounded-2xl bg-[#F5EBD0] flex items-center justify-center mb-6">
            <Quote className="w-8 h-8 text-[#7F011F]" />
          </div>
          
          <div className="flex items-center gap-1 text-amber-500 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-500" />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-lg sm:text-2xl text-[#590907] font-medium leading-relaxed mb-8 italic font-heading">
                “{current.quote}”
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#F5EBD0] pt-6">
                <div>
                  <div className="font-extrabold text-lg text-[#590907] font-heading">{current.name}</div>
                  <div className="text-sm text-[#7F011F] font-semibold">{current.designation}</div>
                  <div className="text-xs text-[#590907]/70 font-medium mt-0.5">{current.company} · {current.location}</div>
                </div>

                {/* Slider Controls */}
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={prevSlide}
                    className="w-11 h-11 rounded-full border border-[#F5EBD0] bg-white hover:bg-[#7F011F] hover:text-white text-[#590907] flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>

                  <div className="text-xs font-mono font-bold text-[#590907] px-2">
                    {currentIndex + 1} / {testimonials.length}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={nextSlide}
                    className="w-11 h-11 rounded-full border border-[#F5EBD0] bg-white hover:bg-[#7F011F] hover:text-white text-[#590907] flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
