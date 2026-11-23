export type ProjectCategory = 'Commercial' | 'Residential' | 'Industrial' | 'Infrastructure';
export type ProjectStatus = 'Completed' | 'Ongoing';
export type VisualSchematicType =
  | 'commercial-hub'
  | 'steel-warehouse'
  | 'modern-residence'
  | 'road-drainage'
  | 'medical-clinic'
  | 'office-fitout';

export interface ProjectItem {
  id: string;
  code: string;
  title: string;
  category: ProjectCategory;
  status: ProjectStatus;
  location: string;
  year: string;
  clientSector: string;
  floorArea: string;
  duration: string;
  summary: string;
  engineeringHighlights: string[];
  deliverables: string[];
  outcomeMetric: string;
  schematic: VisualSchematicType;
  featured?: boolean;
}

export interface ServiceItem {
  index: string;
  id: string;
  title: string;
  subtitle: string;
  description: string;
  capabilities: string[];
  standards: string;
  typicalTimeline: string;
  featuredSpan?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  discipline: string;
  licenseLabel: string;
  experienceYears: number;
  education: string;
  bio: string;
  specializations: string[];
  notableProjects: string[];
}

export interface CredentialItem {
  id: string;
  code: string;
  title: string;
  issuingBody: string;
  classification: string;
  description: string;
}

export interface InquiryFormInput {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  projectCategory: ProjectCategory | 'Renovation / Fit-Out' | 'Engineering Consultancy';
  location: string;
  estimatedBudget: string;
  targetStart: string;
  projectScope: string;
}

export interface InquiryValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
  projectScope?: string;
}

export type InquiryWorkflowStatus = 'New' | 'Under Review' | 'Quotation Sent';

export interface SubmittedInquiry extends InquiryFormInput {
  id: string;
  referenceCode: string;
  submittedAt: string;
  workflowStatus: InquiryWorkflowStatus;
}
