import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createProjectItem,
  filterProjects,
  formatInquiryReference,
  updateProjectStatus,
  validateInquiryForm,
  validateProjectForm,
} from './inquiryLogic';
import type { InquiryFormInput, ProjectFormInput, ProjectItem } from '../types/construction';

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
};

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
  assert.equal(
    filterProjects(SAMPLE_PROJECTS, { category: 'Residential', status: 'All', searchQuery: '' }).length,
    0
  );
});

test('validateProjectForm, createProjectItem, and updateProjectStatus support adding and updating projects', () => {
  const invalid = validateProjectForm({
    ...VALID_PROJECT_INPUT,
    title: 'A',
    year: '26',
    summary: 'Short',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.title);
  assert.ok(invalid.errors.year);
  assert.ok(invalid.errors.summary);

  const valid = validateProjectForm(VALID_PROJECT_INPUT);
  assert.equal(valid.isValid, true);

  const created = createProjectItem(VALID_PROJECT_INPUT, SAMPLE_PROJECTS.length);
  assert.equal(created.code, 'MST-COM-004');
  assert.equal(created.status, 'Ongoing');
  assert.equal(created.engineeringHighlights.length, 2);

  const updatedList = updateProjectStatus([created, ...SAMPLE_PROJECTS], created.id, 'Completed');
  assert.equal(
    filterProjects(updatedList, { category: 'All', status: 'Completed', searchQuery: 'Guagua' }).length,
    1
  );
  assert.equal(
    filterProjects(updatedList, { category: 'All', status: 'Ongoing', searchQuery: 'Guagua' }).length,
    0
  );
});

test('validateInquiryForm requires valid contact fields and privacy consent', () => {
  const validResult = validateInquiryForm(VALID_INQUIRY);
  assert.equal(validResult.isValid, true);
  assert.deepEqual(validResult.errors, {});

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
  assert.ok(invalidResult.errors.fullName);
  assert.ok(invalidResult.errors.email);
  assert.ok(invalidResult.errors.phone);
  assert.ok(invalidResult.errors.location);
  assert.ok(invalidResult.errors.projectScope);
  assert.ok(invalidResult.errors.privacyConsent);
});

test('validateInquiryForm accepts local Pampanga landline format', () => {
  const result = validateInquiryForm({
    ...VALID_INQUIRY,
    phone: '045-402-1468',
  });
  assert.equal(result.isValid, true);
});

test('formatInquiryReference produces deterministic padded reference codes', () => {
  const ref = formatInquiryReference(new Date('2026-11-22T10:00:00Z'), 7);
  assert.equal(ref, 'MST-202611-0007');
});
