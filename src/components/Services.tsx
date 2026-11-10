import React, { useState, useEffect } from 'react';
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
      title: 'International Recruitment',
      badgeText: 'Candidate Interviews',
      image: '/src/assets/images/service_recruiter_interview_1794294128994.jpg',
      imageAlt: 'Professional recruitment consultant interviewing a candidate across meeting table',
      shortDesc: 'Connecting qualified job seekers with reputable employers across Canada and global markets through comprehensive interviews and background vetting.',
      icon: Globe,
      features: [
        'One-on-one structured candidate screening & competency interviews',
        'Verification of credentials, trade degrees, and reference checks',
        'Pre-departure orientation and cultural adaptation guidance',
        'Strict compliance with Canadian provincial and federal recruitment regulations'
      ],
      detail: 'Our International Recruitment service matches talented job seekers with verified employers in Canada and overseas. Every candidate participates in structured face-to-face or video interviews to evaluate career aspirations, skills, and organizational fit before employer introductions.',
    },
    {
      id: 2,
      title: 'Skilled Workforce Solutions',
      badgeText: 'Team Collaboration',
      image: '/src/assets/images/service_workforce_collaboration_1794294128972.jpg',
      imageAlt: 'Diverse team of professional office employees and analysts collaborating enthusiastically',
      shortDesc: 'Providing motivated professionals and dependable teams across modern commercial, logistics, and technical corporate environments.',
      icon: Users,
      features: [
        'Collaborative office, operations, and specialized personnel',
        'Flexible engagement: direct-hire, temp-to-perm, and project-based',
        'Comprehensive workplace orientation and team alignment',
        'Rapid mobilization for ongoing and surge staffing requirements'
      ],
      detail: 'From growing corporate offices to large-scale distribution operations, our staffing solutions furnish employers with dedicated, collaborative personnel. We prioritize team cohesion, safety-first attitudes, and strong communication skills.',
    },
    {
      id: 3,
      title: 'Employer Recruitment Support',
      badgeText: 'Executive HR Advisory',
      image: '/src/assets/images/service_hr_employer_solutions_1794294129678.jpg',
      imageAlt: 'Senior HR director and corporate recruitment specialists consulting on talent acquisition in boardroom',
      shortDesc: 'Partnering with corporate human resource leaders to optimize talent acquisition, streamline onboarding, and lower hiring turnover.',
      icon: Briefcase,
      features: [
        'Dedicated talent acquisition account managers for corporate clients',
        'Tailored role profiling, custom interview rubrics, and candidate scoring',
        'Full statutory payroll processing, benefits, and contract administration',
        'Proactive pipeline planning to anticipate seasonal and growth vacancies'
      ],
      detail: 'Maple Staffing Solutions acts as an agile recruitment partner for your internal HR department. We handle sourcing, initial screening, credential verification, and interview logistics so hiring managers can focus on strategic operational goals.',
    },
    {
      id: 4,
      title: 'Career Guidance & Development',
      badgeText: 'Resume & Coaching',
      image: '/src/assets/images/service_career_counseling_1794294130461.jpg',
      imageAlt: 'Warm career counselor reviewing a printed resume and coaching a candidate',
      shortDesc: 'Empowering job seekers with personalized resume optimization, interview coaching, and strategic pathways to build rewarding long-term careers.',
      icon: GraduationCap,
      features: [
        'Professional resume enhancement tailored for Canadian hiring standards',
        'Mock interview simulations and communication coaching',
        'Career path mapping from entry roles to supervisory leadership',
        'Ongoing mentorship and post-placement check-ins to ensure success'
      ],
      detail: 'Our career counselors work closely with candidates to unlock their full professional potential. We review resumes, refine self-presentation skills, and equip candidates with the confidence needed to excel in competitive Canadian and international job markets.',
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
    <section id="services" className="py-20 sm:py-28 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-bold text-[#159B78] uppercase tracking-wider">
            Recruitment & Career Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
            Connecting Talent With Employers. Building Better Careers.
          </h2>
          <p className="text-base text-slate-600">
            Dedicated recruitment, career coaching, and staffing solutions designed to foster professional growth and reliable employer partnerships.
          </p>
        </div>

        {/* 4 Animated Service Cards with Unique Photography */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative bg-[#F6F8F7] hover:bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#159B78]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative h-44 overflow-hidden bg-slate-900">
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#10243A]/80 via-black/20 to-transparent" />
                    
                    {/* Floating Icon badge */}
                    <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-white/90 backdrop-blur-xs text-[#10243A] flex items-center justify-center shadow-md">
                      <Icon className="w-5 h-5 text-[#159B78]" />
                    </div>

                    {/* Tag badge */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium">
                      <span className="bg-[#159B78]/90 px-2 py-0.5 rounded text-white font-semibold">
                        {service.badgeText}
                      </span>
                      <span className="font-mono text-slate-200">0{service.id}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-[#10243A] tracking-tight group-hover:text-[#159B78] transition-colors mb-2">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {service.shortDesc}
                    </p>

                    <ul className="space-y-1.5 mb-2">
                      {service.features.slice(0, 2).map((feat, fIdx) => (
                        <li key={fIdx} className="text-xs text-slate-500 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#159B78] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                    <button
                      onClick={() => setActiveServiceModal(service.id)}
                      className="text-xs font-bold text-[#10243A] group-hover:text-[#159B78] flex items-center gap-1.5 transition-colors focus:outline-none cursor-pointer"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                    <span className="text-[11px] text-slate-400 font-semibold">Overview</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global CTA Strip */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#10243A] to-[#153454] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div>
            <h4 className="text-lg font-bold">Looking to hire top talent or discuss career opportunities?</h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">Our recruitment specialists and career advisors are ready to consult with you.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onContactServices('Recruitment & Staffing Consultation')}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold bg-[#159B78] hover:bg-[#128264] text-white rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              Consult Our Team
            </button>
          </div>
        </div>

      </div>

      {/* Service Detail Modal */}
      {currentService && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveServiceModal(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 modal-backdrop"
        >
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto modal-dialog">
            <button
              onClick={() => setActiveServiceModal(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                <img
                  src={currentService.image}
                  alt={currentService.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-[#159B78] uppercase tracking-wider block">
                  {currentService.badgeText}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#10243A]">
                  {currentService.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {currentService.detail}
            </p>

            <div className="mb-6">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Key Deliverables & Standards:
              </div>
              <ul className="space-y-2.5">
                {currentService.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-[#159B78] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setActiveServiceModal(null);
                  onContactServices(currentService.title);
                }}
                className="px-5 py-2.5 bg-[#159B78] hover:bg-[#128264] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Inquire About This Service
              </button>
              <button
                onClick={() => {
                  setActiveServiceModal(null);
                  onExploreCareers();
                }}
                className="px-4 py-2.5 text-xs text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
              >
                View Related Roles
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
