import { useEffect, useState } from 'react';
import { INITIAL_INQUIRIES } from './data/companyData';
import type {
  InquiryFormInput,
  InquiryWorkflowStatus,
  ProjectItem,
  SubmittedInquiry,
  TeamMember,
} from './types/construction';
import { formatInquiryReference } from './utils/inquiryLogic';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { CredentialsSection } from './components/CredentialsSection';
import { TeamSection } from './components/TeamSection';
import { InquirySection } from './components/InquirySection';
import { InquiryLogModal, ProjectModal, TeamModal } from './components/Modals';
import { Footer } from './components/Footer';

const STORAGE_KEY = 'mst_construction_inquiries_v1';

function loadStoredInquiries(): SubmittedInquiry[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_INQUIRIES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_INQUIRIES;
  } catch {
    return INITIAL_INQUIRIES;
  }
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [inquiryLogOpen, setInquiryLogOpen] = useState(false);
  const [preselectedServiceNote, setPreselectedServiceNote] = useState<string | null>(null);
  const [inquiries, setInquiries] = useState<SubmittedInquiry[]>(loadStoredInquiries);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
    } catch {
      // Ignore storage quota errors in restricted environments
    }
  }, [inquiries]);

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestQuote = () => {
    scrollToSection('inquiry');
  };

  const handleSelectServiceForInquiry = (serviceTitle: string) => {
    setPreselectedServiceNote(serviceTitle);
    scrollToSection('inquiry');
  };

  const handleRequestSimilarProject = (projectTitle: string) => {
    setPreselectedServiceNote(`Similar build to ${projectTitle}`);
    scrollToSection('inquiry');
  };

  const handleSubmitInquiry = (input: InquiryFormInput): SubmittedInquiry => {
    const nextSequence = inquiries.length + 1;
    const created: SubmittedInquiry = {
      ...input,
      id: `inq-${Date.now()}`,
      referenceCode: formatInquiryReference(new Date(), nextSequence),
      submittedAt: new Date().toISOString(),
      workflowStatus: 'New',
    };
    setInquiries((prev) => [created, ...prev]);
    return created;
  };

  const handleUpdateInquiryStatus = (id: string, status: InquiryWorkflowStatus) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, workflowStatus: status } : item))
    );
  };

  const handleDeleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar onRequestQuote={handleRequestQuote} />

      <main>
        <HeroSection
          onRequestQuote={handleRequestQuote}
          onExploreProjects={() => scrollToSection('projects')}
        />

        <ServicesSection onSelectServiceForInquiry={handleSelectServiceForInquiry} />

        <PortfolioSection onSelectProject={setSelectedProject} />

        <CredentialsSection />

        <TeamSection onSelectMember={setSelectedMember} />

        <InquirySection
          preselectedServiceNote={preselectedServiceNote}
          inquiries={inquiries}
          onSubmitInquiry={handleSubmitInquiry}
          onOpenInquiryLog={() => setInquiryLogOpen(true)}
        />
      </main>

      <Footer />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onRequestSimilar={handleRequestSimilarProject}
      />

      <TeamModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />

      <InquiryLogModal
        open={inquiryLogOpen}
        inquiries={inquiries}
        onClose={() => setInquiryLogOpen(false)}
        onUpdateStatus={handleUpdateInquiryStatus}
        onDeleteInquiry={handleDeleteInquiry}
      />
    </div>
  );
}
