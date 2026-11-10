import { JobListing } from '../types';

export const INITIAL_JOBS: JobListing[] = [
  // 1. Customer Service Representative
  {
    id: 'job-1',
    title: 'Customer Service Representative',
    location: 'Brampton, Ontario',
    category: 'Administration & Office',
    employmentType: 'Full-time',
    isVerifiedVacancy: true,
    description: 'Deliver responsive, compassionate customer care and account support across inbound phone, email, and live communication channels in a modern corporate setting.',
    responsibilities: [
      'Manage incoming customer inquiries, account verifications, and order tracking via multi-line headset systems',
      'Provide accurate policy guidance, service scheduling, and product documentation with empathetic communication',
      'Log and resolve customer support tickets within established enterprise SLA response targets',
      'Collaborate with cross-functional team leads to escalate complex client account inquiries smoothly'
    ],
    qualifications: [
      'Demonstrated customer support, call center, or client services experience',
      'Active listening skills with clear, courteous verbal articulation and professional telephone etiquette',
      'Familiarity with CRM ticketing platforms (Zendesk, Salesforce, or Microsoft Dynamics)',
      'High school diploma required; post-secondary coursework in communications or business an asset'
    ],
    experience: '1 - 2 years',
    postedDate: '1 day ago',
    workArrangement: 'On-site · Monday to Friday 9:00 AM - 5:30 PM',
    cardImage: '/images/careers/customer_service.jpg'
  },

  // 2. Administrative Assistant
  {
    id: 'job-2',
    title: 'Administrative Assistant',
    location: 'Mississauga, Ontario',
    category: 'Administration & Office',
    employmentType: 'Full-time',
    isVerifiedVacancy: true,
    description: 'Provide comprehensive executive coordination, calendar scheduling, document preparation, and office operational support in a modern corporate workspace.',
    responsibilities: [
      'Coordinate executive schedules, organize meeting agendas, and manage boardroom reservations',
      'Prepare polished executive correspondence, financial spreadsheets, and presentation slide decks',
      'Manage incoming business correspondence, vendor billings, and office inventory replenishment',
      'Welcome visiting corporate partners and prospective talent with warmth and professionalism'
    ],
    qualifications: [
      'Post-secondary diploma in Office Administration, Business Management, or equivalent experience',
      'Advanced proficiency in Microsoft Office 365 (Word, Excel, PowerPoint, Outlook)',
      'Exceptional organizational capabilities, time management, and multi-tasking under deadlines',
      'Minimum 2 years of corporate administrative or office management experience'
    ],
    experience: '2 - 3 years',
    postedDate: '2 days ago',
    workArrangement: 'Hybrid · 3 Days On-site / 2 Days Remote',
    cardImage: '/images/careers/admin_assistant.jpg'
  },

  // 3. Warehouse Associate
  {
    id: 'job-3',
    title: 'Warehouse Associate',
    location: 'Brampton, Ontario',
    category: 'Warehousing & Logistics',
    employmentType: 'Full-time',
    isVerifiedVacancy: true,
    description: 'Execute accurate inventory scanning, carton sorting, order fulfillment, and pallet staging in a clean, state-of-the-art distribution facility.',
    responsibilities: [
      'Scan and pick customer orders accurately utilizing RF handheld barcode scanners and pick-to-light systems',
      'Verify incoming freight manifests against purchase orders and inspect carton integrity',
      'Wrap, secure, and stage outbound skids for scheduled daily transport carrier departure',
      'Maintain strict adherence to Ontario health and safety standards, clean aisle protocols, and WHMIS'
    ],
    qualifications: [
      'Previous distribution warehouse, order fulfillment, or replenishment experience preferred',
      'Certified CSA-approved steel-toe safety footwear (green triangle benchmark)',
      'Ability to comfortably handle moderate lifting (up to 40 lbs) safely throughout shift',
      'Reliable team-player with strong punctuality and safety-first mindset'
    ],
    experience: 'Entry to Mid Level',
    postedDate: 'Just now',
    workArrangement: 'On-site · Day Shift (7:00 AM - 3:30 PM)',
    cardImage: '/images/careers/warehouse_associate.jpg'
  },

  // 4. Logistics Coordinator
  {
    id: 'job-4',
    title: 'Logistics Coordinator',
    location: 'Mississauga, Ontario',
    category: 'Warehousing & Logistics',
    employmentType: 'Full-time',
    isVerifiedVacancy: true,
    description: 'Manage freight shipments, track linehaul transport schedules, and coordinate carrier dispatch logistics across Canadian distribution corridors.',
    responsibilities: [
      'Monitor nationwide intermodal shipments and optimize freight routing timelines',
      'Liaise directly with transport carriers, dispatchers, and freight brokers to coordinate dock schedules',
      'Prepare bills of lading (BOL), customs declarations, and commercial shipping documentation',
      'Resolve transit exceptions, delivery delays, and customs clearances proactively'
    ],
    qualifications: [
      'College diploma or bachelor’s degree in Supply Chain Management, Logistics, or related discipline',
      '2+ years practical experience in logistics dispatch, freight forwarding, or 3PL operations',
      'Working knowledge of Canadian transport corridors, cross-border shipping, and carrier portals',
      'Proficiency in logistics TMS, SAP ERP, or Manhattan Associates WMS platforms'
    ],
    experience: '2 - 4 years',
    postedDate: '3 days ago',
    workArrangement: 'On-site · Logistics Operations Terminal',
    cardImage: '/images/careers/logistics_coordinator.jpg'
  },

  // 5. IT Support Specialist
  {
    id: 'job-5',
    title: 'IT Support Specialist',
    location: 'Toronto, Ontario',
    category: 'Professional & Technical',
    employmentType: 'Full-time',
    isVerifiedVacancy: true,
    description: 'Deliver responsive technical troubleshooting, workstation deployment, network configuration, and user permissions management in an enterprise IT environment.',
    responsibilities: [
      'Diagnose and resolve tier-1/2 hardware, operating system, and SaaS software tickets via Jira Service Desk',
      'Configure, image, and deploy Windows 11 and macOS enterprise laptops, monitors, and VoIP peripherals',
      'Administer Microsoft 365, Active Directory, Azure AD, and multi-factor authentication credentials',
      'Maintain comprehensive documentation of network printer mappings, software licenses, and IT assets'
    ],
    qualifications: [
      'Diploma or degree in Computer Systems, Information Technology, or CompTIA A+ / Network+ certification',
      'Strong technical aptitude across Windows, macOS, TCP/IP networking, VPNs, and cloud applications',
      'Patient, customer-centric diagnostic manner when supporting non-technical team members',
      '1 - 3 years experience in IT helpdesk, desktop support, or technician capacity'
    ],
    experience: '1 - 3 years',
    postedDate: '2 days ago',
    workArrangement: 'Hybrid · Tech Center Office',
    cardImage: '/images/careers/it_support.jpg'
  },

  // 6. HR Assistant
  {
    id: 'job-6',
    title: 'HR Assistant',
    location: 'Brampton, Ontario',
    category: 'Professional & Technical',
    employmentType: 'Full-time',
    isVerifiedVacancy: true,
    description: 'Assist human resources leadership with candidate pre-screening, interview coordination, onboarding orientation, and confidential personnel file administration.',
    responsibilities: [
      'Review incoming candidate resumes against job requisitions and conduct initial phone screening interviews',
      'Schedule formal interview panels between candidates and department hiring managers',
      'Coordinate background checks, credential verifications, and digital employment contract packages',
      'Assist with new-hire safety orientations, WHMIS records, and HRIS database administration'
    ],
    qualifications: [
      'Post-secondary diploma or degree in Human Resources Management (CHRP candidate an asset)',
      'Understanding of Ontario Employment Standards Act (ESA), human rights, and workplace privacy',
      'High degree of confidentiality, emotional maturity, and professional verbal and written expression',
      'Proficiency in ATS platforms, HRIS portals, and Microsoft Office'
    ],
    experience: '1 - 2 years',
    postedDate: '4 days ago',
    workArrangement: 'On-site · Brampton Corporate Headquarters',
    cardImage: '/images/careers/hr_assistant.jpg'
  },

  // 7. Retail Sales Associate
  {
    id: 'job-7',
    title: 'Retail Sales Associate',
    location: 'Toronto, Ontario',
    category: 'Hospitality & Retail',
    employmentType: 'Full-time',
    isVerifiedVacancy: true,
    description: 'Engage retail shoppers warmly, provide personalized product demonstrations, process checkout POS transactions, and maintain visual merchandising excellence.',
    responsibilities: [
      'Welcome customers with enthusiasm, listen to individual preferences, and offer curated product solutions',
      'Process point-of-sale transactions accurately using digital registers, scanners, and gift card terminals',
      'Replenish retail displays, maintain folded presentation standards, and assist with inventory deliveries',
      'Answer customer questions regarding promotional events, loyalty programs, and warranty exchanges'
    ],
    qualifications: [
      'Customer-facing retail, hospitality, or sales experience with positive energy and outgoing personality',
      'Cash handling accuracy and comfort utilizing digital POS register terminals',
      'Flexible scheduling availability including weekend peak shopping and seasonal sales periods',
      'Strong interpersonal communication and teamwork abilities'
    ],
    experience: '1+ year',
    postedDate: '1 day ago',
    workArrangement: 'On-site · Premier Toronto Retail Center',
    cardImage: '/images/careers/retail_associate.jpg'
  },

  // 8. Hotel Front Desk Associate
  {
    id: 'job-8',
    title: 'Hotel Front Desk Associate',
    location: 'Toronto, Ontario',
    category: 'Hospitality & Retail',
    employmentType: 'Full-time',
    isVerifiedVacancy: true,
    description: 'Welcome international and domestic guests, manage hotel room reservations, handle check-in/out procedures, and provide concierge recommendations.',
    responsibilities: [
      'Register arriving guests, issue room keys, verify payment credentials, and process departures efficiently',
      'Operate Opera PMS to manage reservations, room assignments, and VIP guest preferences',
      'Liaise seamlessly with housekeeping and facilities engineering teams to guarantee guest comfort',
      'Offer helpful concierge recommendations regarding GTA transit, fine dining, and local tourist attractions'
    ],
    qualifications: [
      'Hospitality diploma or background in luxury guest relations, front desk, or hospitality operations',
      'Hands-on familiarity with hotel property management systems (Opera, Marriott PMS, or similar)',
      'Polished grooming, warm poise, and active commitment to hospitable excellence',
      'Excellent problem-solving demeanor under busy check-in rush hours'
    ],
    experience: '1 - 3 years',
    postedDate: '3 days ago',
    workArrangement: 'On-site · Upscale Hotel Property (Downtown Toronto)',
    cardImage: '/images/careers/hotel_front_desk.jpg'
  },

  // 9. Production Associate
  {
    id: 'job-9',
    title: 'Production Associate',
    location: 'Brampton, Ontario',
    category: 'Manufacturing & Production',
    employmentType: 'Full-time',
    isVerifiedVacancy: true,
    description: 'Operate clean automated production equipment, inspect precision mechanical assemblies, and maintain lean manufacturing 5S plant standards.',
    responsibilities: [
      'Assemble mechanical components according to standardized engineering work instructions and diagrams',
      'Operate automated stamping, molding, and finishing equipment in a clean manufacturing environment',
      'Perform in-process dimensional verifications to identify component flaws before secondary processing',
      'Participate actively in shift handover meetings, safety audits, and continuous improvement initiatives'
    ],
    qualifications: [
      'Ontario secondary school diploma or equivalent technical training',
      '1+ years manufacturing, light assembly, or automated machinery experience preferred',
      'Solid mechanical dexterity, physical stamina, and commitment to plant safety standards',
      'CSA steel-toe protective footwear required'
    ],
    experience: '1 - 2 years',
    postedDate: '2 days ago',
    workArrangement: 'On-site · Continental Day & Afternoon Shifts',
    cardImage: '/images/careers/production_associate.jpg'
  },

  // 10. Quality Control Assistant
  {
    id: 'job-10',
    title: 'Quality Control Assistant',
    location: 'Ontario, Canada',
    category: 'Manufacturing & Production',
    employmentType: 'Full-time',
    isVerifiedVacancy: true,
    description: 'Inspect manufactured goods, measure tolerances using precision gauges, conduct batch testing, and record detailed quality audit logs.',
    responsibilities: [
      'Sample finished production lots and test dimensional parameters against engineering specifications',
      'Utilize calipers, micrometers, pin gauges, and optical comparators with high precision',
      'Tag, quarantine, and document non-conforming batches in statistical process control (SPC) software',
      'Assist the QA Manager in root-cause defect analysis, corrective action plans, and ISO 9001 compliance'
    ],
    qualifications: [
      'Post-secondary diploma in Quality Assurance, Mechanical Engineering Technology, or related science',
      'Ability to read and interpret technical blueprints, engineering drawings, and GD&T specifications',
      'Meticulous documentation standards, analytical critical thinking, and attention to detail',
      'Prior quality inspection experience in an industrial or laboratory setting'
    ],
    experience: '1 - 3 years',
    postedDate: 'Just now',
    workArrangement: 'On-site · Quality Testing Facility',
    cardImage: '/images/careers/quality_control.jpg'
  },

  // 11. Marketing Assistant
  {
    id: 'job-11',
    title: 'Marketing Assistant',
    location: 'Toronto, Ontario',
    category: 'Professional & Technical',
    employmentType: 'Full-time',
    isVerifiedVacancy: true,
    description: 'Support corporate marketing campaigns, draft engaging social media content, design promotional recruitment collateral, and analyze engagement metrics.',
    responsibilities: [
      'Draft compelling copy for LinkedIn, Instagram, newsletters, and digital recruitment announcements',
      'Design clean visual graphics, flyers, and job spotlight banners using Canva and Adobe Creative Suite',
      'Monitor website traffic analytics, applicant conversion rates, and digital ad campaign performance',
      'Assist with organizing regional career fairs, networking events, and employer showcase exhibitions'
    ],
    qualifications: [
      'Degree or diploma in Marketing, Digital Communications, Public Relations, or Graphic Design',
      'Demonstrated portfolio or experience managing professional social media and digital content',
      'Sharp visual aesthetic, creative storytelling ability, and meticulous copywriting attention to detail',
      'Energetic team collaborator who thrives in a fast-paced creative work culture'
    ],
    experience: '1 - 2 years',
    postedDate: '4 days ago',
    workArrangement: 'Hybrid · Toronto Creative Office',
    cardImage: '/images/careers/marketing_assistant.jpg'
  },

  // 12. Junior Accountant
  {
    id: 'job-12',
    title: 'Junior Accountant',
    location: 'Mississauga, Ontario',
    category: 'Professional & Technical',
    employmentType: 'Full-time',
    isVerifiedVacancy: true,
    description: 'Support the corporate accounting department with accounts payable/receivable, bank reconciliations, expense reporting, and general ledger journal entries.',
    responsibilities: [
      'Process vendor invoices, verify department approvals, and prepare scheduled weekly payment batches',
      'Perform monthly bank, corporate credit card, and petty cash account reconciliations',
      'Assist with month-end closing routines, journal entries, and GST/HST tax filing preparations',
      'Maintain structured digital financial audit trails in compliance with Canadian accounting standards'
    ],
    qualifications: [
      'Bachelor’s degree or diploma in Accounting, Finance, or Commerce (actively pursuing CPA is an asset)',
      '1 - 2 years practical bookkeeping, junior accounting, or finance department experience',
      'Strong proficiency with accounting software (QuickBooks, Sage, or NetSuite) and intermediate Excel (VLOOKUP, Pivot)',
      'High mathematical precision, integrity, and absolute discretion with confidential corporate financial data'
    ],
    experience: '1 - 3 years',
    postedDate: '3 days ago',
    workArrangement: 'Hybrid · 3 Days On-site / 2 Days Remote',
    cardImage: '/images/careers/junior_accountant.jpg'
  }
];
