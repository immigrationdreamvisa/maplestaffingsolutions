import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Globe, Users, Briefcase, GraduationCap, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface ServicesProps {
  onContactServices: (serviceTitle: string) => void;
  onExploreCareers: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onContactServices, onExploreCareers }) => {
  const [activeServiceModal, setActiveServiceModal] = useState<number | null>(null);

  const services = [
    {
      id: 1,
      title: 'Recruitment Solutions',
      badgeText: 'Candidate Interviews',
      image: '/images/service_recruitment.jpg',
      imageAlt: 'Professional recruitment consultant conducting an interview with a candidate',
      shortDesc: 'Connecting qualified job seekers with reputable Canadian employers through comprehensive one-on-one vetting, background screening, and skill assessments.',
      icon: Globe,
      features: [
        'Structured face-to-face and virtual competency evaluations',
        'Credential validation, references, and background verification',
        'Direct-hire, permanent, and long-term placement matching',
        'Zero candidate fee policy and compliant onboarding'
      ],
      detail: 'Our Recruitment Solutions service matches ambitious job seekers with leading employers across Canada. Every candidate receives personalized attention to assess goals, technical qualifications, and cultural fit before introductions are made.',
    },
    {
      id: 2,
      title: 'Staffing Services',
      badgeText: 'Workforce Teams',
      image: '/images/service_staffing.jpg',
      imageAlt: 'Collaborative team of professional employees working together in a corporate setting',
      shortDesc: 'Furnishing commercial, logistics, and technical organizations with dependable, safety-conscious personnel tailored for peak agility.',
      icon: Users,
      features: [
        'Flexible temporary, temp-to-perm, and direct-hire workforce solutions',
        'Same-day and next-day roster mobilization across the Greater Toronto Area',
        'WSIB workplace insurance coverage and compliance management',
        'Pre-shift safety briefings and workplace orientation'
      ],
      detail: 'From high-capacity distribution centers to corporate operations, our staffing solutions provide reliable, thoroughly screened workers. We manage scheduling, payroll, and compliance so your facilities run smoothly.',
    },
    {
      id: 3,
      title: 'Career Opportunities',
      badgeText: 'Career Guidance',
      image: '/images/service_careers.jpg',
      imageAlt: 'Recruitment advisor consulting with a candidate discovering new career paths',
      shortDesc: 'Guiding candidates with resume coaching, interview preparation, and transparent job pathways across diverse Canadian sectors.',
      icon: GraduationCap,
      features: [
        'Canadian-standard resume optimization and coaching',
        'Interview practice simulations and career advancement guidance',
        'Career progression tracking from entry-level to leadership',
        'Dedicated candidate advocate support throughout placement'
      ],
      detail: 'We believe career development should be accessible and transparent. Our career specialists help applicants build compelling resumes, highlight transferable skills, and step confidently into new opportunities.',
    },
    {
      id: 4,
      title: 'Employer Support',
      badgeText: 'HR Partnerships',
      image: '/images/service_employer.jpg',
      imageAlt: 'Senior HR directors and recruiters collaborating on talent acquisition in boardroom',
      shortDesc: 'Partnering with business owners and HR teams to streamline talent acquisition, reduce turnover, and sustain workforce reliability.',
      icon: Briefcase,
      features: [
        'Dedicated talent acquisition specialist for every corporate account',
        'Custom candidate assessment rubrics and pre-screened shortlists',
        'Full payroll processing, T4 administration, and statutory remittances',
        'Scalable workforce solutions adapted for seasonal peaks and expansions'
      ],
      detail: 'Maple Staffing Solutions acts as a strategic recruitment extension of your internal HR team. We take over talent sourcing, credentialing, and compliance so hiring managers can focus on core operations.',
    }
  ];

  const currentService = activeServiceModal !== null ? services.find(s => s.id === activeServiceModal) : null;

  useBodyScrollLock(!!currentService);

  useEffect(() => {
    if (!currentService) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveServiceModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentService]);

  return (
    <section id="services" className="py-20 sm:py-28 bg-[#F3F3E7] border-t border-[#F5EBD0] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5EBD0] text-xs font-bold text-[#7F011F] tracking-widest uppercase"
          >
            <span>Specialized Capabilities</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#590907] tracking-tight font-heading"
          >
            Solutions That Move Careers Forward.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-base sm:text-lg text-[#590907]/80 font-body"
          >
            Dedicated recruitment, career coaching, and staffing solutions designed to foster professional growth and reliable employer partnerships.
          </motion.p>
        </div>

        {/* 4 Animated Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative bg-white hover:bg-[#F3F3E7]/80 rounded-2xl overflow-hidden border border-[#F5EBD0] hover:border-[#A5A79B] shadow-[0_4px_20px_rgba(89,9,7,0.04)] hover:shadow-[0_16px_36px_rgba(89,9,7,0.12)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative h-48 overflow-hidden bg-[#590907]">
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#590907]/85 via-black/25 to-transparent" />
                    
                    {/* Floating Icon badge with hover scale & rotate */}
                    <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-sm text-[#590907] flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="w-5 h-5 text-[#7F011F]" />
                    </div>

                    {/* Tag badge */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium">
                      <span className="bg-[#A5A79B] text-[#590907] px-2.5 py-0.5 rounded-full font-bold">
                        {service.badgeText}
                      </span>
                      <span className="font-mono text-[#F5EBD0] font-semibold">0{service.id}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#590907] tracking-tight group-hover:text-[#7F011F] transition-colors mb-2.5 font-heading">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#590907]/75 leading-relaxed mb-5 font-body">
                      {service.shortDesc}
                    </p>

                    <ul className="space-y-2 mb-2">
                      {service.features.slice(0, 2).map((feat, fIdx) => (
                        <li key={fIdx} className="text-xs text-[#590907]/80 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#A5A79B] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-[#F5EBD0] flex items-center justify-between">
                    <button
                      onClick={() => setActiveServiceModal(service.id)}
                      className="text-xs font-bold text-[#7F011F] hover:text-[#590907] flex items-center gap-1.5 transition-colors focus:outline-none cursor-pointer group/btn"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1.5 text-[#A5A79B]" />
                    </button>
                    <span className="text-[11px] text-[#A5A79B] font-semibold">Full Scope</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 p-8 sm:p-10 rounded-2xl bg-[#590907] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_12px_32px_rgba(89,9,7,0.25)] border border-[#7F011F]"
        >
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="text-xl sm:text-2xl font-bold text-white font-heading">
              Looking to hire top talent or discuss career opportunities?
            </h4>
            <p className="text-sm text-[#F5EBD0]">
              Our recruitment specialists and career advisors in Brampton are ready to consult with you.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onContactServices('Recruitment & Staffing Consultation')}
              className="px-6 py-3 text-sm font-semibold bg-[#A5A79B] hover:bg-white text-[#590907] rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer shadow-md"
            >
              Consult Our Team
            </motion.button>
          </div>
        </motion.div>

      </div>

      {/* Service Detail Modal */}
      {currentService && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveServiceModal(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 modal-backdrop"
        >
          <div className="bg-[#F3F3E7] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto modal-dialog border border-[#F5EBD0]">
            <button
              onClick={() => setActiveServiceModal(null)}
              className="absolute top-5 right-5 p-2 text-[#590907] hover:text-[#7F011F] hover:bg-[#F5EBD0] rounded-xl transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-[#F5EBD0] shrink-0">
                <img
                  src={currentService.image}
                  alt={currentService.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-[#A5A79B] uppercase tracking-wider block">
                  {currentService.badgeText}
                </span>
                <h3 className="text-2xl font-bold text-[#590907] font-heading">
                  {currentService.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-[#590907]/80 leading-relaxed mb-6 font-body">
              {currentService.detail}
            </p>

            <div className="mb-7 bg-white p-5 rounded-xl border border-[#F5EBD0]">
              <div className="text-xs font-bold text-[#590907] uppercase tracking-wider mb-3 font-heading">
                Key Deliverables & Standards:
              </div>
              <ul className="space-y-2.5">
                {currentService.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#590907]/85">
                    <CheckCircle2 className="w-4 h-4 text-[#A5A79B] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#F5EBD0] flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setActiveServiceModal(null);
                  onContactServices(currentService.title);
                }}
                className="px-6 py-2.5 bg-[#7F011F] hover:bg-[#590907] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-md"
              >
                Inquire About This Service
              </button>
              <button
                onClick={() => {
                  setActiveServiceModal(null);
                  onExploreCareers();
                }}
                className="px-4 py-2.5 text-xs text-[#7F011F] hover:text-[#590907] font-semibold cursor-pointer"
              >
                View Related Roles →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
