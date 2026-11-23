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
  description: string;
  onNavigateHome: () => void;
}

function PageHeader({
  eyebrow,
  title,
  description,
  onNavigateHome,
}: PageHeaderProps) {
  return (
    <div className="border-b-2 border-blue-700 bg-slate-900 py-7 text-white lg:py-9">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <button
            type="button"
            onClick={onNavigateHome}
            className="font-medium hover:text-white hover:underline"
          >
            Home
          </button>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-blue-400">{eyebrow}</span>
        </div>

        <div className="mt-2.5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <h1
            className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
            style={{ textWrap: 'balance' }}
          >
            {title}
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-slate-300">
            {description}
          </p>
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
        description="Corporate background, mission and vision, 7-step delivery process, and verified PCAB, SEC, PRC, and DOLE credentials."
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
        description="Turnkey building works, structural steel industrial facilities, civil infrastructure, MEPFS coordination, architectural consultancy, and fit-outs."
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
        description="Completed developments and active ongoing construction sites across Pampanga and Central Luzon filtered by sector or completion status."
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
        description="PRC-licensed civil engineers, design architects, MEPFS specialists, quantity surveyors, and DOLE-accredited safety officers."
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
        description="Reach our San Fernando headquarters for ocular site inspections, Bill of Quantities proposals, or design-build consultations."
        onNavigateHome={() => onNavigate('home')}
      />
      <InquirySection onSubmitInquiry={onSubmitInquiry} />
    </>
  );
}
