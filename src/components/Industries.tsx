import React, { useState } from 'react';
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
      image: '/src/assets/images/cat_office_reception_1794294598540.jpg',
      icon: Building2,
      description: 'Executive assistants, office managers, receptionists, and corporate clerical staff for modern workplaces.',
      typicalRoles: ['Administrative Assistant', 'Office Coordinator', 'Receptionist']
    },
    {
      id: 'customer_service',
      title: 'Customer Service',
      group: 'corporate',
      categoryKey: 'Administration & Office',
      image: '/src/assets/images/service_recruiter_interview_1794294128994.jpg',
      icon: Headphones,
      description: 'Inbound client support specialists, call center representatives, and account service coordinators.',
      typicalRoles: ['Customer Support Specialist', 'Call Center Agent', 'Client Relations Associate']
    },
    {
      id: 'hospitality',
      title: 'Hospitality',
      group: 'hospitality',
      categoryKey: 'Hospitality & Retail',
      image: '/src/assets/images/cat_hospitality_hotel_1794294596916.jpg',
      icon: Hotel,
      description: 'Upscale hotel front desk associates, event coordinators, guest service agents, and concierge professionals.',
      typicalRoles: ['Front Desk Associate', 'Guest Relations Lead', 'Housekeeping Associate']
    },
    {
      id: 'retail',
      title: 'Retail',
      group: 'hospitality',
      categoryKey: 'Hospitality & Retail',
      image: '/src/assets/images/cat_retail_store_1794294597267.jpg',
      icon: ShoppingBag,
      description: 'Fashion, electronics, and department store sales associates, inventory stockers, and cashiers.',
      typicalRoles: ['Retail Sales Associate', 'Store Associate', 'Cashier Specialist']
    },
    {
      id: 'warehousing',
      title: 'Warehousing',
      group: 'operations',
      categoryKey: 'Warehousing & Logistics',
      image: '/src/assets/images/industry_logistics_warehouse_1794292533090.jpg',
      icon: Package,
      description: 'Order fulfillment teams, inventory cycle auditors, and material handlers in modern distribution centers.',
      typicalRoles: ['Warehouse Associate', 'Inventory Auditor', 'Picker & Packer']
    },
    {
      id: 'logistics',
      title: 'Logistics',
      group: 'operations',
      categoryKey: 'Warehousing & Logistics',
      image: '/src/assets/images/hero_workforce_recruitment_1794292531456.jpg',
      icon: Truck,
      description: 'Freight dispatch coordinators, shipping & receiving clerks, and cross-border transport planners.',
      typicalRoles: ['Logistics Coordinator', 'Shipping & Receiving Clerk', 'Fleet Dispatcher']
    },
    {
      id: 'manufacturing',
      title: 'Manufacturing',
      group: 'operations',
      categoryKey: 'Manufacturing & Production',
      image: '/src/assets/images/industry_advanced_manufacturing_1794292533879.jpg',
      icon: Wrench,
      description: 'Automated assembly operators, precision machine technicians, and quality assurance inspectors.',
      typicalRoles: ['Production Worker', 'Machine Operator', 'Quality Control Tech']
    },
    {
      id: 'it',
      title: 'Information Technology',
      group: 'corporate',
      categoryKey: 'Professional & Technical',
      image: '/src/assets/images/cat_it_technology_1794294598174.jpg',
      icon: Laptop,
      description: 'Helpdesk technical specialists, network assistants, hardware deployment technicians, and IT support.',
      typicalRoles: ['IT Support Assistant', 'Helpdesk Specialist', 'Desktop Support Tech']
    },
    {
      id: 'finance',
      title: 'Finance & Accounting',
      group: 'corporate',
      categoryKey: 'Professional & Technical',
      image: '/src/assets/images/cat_finance_accounting_1794294598325.jpg',
      icon: DollarSign,
      description: 'Junior accountants, accounts payable/receivable clerks, payroll assistants, and billing auditors.',
      typicalRoles: ['Junior Accountant', 'AP/AR Specialist', 'Payroll Assistant']
    },
    {
      id: 'hr',
      title: 'Human Resources',
      group: 'corporate',
      categoryKey: 'Professional & Technical',
      image: '/src/assets/images/service_hr_employer_solutions_1794294129678.jpg',
      icon: Users2,
      description: 'HR coordinators, onboarding specialists, candidate screeners, and talent acquisition professionals.',
      typicalRoles: ['HR Assistant', 'Talent Sourcer', 'Recruitment Coordinator']
    }
  ];

  const filtered = activeTab === 'all' 
    ? industryCards 
    : industryCards.filter(c => c.group === activeTab);

  return (
    <section id="industries" className="py-20 sm:py-28 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-bold text-[#159B78] uppercase tracking-wider">
              Specialized Industry Sectors
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
              Industries We Power Across Canada & Globally
            </h2>
            <p className="text-base text-slate-600">
              Connecting qualified talent with leading employers across 10 core corporate, logistics, technical, and hospitality sectors.
            </p>
          </div>

          {/* Group Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start md:self-auto shrink-0 text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeTab === 'all' ? 'bg-white text-[#10243A] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All 10 Sectors
            </button>
            <button
              onClick={() => setActiveTab('corporate')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeTab === 'corporate' ? 'bg-white text-[#10243A] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Corporate & Tech
            </button>
            <button
              onClick={() => setActiveTab('operations')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeTab === 'operations' ? 'bg-white text-[#10243A] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Operations & Logistics
            </button>
            <button
              onClick={() => setActiveTab('hospitality')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeTab === 'hospitality' ? 'bg-white text-[#10243A] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hospitality & Retail
            </button>
          </div>
        </div>

        {/* 10 Industry Cards in Consistent Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
          {filtered.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.id}
                className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-[#159B78]/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  {/* Fixed 16:9 Image container with hover zoom */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                    <img
                      src={ind.image}
                      alt={`${ind.title} staffing and recruitment at Maple Staffing Solutions`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#10243A]/85 via-black/20 to-transparent pointer-events-none" />
                    
                    {/* Icon Badge */}
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-white/95 backdrop-blur-xs text-[#10243A] flex items-center justify-center shadow-md">
                      <Icon className="w-4 h-4 text-[#159B78]" />
                    </div>

                    {/* Overlay Title */}
                    <div className="absolute bottom-2.5 left-3 right-3">
                      <h3 className="text-sm font-bold text-white tracking-tight drop-shadow-xs">
                        {ind.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5">
                    <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-3">
                      {ind.description}
                    </p>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Common Roles:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {ind.typicalRoles.slice(0, 2).map((role, rIdx) => (
                          <span
                            key={rIdx}
                            className="text-[10px] text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-medium truncate max-w-full"
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
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => onSelectCategory(ind.categoryKey)}
                      className="text-xs font-bold text-[#159B78] hover:text-[#128264] flex items-center gap-1 transition-colors focus:outline-none cursor-pointer"
                    >
                      <span>Explore Roles</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                    <span className="text-[10px] text-slate-400 font-mono font-medium">S-0{ind.id.slice(0,2)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
