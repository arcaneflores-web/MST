import type {
  CredentialItem,
  InquiryFormInput,
  ProjectItem,
  PublicPage,
  SubmittedInquiry,
  TeamMember,
} from '../types/construction';
import { AboutProcessSection } from './AboutProcessSection';
import { CredentialsSection } from './CredentialsSection';
import { InquirySection } from './InquirySection';
import { PortfolioSection } from './PortfolioSection';
import { ServicesSection } from './ServicesSection';
import { TeamSection } from './TeamSection';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  onNavigateHome: () => void;
}

function PageHeader({
  eyebrow,
  title,
  onNavigateHome,
}: PageHeaderProps) {
  return (
    <div className="border-b border-white/[0.12] bg-slate-900 py-3.5 text-white/95 lg:py-4">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-2 px-6 lg:px-10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[11px] text-white/60">
            <button
              type="button"
              onClick={onNavigateHome}
              className="font-medium hover:text-white/95 hover:underline"
            >
              Home
            </button>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-blue-400">{eyebrow}</span>
          </div>

          <h1
            className="text-lg font-bold tracking-tight text-white/95 sm:text-xl"
            style={{ textWrap: 'balance' }}
          >
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}

export function AboutUsPage({
  credentials,
  onNavigate,
}: {
  credentials: CredentialItem[];
  onNavigate: (page: PublicPage) => void;
}) {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="About MST Construction OPC"
        onNavigateHome={() => onNavigate('home')}
      />
      <AboutProcessSection mode="full" />
      <CredentialsSection credentials={credentials} />
    </>
  );
}

export function ServicesPage({
  onNavigate,
  onSelectServiceForInquiry,
}: {
  onNavigate: (page: PublicPage) => void;
  onSelectServiceForInquiry: (serviceTitle: string) => void;
}) {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Construction, Engineering & Design-Build Services"
        onNavigateHome={() => onNavigate('home')}
      />
      <ServicesSection
        mode="full"
        onSelectServiceForInquiry={onSelectServiceForInquiry}
      />
    </>
  );
}

export function ProjectsPage({
  projects,
  onNavigate,
  onSelectProject,
}: {
  projects: ProjectItem[];
  onNavigate: (page: PublicPage) => void;
  onSelectProject: (project: ProjectItem, initialImageIndex?: number) => void;
}) {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Project Portfolio"
        onNavigateHome={() => onNavigate('home')}
      />
      <PortfolioSection
        mode="full"
        projects={projects}
        onSelectProject={onSelectProject}
      />
    </>
  );
}

export function TeamPage({
  members,
  onNavigate,
  onSelectMember,
}: {
  members: TeamMember[];
  onNavigate: (page: PublicPage) => void;
  onSelectMember: (member: TeamMember) => void;
}) {
  return (
    <>
      <PageHeader
        eyebrow="Our Team"
        title="Management, Engineers & Technical Personnel"
        onNavigateHome={() => onNavigate('home')}
      />
      <TeamSection members={members} onSelectMember={onSelectMember} />
    </>
  );
}

export function ContactPage({
  onNavigate,
  onSubmitInquiry,
}: {
  onNavigate: (page: PublicPage) => void;
  onSubmitInquiry: (input: InquiryFormInput) => SubmittedInquiry;
}) {
  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        title="Contact MST Construction OPC"
        onNavigateHome={() => onNavigate('home')}
      />
      <InquirySection onSubmitInquiry={onSubmitInquiry} />
    </>
  );
}
