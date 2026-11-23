import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeAdminStats,
  createCredentialItem,
  createProjectItem,
  createTeamMember,
  filterInquiries,
  filterProjects,
  formatInquiryReference,
  getFeaturedProjects,
  getFeaturedServices,
  getPathnameForPage,
  parseRouteFromPathname,
  updateProjectStatus,
  validateCredentialForm,
  validateInquiryForm,
  validateProjectForm,
  validateTeamForm,
  verifyAdminCredentials,
} from './inquiryLogic';
import type {
  CredentialItem,
  InquiryFormInput,
  ProjectFormInput,
  ProjectItem,
  ServiceItem,
  SubmittedInquiry,
  TeamMember,
} from '../types/construction';

const SAMPLE_PROJECTS: ProjectItem[] = [
  {
    id: 'p1',
    code: 'MST-COM-01',
    title: 'San Fernando Commercial Hub',
    category: 'Commercial',
    status: 'Completed',
    location: 'Dela Paz Norte, City of San Fernando, Pampanga',
    year: '2025',
    clientSector: 'Retail & Office Development',
    floorArea: '1,850 sqm',
    duration: '11 Months',
    summary: 'Three-storey reinforced concrete commercial arcade and office building.',
    engineeringHighlights: ['Seismic Zone 4 ductile moment frame'],
    deliverables: ['Structural works', 'MEPFS fit-out'],
    outcomeMetric: 'Delivered 14 days ahead of handover target',
    schematic: 'commercial-hub',
    featured: true,
  },
  {
    id: 'p2',
    code: 'MST-INF-02',
    title: 'Clark Perimeter Drainage & Access Road',
    category: 'Infrastructure',
    status: 'Ongoing',
    location: 'Angeles–Mabalacat Corridor, Pampanga',
    year: '2026',
    clientSector: 'Industrial Park Logistics',
    floorArea: '1.4 km carriageway',
    duration: '8 Months',
    summary: 'Reinforced concrete pavement with box culvert storm drainage.',
    engineeringHighlights: ['3,500 psi PCCP carriageway'],
    deliverables: ['Earthworks', 'Concrete paving'],
    outcomeMetric: 'Zero lost-time safety incidents across 42,000 man-hours',
    schematic: 'road-drainage',
  },
  {
    id: 'p3',
    code: 'MST-IND-03',
    title: 'Mexico Logistics Steel Warehouse',
    category: 'Industrial',
    status: 'Completed',
    location: 'Mexico, Pampanga',
    year: '2024',
    clientSector: 'Cold Chain & Distribution',
    floorArea: '3,200 sqm',
    duration: '9 Months',
    summary: 'Clear-span structural steel portal frame warehouse with loading docks.',
    engineeringHighlights: ['30m clear-span truss assembly'],
    deliverables: ['Structural steel erection', 'Slab-on-grade'],
    outcomeMetric: '5-ton/sqm industrial slab load rating verified',
    schematic: 'steel-warehouse',
    featured: true,
  },
];

const VALID_INQUIRY: InquiryFormInput = {
  fullName: 'Marco Villanueva',
  companyName: 'Central Luzon Logistics Corp.',
  email: 'marco.v@cllogistics.ph',
  phone: '+63 917 555 0142',
  preferredContact: 'Email',
  projectCategory: 'Commercial',
  location: 'City of San Fernando, Pampanga',
  estimatedFloorArea: '900 sqm',
  estimatedBudget: 'PHP 10M – 25M',
  targetStart: 'Q1 2027',
  readinessStatus: 'Architectural Plans Available',
  projectScope: 'Design-build construction for a 2-storey 900 sqm commercial office building.',
  privacyConsent: true,
};

const VALID_PROJECT_INPUT: ProjectFormInput = {
  title: 'Guagua Retail Annex',
  category: 'Commercial',
  status: 'Ongoing',
  location: 'Guagua, Pampanga',
  year: '2026',
  clientSector: 'Retail & Commercial',
  floorArea: '980 sqm',
  duration: '7 Months',
  summary: 'Two-storey commercial retail building with ground parking and MEPFS.',
  outcomeMetric: 'Phase 1 foundation and columns poured on schedule',
  schematic: 'commercial-hub',
  highlightsText: 'Elevated ground slab\nDuctile RC moment frame',
  deliverablesText: 'Structural works\nArchitectural fit-out',
  featured: true,
};

test('parseRouteFromPathname and getPathnameForPage handle all public and admin routes', () => {
  assert.equal(parseRouteFromPathname('/'), 'home');
  assert.equal(parseRouteFromPathname('/about'), 'about');
  assert.equal(parseRouteFromPathname('/services/'), 'services');
  assert.equal(parseRouteFromPathname('/projects'), 'projects');
  assert.equal(parseRouteFromPathname('/team'), 'team');
  assert.equal(parseRouteFromPathname('/contact'), 'contact');
  assert.equal(parseRouteFromPathname('/admin'), 'admin');
  assert.equal(parseRouteFromPathname('/admin/inquiries'), 'admin');
  assert.equal(parseRouteFromPathname('/unknown-route'), 'home');

  assert.equal(getPathnameForPage('about'), '/about');
  assert.equal(getPathnameForPage('admin'), '/admin');
});

test('getFeaturedProjects and getFeaturedServices return bounded homepage previews', () => {
  const featured = getFeaturedProjects(SAMPLE_PROJECTS, 3);
  assert.equal(featured.length, 3);
  assert.equal(featured[0].id, 'p1');
  assert.equal(featured[1].id, 'p3');

  const dummyServices = Array.from({ length: 6 }, (_, i) => ({
    index: `0${i + 1}.`,
    id: `svc-${i + 1}`,
    title: `Service ${i + 1}`,
    subtitle: 'Sub',
    description: 'Desc',
    capabilities: ['Cap'],
    standards: 'NSCP',
    typicalTimeline: '6 months',
  })) as ServiceItem[];
  assert.equal(getFeaturedServices(dummyServices, 4).length, 4);
});

test('filterProjects filters by category, status, and search query', () => {
  assert.equal(
    filterProjects(SAMPLE_PROJECTS, { category: 'All', status: 'All', searchQuery: '' }).length,
    3
  );
  assert.equal(
    filterProjects(SAMPLE_PROJECTS, { category: 'Commercial', status: 'All', searchQuery: '' }).length,
    1
  );
  assert.equal(
    filterProjects(SAMPLE_PROJECTS, { category: 'All', status: 'Ongoing', searchQuery: '' })[0].id,
    'p2'
  );
  assert.equal(
    filterProjects(SAMPLE_PROJECTS, { category: 'All', status: 'All', searchQuery: 'warehouse' })[0].id,
    'p3'
  );
});

test('validateProjectForm, createProjectItem, and updateProjectStatus support admin CRUD', () => {
  const invalid = validateProjectForm({
    ...VALID_PROJECT_INPUT,
    title: 'A',
    year: '26',
    summary: 'Short',
  });
  assert.equal(invalid.isValid, false);

  const created = createProjectItem(VALID_PROJECT_INPUT, SAMPLE_PROJECTS.length);
  assert.equal(created.code, 'MST-COM-004');
  assert.equal(created.featured, true);

  const updatedList = updateProjectStatus([created, ...SAMPLE_PROJECTS], created.id, 'Completed');
  assert.equal(
    filterProjects(updatedList, { category: 'All', status: 'Completed', searchQuery: 'Guagua' }).length,
    1
  );
});

test('validateTeamForm and createTeamMember validate and normalize staff profiles', () => {
  const invalid = validateTeamForm({
    name: 'A',
    initials: '',
    role: 'CE',
    discipline: 'Civil',
    licenseLabel: '01',
    experienceYears: '-2',
    education: '',
    bio: 'Too short',
    specializationsText: '',
    notableProjectsText: '',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.bio);

  const member = createTeamMember({
    name: 'Engr. Carlo D. Rivera, CE',
    initials: '',
    role: 'Structural Project Engineer',
    discipline: 'Structural Design',
    licenseLabel: 'PRC Civil Engineer · #0140921',
    experienceYears: '7',
    education: 'B.S. Civil Engineering, HAU',
    bio: 'Leads structural frame inspections and concrete batch quality audits across Central Luzon.',
    specializationsText: 'Reinforced Concrete Framing\nFoundation Engineering',
    notableProjectsText: 'Bacolor Medical Pavilion',
  });
  assert.equal(member.initials, 'CR');
  assert.equal(member.experienceYears, 7);
  assert.equal(member.specializations.length, 2);
});

test('validateCredentialForm and createCredentialItem manage regulatory records', () => {
  const valid = validateCredentialForm({
    code: 'iso 9001',
    title: 'Quality Management System Alignment',
    issuingBody: 'Internal QA/QC Audit Program',
    classification: 'Construction Quality Assurance',
    description: 'Standardized concrete, rebar, and MEPFS inspection protocols on all sites.',
    documentReference: 'MST-QA-2026-01',
  });
  assert.equal(valid.isValid, true);
  const item = createCredentialItem({
    code: 'iso 9001',
    title: 'Quality Management System Alignment',
    issuingBody: 'Internal QA/QC Audit Program',
    classification: 'Construction Quality Assurance',
    description: 'Standardized concrete, rebar, and MEPFS inspection protocols on all sites.',
    documentReference: 'MST-QA-2026-01',
  });
  assert.equal(item.code, 'ISO 9001');
  assert.equal(item.documentReference, 'MST-QA-2026-01');
});

test('validateInquiryForm requires valid contact fields and privacy consent', () => {
  const validResult = validateInquiryForm(VALID_INQUIRY);
  assert.equal(validResult.isValid, true);

  const invalidResult = validateInquiryForm({
    ...VALID_INQUIRY,
    fullName: 'A',
    email: 'not-an-email',
    phone: '123',
    location: 'PH',
    projectScope: 'Too short',
    privacyConsent: false,
  });
  assert.equal(invalidResult.isValid, false);
  assert.ok(invalidResult.errors.privacyConsent);
});

test('computeAdminStats, filterInquiries, and verifyAdminCredentials work accurately', () => {
  const inquiries: SubmittedInquiry[] = [
    {
      ...VALID_INQUIRY,
      id: 'i1',
      referenceCode: 'MST-202611-0001',
      submittedAt: '2026-11-20T08:00:00Z',
      workflowStatus: 'New',
    },
    {
      ...VALID_INQUIRY,
      id: 'i2',
      fullName: 'Elena Cruz',
      referenceCode: 'MST-202611-0002',
      submittedAt: '2026-11-21T08:00:00Z',
      workflowStatus: 'In Progress',
    },
  ];
  const stats = computeAdminStats(
    SAMPLE_PROJECTS,
    inquiries,
    [{ id: 't1' } as TeamMember],
    [{ id: 'c1' } as CredentialItem]
  );
  assert.equal(stats.totalProjects, 3);
  assert.equal(stats.ongoingProjects, 1);
  assert.equal(stats.completedProjects, 2);
  assert.equal(stats.newInquiries, 1);
  assert.equal(stats.activeInquiries, 1);
  assert.equal(filterInquiries(inquiries, 'In Progress', 'elena').length, 1);

  assert.equal(
    verifyAdminCredentials(
      'ADMIN@mstconstruction.ph',
      'MST-Admin2026!',
      'admin@mstconstruction.ph',
      'MST-Admin2026!'
    ),
    true
  );
  assert.equal(
    verifyAdminCredentials(
      'admin@mstconstruction.ph',
      'wrong',
      'admin@mstconstruction.ph',
      'MST-Admin2026!'
    ),
    false
  );
  assert.equal(formatInquiryReference(new Date('2026-11-22T10:00:00Z'), 7), 'MST-202611-0007');
});
