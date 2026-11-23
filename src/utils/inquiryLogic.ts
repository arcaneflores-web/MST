import type {
  AdminOverviewStats,
  AppPage,
  CredentialFormInput,
  CredentialItem,
  CredentialValidationErrors,
  InquiryFormInput,
  InquiryValidationErrors,
  InquiryWorkflowStatus,
  ProjectCategory,
  ProjectFormInput,
  ProjectItem,
  ProjectStatus,
  ProjectValidationErrors,
  ServiceItem,
  SubmittedInquiry,
  TeamFormInput,
  TeamMember,
  TeamValidationErrors,
} from '../types/construction';

export interface ProjectFilterCriteria {
  category: 'All' | ProjectCategory;
  status: 'All' | ProjectStatus;
  searchQuery: string;
}

const PAGE_TO_PATH: Record<AppPage, string> = {
  home: '/',
  about: '/about',
  services: '/services',
  projects: '/projects',
  team: '/team',
  contact: '/contact',
  admin: '/admin',
};

export function getPathnameForPage(page: AppPage): string {
  return PAGE_TO_PATH[page] ?? '/';
}

export function parseRouteFromPathname(pathname: string): AppPage {
  const normalized = pathname.trim().toLowerCase().replace(/\/+$/, '') || '/';
  if (normalized === '/' || normalized === '/home') return 'home';
  if (normalized === '/about' || normalized === '/about-us') return 'about';
  if (normalized === '/services') return 'services';
  if (normalized === '/projects' || normalized === '/portfolio') return 'projects';
  if (normalized === '/team' || normalized === '/our-team') return 'team';
  if (normalized === '/contact' || normalized === '/contact-us') return 'contact';
  if (normalized === '/admin' || normalized.startsWith('/admin/')) return 'admin';
  return 'home';
}

export function getFeaturedServices(services: ServiceItem[], limit = 4): ServiceItem[] {
  return services.slice(0, limit);
}

export function getFeaturedProjects(projects: ProjectItem[], limit = 3): ProjectItem[] {
  const explicitlyFeatured = projects.filter((p) => p.featured);
  if (explicitlyFeatured.length >= limit) {
    return explicitlyFeatured.slice(0, limit);
  }
  const remaining = projects.filter((p) => !p.featured);
  return [...explicitlyFeatured, ...remaining].slice(0, limit);
}

export function filterProjects(
  projects: ProjectItem[],
  criteria: ProjectFilterCriteria
): ProjectItem[] {
  const normalizedQuery = criteria.searchQuery.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesCategory =
      criteria.category === 'All' || project.category === criteria.category;
    const matchesStatus =
      criteria.status === 'All' || project.status === criteria.status;

    if (!matchesCategory || !matchesStatus) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const searchableText = [
      project.title,
      project.code,
      project.location,
      project.category,
      project.clientSector,
      project.summary,
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export function validateProjectForm(input: ProjectFormInput): {
  isValid: boolean;
  errors: ProjectValidationErrors;
} {
  const errors: ProjectValidationErrors = {};

  if (input.title.trim().length < 3) {
    errors.title = 'Enter a project title (at least 3 characters).';
  }
  if (input.location.trim().length < 3) {
    errors.location = 'Specify the project location (municipality or province).';
  }
  if (!/^\d{4}$/.test(input.year.trim())) {
    errors.year = 'Enter a 4-digit year (e.g., 2026).';
  }
  if (input.floorArea.trim().length < 2) {
    errors.floorArea = 'Specify approximate scale or floor area (e.g., 1,200 sqm).';
  }
  if (input.duration.trim().length < 2) {
    errors.duration = 'Specify contract or target duration (e.g., 8 Months).';
  }
  if (input.summary.trim().length < 15) {
    errors.summary = 'Provide a brief project summary (at least 15 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

function splitNonEmptyLines(raw: string, fallback: string[]): string[] {
  const lines = raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  return lines.length > 0 ? lines : fallback;
}

export function createProjectItem(
  input: ProjectFormInput,
  existingCount: number,
  existingProject?: ProjectItem | null
): ProjectItem {
  const categoryPrefixMap: Record<ProjectCategory, string> = {
    Commercial: 'COM',
    Industrial: 'IND',
    Infrastructure: 'INF',
    Residential: 'RES',
  };

  const seq = String(existingCount + 1).padStart(3, '0');
  const code =
    existingProject?.code ?? `MST-${categoryPrefixMap[input.category]}-${seq}`;

  return {
    id: existingProject?.id ?? `proj-${Date.now()}`,
    code,
    title: input.title.trim(),
    category: input.category,
    status: input.status,
    location: input.location.trim(),
    year: input.year.trim(),
    clientSector: input.clientSector.trim() || `${input.category} Development`,
    floorArea: input.floorArea.trim(),
    duration: input.duration.trim(),
    summary: input.summary.trim(),
    engineeringHighlights: splitNonEmptyLines(input.highlightsText, [
      'NSCP 2015 compliant structural design and site quality inspection',
    ]),
    deliverables: splitNonEmptyLines(input.deliverablesText, [
      'General Construction & Engineering Supervision',
    ]),
    outcomeMetric:
      input.outcomeMetric.trim() ||
      (input.status === 'Completed'
        ? 'Completed and turned over to client specifications'
        : 'Active construction progressing on approved schedule'),
    schematic: input.schematic,
    featured:
      typeof input.featured === 'boolean'
        ? input.featured
        : (existingProject?.featured ?? false),
  };
}

export function updateProjectStatus(
  projects: ProjectItem[],
  projectId: string,
  nextStatus: ProjectStatus
): ProjectItem[] {
  return projects.map((project) =>
    project.id === projectId ? { ...project, status: nextStatus } : project
  );
}

export function validateTeamForm(input: TeamFormInput): {
  isValid: boolean;
  errors: TeamValidationErrors;
} {
  const errors: TeamValidationErrors = {};
  if (input.name.trim().length < 3) {
    errors.name = 'Enter full name and professional title (at least 3 characters).';
  }
  if (input.role.trim().length < 3) {
    errors.role = 'Specify company role or designation.';
  }
  if (input.discipline.trim().length < 3) {
    errors.discipline = 'Specify engineering or architectural discipline.';
  }
  if (input.licenseLabel.trim().length < 3) {
    errors.licenseLabel = 'Enter PRC registration or accreditation label.';
  }
  const years = Number(input.experienceYears);
  if (!Number.isFinite(years) || years < 0 || years > 65) {
    errors.experienceYears = 'Enter valid years of experience (0–65).';
  }
  if (input.bio.trim().length < 15) {
    errors.bio = 'Provide a brief technical bio (at least 15 characters).';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

function deriveInitials(name: string): string {
  const cleaned = name
    .replace(/^(Engr\.|Ar\.|Atty\.|Arch\.)\s+/i, '')
    .replace(/,\s*[A-Z]+$/i, '')
    .trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'MS';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function createTeamMember(
  input: TeamFormInput,
  existingMember?: TeamMember | null
): TeamMember {
  const trimmedName = input.name.trim();
  const initials = input.initials.trim()
    ? input.initials.trim().slice(0, 3).toUpperCase()
    : deriveInitials(trimmedName);

  return {
    id: existingMember?.id ?? `team-${Date.now()}`,
    name: trimmedName,
    initials,
    role: input.role.trim(),
    discipline: input.discipline.trim(),
    licenseLabel: input.licenseLabel.trim(),
    experienceYears: Math.max(0, Math.round(Number(input.experienceYears) || 0)),
    education: input.education.trim() || 'Licensed Technical Professional',
    bio: input.bio.trim(),
    specializations: splitNonEmptyLines(input.specializationsText, [
      'Project Supervision & Quality Control',
    ]),
    notableProjects: splitNonEmptyLines(input.notableProjectsText, [
      'Central Luzon Engineering Works',
    ]),
  };
}

export function validateCredentialForm(input: CredentialFormInput): {
  isValid: boolean;
  errors: CredentialValidationErrors;
} {
  const errors: CredentialValidationErrors = {};
  if (input.code.trim().length < 2) {
    errors.code = 'Enter short code (e.g., PCAB, PRC, ISO).';
  }
  if (input.title.trim().length < 4) {
    errors.title = 'Enter credential title (at least 4 characters).';
  }
  if (input.issuingBody.trim().length < 3) {
    errors.issuingBody = 'Specify the issuing authority or body.';
  }
  if (input.classification.trim().length < 3) {
    errors.classification = 'Specify registration category or classification.';
  }
  if (input.description.trim().length < 15) {
    errors.description = 'Describe scope of accreditation (at least 15 characters).';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function createCredentialItem(
  input: CredentialFormInput,
  existingCredential?: CredentialItem | null
): CredentialItem {
  return {
    id: existingCredential?.id ?? `cred-${Date.now()}`,
    code: input.code.trim().toUpperCase(),
    title: input.title.trim(),
    issuingBody: input.issuingBody.trim(),
    classification: input.classification.trim(),
    description: input.description.trim(),
    documentReference: input.documentReference.trim() || undefined,
  };
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+\d][\d\s()-]{6,18}\d$/;

export function validateInquiryForm(input: InquiryFormInput): {
  isValid: boolean;
  errors: InquiryValidationErrors;
} {
  const errors: InquiryValidationErrors = {};

  const trimmedName = input.fullName.trim();
  if (trimmedName.length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  const trimmedEmail = input.email.trim();
  if (!trimmedEmail) {
    errors.email = 'Please provide an email address for your quotation.';
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address (e.g., name@company.com).';
  }

  const trimmedPhone = input.phone.trim();
  const digitCount = trimmedPhone.replace(/\D/g, '').length;
  if (!trimmedPhone) {
    errors.phone = 'Please provide a mobile or landline number.';
  } else if (!PHONE_PATTERN.test(trimmedPhone) || digitCount < 7 || digitCount > 15) {
    errors.phone = 'Enter a valid contact number (e.g., +63 919 099 1178 or 045-402-1468).';
  }

  const trimmedLocation = input.location.trim();
  if (trimmedLocation.length < 3) {
    errors.location = 'Please specify the project site municipality or province.';
  }

  const trimmedScope = input.projectScope.trim();
  if (trimmedScope.length < 20) {
    errors.projectScope =
      'Please describe your project scope, target floor area, or deliverables (at least 20 characters).';
  }

  if (!input.privacyConsent) {
    errors.privacyConsent =
      'Please acknowledge the processing of your submitted project inquiry details.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatInquiryReference(date: Date, sequenceNumber: number): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const seq = String(Math.max(1, sequenceNumber)).padStart(4, '0');
  return `MST-${year}${month}-${seq}`;
}

export function filterInquiries(
  inquiries: SubmittedInquiry[],
  statusFilter: 'All' | InquiryWorkflowStatus,
  searchQuery: string
): SubmittedInquiry[] {
  const query = searchQuery.trim().toLowerCase();
  return inquiries.filter((inq) => {
    const matchesStatus =
      statusFilter === 'All' || inq.workflowStatus === statusFilter;
    if (!matchesStatus) return false;
    if (!query) return true;
    const text = [
      inq.referenceCode,
      inq.fullName,
      inq.companyName,
      inq.email,
      inq.location,
      inq.projectCategory,
      inq.projectScope,
    ]
      .join(' ')
      .toLowerCase();
    return text.includes(query);
  });
}

export function computeAdminStats(
  projects: ProjectItem[],
  inquiries: SubmittedInquiry[],
  teamMembers: TeamMember[],
  credentials: CredentialItem[]
): AdminOverviewStats {
  const ongoingProjects = projects.filter((p) => p.status === 'Ongoing').length;
  const completedProjects = projects.filter((p) => p.status === 'Completed').length;
  const featuredProjects = projects.filter((p) => Boolean(p.featured)).length;
  const newInquiries = inquiries.filter((i) => i.workflowStatus === 'New').length;
  const activeInquiries = inquiries.filter(
    (i) => i.workflowStatus === 'In Progress' || i.workflowStatus === 'Under Review'
  ).length;
  const quotedInquiries = inquiries.filter(
    (i) => i.workflowStatus === 'Quotation Sent'
  ).length;

  return {
    totalProjects: projects.length,
    ongoingProjects,
    completedProjects,
    featuredProjects,
    totalInquiries: inquiries.length,
    newInquiries,
    activeInquiries,
    quotedInquiries,
    teamCount: teamMembers.length,
    credentialsCount: credentials.length,
  };
}

export function verifyAdminCredentials(
  emailInput: string,
  passkeyInput: string,
  expectedEmail: string,
  expectedPasskey: string
): boolean {
  return (
    emailInput.trim().toLowerCase() === expectedEmail.trim().toLowerCase() &&
    passkeyInput === expectedPasskey
  );
}
