import { useEffect, useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import {
  CREDENTIALS as SEED_CREDENTIALS,
  INITIAL_INQUIRIES,
  PROJECTS as SEED_PROJECTS,
  TEAM_MEMBERS as SEED_TEAM_MEMBERS,
} from './data/companyData';
import type {
  AppPage,
  CredentialFormInput,
  CredentialItem,
  InquiryFormInput,
  InquiryWorkflowStatus,
  ProjectFormInput,
  ProjectItem,
  ProjectStatus,
  SubmittedInquiry,
  TeamFormInput,
  TeamMember,
} from './types/construction';
import {
  createCredentialItem,
  createProjectItem,
  createTeamMember,
  formatInquiryReference,
  getPathnameForPage,
  parseRouteFromPathname,
  updateProjectStatus,
} from './utils/inquiryLogic';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import {
  AboutUsPage,
  ContactPage,
  ProjectsPage,
  ServicesPage,
  TeamPage,
} from './components/PublicSubpages';
import { InquiryModal } from './components/InquiryModal';
import { ContactUsModal } from './components/ContactUsModal';
import { ProjectModal, TeamModal } from './components/Modals';
import { ProjectFormModal } from './components/ProjectFormModal';
import { CredentialFormModal, TeamFormModal } from './components/AdminModals';
import { AdminDashboardPage } from './components/AdminDashboardPage';

const INQUIRIES_STORAGE_KEY = 'mst_construction_inquiries_v1';
const PROJECTS_STORAGE_KEY = 'mst_construction_projects_v1';
const TEAM_STORAGE_KEY = 'mst_construction_team_v1';
const CREDENTIALS_STORAGE_KEY = 'mst_construction_credentials_v1';
const ADMIN_SESSION_KEY = 'mst_construction_admin_auth_v1';

function loadStoredArray<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : fallback;
  } catch {
    return fallback;
  }
}

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

function loadAdminSession(): boolean {
  try {
    return window.sessionStorage.getItem(ADMIN_SESSION_KEY) === 'authenticated';
  } catch {
    return false;
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>(() =>
    parseRouteFromPathname(window.location.pathname)
  );
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(
    loadAdminSession
  );

  const [projects, setProjects] = useState<ProjectItem[]>(() =>
    loadStoredArray(PROJECTS_STORAGE_KEY, SEED_PROJECTS)
  );
  const [inquiries, setInquiries] = useState<SubmittedInquiry[]>(loadStoredInquiries);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() =>
    loadStoredArray(TEAM_STORAGE_KEY, SEED_TEAM_MEMBERS)
  );
  const [credentials, setCredentials] = useState<CredentialItem[]>(() =>
    loadStoredArray(CREDENTIALS_STORAGE_KEY, SEED_CREDENTIALS)
  );

  // Public modal state
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [preselectedServiceNote, setPreselectedServiceNote] = useState<string | null>(
    null
  );

  // Admin modal state
  const [projectFormOpen, setProjectFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [teamFormOpen, setTeamFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [credentialFormOpen, setCredentialFormOpen] = useState(false);
  const [editingCredential, setEditingCredential] = useState<CredentialItem | null>(
    null
  );

  useEffect(() => {
    const onPopState = () => {
      setCurrentPage(parseRouteFromPathname(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

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

  useEffect(() => {
    try {
      window.localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(teamMembers));
    } catch {
      // Ignore storage quota errors
    }
  }, [teamMembers]);

  useEffect(() => {
    try {
      window.localStorage.setItem(CREDENTIALS_STORAGE_KEY, JSON.stringify(credentials));
    } catch {
      // Ignore storage quota errors
    }
  }, [credentials]);

  const navigateTo = (page: AppPage) => {
    setContactModalOpen(false);
    const targetPath = getPathnameForPage(page);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ page }, '', targetPath);
    }
    setCurrentPage(page);
  };

  // Public inquiry actions
  const handleRequestQuote = () => {
    setPreselectedServiceNote(null);
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

  // Admin auth handlers
  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    try {
      window.sessionStorage.setItem(ADMIN_SESSION_KEY, 'authenticated');
    } catch {
      // Ignore sessionStorage errors
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } catch {
      // Ignore sessionStorage errors
    }
  };

  // Admin Project CRUD
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

  const handleToggleProjectFeatured = (projectId: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, featured: !p.featured } : p))
    );
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    if (selectedProject?.id === projectId) {
      setSelectedProject(null);
    }
  };

  // Admin Inquiry Management
  const handleUpdateInquiryStatus = (id: string, status: InquiryWorkflowStatus) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, workflowStatus: status } : item))
    );
  };

  const handleUpdateInquiryNotes = (id: string, notes: string) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, adminNotes: notes } : item))
    );
  };

  const handleDeleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((item) => item.id !== id));
  };

  // Admin Team CRUD
  const handleOpenAddTeamMember = () => {
    setEditingMember(null);
    setTeamFormOpen(true);
  };

  const handleOpenEditTeamMember = (member: TeamMember) => {
    setEditingMember(member);
    setTeamFormOpen(true);
  };

  const handleSaveTeamMember = (
    input: TeamFormInput,
    existing: TeamMember | null
  ) => {
    if (existing) {
      const updated = createTeamMember(input, existing);
      setTeamMembers((prev) =>
        prev.map((item) => (item.id === existing.id ? updated : item))
      );
      if (selectedMember?.id === existing.id) {
        setSelectedMember(updated);
      }
    } else {
      const created = createTeamMember(input);
      setTeamMembers((prev) => [...prev, created]);
    }
  };

  const handleDeleteTeamMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
    if (selectedMember?.id === id) {
      setSelectedMember(null);
    }
  };

  // Admin Credentials CRUD
  const handleOpenAddCredential = () => {
    setEditingCredential(null);
    setCredentialFormOpen(true);
  };

  const handleOpenEditCredential = (credential: CredentialItem) => {
    setEditingCredential(credential);
    setCredentialFormOpen(true);
  };

  const handleSaveCredential = (
    input: CredentialFormInput,
    existing: CredentialItem | null
  ) => {
    if (existing) {
      const updated = createCredentialItem(input, existing);
      setCredentials((prev) =>
        prev.map((item) => (item.id === existing.id ? updated : item))
      );
    } else {
      const created = createCredentialItem(input);
      setCredentials((prev) => [...prev, created]);
    }
  };

  const handleDeleteCredential = (id: string) => {
    setCredentials((prev) => prev.filter((c) => c.id !== id));
  };

  if (currentPage === 'admin') {
    return (
      <>
        <AdminDashboardPage
          isAuthenticated={isAdminAuthenticated}
          projects={projects}
          inquiries={inquiries}
          teamMembers={teamMembers}
          credentials={credentials}
          onLoginSuccess={handleAdminLoginSuccess}
          onLogout={handleAdminLogout}
          onNavigatePublic={(page) => navigateTo(page)}
          onOpenAddProject={handleOpenAddProject}
          onOpenEditProject={handleOpenEditProject}
          onUpdateProjectStatus={handleUpdateProjectStatus}
          onToggleProjectFeatured={handleToggleProjectFeatured}
          onDeleteProject={handleDeleteProject}
          onUpdateInquiryStatus={handleUpdateInquiryStatus}
          onUpdateInquiryNotes={handleUpdateInquiryNotes}
          onDeleteInquiry={handleDeleteInquiry}
          onOpenAddTeamMember={handleOpenAddTeamMember}
          onOpenEditTeamMember={handleOpenEditTeamMember}
          onDeleteTeamMember={handleDeleteTeamMember}
          onOpenAddCredential={handleOpenAddCredential}
          onOpenEditCredential={handleOpenEditCredential}
          onDeleteCredential={handleDeleteCredential}
        />

        <ProjectFormModal
          open={projectFormOpen}
          editingProject={editingProject}
          onClose={() => setProjectFormOpen(false)}
          onSaveProject={handleSaveProject}
        />

        <TeamFormModal
          open={teamFormOpen}
          editingMember={editingMember}
          onClose={() => setTeamFormOpen(false)}
          onSaveMember={handleSaveTeamMember}
        />

        <CredentialFormModal
          open={credentialFormOpen}
          editingCredential={editingCredential}
          onClose={() => setCredentialFormOpen(false)}
          onSaveCredential={handleSaveCredential}
        />
      </>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
        <Navbar
          currentPage={currentPage}
          contactDialogOpen={contactModalOpen}
          onNavigate={(page) => navigateTo(page)}
          onOpenContactDialog={() => setContactModalOpen(true)}
          onRequestQuote={handleRequestQuote}
        />

        <main className="flex-1 overflow-x-clip">
          <AnimatePresence
            mode="wait"
            initial={false}
            onExitComplete={() => window.scrollTo({ top: 0, behavior: 'auto' })}
          >
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {currentPage === 'home' && (
                <HomePage
                  projects={projects}
                  onNavigate={(page) => navigateTo(page)}
                  onRequestQuote={handleRequestQuote}
                  onSelectServiceForInquiry={handleSelectServiceForInquiry}
                  onSelectProject={setSelectedProject}
                />
              )}

              {currentPage === 'about' && (
                <AboutUsPage
                  credentials={credentials}
                  onNavigate={(page) => navigateTo(page)}
                />
              )}

              {currentPage === 'services' && (
                <ServicesPage
                  onNavigate={(page) => navigateTo(page)}
                  onSelectServiceForInquiry={handleSelectServiceForInquiry}
                />
              )}

              {currentPage === 'projects' && (
                <ProjectsPage
                  projects={projects}
                  onNavigate={(page) => navigateTo(page)}
                  onSelectProject={setSelectedProject}
                />
              )}

              {currentPage === 'team' && (
                <TeamPage
                  members={teamMembers}
                  onNavigate={(page) => navigateTo(page)}
                  onSelectMember={setSelectedMember}
                />
              )}

              {currentPage === 'contact' && (
                <ContactPage
                  onNavigate={(page) => navigateTo(page)}
                  onSubmitInquiry={handleSubmitInquiry}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer
          onNavigate={(page) => navigateTo(page)}
          onOpenInquiry={handleRequestQuote}
        />

        <ContactUsModal
          open={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
          onSubmitInquiry={handleSubmitInquiry}
        />

        <InquiryModal
          open={inquiryModalOpen}
          preselectedServiceNote={preselectedServiceNote}
          onClose={() => setInquiryModalOpen(false)}
          onSubmitInquiry={handleSubmitInquiry}
        />

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onRequestSimilar={handleRequestSimilarProject}
        />

        <TeamModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      </div>
    </MotionConfig>
  );
}
