import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Building2, Headphones, Hotel, ShoppingBag, Package, Truck, Wrench, Laptop, DollarSign, Users2 } from 'lucide-react';

interface IndustriesProps {
  onSelectCategory: (category: string) => void;
}

export const Industries: React.FC<IndustriesProps> = ({ onSelectCategory }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'corporate' | 'operations' | 'hospitality'>('all');

  const industryCards = [
    {
      id: 'admin',
      title: 'Administration',
      group: 'corporate',
      categoryKey: 'Administration & Office',
      image: '/images/industry_administration.jpg',
      icon: Building2,
      badge: 'Executive Support',
      description: 'Executive assistants, office coordinators, bilingual receptionists, and corporate clerical specialists for premier workplaces.',
      typicalRoles: ['Executive Assistant', 'Office Coordinator', 'Corporate Receptionist']
    },
    {
      id: 'logistics',
      title: 'Logistics',
      group: 'operations',
      categoryKey: 'Warehousing & Logistics',
      image: '/images/industry_logistics.jpg',
      icon: Truck,
      badge: 'Supply Chain',
      description: 'Freight dispatch coordinators, shipping & receiving clerks, customs document processors, and fleet coordinators.',
      typicalRoles: ['Logistics Coordinator', 'Dispatch Specialist', 'Shipping Clerk']
    },
    {
      id: 'customer_service',
      title: 'Customer Service',
      group: 'corporate',
      categoryKey: 'Administration & Office',
      image: '/images/industry_customer_service.jpg',
      icon: Headphones,
      badge: 'Client Care',
      description: 'Inbound client support specialists, call center representatives, and dedicated account service coordinators.',
      typicalRoles: ['Customer Support Specialist', 'Call Center Agent', 'Client Relations Associate']
    },
    {
      id: 'warehousing',
      title: 'Warehousing',
      group: 'operations',
      categoryKey: 'Warehousing & Logistics',
      image: '/images/industry_warehousing.jpg',
      icon: Package,
      badge: 'Fulfillment',
      description: 'Order fulfillment teams, certified forklift operators, inventory cycle counters, and material handling leads.',
      typicalRoles: ['Warehouse Associate', 'Forklift Driver', 'Order Picker & Packer']
    },
    {
      id: 'manufacturing',
      title: 'Manufacturing',
      group: 'operations',
      categoryKey: 'Manufacturing & Production',
      image: '/images/industry_manufacturing.jpg',
      icon: Wrench,
      badge: 'Production',
      description: 'Automated assembly operators, precision machine technicians, quality control inspectors, and line supervisors.',
      typicalRoles: ['Production Worker', 'Machine Operator', 'Quality Inspector']
    },
    {
      id: 'hospitality',
      title: 'Hospitality',
      group: 'hospitality',
      categoryKey: 'Hospitality & Retail',
      image: '/images/industry_hospitality.jpg',
      icon: Hotel,
      badge: 'Guest Relations',
      description: 'Hotel front desk agents, event coordinators, banquet captains, concierge professionals, and guest services.',
      typicalRoles: ['Front Desk Associate', 'Guest Relations Lead', 'Housekeeping Supervisor']
    },
    {
      id: 'retail',
      title: 'Retail',
      group: 'hospitality',
      categoryKey: 'Hospitality & Retail',
      image: '/images/industry_retail.jpg',
      icon: ShoppingBag,
      badge: 'Commercial',
      description: 'Sales associates, store team leads, merchandisers, inventory stockers, and customer checkout specialists.',
      typicalRoles: ['Retail Sales Associate', 'Store Lead', 'Merchandising Clerk']
    },
    {
      id: 'it',
      title: 'Information Technology',
      group: 'corporate',
      categoryKey: 'Professional & Technical',
      image: '/images/industry_it.jpg',
      icon: Laptop,
      badge: 'Enterprise Tech',
      description: 'Helpdesk support analysts, network administration assistants, hardware deployment techs, and IT technicians.',
      typicalRoles: ['IT Support Analyst', 'Helpdesk Specialist', 'Desktop Tech']
    },
    {
      id: 'finance',
      title: 'Finance',
      group: 'corporate',
      categoryKey: 'Professional & Technical',
      image: '/images/industry_finance.jpg',
      icon: DollarSign,
      badge: 'Accounting',
      description: 'Junior accountants, accounts payable/receivable clerks, payroll assistants, and financial audit specialists.',
      typicalRoles: ['Junior Accountant', 'AP/AR Specialist', 'Payroll Assistant']
    },
    {
      id: 'hr',
      title: 'Human Resources',
      group: 'corporate',
      categoryKey: 'Professional & Technical',
      image: '/images/industry_hr.jpg',
      icon: Users2,
      badge: 'Talent & Culture',
      description: 'HR coordinators, onboarding specialists, candidate screening recruiters, and talent acquisition professionals.',
      typicalRoles: ['HR Coordinator', 'Talent Sourcer', 'Recruitment Specialist']
    }
  ];

  const filtered = activeTab === 'all' 
    ? industryCards 
    : industryCards.filter(c => c.group === activeTab);

  return (
    <section id="industries" className="py-20 sm:py-28 bg-[#F3F3E7] border-t border-[#F5EBD0] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5EBD0] text-xs font-bold text-[#7F011F] tracking-widest uppercase"
            >
              <span>Sector Specialization</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#590907] tracking-tight font-heading"
            >
              Industries We Serve.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-base sm:text-lg text-[#590907]/80 font-body"
            >
              Connecting qualified talent with leading employers across 10 core corporate, logistics, technical, and hospitality sectors.
            </motion.p>
          </div>

          {/* Group Filter Tabs in Wine Red & Sand */}
          <div className="flex items-center gap-1.5 bg-[#F5EBD0] p-1.5 rounded-xl self-start md:self-auto shrink-0 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#7F011F] text-white shadow-sm'
                  : 'text-[#590907] hover:text-[#7F011F]'
              }`}
            >
              All 10 Industries
            </button>
            <button
              onClick={() => setActiveTab('corporate')}
              className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'corporate'
                  ? 'bg-[#7F011F] text-white shadow-sm'
                  : 'text-[#590907] hover:text-[#7F011F]'
              }`}
            >
              Corporate & Tech
            </button>
            <button
              onClick={() => setActiveTab('operations')}
              className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'operations'
                  ? 'bg-[#7F011F] text-white shadow-sm'
                  : 'text-[#590907] hover:text-[#7F011F]'
              }`}
            >
              Operations & Logistics
            </button>
            <button
              onClick={() => setActiveTab('hospitality')}
              className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'hospitality'
                  ? 'bg-[#7F011F] text-white shadow-sm'
                  : 'text-[#590907] hover:text-[#7F011F]'
              }`}
            >
              Hospitality & Retail
            </button>
          </div>
        </div>

        {/* 10 Industry Cards — Staggered Entrance Animations & Elevation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
          {filtered.map((ind, index) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (index % 5) * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl overflow-hidden bg-white border border-[#F5EBD0] hover:border-[#A5A79B] shadow-[0_4px_20px_rgba(89,9,7,0.04)] hover:shadow-[0_16px_36px_rgba(89,9,7,0.12)] transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  {/* Image container with hover zoom and smooth dark gradient overlay */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#590907]">
                    <img
                      src={ind.image}
                      alt={`${ind.title} recruitment at Maple Staffing Solutions`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#590907]/90 via-black/25 to-transparent pointer-events-none" />
                    
                    {/* Sage Icon Badge */}
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-white/95 backdrop-blur-xs text-[#590907] flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110">
                      <Icon className="w-4 h-4 text-[#7F011F]" />
                    </div>

                    {/* Category Pill Tag */}
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#A5A79B] text-[#590907] px-2 py-0.5 rounded-full shadow-sm">
                        {ind.badge}
                      </span>
                    </div>

                    {/* Overlay Title */}
                    <div className="absolute bottom-2.5 left-3.5 right-3.5">
                      <h3 className="text-base font-bold text-white tracking-tight drop-shadow-sm font-heading">
                        {ind.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5">
                    <p className="text-xs text-[#590907]/80 leading-relaxed mb-3 line-clamp-3 font-body">
                      {ind.description}
                    </p>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-bold text-[#7F011F] uppercase tracking-wider block">
                        Core Openings:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {ind.typicalRoles.slice(0, 2).map((role, rIdx) => (
                          <span
                            key={rIdx}
                            className="text-[10px] text-[#590907] bg-[#F5EBD0]/70 px-2 py-0.5 rounded-md font-medium truncate max-w-full"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="p-4 sm:p-5 pt-0">
                  <div className="pt-3 border-t border-[#F5EBD0] flex items-center justify-between">
                    <button
                      onClick={() => onSelectCategory(ind.categoryKey)}
                      className="text-xs font-bold text-[#7F011F] group-hover:text-[#590907] flex items-center gap-1.5 transition-colors focus:outline-none cursor-pointer"
                    >
                      <span>Explore Roles</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5 text-[#A5A79B]" />
                    </button>
                    <span className="text-[10px] text-[#A5A79B] font-mono font-semibold">Verified</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
