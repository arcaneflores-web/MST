import type {
  InquiryFormInput,
  InquiryValidationErrors,
  ProjectCategory,
  ProjectFormInput,
  ProjectItem,
  ProjectStatus,
  ProjectValidationErrors,
} from '../types/construction';

export interface ProjectFilterCriteria {
  category: 'All' | ProjectCategory;
  status: 'All' | ProjectStatus;
  searchQuery: string;
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

  const splitLines = (raw: string, fallback: string[]): string[] => {
    const lines = raw
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    return lines.length > 0 ? lines : fallback;
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
    engineeringHighlights: splitLines(input.highlightsText, [
      'NSCP 2015 compliant structural design and site quality inspection',
    ]),
    deliverables: splitLines(input.deliverablesText, [
      'General Construction & Engineering Supervision',
    ]),
    outcomeMetric:
      input.outcomeMetric.trim() ||
      (input.status === 'Completed'
        ? 'Completed and turned over to client specifications'
        : 'Active construction progressing on approved schedule'),
    schematic: input.schematic,
    featured: existingProject?.featured ?? false,
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
