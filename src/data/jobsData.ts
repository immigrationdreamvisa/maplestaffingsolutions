import { JobListing } from "../types";

/**
 * ============================================================================
 * MAPLE STAFFING SOLUTIONS – CENTRALIZED JOBS DATA SOURCE OF TRUTH
 * ============================================================================
 *
 * 📄 HOW TO CRUD (CREATE, READ, UPDATE, DELETE) JOBS IN THIS SINGLE FILE:
 *
 * ➕ CREATE A NEW JOB:
 *    Add a new object inside the `DEFAULT_JOBS` array below following the JobListing format.
 *
 * ✏️ UPDATE AN EXISTING JOB:
 *    Find the job by its `id` (e.g. 'job-ca-1', 'job-au-1') and update any properties
 *    such as `title`, `hourlyRate`, `salary`, `country`, `location`, `visaSponsorship`, etc.
 *
 * ❌ DELETE A JOB:
 *    Remove the job object from the `DEFAULT_JOBS` array.
 *
 * 💡 NO BACKEND REQUIRED:
 *    This file powers both the frontend and any optional backend. When users add, edit,
 *    or delete jobs via the web Recruiter Portal, changes are saved to browser localStorage
 *    and can be exported as clean JSON at any time.
 * ============================================================================
 */

export const DEFAULT_JOBS: JobListing[] = [
  // ==========================================================================
  // 🇨🇦 CANADA OPPORTUNITIES
  // ==========================================================================
  {
    id: "job-ca-1",
    title: "Customer Service Representative",
    location: "Brampton, Ontario",
    city: "Brampton",
    country: "Canada",
    countryCode: "CA",
    countryFlag: "🇨🇦",
    category: "Administration & Office",
    employmentType: "Full-time",
    isVerifiedVacancy: true,
    visaSponsorship: "Open to International Candidates",
    experienceLevel: "Entry Level",
    description:
      "Deliver responsive, compassionate customer care and account support across inbound phone, email, and live communication channels in a modern corporate campus.",
    responsibilities: [
      "Manage incoming customer inquiries, account verifications, and order tracking via multi-line headset systems",
      "Provide accurate policy guidance, service scheduling, and product documentation with empathetic communication",
      "Log and resolve customer support tickets within established enterprise SLA response targets",
      "Collaborate with cross-functional team leads to escalate complex client account inquiries smoothly",
    ],
    qualifications: [
      "Demonstrated customer support, call center, or client services experience",
      "Active listening skills with clear, courteous verbal articulation and professional telephone etiquette",
      "Familiarity with CRM ticketing platforms (Zendesk, Salesforce, or Microsoft Dynamics)",
      "High school diploma required; post-secondary coursework in communications or business an asset",
    ],
    experience: "1 - 2 years",
    postedDate: "Just now",
    workArrangement: "Hybrid · 3 Days On-site / 2 Days Remote",
    cardImage: "/images/careers/customer_service.jpg",
    benefits: [
      "Comprehensive Dental & Health",
      "Paid Training",
      "Weekly Direct Deposit",
      "Transit Subsidy",
    ],
  },
  {
    id: "job-ca-2",
    title: "Executive Administrative Coordinator",
    location: "Mississauga, Ontario",
    city: "Mississauga",
    country: "Canada",
    countryCode: "CA",
    countryFlag: "🇨🇦",
    category: "Administration & Office",
    employmentType: "Full-time",
    isVerifiedVacancy: true,
    visaSponsorship: "Domestic Candidates Only",
    experienceLevel: "Mid Level",
    description:
      "Provide executive coordination, calendar scheduling, board presentation preparation, and office operational leadership in a corporate financial headquarters.",
    responsibilities: [
      "Coordinate executive schedules, organize board agendas, and oversee corporate travel reservations",
      "Prepare polished executive correspondence, financial summaries, and presentation slide decks",
      "Manage vendor billings, office supply replenishment, and departmental expense reports",
      "Welcome visiting corporate clients and prospective talent with warmth and executive professionalism",
    ],
    qualifications: [
      "Post-secondary diploma in Office Administration, Business Management, or equivalent experience",
      "Advanced proficiency in Microsoft 365 (Word, Excel, PowerPoint, Teams)",
      "Exceptional organizational capabilities, discretion with confidential files, and deadline management",
      "Minimum 2 years of corporate administrative or office coordination experience",
    ],
    experience: "2 - 3 years",
    postedDate: "1 day ago",
    workArrangement: "Hybrid · 2 Days Remote / 3 Days On-site",
    cardImage: "/images/careers/admin_assistant.jpg",
    benefits: [
      "Full Medical & Vision",
      "Annual Discretionary Bonus",
      "Professional Development Allowance",
    ],
  },
  {
    id: "job-ca-3",
    title: "Warehouse Fulfillment Specialist",
    location: "Brampton, Ontario",
    city: "Brampton",
    country: "Canada",
    countryCode: "CA",
    countryFlag: "🇨🇦",
    category: "Warehousing & Logistics",
    employmentType: "Full-time",

    isVerifiedVacancy: true,
    visaSponsorship: "Open to International Candidates",
    experienceLevel: "Entry Level",
    description:
      "Execute accurate inventory scanning, carton sorting, order fulfillment, and skid staging in a clean, state-of-the-art distribution facility.",
    responsibilities: [
      "Scan and pick customer orders accurately utilizing RF handheld barcode scanners and pick-to-light systems",
      "Verify incoming freight manifests against purchase orders and inspect carton integrity",
      "Wrap, secure, and stage outbound skids for scheduled daily transport carrier departure",
      "Maintain strict adherence to Ontario health and safety standards, clean aisle protocols, and WHMIS",
    ],
    qualifications: [
      "Previous distribution warehouse, order fulfillment, or replenishment experience preferred",
      "Certified CSA-approved steel-toe safety footwear (green triangle benchmark)",
      "Ability to comfortably handle moderate lifting (up to 40 lbs) safely throughout shift",
      "Reliable team-player with strong punctuality and safety-first mindset",
    ],
    experience: "Entry to Mid Level",
    postedDate: "Just now",
    workArrangement: "On-site · Day Shift (7:00 AM - 3:30 PM)",
    cardImage: "/images/careers/warehouse_associate.jpg",
    benefits: [
      "Weekly Direct Deposit",
      "Overtime Premium Rates",
      "Safety Boot Reimbursement",
    ],
  },
  {
    id: "job-ca-4",
    title: "Senior Logistics Dispatch Coordinator",
    location: "Toronto, Ontario",
    city: "Toronto",
    country: "Canada",
    countryCode: "CA",
    countryFlag: "🇨🇦",
    category: "Warehousing & Logistics",
    employmentType: "Full-time",

    isVerifiedVacancy: true,
    visaSponsorship: "Visa Sponsorship Available",
    experienceLevel: "Senior Level",
    description:
      "Manage intermodal freight operations, route planning, driver dispatch, and carrier compliance across Canadian and cross-border transport corridors.",
    responsibilities: [
      "Coordinate linehaul dispatch and schedule pickup/delivery appointments across trans-Canada routes",
      "Track freight movements using TMS software and resolve customs and border crossing documentation",
      "Negotiate spot rates with vetted 3PL carriers and monitor on-time delivery performance metrics",
      "Communicate delivery status proactively with key enterprise accounts and terminal managers",
    ],
    qualifications: [
      "Degree or diploma in Supply Chain, Logistics, or Transportation Management",
      "3+ years of logistics dispatch, cross-border freight, or fleet coordination experience",
      "Proficiency in TMS systems (Descartes, MercuryGate, or TMW) and electronic logging devices",
      "Strong problem-solving capability under dynamic operating conditions",
    ],
    experience: "3 - 5 years",
    postedDate: "2 days ago",
    workArrangement: "On-site · Monday to Friday",
    cardImage: "/images/careers/logistics_coordinator.jpg",
    benefits: [
      "Performance Incentive Bonus",
      "Extended Healthcare",
      "Paid Vacation",
    ],
  },
  {
    id: "job-ca-5",
    title: "CNC Machinist & Precision Toolmaker",
    location: "Vaughan, Ontario",
    city: "Vaughan",
    country: "Canada",
    countryCode: "CA",
    countryFlag: "🇨🇦",
    category: "Manufacturing & Production",
    employmentType: "Full-time",

    isVerifiedVacancy: true,
    visaSponsorship: "Visa Sponsorship Available",
    experienceLevel: "Mid Level",
    description:
      "Set up, program, and operate multi-axis CNC milling and turning centers to manufacture high-precision aerospace and automotive tooling.",
    responsibilities: [
      "Read and interpret technical engineering blueprints, CAD/CAM models, and geometric tolerances",
      "Set up fixtures, cutting tools, and offsets on 3-axis and 5-axis CNC machines",
      "Inspect machined components using micrometers, verniers, height gauges, and CMM equipment",
      "Maintain machine calibration, coolant levels, and complete production quality logs",
    ],
    qualifications: [
      "Trade Certificate or Red Seal Machinist certification (or recognized international equivalent)",
      "3+ years experience with CNC programming (Mastercam, Haas, or Fanuc controls)",
      'Strong understanding of metallurgy, speeds, feeds, and tight tolerance machining (±0.0005")',
      "Commitment to ISO 9001 quality guidelines and shop floor safety protocols",
    ],
    experience: "3+ years",
    postedDate: "3 days ago",
    workArrangement: "On-site · Rotating Shifts (Morning / Afternoon)",
    cardImage: "/images/careers/production_associate.jpg",
    benefits: [
      "Tool Allowance",
      "Full Health & Dental",
      "Shift Differential Premium",
    ],
  },
  {
    id: "job-ca-6",
    title: "Corporate Financial Accountant",
    location: "Toronto, Ontario",
    city: "Toronto",
    country: "Canada",
    countryCode: "CA",
    countryFlag: "🇨🇦",
    category: "Finance & Accounting",
    employmentType: "Full-time",

    isVerifiedVacancy: true,
    visaSponsorship: "Domestic Candidates Only",
    experienceLevel: "Mid Level",
    description:
      "Oversee general ledger accounting, monthly balance sheet reconciliations, payroll audits, and financial reporting for corporate enterprise operations.",
    responsibilities: [
      "Prepare month-end journal entries, bank reconciliations, and accrual schedules",
      "Perform detailed variance analysis comparing actual revenues and operating expenditures against budget",
      "Assist in year-end external financial audit preparations and statutory compliance filings",
      "Streamline financial processes utilizing automated ERP workflows and spreadsheet modeling",
    ],
    qualifications: [
      "Bachelor’s Degree in Accounting, Finance, or Commerce; CPA designation or enrolled in CPA PEP",
      "3+ years accounting experience in corporate or public accounting environments",
      "Advanced knowledge of ERP accounting platforms (NetSuite, SAP, or QuickBooks Enterprise)",
      "Meticulous attention to numerical detail and Canadian GAAP / ASPE compliance",
    ],
    experience: "3 - 4 years",
    postedDate: "4 days ago",
    workArrangement: "Hybrid · 3 Days Remote / 2 Days Office",
    cardImage: "/images/careers/junior_accountant.jpg",
    benefits: [
      "CPA Dues & Exam Support",
      "Retirement Savings Matching",
      "Comprehensive Healthcare",
    ],
  },

  // ==========================================================================
  // 🇦🇺 AUSTRALIA OPPORTUNITIES
  // ==========================================================================
  {
    id: "job-au-1",
    title: "Heavy Equipment & Excavator Operator",
    location: "Perth & Pilbara, Western Australia",
    city: "Perth",
    country: "Australia",
    countryCode: "AU",
    countryFlag: "🇦🇺",
    category: "Engineering & Skilled Trades",
    employmentType: "Full-time",

    isVerifiedVacancy: true,
    visaSponsorship: "Visa Sponsorship Available",
    experienceLevel: "Mid Level",
    description:
      "Operate modern heavy earthmoving machinery including excavators (50T+), dump trucks, and graders in a premier Australian resource infrastructure project.",
    responsibilities: [
      "Operate heavy hydraulic excavators and earthmoving machinery according to strict site safety rules",
      "Perform pre-start mechanical checks, equipment inspections, and fluid monitoring",
      "Execute bulk excavation, trenching, battering, and stockpile staging to project specifications",
      "Communicate continuously with site spotters and supervisors via 2-way UHF radio systems",
    ],
    qualifications: [
      "Recognized Heavy Equipment Operator tickets (RIIMPO301E / RIIMPO338E or international equivalent)",
      "Minimum 3 years experience operating 30T - 85T excavators in civil earthworks or mining",
      "Current driver licence and ability to pass comprehensive pre-employment medical and drug screen",
      "High safety awareness and willingness to work 2:1 or 2:2 FIFO roster arrangements",
    ],
    experience: "3+ years",
    postedDate: "1 day ago",
    workArrangement:
      "FIFO / On-site (Flights, Meals & Camp Accommodation Provided)",
    cardImage: "/images/careers/production_associate.jpg",
    benefits: [
      "Full Flights & Camp Provided",
      "Australian Superannuation (11.5%)",
      "Visa Sponsorship Subclass 482",
    ],
  },
  {
    id: "job-au-2",
    title: "Supply Chain Operations Supervisor",
    location: "Sydney, New South Wales",
    city: "Sydney",
    country: "Australia",
    countryCode: "AU",
    countryFlag: "🇦🇺",
    category: "Warehousing & Logistics",
    employmentType: "Full-time",

    isVerifiedVacancy: true,
    visaSponsorship: "Relocation Assistance",
    experienceLevel: "Mid Level",
    description:
      "Supervise daily warehouse operations, cross-dock logistics, inbound container destuffing, and order fulfillment across a 25,000 sqm automated distribution hub in Western Sydney.",
    responsibilities: [
      "Lead and mentor a rotating team of 30+ warehouse associates, forklift drivers, and inventory specialists",
      "Oversee inbound container unloading, pallet put-away, and high-velocity picking schedules",
      "Enforce strict Safe Work Australia regulations and zero-harm workplace health & safety standards",
      "Monitor Key Performance Indicators (KPIs) including pick accuracy, turnaround times, and inventory integrity",
    ],
    qualifications: [
      "3+ years supervisory experience within modern FMCG or retail distribution warehouses",
      "Demonstrated expertise with WMS systems (Manhattan, SAP EWM, or HighJump)",
      "High-risk work license (LF forklift) an advantage; strong leadership and communication skills",
      "Proven track record in continuous improvement (5S, Lean Warehousing)",
    ],
    experience: "3 - 5 years",
    postedDate: "2 days ago",
    workArrangement: "On-site · Day / Afternoon Shift Rotation",
    cardImage: "/images/careers/warehouse_associate.jpg",
    benefits: [
      "Relocation Allowance for Interstate/Overseas",
      "Annual Performance Bonus",
      "Superannuation",
    ],
  },
  {
    id: "job-au-3",
    title: "Hospitality Operations & Guest Experience Lead",
    location: "Melbourne, Victoria",
    city: "Melbourne",
    country: "Australia",
    countryCode: "AU",
    countryFlag: "🇦🇺",
    category: "Hospitality & Retail",
    employmentType: "Full-time",

    isVerifiedVacancy: true,
    visaSponsorship: "Open to International Candidates",
    experienceLevel: "Mid Level",
    description:
      "Coordinate front office reception, VIP concierge services, and guest relations for an internationally recognized 5-star boutique luxury hotel in Melbourne CBD.",
    responsibilities: [
      "Oversee guest check-in/check-out experiences ensuring the highest benchmarks of hospitality",
      "Manage front desk team scheduling, training, and guest inquiry resolution",
      "Liaise with housekeeping and food & beverage teams to coordinate executive suite amenities",
      "Drive customer satisfaction ratings through personalized guest communication",
    ],
    qualifications: [
      "Diploma or Bachelor’s in Hospitality, Hotel Management, or Tourism",
      "2+ years front desk or guest relations experience in upscale hotels",
      "Proficiency with hotel property management systems (Opera PMS or Cloudbeds)",
      "Exceptional personal presentation and multilingual fluency highly regarded",
    ],
    experience: "2+ years",
    postedDate: "3 days ago",
    workArrangement: "On-site · Flexible 7-day Roster",
    cardImage: "/images/careers/hotel_front_desk.jpg",
    benefits: [
      "Hotel Worldwide Travel Discounts",
      "Meals Provided on Shift",
      "Career Progression Pathways",
    ],
  },

  // ==========================================================================
  // 🇺🇸 UNITED STATES OPPORTUNITIES
  // ==========================================================================
  {
    id: "job-us-1",
    title: "Logistics Systems & Inventory Analyst",
    location: "Dallas / Fort Worth, Texas",
    city: "Dallas",
    country: "United States",
    countryCode: "US",
    countryFlag: "🇺🇸",
    category: "Warehousing & Logistics",
    employmentType: "Full-time",

    isVerifiedVacancy: true,
    visaSponsorship: "Visa Sponsorship Available",
    experienceLevel: "Mid Level",
    description:
      "Optimize inventory flows, cycle counting accuracy, demand forecasting, and automated sortation analytics for a nationwide e-commerce fulfillment network.",
    responsibilities: [
      "Analyze warehouse inventory variances, root causes for shrinkage, and stock replenishment trends",
      "Build automated reporting dashboards in Power BI and SQL to track distribution KPIs",
      "Coordinate with regional suppliers and freight carriers to maintain safety stock levels",
      "Participate in warehouse automation and robotic pick-cell integration projects",
    ],
    qualifications: [
      "Degree in Supply Chain, Industrial Engineering, Data Analytics, or Business Administration",
      "2+ years experience in inventory control, logistics analytics, or supply chain planning",
      "Strong proficiency in SQL, advanced Excel, and enterprise ERP/WMS platforms",
      "Analytical mindset with strong problem-solving and cross-functional communication skills",
    ],
    experience: "2 - 4 years",
    postedDate: "Just now",
    workArrangement: "Hybrid · 3 Days Office / 2 Days Remote",
    cardImage: "/images/careers/logistics_coordinator.jpg",
    benefits: [
      "401(k) with 5% Match",
      "Comprehensive Health, Dental & Vision",
      "Annual Performance Bonus",
    ],
  },
  {
    id: "job-us-2",
    title: "Senior Cloud DevOps Engineer",
    location: "Austin, Texas / Remote US",
    city: "Austin",
    country: "United States",
    countryCode: "US",
    countryFlag: "🇺🇸",
    category: "Professional & Technical",
    employmentType: "Full-time",

    isVerifiedVacancy: true,
    visaSponsorship: "Visa Sponsorship Available",
    experienceLevel: "Senior Level",
    description:
      "Architect, automate, and scale mission-critical cloud infrastructure on AWS/Kubernetes for a high-growth recruitment and human capital management technology platform.",
    responsibilities: [
      "Design, maintain, and optimize multi-region AWS cloud infrastructure using Terraform and Ansible",
      "Manage CI/CD deployment pipelines (GitHub Actions, GitLab CI) with zero-downtime releases",
      "Implement robust monitoring, alerting, and security incident response (Datadog, Prometheus, Grafana)",
      "Partner with software engineering teams to ensure microservices security, scalability, and resilience",
    ],
    qualifications: [
      "5+ years experience in DevOps, Cloud Engineering, or Site Reliability Engineering (SRE)",
      "Expertise in AWS services (EKS, RDS, S3, CloudFront, IAM) and Infrastructure as Code (Terraform)",
      "Hands-on mastery of Kubernetes, Docker containerization, and Linux system internals",
      "Strong coding skills in Python, Go, or Bash for automation scripting",
    ],
    experience: "5+ years",
    postedDate: "2 days ago",
    workArrangement: "Remote · US Nationwide",
    cardImage: "/images/careers/it_support.jpg",
    benefits: [
      "Full Remote Flexibility",
      "Health & Wellness Stipend",
      "Stock Equity Options",
      "Unlimited PTO",
    ],
  },

  // ==========================================================================
  // 🇬🇧 UNITED KINGDOM OPPORTUNITIES
  // ==========================================================================
  {
    id: "job-uk-1",
    title: "International Freight Forwarding Specialist",
    location: "London / Heathrow, United Kingdom",
    city: "London",
    country: "United Kingdom",
    countryCode: "GB",
    countryFlag: "🇬🇧",
    category: "Warehousing & Logistics",
    employmentType: "Full-time",

    isVerifiedVacancy: true,
    visaSponsorship: "Open to International Candidates",
    experienceLevel: "Mid Level",
    description:
      "Manage air and ocean freight imports/exports, HMRC customs declarations, cargo clearance, and multimodal logistics routing for global commercial shipments.",
    responsibilities: [
      "Coordinate end-to-end air freight and ocean container bookings from origin to final UK destination",
      "Prepare customs documentation including CDS entries, airway bills (AWB), and EUR1 certificates",
      "Liaise directly with airlines, shipping carriers, UK border force, and commercial consignees",
      "Monitor flight arrival schedules, resolve freight discrepancies, and issue billing invoices",
    ],
    qualifications: [
      "Minimum 2 years experience in international freight forwarding or air cargo logistics",
      "Knowledge of UK HMRC customs procedures, CDS system, and Incoterms 2020",
      "Proficiency in freight management software (CargoWise / Descartes) an asset",
      "Excellent verbal and written communication with international client focus",
    ],
    experience: "2+ years",
    postedDate: "1 day ago",
    workArrangement: "Hybrid · 3 Days Office / 2 Days Home",
    cardImage: "/images/careers/logistics_coordinator.jpg",
    benefits: [
      "UK Pension Contribution",
      "Private Medical Insurance",
      "London Travel Allowance",
    ],
  },
  {
    id: "job-uk-2",
    title: "Bilingual Human Resources Advisor",
    location: "Manchester, United Kingdom",
    city: "Manchester",
    country: "United Kingdom",
    countryCode: "GB",
    countryFlag: "🇬🇧",
    category: "Administration & Office",
    employmentType: "Full-time",
    isVerifiedVacancy: true,
    visaSponsorship: "Open to International Candidates",
    experienceLevel: "Mid Level",
    description:
      "Deliver candidate onboarding, employment contract management, international talent mobility guidance, and employee relations support for European operations.",
    responsibilities: [
      "Oversee end-to-end recruitment pipelines, interview scheduling, and international background checks",
      "Administer employee onboarding programs, digital contract execution, and visa compliance records",
      "Act as trusted point of contact for staff inquiries regarding workplace policies and wellbeing",
      "Maintain accurate HRIS database records and assist in talent retention initiatives",
    ],
    qualifications: [
      "CIPD Level 5 certification or equivalent degree in Human Resources / Business",
      "2+ years HR generalist or recruitment advisory experience",
      "Strong understanding of UK employment law and right-to-work compliance",
      "Fluency in English; additional European language skills an advantage",
    ],
    experience: "2 - 4 years",
    postedDate: "3 days ago",
    workArrangement: "Hybrid · Manchester City Centre Office",
    cardImage: "/images/careers/hr_assistant.jpg",
    benefits: [
      "CIPD Study Support",
      "Life Assurance",
      "Cycle to Work Scheme",
      "25 Days Holiday + Bank Holidays",
    ],
  },

  // ==========================================================================
  // 🇩🇪 GERMANY & EUROPE OPPORTUNITIES
  // ==========================================================================
  {
    id: "job-de-1",
    title: "Industrial Robotics & Automation Technician",
    location: "Munich & Stuttgart, Germany",
    city: "Munich",
    country: "Germany",
    countryCode: "DE",
    countryFlag: "🇩🇪",
    category: "Manufacturing & Production",
    employmentType: "Full-time",
    isVerifiedVacancy: true,
    visaSponsorship: "Visa Sponsorship Available",
    experienceLevel: "Mid Level",
    description:
      "Commission, program, and maintain automated robotic assembly lines and PLC control systems for a leading automotive and clean energy manufacturing facility.",
    responsibilities: [
      "Install, calibrate, and troubleshoot KUKA / ABB / Fanuc 6-axis industrial robots",
      "Diagnose PLC hardware and software issues (Siemens S7, TIA Portal, Beckhoff TwinCAT)",
      "Perform preventive maintenance, cycle time optimization, and sensor calibration",
      "Collaborate with automation engineers to integrate Industry 4.0 IoT sensors and safety interlocks",
    ],
    qualifications: [
      "Vocational training (Facharbeiter) or Degree in Mechatronics, Electrical Engineering, or Automation",
      "2+ years practical experience with industrial robotics and PLC troubleshooting in manufacturing",
      "Understanding of European machinery safety standards (CE, ISO 13849)",
      "Working English proficiency; German language skills (A2/B1+) or willingness to learn",
    ],
    experience: "2+ years",
    postedDate: "1 day ago",
    workArrangement: "On-site · Modern Automated Facility",
    cardImage: "/images/careers/production_associate.jpg",
    benefits: [
      "German EU Blue Card Visa Sponsorship",
      "Relocation & Housing Support",
      "30 Days Annual Leave",
    ],
  },
  {
    id: "job-de-2",
    title: "Quality Assurance & Standards Inspector",
    location: "Frankfurt, Germany",
    city: "Frankfurt",
    country: "Germany",
    countryCode: "DE",
    countryFlag: "🇩🇪",
    category: "Manufacturing & Production",
    employmentType: "Full-time",
    isVerifiedVacancy: true,
    visaSponsorship: "Open to International Candidates",
    experienceLevel: "Mid Level",
    description:
      "Ensure incoming raw materials and precision manufactured parts comply with strict DIN/ISO aerospace and medical device quality standards.",
    responsibilities: [
      "Perform first-article inspections and batch audits using optical measurement systems and CMM",
      "Document non-conformance reports (NCRs) and collaborate with suppliers on root cause corrective action",
      "Maintain ISO 9001 / ISO 13485 calibration logs and traceability records",
      "Train assembly team members on quality control checklists and cleanroom protocols",
    ],
    qualifications: [
      "Background in mechanical inspection, metrology, or industrial quality control",
      "Experience reading complex GD&T engineering schematics",
      "Detail-oriented mindset with high commitment to product safety standards",
      "English fluency required",
    ],
    experience: "2 - 3 years",
    postedDate: "4 days ago",
    workArrangement: "On-site · Frankfurt Logistics Hub",
    cardImage: "/images/careers/quality_control.jpg",
    benefits: [
      "Public Transit Ticket",
      "Company Healthcare & Pension",
      "Career Development",
    ],
  },

  // ==========================================================================
  // 🇳🇿 NEW ZEALAND OPPORTUNITIES
  // ==========================================================================
  {
    id: "job-nz-1",
    title: "Food Processing & Agricultural Technology Specialist",
    location: "Auckland & Waikato, New Zealand",
    city: "Auckland",
    country: "New Zealand",
    countryCode: "NZ",
    countryFlag: "🇳🇿",
    category: "Manufacturing & Production",
    employmentType: "Full-time",
    isVerifiedVacancy: true,
    visaSponsorship: "Visa Sponsorship Available",
    experienceLevel: "Mid Level",
    description:
      "Supervise automated food processing lines, pasteurization technology, and packaging machinery for one of New Zealand’s premier export dairy and agricultural facilities.",
    responsibilities: [
      "Operate and monitor continuous dairy/agricultural packaging and processing machinery",
      "Enforce stringent Ministry for Primary Industries (MPI) food safety and HACCP protocols",
      "Conduct routine quality sampling, moisture testing, and batch traceability tracking",
      "Coordinate with plant engineers during sanitation washdowns and planned maintenance cycles",
    ],
    qualifications: [
      "Certificate or Diploma in Food Technology, Dairy Processing, or Agricultural Science",
      "2+ years experience in automated food, beverage, or pharmaceutical manufacturing",
      "Knowledge of HACCP, GMP, and health & safety compliance standards",
      "Strong team orientation and reliability across production shifts",
    ],
    experience: "2+ years",
    postedDate: "2 days ago",
    workArrangement: "On-site · Waikato Processing Campus",
    cardImage: "/images/careers/production_associate.jpg",
    benefits: [
      "NZ Accredited Employer Work Visa Support",
      "KiwiSaver Contributions",
      "Relocation Guidance",
    ],
  },
  {
    id: "job-nz-2",
    title: "Civil Infrastructure & Transport Supervisor",
    location: "Christchurch, New Zealand",
    city: "Christchurch",
    country: "New Zealand",
    countryCode: "NZ",
    countryFlag: "🇳🇿",
    category: "Engineering & Skilled Trades",
    employmentType: "Full-time",
    isVerifiedVacancy: true,
    visaSponsorship: "Visa Sponsorship Available",
    experienceLevel: "Mid Level",
    description:
      "Supervise roading, bridge, and civil drainage projects, coordinating subcontractor teams, machinery dispatch, and traffic management compliance in Canterbury.",
    responsibilities: [
      "Manage on-site daily civil construction activities, site inductions, and daily toolbox meetings",
      "Monitor subcontractor progress against engineering drawings and project timeline milestones",
      "Ensure compliance with WorkSafe NZ guidelines, environmental permits, and quality checklists",
      "Coordinate deliveries of aggregate, asphalt, and concrete to site seamlessly",
    ],
    qualifications: [
      "Civil construction trade qualification or National Certificate in Infrastructure Works",
      "3+ years experience supervising civil earthworks, drainage, or road construction sites",
      "Clean NZ class 1 driver licence (heavy vehicle endorsements advantageous)",
      "Leadership presence with proactive safety and problem-solving mentality",
    ],
    experience: "3+ years",
    postedDate: "3 days ago",
    workArrangement: "On-site · Canterbury Region",
    cardImage: "/images/careers/warehouse_associate.jpg",
    benefits: [
      "Company Ute / Vehicle Provided",
      "KiwiSaver Matching",
      "Visa Support Available",
    ],
  },

  // ==========================================================================
  // 🇦🇪 UNITED ARAB EMIRATES (UAE) OPPORTUNITIES
  // ==========================================================================
  {
    id: "job-ae-1",
    title: "Aviation Ground Handling & Cargo Operations Lead",
    location: "Dubai International Airport, UAE",
    city: "Dubai",
    country: "United Arab Emirates",
    countryCode: "AE",
    countryFlag: "🇦🇪",
    category: "Warehousing & Logistics",
    employmentType: "Full-time",
    isVerifiedVacancy: true,
    visaSponsorship: "Visa Sponsorship Available",
    experienceLevel: "Mid Level",
    description:
      "Coordinate airside cargo loading, dangerous goods compliance, aircraft turnarounds, and unit load device (ULD) staging at one of the world’s busiest aviation logistics hubs.",
    responsibilities: [
      "Supervise ramp and cargo terminal teams during international widebody freighter loading",
      "Verify aircraft weight & balance manifests and adhere to IATA Dangerous Goods Regulations (DGR)",
      "Ensure strict on-time aircraft departure slots and airside safety protocols",
      "Coordinate with airline flight dispatchers, ground handling agents, and customs authorities",
    ],
    qualifications: [
      "High school diploma or aviation operations degree; IATA Dangerous Goods Certification",
      "3+ years experience in airside ground handling, ramp operations, or air freight logistics",
      "Ability to obtain Dubai Airport security airside pass and clear medical fitness check",
      "Strong leadership in high-tempo operational environments",
    ],
    experience: "3+ years",
    postedDate: "1 day ago",
    workArrangement: "On-site · Rotating Airside Shift Schedules",
    cardImage: "/images/careers/logistics_coordinator.jpg",
    benefits: [
      "100% Tax-Free Income",
      "UAE Resident Visa & Work Permit",
      "Annual Return Flight Ticket Home",
      "Comprehensive Medical Insurance",
    ],
  },
  {
    id: "job-ae-2",
    title: "Luxury Hospitality Front Office Manager",
    location: "Abu Dhabi / Yas Island, UAE",
    city: "Abu Dhabi",
    country: "United Arab Emirates",
    countryCode: "AE",
    countryFlag: "🇦🇪",
    category: "Hospitality & Retail",
    employmentType: "Full-time",
    isVerifiedVacancy: true,
    visaSponsorship: "Visa Sponsorship Available",
    experienceLevel: "Mid Level",
    description:
      "Lead front office and concierge operations for an iconic 5-star waterfront resort in Abu Dhabi, delivering world-class hospitality experiences to global dignitaries and guests.",
    responsibilities: [
      "Manage front office, concierge, bell staff, and telephone switchboard operations",
      "Ensure flawless arrival and departure experiences for VIP dignitaries and international travelers",
      "Monitor room availability, guest feedback metrics, and upscale service standards",
      "Conduct daily team briefings and guest service excellence coaching",
    ],
    qualifications: [
      "Degree in International Hospitality Management or equivalent",
      "3+ years front office leadership experience in luxury 5-star international hotel brands",
      "Fluent English; Arabic, French, or Russian fluency an asset",
      "Impeccable personal grooming and polished interpersonal diplomacy",
    ],
    experience: "3+ years",
    postedDate: "2 days ago",
    workArrangement: "On-site · Luxury Resort Campus",
    cardImage: "/images/careers/hotel_front_desk.jpg",
    benefits: [
      "Tax-Free Salary",
      "Furnished Accommodation or Housing Allowance",
      "UAE Employment Visa",
      "Annual Flight Ticket & Health Coverage",
    ],
  },

  // ==========================================================================
  // 🌐 GLOBAL REMOTE OPPORTUNITIES
  // ==========================================================================
  {
    id: "job-global-1",
    title: "International Talent Recruitment Consultant",
    location: "Worldwide Remote / Global",
    city: "Global Remote",
    country: "Global Remote",
    countryCode: "GLOBAL",
    countryFlag: "🌐",
    category: "Administration & Office",
    employmentType: "Full-time",
    isVerifiedVacancy: true,
    visaSponsorship: "Open to International Candidates",
    experienceLevel: "Mid Level",
    description:
      "Source, screen, and interview international candidates across technical trades, supply chain, and professional careers for employers in Canada, Australia, and Europe.",
    responsibilities: [
      "Manage end-to-end recruitment pipelines, posting vacancies and reviewing applicant qualifications",
      "Conduct competency-based video interviews and verify international trade credentials",
      "Guide shortlisted candidates through immigration pathways, documentation, and employer interviews",
      "Maintain candidate relationships and track onboarding milestones in enterprise ATS systems",
    ],
    qualifications: [
      "2+ years recruitment or talent acquisition experience (agency or in-house staffing)",
      "Familiarity with international hiring, credential assessment, or work visa frameworks",
      "Outstanding interpersonal communication, empathy, and active listening skills",
      "Self-driven work ethic in a fully distributed remote work environment",
    ],
    experience: "2+ years",
    postedDate: "Just now",
    workArrangement: "Remote · Flexible Time Zones",
    cardImage: "/images/careers/admin_assistant.jpg",
    benefits: [
      "100% Work from Anywhere",
      "Performance Placement Bonuses",
      "Home Office Equipment Stipend",
    ],
  },
  {
    id: "job-global-2",
    title: "Enterprise Technical Support Engineer",
    location: "Worldwide Remote / Global",
    city: "Global Remote",
    country: "Global Remote",
    countryCode: "GLOBAL",
    countryFlag: "🌐",
    category: "Professional & Technical",
    employmentType: "Full-time",
    isVerifiedVacancy: true,
    visaSponsorship: "Open to International Candidates",
    experienceLevel: "Mid Level",
    description:
      "Provide high-touch technical diagnostics, API troubleshooting, and system integration support for global clients using enterprise human capital software.",
    responsibilities: [
      "Diagnose and resolve complex tier-2/3 technical tickets involving REST APIs, webhooks, and SSO",
      "Reproduce client-reported software bugs and collaborate with core engineering teams on hotfixes",
      "Author technical knowledge base articles, integration tutorials, and system release documentation",
      "Participate in on-call rotation to guarantee high availability for global enterprise clients",
    ],
    qualifications: [
      "2+ years experience in technical support, software engineering, or solutions engineering",
      "Familiarity with web technologies (JavaScript, JSON, REST APIs, SQL, Postman)",
      "Strong diagnostic curiosity and clear, patient technical communication skills",
      "High-speed reliable internet connection and professional remote workspace",
    ],
    experience: "2+ years",
    postedDate: "1 day ago",
    workArrangement: "Remote · Global Coverage",
    cardImage: "/images/careers/it_support.jpg",
    benefits: [
      "100% Remote",
      "Annual Technology Allowance",
      "Flexible Working Hours",
    ],
  },
];

// ============================================================================
// BROWSER CLIENT-SIDE STORAGE & CRUD PERSISTENCE LAYER (NO BACKEND NEEDED!)
// ============================================================================

const STORAGE_KEY_JOBS = "maple_jobs_data_v2";
const STORAGE_KEY_APPLICATIONS = "maple_applications_data_v2";
const STORAGE_KEY_CONTACT = "maple_contact_messages_v2";

/**
 * Loads current jobs:
 * 1. Checks browser localStorage for any user-added, edited, or deleted jobs.
 * 2. If nothing is in localStorage, defaults to `DEFAULT_JOBS` from this file.
 */
export function loadJobsData(): JobListing[] {
  if (typeof window === "undefined") return DEFAULT_JOBS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_JOBS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn(
      "Failed to load custom jobs from localStorage, falling back to default:",
      err,
    );
  }
  return DEFAULT_JOBS;
}

/**
 * Saves jobs array to browser localStorage so recruiters/admins can CRUD jobs
 * completely client-side without needing a backend server!
 */
export function saveJobsData(jobs: JobListing[]): boolean {
  if (typeof window === "undefined") return false;
  try {
    localStorage.setItem(STORAGE_KEY_JOBS, JSON.stringify(jobs));
    return true;
  } catch (err) {
    console.error("Failed to save jobs to localStorage:", err);
    return false;
  }
}

/**
 * Resets jobs back to the original single-file `DEFAULT_JOBS`.
 */
export function resetJobsData(): JobListing[] {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(STORAGE_KEY_JOBS);
    } catch {
      // ignore
    }
  }
  return DEFAULT_JOBS;
}

/**
 * Export current jobs as a downloadable JSON file or formatted JSON string
 * so developers or recruiters can easily copy the data back into this file!
 */
export function exportJobsAsJson(jobs: JobListing[]): string {
  return JSON.stringify(jobs, null, 2);
}

/**
 * Helper to download jobs JSON file directly in browser.
 */
export function downloadJobsJson(
  jobs: JobListing[],
  filename = "maple_jobs_data.json",
) {
  if (typeof window === "undefined") return;
  const jsonStr = exportJobsAsJson(jobs);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Applications storage helpers for backend-less operation
export function loadStoredApplications(): any[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_APPLICATIONS);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return [];
}

export function saveStoredApplication(application: any): void {
  if (typeof window === "undefined") return;
  try {
    const existing = loadStoredApplications();
    const updated = [application, ...existing];
    localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

export function loadStoredMessages(): any[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONTACT);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return [];
}

export function saveStoredMessage(msg: any): void {
  if (typeof window === "undefined") return;
  try {
    const existing = loadStoredMessages();
    const updated = [msg, ...existing];
    localStorage.setItem(STORAGE_KEY_CONTACT, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

// Country list metadata for filters
export interface CountryOption {
  code: string;
  name: string;
  flag: string;
  badge: string;
  popularCities: string[];
}

export const SUPPORTED_COUNTRIES: CountryOption[] = [
  {
    code: "ALL",
    name: "All Countries",
    flag: "🌍",
    badge: "Global Network",
    popularCities: ["Worldwide"],
  },
  {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    badge: "Headquarters & GTA",
    popularCities: ["Brampton", "Mississauga", "Toronto", "Vaughan"],
  },
  {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    badge: "Skilled Trades & Mining",
    popularCities: ["Perth", "Sydney", "Melbourne", "Brisbane"],
  },
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    badge: "Supply Chain & Tech",
    popularCities: ["Dallas", "Austin", "New York", "Chicago"],
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    badge: "Logistics & Finance",
    popularCities: ["London", "Manchester", "Birmingham"],
  },
  {
    code: "DE",
    name: "Germany",
    flag: "🇩🇪",
    badge: "Engineering & Automation",
    popularCities: ["Munich", "Frankfurt", "Stuttgart", "Berlin"],
  },
  {
    code: "NZ",
    name: "New Zealand",
    flag: "🇳🇿",
    badge: "AgriTech & Infrastructure",
    popularCities: ["Auckland", "Christchurch", "Waikato"],
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    badge: "Tax-Free Cargo & Hospitality",
    popularCities: ["Dubai", "Abu Dhabi"],
  },
  {
    code: "GLOBAL",
    name: "Global Remote",
    flag: "🌐",
    badge: "Worldwide Anywhere",
    popularCities: ["Remote"],
  },
];
