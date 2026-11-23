import type {
  InquiryFormInput,
  InquiryValidationErrors,
  ProjectCategory,
  ProjectItem,
  ProjectStatus,
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
