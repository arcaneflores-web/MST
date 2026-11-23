import { useEffect, useState } from 'react';
import { INITIAL_INQUIRIES, PROJECTS as SEED_PROJECTS } from './data/companyData';
import type {
  InquiryFormInput,
  InquiryWorkflowStatus,
  ProjectFormInput,
  ProjectItem,
  ProjectStatus,
  SubmittedInquiry,
  TeamMember,
} from './types/construction';
import {
  createProjectItem,
  formatInquiryReference,
  updateProjectStatus,
} from './utils/inquiryLogic';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutProcessSection } from './components/AboutProcessSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { CredentialsSection } from './components/CredentialsSection';
import { TeamSection } from './components/TeamSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { InquirySection } from './components/InquirySection';
import { InquiryLogModal, ProjectModal, TeamModal } from './components/Modals';
import { InquiryModal } from './components/InquiryModal';
import { ProjectFormModal } from './components/ProjectFormModal';
import { Footer } from './components/Footer';

const INQUIRIES_STORAGE_KEY = 'mst_construction_inquiries_v1';
const PROJECTS_STORAGE_KEY = 'mst_construction_projects_v1';

function loadStoredInquiries(): SubmittedInquiry[] {
  try {
    const raw = window.localStorage.getItem(INQUIRIES_STORAGE_KEY);
    if (!raw) return INITIAL_INQUIRIES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_INQUIRIES;
  } catch {
    return INITIAL_INQUIRIES;
  }
}

function loadStoredProjects(): ProjectItem[] {
  try {
    const raw = window.localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (!raw) return SEED_PROJECTS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SEED_PROJECTS;
  } catch {
    return SEED_PROJECTS;
  }
}

export default function App() {
  const [projects, setProjects] = useState<ProjectItem[]>(loadStoredProjects);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [projectFormOpen, setProjectFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryLogOpen, setInquiryLogOpen] = useState(false);
  const [preselectedServiceNote, setPreselectedServiceNote] = useState<string | null>(null);
  const [inquiries, setInquiries] = useState<SubmittedInquiry[]>(loadStoredInquiries);

  useEffect(() => {
    try {
      window.localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(inquiries));
    } catch {
      // Ignore storage quota errors
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      window.localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
    } catch {
      // Ignore storage quota errors
    }
  }, [projects]);

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestQuote = () => {
    setInquiryModalOpen(true);
  };

  const handleSelectServiceForInquiry = (serviceTitle: string) => {
    setPreselectedServiceNote(serviceTitle);
    setInquiryModalOpen(true);
  };

  const handleRequestSimilarProject = (projectTitle: string) => {
    setPreselectedServiceNote(`Similar build to ${projectTitle}`);
    setInquiryModalOpen(true);
  };

  const handleOpenAddProject = () => {
    setEditingProject(null);
    setProjectFormOpen(true);
  };

  const handleOpenEditProject = (project: ProjectItem) => {
    setEditingProject(project);
    setProjectFormOpen(true);
  };

  const handleSaveProject = (
    input: ProjectFormInput,
    existing: ProjectItem | null
  ) => {
    if (existing) {
      const updated = createProjectItem(input, projects.length, existing);
      setProjects((prev) =>
        prev.map((item) => (item.id === existing.id ? updated : item))
      );
      if (selectedProject?.id === existing.id) {
        setSelectedProject(updated);
      }
    } else {
      const created = createProjectItem(input, projects.length);
      setProjects((prev) => [created, ...prev]);
    }
  };

  const handleUpdateProjectStatus = (projectId: string, nextStatus: ProjectStatus) => {
    setProjects((prev) => updateProjectStatus(prev, projectId, nextStatus));
    setSelectedProject((prev) =>
      prev && prev.id === projectId ? { ...prev, status: nextStatus } : prev
    );
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

        <AboutProcessSection />

        <ServicesSection onSelectServiceForInquiry={handleSelectServiceForInquiry} />

        <PortfolioSection
          projects={projects}
          onSelectProject={setSelectedProject}
          onAddProject={handleOpenAddProject}
          onEditProject={handleOpenEditProject}
          onUpdateProjectStatus={handleUpdateProjectStatus}
        />

        <CredentialsSection />

        <TeamSection onSelectMember={setSelectedMember} />

        <TestimonialsSection />

        <InquirySection
          inquiries={inquiries}
          onOpenInquiryDialog={handleRequestQuote}
          onOpenInquiryLog={() => setInquiryLogOpen(true)}
        />
      </main>

      <Footer onOpenInquiry={handleRequestQuote} />

      <InquiryModal
        open={inquiryModalOpen}
        preselectedServiceNote={preselectedServiceNote}
        inquiryCount={inquiries.length}
        onClose={() => setInquiryModalOpen(false)}
        onSubmitInquiry={handleSubmitInquiry}
        onOpenInquiryLog={() => setInquiryLogOpen(true)}
      />

      <ProjectFormModal
        open={projectFormOpen}
        editingProject={editingProject}
        onClose={() => setProjectFormOpen(false)}
        onSaveProject={handleSaveProject}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onRequestSimilar={handleRequestSimilarProject}
        onEditProject={handleOpenEditProject}
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
