import type {
  CredentialItem,
  ProcessStep,
  ProjectItem,
  ServiceItem,
  SubmittedInquiry,
  TeamMember,
  TestimonialItem,
} from '../types/construction';

export const COMPANY_INFO = {
  legalName: 'MST Construction OPC',
  shortName: 'MST Construction',
  entityType: 'One Person Corporation',
  addressLine1: '2nd Floor, JG Building, Dela Paz Norte',
  addressLine2: 'City of San Fernando, Pampanga 2000',
  fullAddress:
    '2nd Floor, JG Building, Dela Paz Norte, City of San Fernando, Pampanga 2000',
  mapsDirectionsUrl:
    'https://www.google.com/maps/search/?api=1&query=JG+Building+Dela+Paz+Norte+City+of+San+Fernando+Pampanga+2000',
  email: 'mstconstructionopc@gmail.com',
  mobilePhone: '+63 919 099 1178',
  landlinePhone: '045-402-1468',
  officeHours: 'Monday – Saturday, 8:00 AM – 5:00 PM',
  serviceRegion: 'San Fernando, Pampanga & Central Luzon',
  officePhotoPath: '/assets/aistudio/image_aa12ed6e.png',
  socialLinks: [
    {
      label: 'Facebook Page',
      href: 'https://www.facebook.com/search/top?q=MST%20Construction%20OPC',
    },
    {
      label: 'LinkedIn Profile',
      href: 'https://www.linkedin.com/search/results/all/?keywords=MST%20Construction%20OPC',
    },
    {
      label: 'Email Estimating Desk',
      href: 'mailto:mstconstructionopc@gmail.com',
    },
  ],
};

export const ADMIN_ACCESS_CONFIG = {
  email: 'admin@mstconstruction.ph',
  passcode: 'MST-Admin2026!',
  portalTitle: 'MST Construction OPC — Internal Operations Portal',
};

export const HERO_METRICS = [
  {
    value: '28+',
    label: 'Projects Delivered',
    detail: 'Commercial, industrial & civil works',
  },
  {
    value: '100%',
    label: 'NSCP & Code Compliant',
    detail: 'Seismic Zone 4 structural standards',
  },
  {
    value: '45,000+ sqm',
    label: 'Built Floor Area',
    detail: 'Across Pampanga & Central Luzon',
  },
  {
    value: '48 hrs',
    label: 'Initial Estimate Turnaround',
    detail: 'Site assessment & BOQ scoping',
  },
];

export const WHY_CHOOSE_MST = [
  {
    pillar: 'Engineering Expertise',
    metric: 'PRC-Sealed Oversight',
    summary:
      'Licensed civil engineers, structural designers, and architects directly supervise structural computations, rebar placement, and slab tolerances.',
  },
  {
    pillar: 'Materials & Build Quality',
    metric: 'ASTM / NSCP 2015 Tested',
    summary:
      'Mandatory concrete cylinder break tests, mill-certified deformed rebar, and documented pre-pour MEPFS coordination eliminate costly rework.',
  },
  {
    pillar: 'Zero-Incident Site Safety',
    metric: 'DOLE COSH Governed',
    summary:
      'Accredited Safety Officers enforce RA 11058 scaffolding checks, PPE compliance, and daily toolbox briefings on every active job site.',
  },
  {
    pillar: 'Transparent Project Management',
    metric: 'Itemized BOQ & S-Curve',
    summary:
      'Line-by-line cost breakdowns, weekly progress photo logs, and milestone-based billings protect client capital from hidden markups.',
  },
];

export const ABOUT_MST = {
  eyebrow: 'About MST Construction OPC',
  headline: 'Engineering-Led Construction Built on Clear Accountability',
  overview:
    'MST Construction OPC is a SEC-registered One Person Corporation delivering commercial buildings, industrial warehouses, custom residences, and civil infrastructure across Pampanga and Central Luzon.',
  mission:
    'To execute structurally sound, cost-transparent, and code-compliant engineering works that safeguard client capital and stand resilient through decades of service.',
  vision:
    'To be Central Luzon’s most trusted design-build partner for commercial developers, logistics operators, healthcare providers, and residential property owners.',
  differentiators: [
    {
      title: 'Direct Principal Oversight',
      detail:
        'Every contracted build is directly supervised by licensed civil engineers and architects from initial soil verification to final occupancy handover.',
    },
    {
      title: 'Itemized BOQ Transparency',
      detail:
        'Clients receive line-by-line unit cost breakdowns, material specifications, and milestone-linked progress billings with zero hidden markups.',
    },
    {
      title: 'Pampanga Site & Flood Engineering',
      detail:
        'Foundations, finished floor elevations, and stormwater drainage systems are engineered specifically for Central Luzon subsoils and monsoon runoff.',
    },
    {
      title: 'Documented QA/QC & Site Safety',
      detail:
        'Third-party concrete cylinder breaks, rebar tensile certifications, and DOLE COSH safety protocols are maintained on every active job site.',
    },
  ],
};

export const CONSTRUCTION_PROCESS: ProcessStep[] = [
  {
    step: '01',
    title: 'Initial Consultation',
    description:
      'Align on building purpose, target floor area, budget parameters, and project timeline.',
    deliverable: 'Project brief & preliminary feasibility notes',
  },
  {
    step: '02',
    title: 'Site Inspection',
    description:
      'On-site ocular evaluation of lot boundaries, elevation datum, utility access, and soil conditions.',
    deliverable: 'Ocular site assessment & technical checklist',
  },
  {
    step: '03',
    title: 'Planning & Engineering',
    description:
      'Architectural space planning, STAAD structural analysis, and coordinated MEPFS layouts.',
    deliverable: 'Signed & sealed engineering drawings',
  },
  {
    step: '04',
    title: 'Cost Estimation & BOQ',
    description:
      'Preparation of a transparent Bill of Quantities (BOQ), material schedule, and S-curve timeline.',
    deliverable: 'Formal quotation & contract schedule',
  },
  {
    step: '05',
    title: 'Construction Execution',
    description:
      'Mobilization, earthworks, structural framing, masonry, MEPFS installation, and architectural finishes.',
    deliverable: 'Weekly progress & photo documentation',
  },
  {
    step: '06',
    title: 'Quality Assurance & Inspection',
    description:
      'Concrete slump & cylinder compression testing, rebar audits, hydrostatic pressure tests, and safety checks.',
    deliverable: 'QA/QC test logs & punch-list clearance',
  },
  {
    step: '07',
    title: 'Project Turnover',
    description:
      'Final joint walkthrough, as-built drawings, occupancy documentation, and workmanship warranty handover.',
    deliverable: 'Certificate of turnover & as-built package',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    quote:
      'MST Construction OPC delivered our three-storey commercial arcade in San Fernando 14 days ahead of schedule. Their itemized BOQ kept our financing drawdowns predictable with zero surprise change orders.',
    clientName: 'Rafael S. Henson',
    role: 'Managing Director',
    organization: 'Henson Commercial Holdings Inc.',
    projectTitle: 'McArthur Highway Commercial & Office Arcade',
    outcomeSummary: 'Handed over 14 days ahead of contract schedule',
  },
  {
    id: 'test-2',
    quote:
      'From sub-base compaction to the 28-meter clear-span steel trusses, Engr. Tadeo’s team maintained strict slab tolerances for our racking forklifts and passed third-party core testing on the first round.',
    clientName: 'Lourdes G. Evangelista',
    role: 'VP for Supply Chain Operations',
    organization: 'Central Luzon Cold-Chain Logistics Corp.',
    projectTitle: 'Mexico Logistics & Cold-Chain Distribution Hub',
    outcomeSummary: '3,450 sqm facility completed in 8 months under budget',
  },
  {
    id: 'test-3',
    quote:
      'Our branch fit-out required pouring an internal vault and installing acoustic boardrooms without disrupting ground-floor retail tenants. MST executed the after-hours phasing cleanly in 12 weeks.',
    clientName: 'Atty. Enrique M. Laxamana',
    role: 'Head of Facilities & Expansion',
    organization: 'Pampanga Regional Cooperative Bank',
    projectTitle: 'Central Luzon Financial Branch & Corporate Fit-Out',
    outcomeSummary: 'Completed in 84 calendar days with zero tenant downtime',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    index: '01.',
    id: 'general-construction',
    title: 'General Building & Design-Build',
    subtitle: 'Turnkey vertical structures from excavation to occupancy permit',
    description:
      'Single-point accountability covering architectural coordination, structural works, masonry, waterproofing, and interior finishes for commercial buildings, offices, and custom residences.',
    capabilities: [
      'Reinforced concrete framing & post-tensioned slabs',
      'Architectural & interior fit-out execution',
      'Value engineering & bill of quantities optimization',
      'Occupancy permit & municipal compliance documentation',
    ],
    standards: 'NSCP 2015 / National Building Code (PD 1096)',
    typicalTimeline: '6 – 14 Months depending on floor area',
    featuredSpan: true,
  },
  {
    index: '02.',
    id: 'civil-infrastructure',
    title: 'Civil & Site Development Works',
    subtitle: 'Grading, drainage networks & reinforced concrete paving',
    description:
      'Heavy civil site preparation engineered for Pampanga soil conditions and seasonal flood resilience, including elevated sub-base compaction, box culverts, and perimeter retaining walls.',
    capabilities: [
      'Portland Cement Concrete Pavement (PCCP) carriageways',
      'Stormwater drainage, catch basins & reinforced culverts',
      'Site grading, soil stabilization & riprap slope protection',
    ],
    standards: 'DPWH Blue Book Standard Specifications',
    typicalTimeline: '3 – 9 Months',
  },
  {
    index: '03.',
    id: 'structural-steel',
    title: 'Structural Steel & Industrial Facilities',
    subtitle: 'Clear-span warehouses, logistics bays & commercial steel trusses',
    description:
      'Precision-fabricated wide-flange portal frames, mezzanine decks, and high-load industrial slabs designed for logistics hubs, cold storage, and manufacturing plants.',
    capabilities: [
      'Wide-flange steel erection & bolted gusset assemblies',
      'Heavy-duty laser-screeded slab-on-grade',
      'Insulated roof cladding & industrial ventilation',
    ],
    standards: 'AISC Steel Construction Manual / AWS D1.1',
    typicalTimeline: '5 – 10 Months',
  },
  {
    index: '04.',
    id: 'mepfs-integration',
    title: 'MEPFS Engineering & Coordination',
    subtitle: 'Mechanical, electrical, plumbing, fire protection & auxiliary systems',
    description:
      'Integrated utility routing verified prior to concrete pours to prevent site rework, covering standby power, fire sprinkler risers, VRF air-conditioning, and sanitary treatment.',
    capabilities: [
      'Three-phase electrical distribution & genset integration',
      'Fire detection, alarm & wet-pipe sprinkler networks',
      'Water supply, cisterns & STP sanitary systems',
    ],
    standards: 'PEC / NFPA / Revised Fire Code (RA 9514)',
    typicalTimeline: 'Integrated with primary build schedule',
  },
  {
    index: '05.',
    id: 'architectural-planning',
    title: 'Architectural Design & Structural Consultancy',
    subtitle: 'Signed & sealed plans, structural analysis & cost estimates',
    description:
      'Complete pre-construction engineering package including architectural floor plans, STAAD structural analysis, electrical/plumbing layouts, and itemized cost estimates for bank or LGU submission.',
    capabilities: [
      'Signed & sealed architectural and structural blueprints',
      'Detailed Bill of Materials (BOM) & unit cost breakdown',
      'Building permit & environmental clearance processing',
    ],
    standards: 'PRC Board of Civil Engineering & Architecture',
    typicalTimeline: '3 – 6 Weeks pre-construction',
    featuredSpan: true,
  },
  {
    index: '06.',
    id: 'renovation-retrofit',
    title: 'Commercial Fit-Out & Structural Retrofitting',
    subtitle: 'Tenant improvements, facade upgrades & load strengthening',
    description:
      'Fast-track commercial interior fit-outs and structural strengthening for clinics, retail showrooms, and corporate offices with strict dust, noise, and schedule controls.',
    capabilities: [
      'Column jacketing & carbon-fiber structural strengthening',
      'Acoustic partitions, custom millwork & lighting systems',
      'After-hours phasing for active commercial buildings',
    ],
    standards: 'ASHRAE / DOLE Occupational Safety Standards',
    typicalTimeline: '6 – 16 Weeks',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'sf-commercial-hub',
    code: 'MST-COM-014',
    title: 'McArthur Highway Commercial & Office Arcade',
    category: 'Commercial',
    status: 'Completed',
    location: 'Dela Paz Norte, City of San Fernando, Pampanga',
    year: '2025',
    clientSector: 'Retail & Corporate Leasing',
    floorArea: '2,140 sqm',
    duration: '11 Months',
    summary:
      'Three-storey reinforced concrete commercial arcade featuring ground-floor retail bays, second- and third-floor corporate offices, an elevated flood-resilient plinth, and full MEPFS integration.',
    engineeringHighlights: [
      'Isolated footings tied with grade beams engineered for silty-clay Pampanga subsoils',
      '1.2m elevated ground finish floor line above historical flood datum',
      'Curtain-wall aluminum glazing with solar-control low-E glass',
    ],
    deliverables: [
      'Design-Build General Construction',
      'Structural Frame & Slab Works',
      'Complete MEPFS & Fire Protection',
      'Occupancy Permit Handover',
    ],
    outcomeMetric: 'Handed over 14 days ahead of schedule with zero punch-list safety defects',
    schematic: 'commercial-hub',
    featured: true,
  },
  {
    id: 'mexico-steel-warehouse',
    code: 'MST-IND-019',
    title: 'Mexico Logistics & Cold-Chain Distribution Hub',
    category: 'Industrial',
    status: 'Completed',
    location: 'Mexico, Pampanga',
    year: '2025',
    clientSector: 'Supply Chain & Logistics',
    floorArea: '3,450 sqm',
    duration: '8 Months',
    summary:
      'Clear-span structural steel portal frame warehouse with five hydraulic loading docks, 200mm fiber-reinforced industrial slab-on-grade, and insulated sandwich-panel roofing.',
    engineeringHighlights: [
      '28-meter clear-span tapered steel rafters eliminating interior columns',
      '5-ton/sqm industrial floor slab capacity verified via core compression testing',
      'Integrated rainwater harvesting cistern and perimeter fire-loop hydrants',
    ],
    deliverables: [
      'Site Grading & Compaction',
      'Structural Steel Fabrication & Erection',
      'Industrial Slab & Loading Docks',
    ],
    outcomeMetric: '3,450 sqm enclosed envelope erected in 8 months under budget',
    schematic: 'steel-warehouse',
    featured: true,
  },
  {
    id: 'clark-access-drainage',
    code: 'MST-INF-022',
    title: 'Angeles–Mabalacat Perimeter Road & Box Culvert',
    category: 'Infrastructure',
    status: 'Ongoing',
    location: 'Mabalacat City, Pampanga',
    year: '2026',
    clientSector: 'Industrial Estate Infrastructure',
    floorArea: '1.6 km carriageway',
    duration: '9 Months (78% Complete)',
    summary:
      'Two-lane heavy-duty Portland Cement Concrete Pavement (PCCP) access corridor paired with double-barrel reinforced concrete box culverts and solar-assisted street lighting.',
    engineeringHighlights: [
      '280mm thick 3,500 psi PCCP carriageway rated for 40-ton container trucks',
      'Reinforced concrete box culverts sized for 50-year stormwater discharge',
      'Sub-base CBR laboratory compaction verified every 100 linear meters',
    ],
    deliverables: [
      'Cut-and-Fill Earthworks',
      'Storm Drainage & Culvert Civil Works',
      'Concrete Paving & Road Markings',
    ],
    outcomeMetric: '42,000+ man-hours logged with zero lost-time safety incidents',
    schematic: 'road-drainage',
  },
  {
    id: 'bacolor-medical-center',
    code: 'MST-COM-024',
    title: 'Pampanga Diagnostic & Outpatient Medical Pavilion',
    category: 'Commercial',
    status: 'Ongoing',
    location: 'Bacolor, Pampanga',
    year: '2026',
    clientSector: 'Healthcare Facility',
    floorArea: '1,320 sqm',
    duration: '10 Months (65% Complete)',
    summary:
      'Two-storey clinical facility designed to Department of Health (DOH) spatial guidelines, incorporating lead-lined radiology suites, medical gas piping, and hospital-grade HVAC filtration.',
    engineeringHighlights: [
      'Radiation-shielded diagnostic imaging room construction',
      'Dedicated emergency generator transfer system with 24-hour fuel reserve',
      'Antimicrobial epoxy flooring and negative-pressure isolation zones',
    ],
    deliverables: [
      'Structural Retrofitting & Expansion',
      'Healthcare MEPFS & HVAC',
      'DOH-Compliant Interior Fit-Out',
    ],
    outcomeMetric: '100% pass rate on Phase 1 structural and electrical inspection',
    schematic: 'medical-clinic',
    featured: true,
  },
  {
    id: 'angeles-modern-residence',
    code: 'MST-RES-017',
    title: 'Villa Teresa Modern Tropical Residence',
    category: 'Residential',
    status: 'Completed',
    location: 'Angeles City, Pampanga',
    year: '2024',
    clientSector: 'Private Residential',
    floorArea: '520 sqm',
    duration: '10 Months',
    summary:
      'Two-storey contemporary residence engineered for passive cross-ventilation, featuring cantilevered sun-shading eaves, floor-to-ceiling thermal-break glass, and custom hardwood joinery.',
    engineeringHighlights: [
      '3.2m cantilevered reinforced concrete canopy over outdoor lanai',
      'Concealed roof deck waterproofing with thermal insulation screed',
      'Smart electrical load management and rainwater garden retention',
    ],
    deliverables: [
      'Architectural & Structural Design',
      'Full Turnkey Construction',
      'Custom Cabinetry & Landscape Civil Works',
    ],
    outcomeMetric: 'Delivered turnkey with 12-month structural & waterproofing warranty',
    schematic: 'modern-residence',
  },
  {
    id: 'san-fernando-hq-fitout',
    code: 'MST-COM-015',
    title: 'Central Luzon Financial Branch & Corporate Fit-Out',
    category: 'Commercial',
    status: 'Completed',
    location: 'Dolores, City of San Fernando, Pampanga',
    year: '2024',
    clientSector: 'Banking & Financial Services',
    floorArea: '640 sqm',
    duration: '12 Weeks',
    summary:
      'Fast-track commercial interior fit-out featuring reinforced security vault enclosure, acoustic boardrooms, structured data cabling, and energy-efficient LED architectural lighting.',
    engineeringHighlights: [
      'High-security reinforced concrete vault room poured inside existing shell',
      'STC-50 acoustic glazed conference partitions',
      'Zero disruption to adjacent ground-floor retail tenants',
    ],
    deliverables: [
      'Architectural Interior Fit-Out',
      'Structured Cabling & Auxiliary Security',
      'Fire Suppression Re-zoning',
    ],
    outcomeMetric: 'Completed in 84 calendar days from notice to proceed',
    schematic: 'office-fitout',
  },
];

export const CREDENTIALS: CredentialItem[] = [
  {
    id: 'pcab',
    code: 'PCAB',
    title: 'PCAB Licensed General Contractor',
    issuingBody: 'Philippine Contractors Accreditation Board',
    classification: 'General Building & General Engineering',
    documentReference: 'PCAB Registry · General Contracting',
    description:
      'Authorized to execute vertical building structures, site development, and civil infrastructure across public and private sectors.',
  },
  {
    id: 'sec-opc',
    code: 'SEC OPC',
    title: 'SEC Registered One Person Corporation',
    issuingBody: 'Securities and Exchange Commission (Philippines)',
    classification: 'Corporate Registry & Compliance',
    documentReference: 'SEC OPC Certificate · Pampanga LGU Permit',
    description:
      'Duly incorporated corporate engineering and construction entity headquartered in San Fernando, Pampanga with full BIR and LGU permits.',
  },
  {
    id: 'prc-roster',
    code: 'PRC',
    title: 'PRC Licensed Engineering & Architecture Team',
    issuingBody: 'Professional Regulation Commission',
    classification: 'CE · Arch · REE · RMP Signatories',
    documentReference: 'Active PRC Board Signatory Roster',
    description:
      'All structural computations, architectural plans, and MEPFS drawings are signed, sealed, and supervised by PRC-licensed professionals.',
  },
  {
    id: 'dole-osh',
    code: 'DOLE OSH',
    title: 'DOLE Safety & Health Program Compliance',
    issuingBody: 'Department of Labor and Employment (RA 11058)',
    classification: 'BOSH & COSH Certified Site Supervision',
    documentReference: 'DOLE Region III COSH Accreditation',
    description:
      'Every active project site deploys accredited Safety Officers, mandatory PPE protocols, and daily toolbox safety briefings.',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'engr-tadeo',
    name: 'Engr. Mark Anthony S. Tadeo, CE',
    initials: 'MT',
    role: 'President & Principal Civil Engineer',
    discipline: 'Civil & Structural Engineering',
    licenseLabel: 'PRC Civil Engineer · #0118429',
    experienceYears: 14,
    education: 'B.S. Civil Engineering, Holy Angel University',
    bio: 'Leads MST Construction OPC with 14 years of hands-on structural design, commercial general contracting, and Pampanga flood-resilient site engineering. Oversees project governance, quality assurance, and client handovers.',
    specializations: [
      'Reinforced Concrete & Steel Structural Design',
      'Design-Build Project Governance',
      'Value Engineering & Cost Control',
    ],
    notableProjects: [
      'McArthur Highway Commercial & Office Arcade',
      'Mexico Logistics & Cold-Chain Distribution Hub',
    ],
  },
  {
    id: 'arch-pangilinan',
    name: 'Ar. Clarisse D. Pangilinan, UAP',
    initials: 'CP',
    role: 'Lead Design Architect',
    discipline: 'Architectural Planning & Fit-Out',
    licenseLabel: 'PRC Architect · #0039814',
    experienceYears: 10,
    education: 'B.S. Architecture, University of the Assumption',
    bio: 'Directs architectural programming, tropical passive-cooling design, LGU permit documentation, and commercial interior fit-outs across Central Luzon.',
    specializations: [
      'Commercial & Healthcare Space Planning',
      'Building Code & Permit Documentation',
      'BIM Visualization & Interior Detailing',
    ],
    notableProjects: [
      'Pampanga Diagnostic & Outpatient Medical Pavilion',
      'Villa Teresa Modern Tropical Residence',
    ],
  },
  {
    id: 'engr-mendoza',
    name: 'Engr. Roberto L. Mendoza, CE',
    initials: 'RM',
    role: 'Senior Project & Site Operations Manager',
    discipline: 'Field Construction & Civil Works',
    licenseLabel: 'PRC Civil Engineer · #0104672',
    experienceYears: 16,
    education: 'B.S. Civil Engineering, Don Honorio Ventura State University',
    bio: 'Manages field scheduling, subcontractor coordination, concrete batching quality control, and heavy civil earthworks across active sites in San Fernando, Mexico, and Mabalacat.',
    specializations: [
      'Critical Path Scheduling & Site Logistics',
      'PCCP Roadways & Storm Drainage Systems',
      'Materials Testing & Quality Inspection',
    ],
    notableProjects: [
      'Angeles–Mabalacat Perimeter Road & Box Culvert',
      'McArthur Highway Commercial & Office Arcade',
    ],
  },
  {
    id: 'engr-dizon',
    name: 'Engr. Patricia Ann G. Dizon, REE',
    initials: 'PD',
    role: 'MEPFS & Auxiliary Systems Lead',
    discipline: 'Electrical & Building Utilities',
    licenseLabel: 'PRC Registered Electrical Engineer · #0067315',
    experienceYears: 9,
    education: 'B.S. Electrical Engineering, Tarlac State University',
    bio: 'Coordinates power distribution, standby generator integration, fire alarm systems, and energy-efficient HVAC load scheduling across commercial and industrial builds.',
    specializations: [
      'Three-Phase Power & Genset Synchronization',
      'Fire Detection & Sprinkler Coordination',
      'PEC & RA 9514 Compliance Audits',
    ],
    notableProjects: [
      'Central Luzon Financial Branch & Corporate Fit-Out',
      'Pampanga Diagnostic & Outpatient Medical Pavilion',
    ],
  },
  {
    id: 'qs-bautista',
    name: 'Engr. Rafael V. Bautista',
    initials: 'RB',
    role: 'Quantity Surveyor & Cost Estimator',
    discipline: 'Cost Engineering & Procurement',
    licenseLabel: 'PRC Civil Engineer · #0131904',
    experienceYears: 8,
    education: 'B.S. Civil Engineering, Bulacan State University',
    bio: 'Prepares transparent itemized Bills of Quantities (BOQ), supplier bid evaluations, and progressive billing verifications to keep every client project aligned with approved budgets.',
    specializations: [
      'Detailed Bill of Quantities (BOQ) & Costing',
      'Material Procurement & Supplier Vetting',
      'Progress Billing & Change-Order Audits',
    ],
    notableProjects: [
      'Mexico Logistics & Cold-Chain Distribution Hub',
      'Villa Teresa Modern Tropical Residence',
    ],
  },
  {
    id: 'so-manalang',
    name: 'Jerome C. Manalang, COSH',
    initials: 'JM',
    role: 'Occupational Safety & Quality Officer',
    discipline: 'Site Safety & QA/QC',
    licenseLabel: 'DOLE Accredited COSH · #R3-22-8841',
    experienceYears: 11,
    education: 'B.S. Industrial Technology / DOLE-BWC Accredited',
    bio: 'Enforces zero-incident site safety compliance, scaffolding integrity checks, hot-work permits, and daily worker safety orientations across all MST Construction OPC job sites.',
    specializations: [
      'DOLE RA 11058 Site Safety Governance',
      'Structural Steel Rigging & Fall Protection',
      'QA/QC Concrete Cylinder & Rebar Audits',
    ],
    notableProjects: [
      'Angeles–Mabalacat Perimeter Road & Box Culvert',
      'Mexico Logistics & Cold-Chain Distribution Hub',
    ],
  },
];

export const INITIAL_INQUIRIES: SubmittedInquiry[] = [
  {
    id: 'seed-inq-1',
    referenceCode: 'MST-202611-0001',
    fullName: 'Atty. Gabriel Pascual',
    companyName: 'Pampanga Prime Holdings Inc.',
    email: 'gpascual@pampangaprime.ph',
    phone: '+63 918 442 9012',
    preferredContact: 'Email',
    projectCategory: 'Commercial',
    location: 'Dolores, City of San Fernando, Pampanga',
    estimatedFloorArea: '1,400 sqm',
    estimatedBudget: 'PHP 15M – 30M',
    targetStart: 'Q1 2027',
    readinessStatus: 'Architectural Plans Available',
    projectScope:
      'Three-storey mixed-use commercial building with ground-floor retail parking and office suites (approx. 1,400 sqm floor area).',
    privacyConsent: true,
    submittedAt: '2026-11-18T09:30:00.000Z',
    workflowStatus: 'Under Review',
  },
];
