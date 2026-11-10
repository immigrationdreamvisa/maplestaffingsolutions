import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface JobListing {
  id: string;
  title: string;
  location: string;
  category: string;
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Temporary';
  hourlyRate: string;
  isVerifiedVacancy: boolean;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  experience: string;
  postedDate: string;
  workArrangement: string;
  cardImage: string;
}

export interface ApplicationSubmission {
  id: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  currentCountry: string;
  currentCity: string;
  preferredLocation: string;
  preferredJob: string;
  workExperience: string;
  additionalInfo?: string;
  resumeFile?: {
    name: string;
    size: number;
    type: string;
    dataBase64?: string;
  };
  submittedAt: string;
  status: 'New' | 'Under Review' | 'Interview Scheduled' | 'Shortlisted' | 'Placed' | 'Archived';
}

export interface ContactSubmission {
  id: string;
  inquiryType: 'general' | 'employer' | 'candidate';
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  subject: string;
  message: string;
  submittedAt: string;
}

// 25 Sample Listings across 5 Industry Sectors with 16:9 images
const INITIAL_JOBS: JobListing[] = [
  // --- Administration & Office ---
  {
    id: 'job-1',
    title: 'Administrative Assistant',
    location: 'Brampton, Ontario',
    category: 'Administration & Office',
    employmentType: 'Full-time',
    hourlyRate: '$21.00 - $24.50 / hr',
    isVerifiedVacancy: false,
    description: 'Support senior management and staff with scheduling, calendar coordination, document preparation, and executive correspondence.',
    responsibilities: [
      'Manage executive meeting agendas, calendar invitations, and conference room logistics',
      'Prepare quarterly reports, business correspondence, and presentations using MS Office',
      'Coordinate vendor invoices, purchase orders, and office supply replenishment',
      'Serve as a professional point of contact for external corporate partners'
    ],
    qualifications: [
      'High school diploma required; post-secondary diploma in office administration preferred',
      'Proficiency in Microsoft Word, Excel, PowerPoint, and Outlook',
      'Strong organizational, multi-tasking, and professional telephone communication skills',
      'Minimum 1 year of prior administrative or office clerical experience'
    ],
    experience: '1 - 2 years',
    postedDate: '1 day ago',
    workArrangement: 'On-site · Monday to Friday 8:30 AM - 5:00 PM',
    cardImage: '/src/assets/images/cat_office_reception_1794294598540.jpg'
  },
  {
    id: 'job-2',
    title: 'Data Entry Operator',
    location: 'Mississauga, Ontario',
    category: 'Administration & Office',
    employmentType: 'Full-time',
    hourlyRate: '$19.50 - $22.00 / hr',
    isVerifiedVacancy: false,
    description: 'Input high-volume inventory manifests, client records, and transaction logs accurately into digital enterprise databases.',
    responsibilities: [
      'Enter customer account updates and purchase orders into ERP system with high keystroke accuracy',
      'Review source documentation to verify accuracy and resolve discrepancies',
      'Perform regular data cleansing, backups, and file archiving routines',
      'Collaborate with accounting and dispatch teams to reconcile shipment data'
    ],
    qualifications: [
      'Typing speed of 55+ WPM with 98% accuracy benchmark',
      'Familiarity with spreadsheet functions (VLOOKUP, sorting, data validation)',
      'High attention to detail and ability to maintain concentration on repetitive tasks',
      'Strong computer literacy and alphanumeric data entry aptitude'
    ],
    experience: '0 - 1 year',
    postedDate: '2 days ago',
    workArrangement: 'Hybrid · 3 Days On-site / 2 Days Remote',
    cardImage: '/src/assets/images/service_workforce_collaboration_1794294128972.jpg'
  },
  {
    id: 'job-3',
    title: 'Office Coordinator',
    location: 'Toronto, Ontario',
    category: 'Administration & Office',
    employmentType: 'Full-time',
    hourlyRate: '$24.00 - $28.00 / hr',
    isVerifiedVacancy: false,
    description: 'Oversee general office operations, workplace facilities, employee onboarding logistics, and company event coordination.',
    responsibilities: [
      'Oversee day-to-day office facility needs, mail handling, and equipment servicing',
      'Organize team onboarding packages, workspace setups, and security access passes',
      'Liaise with building management, cleaning contractors, and maintenance personnel',
      'Plan company team gatherings, catering arrangements, and client hospitality'
    ],
    qualifications: [
      'College diploma in Business Administration, Communications, or related discipline',
      '2+ years experience in workplace coordination or executive office management',
      'Proactive problem-solver with exceptional interpersonal and verbal communication skills',
      'Demonstrated budget management and invoice reconciliation experience'
    ],
    experience: '2 - 4 years',
    postedDate: '3 days ago',
    workArrangement: 'On-site · Downtown Toronto Office',
    cardImage: '/src/assets/images/hero_diverse_professionals_1794294127960.jpg'
  },
  {
    id: 'job-4',
    title: 'Receptionist',
    location: 'Brampton, Ontario',
    category: 'Administration & Office',
    employmentType: 'Part-time',
    hourlyRate: '$18.50 - $21.00 / hr',
    isVerifiedVacancy: false,
    description: 'Provide an exceptional welcoming first impression for corporate visitors, answer incoming phone inquiries, and route calls.',
    responsibilities: [
      'Greet corporate clients, job candidates, and visitors with warmth and professionalism',
      'Manage multi-line switchboard, screen calls, and take detailed telephone messages',
      'Receive, sort, and distribute incoming courier packages and daily mail',
      'Maintain a pristine, organized executive reception area and visitor sign-in log'
    ],
    qualifications: [
      'Polished interpersonal presentation and warm customer-centric demeanor',
      'Experience operating multi-line telephone switchboards',
      'Basic proficiency in Microsoft Office and digital scheduling calendars',
      'Fluent verbal and written English communication skills'
    ],
    experience: '1+ year',
    postedDate: 'Just now',
    workArrangement: 'On-site · Morning & Afternoon Shifts Available',
    cardImage: '/src/assets/images/cat_office_reception_1794294598540.jpg'
  },
  {
    id: 'job-5',
    title: 'Customer Service Representative',
    location: 'Greater Toronto Area',
    category: 'Administration & Office',
    employmentType: 'Full-time',
    hourlyRate: '$20.00 - $23.50 / hr',
    isVerifiedVacancy: false,
    description: 'Deliver responsive customer care via telephone, email, and live ticketing for Canadian client accounts.',
    responsibilities: [
      'Resolve client product inquiries, shipping delivery updates, and order changes',
      'Log customer support tickets and follow up on escalated service issues',
      'Provide accurate information on service policies, warranties, and return guidelines',
      'Maintain average customer satisfaction scores above 92%'
    ],
    qualifications: [
      'Prior call center or retail customer service experience is an asset',
      'Active listening skills with empathetic, solution-oriented phone presence',
      'Familiarity with CRM ticketing software (Zendesk, Salesforce, or Freshdesk)',
      'Ability to navigate multiple software screens while speaking with clients'
    ],
    experience: '1 - 2 years',
    postedDate: '4 days ago',
    workArrangement: 'On-site · Rotating Schedule (Mon - Sat)',
    cardImage: '/src/assets/images/service_recruiter_interview_1794294128994.jpg'
  },

  // --- Warehousing & Logistics ---
  {
    id: 'job-6',
    title: 'Warehouse Associate',
    location: 'Brampton, Ontario',
    category: 'Warehousing & Logistics',
    employmentType: 'Full-time',
    hourlyRate: '$19.00 - $21.50 / hr',
    isVerifiedVacancy: false,
    description: 'Fulfill pick and pack orders, receive freight skids, and organize inventory in a clean distribution facility.',
    responsibilities: [
      'Pick customer orders accurately using RF barcode scanners and pick-to-light systems',
      'Inspect incoming cartons for damage, count quantities, and verify bill of lading',
      'Wrap, palletize, and stage outbound shipments for daily carrier pick-up',
      'Maintain strict compliance with Ontario health and safety standards'
    ],
    qualifications: [
      'Comfortable lifting up to 45 lbs safely and walking throughout shift',
      'CSA-approved steel-toe footwear (green triangle)',
      'Previous distribution center or stock replenishment experience preferred',
      'Punctual and reliable team player with positive attitude'
    ],
    experience: 'Entry to Mid',
    postedDate: '1 day ago',
    workArrangement: 'On-site · Day & Afternoon Shifts',
    cardImage: '/src/assets/images/industry_logistics_warehouse_1794292533090.jpg'
  },
  {
    id: 'job-7',
    title: 'Inventory Control Assistant',
    location: 'Mississauga, Ontario',
    category: 'Warehousing & Logistics',
    employmentType: 'Full-time',
    hourlyRate: '$21.00 - $24.00 / hr',
    isVerifiedVacancy: false,
    description: 'Perform scheduled inventory cycle counts, audit warehouse bay locations, and reconcile SAP ERP balances.',
    responsibilities: [
      'Conduct daily physical cycle counts across assigned racking aisles',
      'Investigate SKU variance, damaged products, and misplaced bin locations',
      'Generate discrepancy variance reports for logistics management',
      'Assist with annual physical inventory auditing and vendor return procedures'
    ],
    qualifications: [
      '1+ years experience in inventory auditing or warehouse stock control',
      'Proficiency in SAP, Manhattan, or Oracle WMS applications',
      'Intermediate spreadsheet skills for numerical reconciliation',
      'High attention to detail and analytical problem-solving mindset'
    ],
    experience: '1 - 3 years',
    postedDate: '2 days ago',
    workArrangement: 'On-site · Day Shift (7:00 AM - 3:30 PM)',
    cardImage: '/src/assets/images/industry_logistics_warehouse_1794292533090.jpg'
  },
  {
    id: 'job-8',
    title: 'Forklift Operator',
    location: 'Brampton, Ontario',
    category: 'Warehousing & Logistics',
    employmentType: 'Full-time',
    hourlyRate: '$22.00 - $25.50 / hr',
    isVerifiedVacancy: false,
    description: 'Operate Raymond Reach, Walkie, and Counterbalance equipment to navigate high-density pallet racking safely.',
    responsibilities: [
      'Maneuver Raymond Reach equipment across narrow aisles to store and retrieve skids',
      'Conduct daily pre-shift equipment safety checklist and battery charging maintenance',
      'Stage pallets in staging lanes for transport trailers according to load sequence',
      'Observe facility pedestrian speed limits and horn sounding protocols'
    ],
    qualifications: [
      'Valid Forklift Certification (Counterbalance, Raymond Reach, or Walkie)',
      'Minimum 1 year verifiable experience operating equipment in high-bay facility',
      'Exceptional depth perception and clean workplace safety record',
      'Valid CSA-approved steel-toe boots and high-visibility vest'
    ],
    experience: '1 - 3 years',
    postedDate: '3 days ago',
    workArrangement: 'On-site · Continental 12-hr Day & Night Shifts',
    cardImage: '/src/assets/images/industry_logistics_warehouse_1794292533090.jpg'
  },
  {
    id: 'job-9',
    title: 'Shipping and Receiving Associate',
    location: 'Toronto, Ontario',
    category: 'Warehousing & Logistics',
    employmentType: 'Full-time',
    hourlyRate: '$20.50 - $23.00 / hr',
    isVerifiedVacancy: false,
    description: 'Coordinate freight carrier check-in, inspect inbound bills of lading, and prepare outbound international shipping documents.',
    responsibilities: [
      'Inspect incoming freight containers and cross-check packing slips with purchase orders',
      'Prepare bills of lading, customs manifests, and courier shipping labels (FedEx/UPS)',
      'Assign loading dock doors to arriving freight carriers and verify trailer wheel chocks',
      'Maintain accurate logbooks of daily trailer arrivals and departures'
    ],
    qualifications: [
      'Prior experience in shipping/receiving logistics or freight coordination',
      'Familiarity with logistics documentation, BOLs, and customs paperwork',
      'Computer proficiency in logistics ERP and carrier web portals',
      'Comfortable working in a busy dock environment'
    ],
    experience: '1 - 2 years',
    postedDate: '4 days ago',
    workArrangement: 'On-site · Morning Shift (6:00 AM - 2:30 PM)',
    cardImage: '/src/assets/images/industry_logistics_warehouse_1794292533090.jpg'
  },
  {
    id: 'job-10',
    title: 'Logistics Coordinator',
    location: 'Mississauga, Ontario',
    category: 'Warehousing & Logistics',
    employmentType: 'Contract',
    hourlyRate: '$25.00 - $29.00 / hr',
    isVerifiedVacancy: false,
    description: 'Track freight dispatch schedules, communicate with transport carriers, and optimize delivery route timelines.',
    responsibilities: [
      'Monitor nationwide freight shipments and expedite priority transit requests',
      'Negotiate spot rates with third-party freight carriers and coordinate linehauls',
      'Resolve in-transit delays, customs clearances, and dock appointment scheduling',
      'Provide clients with real-time tracking milestones and delivery confirmations'
    ],
    qualifications: [
      'College diploma or degree in Supply Chain Management or Logistics',
      '2+ years experience in 3PL transportation coordination or freight forwarding',
      'Strong negotiation, analytical, and interpersonal skills',
      'Working knowledge of Canadian freight corridors and cross-border customs'
    ],
    experience: '2 - 4 years',
    postedDate: '5 days ago',
    workArrangement: 'On-site · Mississauga Logistics Terminal',
    cardImage: '/src/assets/images/service_hr_employer_solutions_1794294129678.jpg'
  },

  // --- Manufacturing & Production ---
  {
    id: 'job-11',
    title: 'Production Associate',
    location: 'Brampton, Ontario',
    category: 'Manufacturing & Production',
    employmentType: 'Full-time',
    hourlyRate: '$19.50 - $22.50 / hr',
    isVerifiedVacancy: false,
    description: 'Operate automated production assembly stations, inspect finished components, and maintain plant cleanliness.',
    responsibilities: [
      'Assemble precision mechanical sub-components according to visual work instructions',
      'Perform quality checks on finished goods to identify surface flaws or defects',
      'Feed raw materials into automated stamping and molding machines',
      'Participate in 5S workplace organization and lean manufacturing practices'
    ],
    qualifications: [
      'High school diploma or Canadian secondary equivalent',
      'Previous manufacturing or light assembly experience preferred',
      'Attention to detail, hand dexterity, and commitment to plant safety rules',
      'Comfortable standing for extended shift durations'
    ],
    experience: 'Entry to 1 year',
    postedDate: '1 day ago',
    workArrangement: 'On-site · Rotating Shifts (Day / Afternoon / Night)',
    cardImage: '/src/assets/images/industry_advanced_manufacturing_1794292533879.jpg'
  },
  {
    id: 'job-12',
    title: 'Packaging Associate',
    location: 'Mississauga, Ontario',
    category: 'Manufacturing & Production',
    employmentType: 'Full-time',
    hourlyRate: '$18.50 - $21.00 / hr',
    isVerifiedVacancy: false,
    description: 'Package food-grade items and consumer goods along conveyor lines adhering strictly to GMP and hygiene regulations.',
    responsibilities: [
      'Operate automated cartoning, sealing, and labeling machinery on high-speed lines',
      'Inspect printed expiration dates, lot numbers, and barcode readability',
      'Pack retail-ready display cartons and build master shipping skids',
      'Adhere to sanitation, hairnet, and clean-room health protocols'
    ],
    qualifications: [
      'Familiarity with GMP (Good Manufacturing Practices) or food packaging standards',
      'Fine motor skills and ability to keep pace with conveyor belts',
      'Dependable attendance and positive team communication',
      'CSA steel-toe shoes required'
    ],
    experience: '0 - 1 year',
    postedDate: '2 days ago',
    workArrangement: 'On-site · Monday to Friday Day Shift',
    cardImage: '/src/assets/images/industry_advanced_manufacturing_1794292533879.jpg'
  },
  {
    id: 'job-13',
    title: 'Quality Control Assistant',
    location: 'Ontario, Canada',
    category: 'Manufacturing & Production',
    employmentType: 'Full-time',
    hourlyRate: '$22.50 - $26.00 / hr',
    isVerifiedVacancy: false,
    description: 'Sample production batches, measure dimensional tolerances using calipers and micrometers, and record QA audit logs.',
    responsibilities: [
      'Collect finished parts at predetermined intervals for physical and mechanical testing',
      'Record measurement data in statistical process control (SPC) software',
      'Tag and quarantine non-conforming lots and notify production supervisors',
      'Assist QA manager in root-cause defect investigations and ISO 9001 audits'
    ],
    qualifications: [
      'Diploma in Quality Assurance, Mechanical Technology, or related field',
      'Ability to read technical engineering drawings and GD&T symbols',
      'Familiarity with calipers, height gauges, micrometers, and torque wrenches',
      'Meticulous record-keeping and analytical documentation skills'
    ],
    experience: '1 - 3 years',
    postedDate: '3 days ago',
    workArrangement: 'On-site · Clean Industrial Facility',
    cardImage: '/src/assets/images/industry_advanced_manufacturing_1794292533879.jpg'
  },
  {
    id: 'job-14',
    title: 'Machine Operator',
    location: 'Brampton, Ontario',
    category: 'Manufacturing & Production',
    employmentType: 'Full-time',
    hourlyRate: '$21.50 - $25.00 / hr',
    isVerifiedVacancy: false,
    description: 'Set up, calibrate, and operate automated stamping, CNC cutting, or extruding machinery in an advanced manufacturing plant.',
    responsibilities: [
      'Perform tool changes and calibration adjustments according to daily production run specs',
      'Monitor machine gauges, cycle times, and temperature readouts to prevent malfunctions',
      'Conduct routine preventative maintenance, cleaning, and lubrication on equipment',
      'Document cycle throughput and material scrap rates at end of shift'
    ],
    qualifications: [
      '1+ years verifiable experience operating automated industrial production machinery',
      'Mechanical aptitude and ability to perform basic tool changes safely',
      'Committed adherence to lockout/tagout (LOTO) safety protocols',
      'High school diploma or technical vocational training'
    ],
    experience: '1 - 3 years',
    postedDate: '4 days ago',
    workArrangement: 'On-site · Continental Shifts',
    cardImage: '/src/assets/images/industry_advanced_manufacturing_1794292533879.jpg'
  },
  {
    id: 'job-15',
    title: 'Assembly Line Worker',
    location: 'Toronto, Ontario',
    category: 'Manufacturing & Production',
    employmentType: 'Temporary',
    hourlyRate: '$18.50 - $20.50 / hr',
    isVerifiedVacancy: false,
    description: 'Assemble commercial fixtures, electronics enclosures, and automotive components using power drivers and fasteners.',
    responsibilities: [
      'Fasten parts using pneumatic screwdrivers, torque tools, and manual clamps',
      'Verify that components align properly and meet production quality standards',
      'Pass assembled units along line to next workstation in a coordinated pace',
      'Keep work bench clean and report defective components immediately'
    ],
    qualifications: [
      'Good physical coordination, manual dexterity, and stamina',
      'Ability to follow step-by-step assembly diagrams and verbal instructions',
      'Punctual and available for immediate start dates',
      'Steel-toe safety footwear required'
    ],
    experience: 'Entry Level',
    postedDate: '5 days ago',
    workArrangement: 'On-site · Day Shift (7:00 AM - 3:30 PM)',
    cardImage: '/src/assets/images/industry_advanced_manufacturing_1794292533879.jpg'
  },

  // --- Hospitality & Retail ---
  {
    id: 'job-16',
    title: 'Retail Sales Associate',
    location: 'Toronto, Ontario',
    category: 'Hospitality & Retail',
    employmentType: 'Part-time',
    hourlyRate: '$17.50 - $19.50 / hr',
    isVerifiedVacancy: false,
    description: 'Engage shoppers warmly, provide tailored product advice, manage cash register POS transactions, and restock merchandise.',
    responsibilities: [
      'Provide an inviting shopping experience by greeting customers and offering style advice',
      'Operate digital POS cash registers and process cash, debit, and credit transactions',
      'Maintain folded apparel displays, visual merchandising standards, and fitting rooms',
      'Assist with receiving inventory shipments and security sensor tagging'
    ],
    qualifications: [
      'Energetic, friendly customer-oriented personality with passion for retail',
      'Cash handling experience and familiarity with retail POS systems',
      'Flexible availability including weekends, evenings, and holiday periods',
      'Strong interpersonal and English verbal communication skills'
    ],
    experience: '6 months - 1 year',
    postedDate: '1 day ago',
    workArrangement: 'On-site · Downtown Toronto Shopping Center',
    cardImage: '/src/assets/images/cat_retail_store_1794294597267.jpg'
  },
  {
    id: 'job-17',
    title: 'Store Associate',
    location: 'Mississauga, Ontario',
    category: 'Hospitality & Retail',
    employmentType: 'Full-time',
    hourlyRate: '$18.00 - $20.50 / hr',
    isVerifiedVacancy: false,
    description: 'Maintain store inventory replenishment, assist customers on retail floor, and support stockroom receiving.',
    responsibilities: [
      'Replenish shelves, check inventory expiry dates, and ensure facing consistency',
      'Guide shoppers to product aisles and answer questions regarding store promotions',
      'Unload daily delivery pallets and stage backroom stock neatly',
      'Assist cashiers during peak customer rush hours'
    ],
    qualifications: [
      'Positive work ethic, punctuality, and helpful attitude',
      'Ability to lift up to 35 lbs while restocking shelves',
      'Comfortable standing and walking on retail sales floor',
      'Eligible to work in Ontario'
    ],
    experience: '0 - 1 year',
    postedDate: '2 days ago',
    workArrangement: 'On-site · Day & Evening Shifts',
    cardImage: '/src/assets/images/cat_retail_store_1794294597267.jpg'
  },
  {
    id: 'job-18',
    title: 'Hotel Front Desk Associate',
    location: 'Toronto, Ontario',
    category: 'Hospitality & Retail',
    employmentType: 'Full-time',
    hourlyRate: '$20.00 - $23.00 / hr',
    isVerifiedVacancy: false,
    description: 'Welcome hotel guests, manage reservations in Opera PMS, handle check-in/out procedures, and provide local concierge advice.',
    responsibilities: [
      'Check guests in and out, assign room keys, and verify credit card authorizations',
      'Coordinate with housekeeping and maintenance teams to ensure guest satisfaction',
      'Answer guest inquiries regarding dining, transit, and local tourist attractions',
      'Handle billing adjustments, special room requests, and VIP guest accommodations'
    ],
    qualifications: [
      'Diploma in Hospitality Management or equivalent customer service experience',
      'Familiarity with hotel property management systems (Opera, Marriott PMS, or similar)',
      'Impeccable professional grooming, poise, and hospitality etiquette',
      'Excellent problem resolution skills under pressure'
    ],
    experience: '1 - 2 years',
    postedDate: '3 days ago',
    workArrangement: 'On-site · Upscale Hotel Property (Downtown Toronto)',
    cardImage: '/src/assets/images/cat_hospitality_hotel_1794294596916.jpg'
  },
  {
    id: 'job-19',
    title: 'Housekeeping Associate',
    location: 'Brampton, Ontario',
    category: 'Hospitality & Retail',
    employmentType: 'Part-time',
    hourlyRate: '$17.50 - $19.50 / hr',
    isVerifiedVacancy: false,
    description: 'Clean and sanitize guest rooms, change linens, replenish bathroom amenities, and maintain pristine public hotel areas.',
    responsibilities: [
      'Thoroughly clean and sanitize guest rooms according to established hospitality protocols',
      'Strip and remake beds with fresh hotel-grade linens and towels',
      'Dust furniture, vacuum carpets, mop bathroom tiles, and restock amenities',
      'Report maintenance deficiencies or lost-and-found items promptly'
    ],
    qualifications: [
      'Meticulous eye for cleanliness and sanitation standards',
      'Physical stamina to handle room turnover quotas in a timely manner',
      'Reliable, respectful, and mindful of guest privacy',
      'Prior hotel housekeeping or commercial cleaning experience preferred'
    ],
    experience: '0 - 1 year',
    postedDate: '4 days ago',
    workArrangement: 'On-site · Day Shifts (8:30 AM - 4:30 PM)',
    cardImage: '/src/assets/images/cat_hospitality_hotel_1794294596916.jpg'
  },
  {
    id: 'job-20',
    title: 'Food Service Assistant',
    location: 'Greater Toronto Area',
    category: 'Hospitality & Retail',
    employmentType: 'Temporary',
    hourlyRate: '$17.50 - $19.00 / hr',
    isVerifiedVacancy: false,
    description: 'Support cafeteria and catering operations with meal staging, table setup, food temperature logging, and dishwashing.',
    responsibilities: [
      'Assist chefs with basic vegetable washing, portioning, and tray preparation',
      'Set up buffet serving lines, beverage dispensers, and dining utensils',
      'Maintain kitchen sanitation and operate commercial dishwashing machines',
      'Follow Food Handler and public health hygiene standards strictly'
    ],
    qualifications: [
      'Ontario Food Handler Certification is an asset (or willing to obtain)',
      'Friendly customer service attitude during food service hours',
      'Ability to stand on feet in commercial kitchen environment',
      'Slip-resistant footwear required'
    ],
    experience: 'Entry Level',
    postedDate: 'Just now',
    workArrangement: 'On-site · Morning & Lunch Shifts',
    cardImage: '/src/assets/images/cat_hospitality_hotel_1794294596916.jpg'
  },

  // --- Professional & Technical ---
  {
    id: 'job-21',
    title: 'IT Support Assistant',
    location: 'Toronto, Ontario',
    category: 'Professional & Technical',
    employmentType: 'Full-time',
    hourlyRate: '$25.00 - $30.00 / hr',
    isVerifiedVacancy: false,
    description: 'Provide helpdesk technical assistance for desktop workstations, network connectivity, user accounts, and peripherals.',
    responsibilities: [
      'Respond to employee hardware/software helpdesk tickets via Jira or ServiceNow',
      'Configure and deploy Windows 11/Mac laptops, monitors, and VoIP desk phones',
      'Troubleshoot network printer connectivity, VPN access, and Office 365 permissions',
      'Maintain an organized inventory of company IT assets, licenses, and cables'
    ],
    qualifications: [
      'Diploma or degree in Computer Science, Information Technology, or CompTIA A+ certification',
      'Working knowledge of Active Directory, Windows OS, macOS, and Microsoft 365 admin',
      'Patient, customer-first approach to troubleshooting non-technical user issues',
      'Strong diagnostic aptitude and eagerness to learn cloud environments'
    ],
    experience: '1 - 2 years',
    postedDate: '1 day ago',
    workArrangement: 'On-site / Hybrid · Tech Office',
    cardImage: '/src/assets/images/cat_it_technology_1794294598174.jpg'
  },
  {
    id: 'job-22',
    title: 'Junior Accountant',
    location: 'Mississauga, Ontario',
    category: 'Professional & Technical',
    employmentType: 'Full-time',
    hourlyRate: '$26.00 - $32.00 / hr',
    isVerifiedVacancy: false,
    description: 'Assist controller with accounts payable/receivable, bank reconciliations, expense audits, and monthly journal entries.',
    responsibilities: [
      'Process vendor invoices, verify approval sign-offs, and prepare scheduled check runs',
      'Reconcile monthly bank accounts and corporate credit card expense statements',
      'Assist with month-end closing entries, trial balance verification, and GST/HST filings',
      'Maintain clean digital audit trails for external financial reviews'
    ],
    qualifications: [
      'Bachelor’s degree in Accounting, Finance, or Commerce (pursuing CPA designation an asset)',
      '1+ years experience in general bookkeeping or junior accounting role',
      'Strong proficiency in QuickBooks, Sage 50, or NetSuite, and advanced Excel',
      'High numerical acumen and confidentiality with sensitive payroll data'
    ],
    experience: '1 - 3 years',
    postedDate: '2 days ago',
    workArrangement: 'Hybrid · 3 Days On-site / 2 Days Remote',
    cardImage: '/src/assets/images/cat_finance_accounting_1794294598325.jpg'
  },
  {
    id: 'job-23',
    title: 'HR Assistant',
    location: 'Brampton, Ontario',
    category: 'Professional & Technical',
    employmentType: 'Contract',
    hourlyRate: '$23.00 - $27.00 / hr',
    isVerifiedVacancy: false,
    description: 'Support human resources department with candidate pre-screening, interview scheduling, new-hire paperwork, and employee files.',
    responsibilities: [
      'Screen resumes against job requisitions and conduct initial phone interviews',
      'Schedule interviews between hiring managers and prospective candidates',
      'Coordinate background checks, reference calls, and digital employment contracts',
      'Maintain confidential digital employee personnel files in HRIS software'
    ],
    qualifications: [
      'Post-secondary certificate or diploma in Human Resources Management (CHRP candidate)',
      'Understanding of Ontario Employment Standards Act (ESA) and workplace human rights',
      'Discretion, empathy, and professional verbal and written communication',
      'Proficiency in ATS (Applicant Tracking Systems) and MS Office'
    ],
    experience: '1 - 2 years',
    postedDate: '3 days ago',
    workArrangement: 'On-site · Brampton Corporate Office',
    cardImage: '/src/assets/images/service_hr_employer_solutions_1794294129678.jpg'
  },
  {
    id: 'job-24',
    title: 'Marketing Assistant',
    location: 'Toronto, Ontario',
    category: 'Professional & Technical',
    employmentType: 'Full-time',
    hourlyRate: '$24.00 - $28.00 / hr',
    isVerifiedVacancy: false,
    description: 'Assist marketing team with social media scheduling, digital campaigns, recruitment flyers, and industry event planning.',
    responsibilities: [
      'Draft engaging copy for LinkedIn, Instagram, and corporate job postings',
      'Design clean promotional graphics and hiring collateral using Canva or Adobe Creative Suite',
      'Track website traffic metrics, job application clicks, and ad campaign performance',
      'Coordinate logistics for corporate job fairs, campus hiring, and trade exhibitions'
    ],
    qualifications: [
      'Degree or diploma in Marketing, Digital Media, or Public Relations',
      'Experience managing branded social media accounts and email marketing platforms',
      'Strong eye for graphic layout, copywriting, and visual brand consistency',
      'Organized, energetic, and collaborative team player'
    ],
    experience: '1 - 2 years',
    postedDate: '4 days ago',
    workArrangement: 'Hybrid · Toronto Creative Office',
    cardImage: '/src/assets/images/careers_talent_success_1794294130524.jpg'
  },
  {
    id: 'job-25',
    title: 'Customer Support Specialist',
    location: 'Greater Toronto Area',
    category: 'Professional & Technical',
    employmentType: 'Full-time',
    hourlyRate: '$22.00 - $26.00 / hr',
    isVerifiedVacancy: false,
    description: 'Provide technical troubleshooting and account resolution for software users, answering tier-2 tickets via chat and phone.',
    responsibilities: [
      'Investigate complex customer software issues and guide users through step-by-step resolution',
      'Collaborate with product and engineering teams to document bug reports and feature requests',
      'Author user knowledge-base articles and FAQ documentation to facilitate self-service',
      'Meet team SLA response targets while maintaining high customer satisfaction'
    ],
    qualifications: [
      '2+ years experience in technical support, software customer success, or SaaS helpdesk',
      'Excellent analytical thinking and clear technical writing ability',
      'Comfortable learning new software dashboards and API troubleshooting tools',
      'Patient and empathetic problem-solver'
    ],
    experience: '2+ years',
    postedDate: 'Just now',
    workArrangement: 'On-site / Hybrid · GTA Tech Hub',
    cardImage: '/src/assets/images/service_workforce_collaboration_1794294128972.jpg'
  }
];

let jobsData: JobListing[] = [...INITIAL_JOBS];
let applicationsData: ApplicationSubmission[] = [];
let contactMessagesData: ContactSubmission[] = [];

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));

  // API Routes
  app.get('/api/jobs', (_req: Request, res: Response) => {
    res.json({
      success: true,
      count: jobsData.length,
      data: jobsData
    });
  });

  app.post('/api/jobs', (req: Request, res: Response) => {
    const { title, location, category, employmentType, hourlyRate, description, responsibilities, qualifications, experience, isVerifiedVacancy, workArrangement, cardImage } = req.body;

    if (!title || !location || !category) {
      return res.status(400).json({ success: false, error: 'Title, location, and category are required.' });
    }

    const newJob: JobListing = {
      id: `job-${Date.now()}`,
      title: String(title).trim(),
      location: String(location).trim(),
      category: String(category).trim(),
      employmentType: (employmentType as any) || 'Full-time',
      hourlyRate: hourlyRate || '$20.00 - $24.00 / hr',
      isVerifiedVacancy: Boolean(isVerifiedVacancy),
      description: description || 'New career opportunity at Maple Staffing Solutions.',
      responsibilities: Array.isArray(responsibilities) ? responsibilities : (responsibilities ? String(responsibilities).split('\n').filter(Boolean) : ['Fulfill designated operational duties with safety.']),
      qualifications: Array.isArray(qualifications) ? qualifications : (qualifications ? String(qualifications).split('\n').filter(Boolean) : ['Eligible to work in Canada.']),
      experience: experience || 'Entry to Mid-Level',
      postedDate: 'Just now',
      workArrangement: workArrangement || 'On-site',
      cardImage: cardImage || '/src/assets/images/service_workforce_collaboration_1794294128972.jpg'
    };

    jobsData.unshift(newJob);
    return res.status(201).json({ success: true, data: newJob });
  });

  app.put('/api/jobs/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const index = jobsData.findIndex(j => j.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Job not found' });
    }

    jobsData[index] = {
      ...jobsData[index],
      ...req.body,
      id
    };

    return res.json({ success: true, data: jobsData[index] });
  });

  app.delete('/api/jobs/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const initialLength = jobsData.length;
    jobsData = jobsData.filter(j => j.id !== id);
    if (jobsData.length === initialLength) {
      return res.status(404).json({ success: false, error: 'Job not found' });
    }
    return res.json({ success: true, message: 'Job deleted successfully' });
  });

  app.post('/api/applications', (req: Request, res: Response) => {
    const {
      jobId,
      jobTitle,
      fullName,
      email,
      phone,
      currentCountry,
      currentCity,
      preferredLocation,
      preferredJob,
      workExperience,
      additionalInfo,
      resumeFile
    } = req.body;

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ success: false, error: 'Full name is required.' });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'A valid email address is required.' });
    }
    if (!phone || phone.trim().length < 7) {
      return res.status(400).json({ success: false, error: 'A valid contact phone number is required.' });
    }
    if (!currentCountry || !currentCountry.trim()) {
      return res.status(400).json({ success: false, error: 'Current country is required.' });
    }
    if (!currentCity || !currentCity.trim()) {
      return res.status(400).json({ success: false, error: 'Current city is required.' });
    }

    if (resumeFile) {
      const allowedExtensions = ['.pdf', '.doc', '.docx'];
      const fileNameLower = (resumeFile.name || '').toLowerCase();
      const hasValidExt = allowedExtensions.some(ext => fileNameLower.endsWith(ext));
      if (!hasValidExt) {
        return res.status(400).json({ success: false, error: 'Resume must be in PDF, DOC, or DOCX format.' });
      }
      if (resumeFile.size && resumeFile.size > 10 * 1024 * 1024) {
        return res.status(400).json({ success: false, error: 'Resume file size cannot exceed 10 MB.' });
      }
    }

    const applicationRef = `MSS-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const newApplication: ApplicationSubmission = {
      id: applicationRef,
      jobId: jobId || 'general-pool',
      jobTitle: jobTitle || preferredJob || 'General Application',
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      currentCountry: currentCountry.trim(),
      currentCity: currentCity.trim(),
      preferredLocation: preferredLocation ? preferredLocation.trim() : 'Ontario (GTA)',
      preferredJob: preferredJob ? preferredJob.trim() : (jobTitle || 'Any suitable role'),
      workExperience: workExperience || 'Not specified',
      additionalInfo: additionalInfo || '',
      resumeFile: resumeFile ? {
        name: resumeFile.name,
        size: resumeFile.size,
        type: resumeFile.type,
        dataBase64: resumeFile.dataBase64
      } : undefined,
      submittedAt: new Date().toISOString(),
      status: 'New'
    };

    applicationsData.unshift(newApplication);

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully to Maple Staffing Solutions.',
      referenceNumber: applicationRef,
      application: {
        id: newApplication.id,
        fullName: newApplication.fullName,
        jobTitle: newApplication.jobTitle,
        submittedAt: newApplication.submittedAt,
        status: newApplication.status
      }
    });
  });

  app.get('/api/applications', (_req: Request, res: Response) => {
    res.json({
      success: true,
      count: applicationsData.length,
      data: applicationsData
    });
  });

  app.patch('/api/applications/:id/status', (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    const appItem = applicationsData.find(a => a.id === id);
    if (!appItem) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }

    if (!['New', 'Under Review', 'Interview Scheduled', 'Shortlisted', 'Placed', 'Archived'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid application status' });
    }

    appItem.status = status;
    return res.json({ success: true, data: appItem });
  });

  app.post('/api/contact', (req: Request, res: Response) => {
    const { inquiryType, fullName, email, phone, companyName, subject, message } = req.body;

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ success: false, error: 'Full name is required.' });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'A valid email address is required.' });
    }
    if (!message || message.trim().length < 10) {
      return res.status(400).json({ success: false, error: 'Please provide a message with at least 10 characters.' });
    }

    const ticketId = `MSS-MSG-${Math.floor(10000 + Math.random() * 90000)}`;
    const submission: ContactSubmission = {
      id: ticketId,
      inquiryType: inquiryType || 'general',
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      companyName: companyName ? companyName.trim() : '',
      subject: subject ? subject.trim() : 'General Inquiry',
      message: message.trim(),
      submittedAt: new Date().toISOString()
    };

    contactMessagesData.unshift(submission);

    return res.status(201).json({
      success: true,
      ticketId,
      message: 'Thank you for reaching out to Maple Staffing Solutions. Our recruitment team will review your inquiry and follow up promptly.'
    });
  });

  app.get('/api/contact', (_req: Request, res: Response) => {
    res.json({
      success: true,
      count: contactMessagesData.length,
      data: contactMessagesData
    });
  });

  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Maple Staffing Solutions platform running on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
