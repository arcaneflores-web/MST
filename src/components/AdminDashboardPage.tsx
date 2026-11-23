import { useMemo, useState, type FormEvent } from 'react';
import {
  ArrowLeft,
  Building2,
  ClipboardList,
  FolderKanban,
  LayoutDashboard,
  Lock,
  LogOut,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Star,
  Trash2,
  Users,
} from 'lucide-react';
import { ADMIN_ACCESS_CONFIG } from '../data/companyData';
import type {
  AdminTab,
  CredentialItem,
  InquiryWorkflowStatus,
  ProjectItem,
  ProjectStatus,
  PublicPage,
  SubmittedInquiry,
  TeamMember,
} from '../types/construction';
import {
  computeAdminStats,
  filterInquiries,
  filterProjects,
  verifyAdminCredentials,
} from '../utils/inquiryLogic';
import { BrandMark } from './ArchitecturalVisuals';

interface AdminDashboardPageProps {
  isAuthenticated: boolean;
  projects: ProjectItem[];
  inquiries: SubmittedInquiry[];
  teamMembers: TeamMember[];
  credentials: CredentialItem[];
  onLoginSuccess: () => void;
  onLogout: () => void;
  onNavigatePublic: (page: PublicPage) => void;
  onOpenAddProject: () => void;
  onOpenEditProject: (project: ProjectItem) => void;
  onUpdateProjectStatus: (projectId: string, status: ProjectStatus) => void;
  onToggleProjectFeatured: (projectId: string) => void;
  onDeleteProject: (projectId: string) => void;
  onUpdateInquiryStatus: (id: string, status: InquiryWorkflowStatus) => void;
  onUpdateInquiryNotes: (id: string, notes: string) => void;
  onDeleteInquiry: (id: string) => void;
  onOpenAddTeamMember: () => void;
  onOpenEditTeamMember: (member: TeamMember) => void;
  onDeleteTeamMember: (id: string) => void;
  onOpenAddCredential: () => void;
  onOpenEditCredential: (credential: CredentialItem) => void;
  onDeleteCredential: (id: string) => void;
}

const ADMIN_TABS: Array<{
  id: AdminTab;
  label: string;
  icon: typeof LayoutDashboard;
}> = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects', label: 'Project Management', icon: FolderKanban },
  { id: 'inquiries', label: 'Inquiry Tracking', icon: ClipboardList },
  { id: 'team', label: 'Team Profiles', icon: Users },
  { id: 'credentials', label: 'Credentials & Docs', icon: ShieldCheck },
];

const INQUIRY_STATUS_OPTIONS: InquiryWorkflowStatus[] = [
  'New',
  'In Progress',
  'Under Review',
  'Quotation Sent',
  'Closed',
];

export function AdminDashboardPage({
  isAuthenticated,
  projects,
  inquiries,
  teamMembers,
  credentials,
  onLoginSuccess,
  onLogout,
  onNavigatePublic,
  onOpenAddProject,
  onOpenEditProject,
  onUpdateProjectStatus,
  onToggleProjectFeatured,
  onDeleteProject,
  onUpdateInquiryStatus,
  onUpdateInquiryNotes,
  onDeleteInquiry,
  onOpenAddTeamMember,
  onOpenEditTeamMember,
  onDeleteTeamMember,
  onOpenAddCredential,
  onOpenEditCredential,
  onDeleteCredential,
}: AdminDashboardPageProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPasscode, setLoginPasscode] = useState('');
  const [loginError, setLoginError] = useState('');

  const [projectStatusFilter, setProjectStatusFilter] = useState<'All' | ProjectStatus>('All');
  const [projectSearch, setProjectSearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<'All' | InquiryWorkflowStatus>('All');
  const [inquirySearch, setInquirySearch] = useState('');
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(
    inquiries[0]?.id ?? null
  );

  const stats = useMemo(
    () => computeAdminStats(projects, inquiries, teamMembers, credentials),
    [projects, inquiries, teamMembers, credentials]
  );

  const filteredProjects = useMemo(
    () =>
      filterProjects(projects, {
        category: 'All',
        status: projectStatusFilter,
        searchQuery: projectSearch,
      }),
    [projects, projectStatusFilter, projectSearch]
  );

  const filteredInquiries = useMemo(
    () => filterInquiries(inquiries, inquiryStatusFilter, inquirySearch),
    [inquiries, inquiryStatusFilter, inquirySearch]
  );

  const activeInquiry =
    inquiries.find((i) => i.id === selectedInquiryId) ?? filteredInquiries[0] ?? null;

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valid = verifyAdminCredentials(
      loginEmail,
      loginPasscode,
      ADMIN_ACCESS_CONFIG.email,
      ADMIN_ACCESS_CONFIG.passcode
    );
    if (!valid) {
      setLoginError('Invalid administrator email or passcode. Please try again.');
      return;
    }
    setLoginError('');
    setLoginPasscode('');
    onLoginSuccess();
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col justify-center bg-slate-950 px-6 py-12 text-slate-100">
        <div className="mx-auto w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-base font-bold text-white">
              <BrandMark className="h-6 w-6 shrink-0" />
              <span>MST Construction OPC</span>
            </div>
            <Lock className="h-4 w-4 text-blue-400" aria-hidden="true" />
          </div>

          <h1 className="mt-6 text-2xl font-bold tracking-tight text-white">
            Administrator Sign In
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Restricted access for authorized MST Construction OPC personnel to manage
            projects, inquiries, team rosters, and credentials.
          </p>

          {loginError && (
            <div
              role="alert"
              className="mt-5 rounded-md border border-red-800 bg-red-950/60 px-4 py-3 text-xs font-medium text-red-200"
            >
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} noValidate className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="admin-login-email"
                className="block text-xs font-semibold text-slate-300"
              >
                Administrator Email
              </label>
              <input
                id="admin-login-email"
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@mstconstruction.ph"
                className="mt-1.5 w-full rounded-md border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="admin-login-passcode"
                className="block text-xs font-semibold text-slate-300"
              >
                Passcode
              </label>
              <input
                id="admin-login-passcode"
                type="password"
                required
                value={loginPasscode}
                onChange={(e) => setLoginPasscode(e.target.value)}
                placeholder="Enter administrator passcode"
                className="mt-1.5 w-full rounded-md border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-blue-400"
            >
              Sign In to Admin Dashboard
            </button>
          </form>

          <div className="mt-6 rounded-lg border border-slate-800 bg-slate-950/70 p-4 text-xs text-slate-400">
            <p className="font-semibold text-slate-200">Authorized Demo Credentials</p>
            <p className="mt-1 font-mono text-[11px] text-slate-300">
              Email: {ADMIN_ACCESS_CONFIG.email}
            </p>
            <p className="mt-0.5 font-mono text-[11px] text-slate-300">
              Passcode: {ADMIN_ACCESS_CONFIG.passcode}
            </p>
            <button
              type="button"
              onClick={() => {
                setLoginEmail(ADMIN_ACCESS_CONFIG.email);
                setLoginPasscode(ADMIN_ACCESS_CONFIG.passcode);
                setLoginError('');
              }}
              className="mt-2.5 text-xs font-semibold text-blue-400 underline underline-offset-4 hover:text-blue-300"
            >
              Fill Demo Credentials
            </button>
          </div>

          <div className="mt-6 border-t border-slate-800 pt-5 text-center">
            <button
              type="button"
              onClick={() => onNavigatePublic('home')}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Return to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentTabTitle =
    ADMIN_TABS.find((t) => t.id === activeTab)?.label ?? 'Dashboard';

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 lg:flex">
      {/* Sidebar Navigation (260px fixed width on desktop) */}
      <aside className="flex flex-col justify-between border-b border-slate-800 bg-slate-950 text-slate-200 lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r">
        <div className="p-5">
          <div className="flex items-center gap-2.5 text-base font-bold text-white">
            <BrandMark className="h-6 w-6 shrink-0" />
            <span className="truncate">MST Admin</span>
          </div>
          <p className="mt-1 font-mono text-[11px] text-slate-400">
            Operations &amp; Portfolio Control
          </p>

          <nav
            aria-label="Admin Modules"
            className="mt-6 flex flex-wrap gap-1.5 lg:flex-col lg:gap-1"
          >
            {ADMIN_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`inline-flex items-center gap-2.5 rounded-md px-3 py-2 text-left text-xs font-semibold transition-colors whitespace-nowrap shrink-0 lg:w-full ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="hidden border-t border-slate-800 p-5 lg:block">
          <p className="text-xs font-medium text-slate-400">Signed in as</p>
          <p className="mt-0.5 truncate font-mono text-xs text-white">
            {ADMIN_ACCESS_CONFIG.email}
          </p>
        </div>
      </aside>

      {/* Main Workspace */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Admin Top Bar */}
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-3.5">
          <div>
            <p className="font-mono text-xs text-slate-500">
              MST Admin / <span className="font-semibold text-slate-900">{currentTabTitle}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigatePublic('home')}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 whitespace-nowrap shrink-0"
            >
              <Building2 className="h-3.5 w-3.5 text-blue-700" aria-hidden="true" />
              <span>View Public Site</span>
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-100 whitespace-nowrap shrink-0"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8">
          {/* MODULE 1: DASHBOARD OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-950">
                    Operations Dashboard
                  </h1>
                  <p className="mt-1 text-sm text-slate-600">
                    Overview of active construction projects, client quotation requests,
                    team roster, and corporate credentials.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={onOpenAddProject}
                    className="inline-flex items-center gap-1.5 rounded-md bg-blue-700 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-800 whitespace-nowrap shrink-0"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    <span>Add New Project</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('inquiries')}
                    className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 whitespace-nowrap shrink-0"
                  >
                    <span>Review Inquiries ({stats.newInquiries} New)</span>
                  </button>
                </div>
              </div>

              {/* KPI Strip */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <p className="text-xs font-medium text-slate-500">Total Projects</p>
                  <p className="mt-2 font-mono text-3xl font-bold text-slate-950 tabular-nums">
                    {stats.totalProjects}
                  </p>
                  <p className="mt-1 font-mono text-xs text-slate-600 tabular-nums">
                    {stats.ongoingProjects} Ongoing · {stats.completedProjects} Completed
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <p className="text-xs font-medium text-slate-500">Client Inquiries</p>
                  <p className="mt-2 font-mono text-3xl font-bold text-slate-950 tabular-nums">
                    {stats.totalInquiries}
                  </p>
                  <p className="mt-1 font-mono text-xs text-blue-700 tabular-nums">
                    {stats.newInquiries} New · {stats.activeInquiries} Active Review
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <p className="text-xs font-medium text-slate-500">Team Personnel</p>
                  <p className="mt-2 font-mono text-3xl font-bold text-slate-950 tabular-nums">
                    {stats.teamCount}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    Licensed engineers, architects &amp; safety leads
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <p className="text-xs font-medium text-slate-500">Active Credentials</p>
                  <p className="mt-2 font-mono text-3xl font-bold text-slate-950 tabular-nums">
                    {stats.credentialsCount}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    Published on public About Us page
                  </p>
                </div>
              </div>

              {/* Recent Inquiries & Active Projects Split */}
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <section className="rounded-xl border border-slate-200 bg-white p-6">
                  <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <h2 className="text-base font-bold text-slate-950">
                      Latest Project Inquiries
                    </h2>
                    <button
                      type="button"
                      onClick={() => setActiveTab('inquiries')}
                      className="text-xs font-semibold text-blue-700 hover:underline"
                    >
                      Manage All
                    </button>
                  </div>

                  {inquiries.length === 0 ? (
                    <p className="py-8 text-center text-sm text-slate-500">
                      No inquiries submitted yet.
                    </p>
                  ) : (
                    <ul className="divide-y divide-slate-100">
                      {inquiries.slice(0, 4).map((inq) => (
                        <li
                          key={inq.id}
                          className="flex items-center justify-between gap-4 py-3 text-sm"
                        >
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-slate-950">
                              {inq.fullName}{' '}
                              <span className="font-mono text-xs font-normal text-slate-500">
                                ({inq.referenceCode})
                              </span>
                            </p>
                            <p className="truncate text-xs text-slate-500">
                              {inq.projectCategory} · {inq.location}
                            </p>
                          </div>
                          <span className="shrink-0 font-mono text-xs font-semibold text-blue-700">
                            {inq.workflowStatus}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                <section className="rounded-xl border border-slate-200 bg-white p-6">
                  <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <h2 className="text-base font-bold text-slate-950">
                      Ongoing &amp; Recent Portfolio Entries
                    </h2>
                    <button
                      type="button"
                      onClick={() => setActiveTab('projects')}
                      className="text-xs font-semibold text-blue-700 hover:underline"
                    >
                      Manage Projects
                    </button>
                  </div>

                  <ul className="divide-y divide-slate-100">
                    {projects.slice(0, 4).map((proj) => (
                      <li
                        key={proj.id}
                        className="flex items-center justify-between gap-4 py-3 text-sm"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-950">
                            {proj.title}
                          </p>
                          <p className="truncate text-xs text-slate-500">
                            {proj.code} · {proj.location}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 font-mono text-xs font-semibold ${
                            proj.status === 'Ongoing' ? 'text-blue-700' : 'text-emerald-700'
                          }`}
                        >
                          {proj.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          )}

          {/* MODULE 2: PROJECT MANAGEMENT */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-950">
                    Project Portfolio Management
                  </h1>
                  <p className="mt-1 text-sm text-slate-600">
                    Add, update, delete, feature on Homepage, or transition projects
                    between Ongoing and Completed status.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onOpenAddProject}
                  className="inline-flex items-center gap-1.5 rounded-md bg-blue-700 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-800 whitespace-nowrap shrink-0"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  <span>Add New Project</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4">
                <div
                  role="group"
                  aria-label="Admin filter projects by status"
                  className="flex items-center gap-1 rounded-lg bg-slate-100 p-1"
                >
                  {(['All', 'Ongoing', 'Completed'] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setProjectStatusFilter(status)}
                      className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                        projectStatusFilter === status
                          ? 'bg-slate-900 text-white'
                          : 'text-slate-600 hover:text-slate-950'
                      }`}
                    >
                      {status === 'All' ? 'All Statuses' : status}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-72">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    aria-label="Search admin projects"
                    value={projectSearch}
                    onChange={(e) => setProjectSearch(e.target.value)}
                    placeholder="Search code, title, location..."
                    className="w-full rounded-md border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-blue-700 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Project</th>
                      <th className="px-4 py-3">Sector &amp; Location</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Homepage</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProjects.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-10 text-center text-sm text-slate-500"
                        >
                          No projects match the current filter.
                        </td>
                      </tr>
                    ) : (
                      filteredProjects.map((project) => (
                        <tr key={project.id} className="hover:bg-slate-50/60">
                          <td className="px-4 py-3">
                            <p className="font-mono text-[11px] font-medium text-blue-700">
                              {project.code}
                            </p>
                            <p className="font-semibold text-slate-950">{project.title}</p>
                            <p className="font-mono text-xs text-slate-500 tabular-nums">
                              {project.floorArea} · {project.duration}
                            </p>
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-700">
                            <p className="font-semibold text-slate-900">{project.category}</p>
                            <p className="mt-0.5 text-slate-500">{project.location}</p>
                          </td>
                          <td className="px-4 py-3">
                            <select
                              aria-label={`Update status for ${project.title}`}
                              value={project.status}
                              onChange={(e) =>
                                onUpdateProjectStatus(
                                  project.id,
                                  e.target.value as ProjectStatus
                                )
                              }
                              className="rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-900 focus:border-blue-700 focus:outline-none"
                            >
                              <option value="Ongoing">Ongoing</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              onClick={() => onToggleProjectFeatured(project.id)}
                              aria-pressed={Boolean(project.featured)}
                              className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                                project.featured
                                  ? 'border-amber-300 bg-amber-50 text-amber-800'
                                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              <Star className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>{project.featured ? 'Featured' : 'Standard'}</span>
                            </button>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="inline-flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => onOpenEditProject(project)}
                                aria-label={`Edit ${project.title}`}
                                className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                              >
                                <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                                <span>Edit</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => onDeleteProject(project.id)}
                                aria-label={`Delete ${project.title}`}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 hover:border-red-300 hover:text-red-700"
                              >
                                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MODULE 3: INQUIRY MANAGEMENT & TRACKING */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-950">
                  Inquiry Management &amp; Tracking
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  Inspect incoming client quotation requests, track workflow progress,
                  and record internal estimator notes.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1">
                  {(['All', ...INQUIRY_STATUS_OPTIONS] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setInquiryStatusFilter(status)}
                      className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                        inquiryStatusFilter === status
                          ? 'bg-slate-900 text-white'
                          : 'text-slate-600 hover:text-slate-950'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-72">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    aria-label="Search inquiries"
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    placeholder="Search client, ref code, location..."
                    className="w-full rounded-md border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-blue-700 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {filteredInquiries.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
                  <p className="text-sm font-semibold text-slate-900">
                    No matching inquiries found
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Submitted inquiries from the public Contact page and Request a Quote
                    dialog appear here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                  {/* Inquiry Queue List */}
                  <div className="space-y-3 xl:col-span-6">
                    {filteredInquiries.map((inq) => {
                      const isSelected = activeInquiry?.id === inq.id;
                      return (
                        <article
                          key={inq.id}
                          className={`rounded-xl border bg-white p-4 transition-colors ${
                            isSelected
                              ? 'border-blue-700 ring-1 ring-blue-700'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <button
                              type="button"
                              onClick={() => setSelectedInquiryId(inq.id)}
                              className="text-left focus:outline-none"
                            >
                              <p className="font-mono text-xs font-semibold text-blue-700 tabular-nums">
                                {inq.referenceCode}
                              </p>
                              <h2 className="mt-0.5 text-base font-bold text-slate-950">
                                {inq.fullName}
                                {inq.companyName ? ` · ${inq.companyName}` : ''}
                              </h2>
                              <p className="mt-0.5 text-xs text-slate-600">
                                {inq.projectCategory} · {inq.location}
                              </p>
                            </button>

                            <div className="flex items-center gap-2">
                              <select
                                aria-label={`Workflow status for ${inq.referenceCode}`}
                                value={inq.workflowStatus}
                                onChange={(e) =>
                                  onUpdateInquiryStatus(
                                    inq.id,
                                    e.target.value as InquiryWorkflowStatus
                                  )
                                }
                                className="rounded-md border border-slate-300 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-900 focus:border-blue-700 focus:outline-none"
                              >
                                {INQUIRY_STATUS_OPTIONS.map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>

                              <button
                                type="button"
                                onClick={() => onDeleteInquiry(inq.id)}
                                aria-label={`Delete inquiry ${inq.referenceCode}`}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 hover:border-red-300 hover:text-red-700"
                              >
                                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>

                  {/* Inquiry Detail Inspector */}
                  {activeInquiry && (
                    <aside className="rounded-xl border border-slate-200 bg-white p-6 xl:col-span-6">
                      <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                        <div>
                          <p className="font-mono text-xs font-semibold text-blue-700">
                            {activeInquiry.referenceCode}
                          </p>
                          <h2 className="mt-1 text-xl font-bold text-slate-950">
                            {activeInquiry.fullName}
                          </h2>
                          {activeInquiry.companyName && (
                            <p className="text-sm text-slate-600">
                              {activeInquiry.companyName}
                            </p>
                          )}
                        </div>
                        <span className="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-xs font-semibold text-slate-900">
                          {activeInquiry.workflowStatus}
                        </span>
                      </div>

                      <dl className="mt-5 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                        <div>
                          <dt className="text-xs text-slate-500">Email &amp; Phone</dt>
                          <dd className="mt-0.5 font-mono text-xs text-slate-900">
                            {activeInquiry.email}
                            <br />
                            {activeInquiry.phone} ({activeInquiry.preferredContact})
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs text-slate-500">Budget &amp; Timeline</dt>
                          <dd className="mt-0.5 font-mono text-xs text-slate-900 tabular-nums">
                            {activeInquiry.estimatedBudget}
                            <br />
                            Start: {activeInquiry.targetStart}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs text-slate-500">Project Site &amp; Area</dt>
                          <dd className="mt-0.5 text-slate-900">
                            {activeInquiry.location}
                            {activeInquiry.estimatedFloorArea
                              ? ` · ${activeInquiry.estimatedFloorArea}`
                              : ''}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs text-slate-500">Readiness</dt>
                          <dd className="mt-0.5 text-slate-900">
                            {activeInquiry.readinessStatus}
                          </dd>
                        </div>
                      </dl>

                      <div className="mt-5 border-t border-slate-100 pt-4">
                        <h3 className="text-xs font-bold tracking-wider text-slate-900 uppercase">
                          Submitted Project Scope
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-700">
                          {activeInquiry.projectScope}
                        </p>
                      </div>

                      <div className="mt-5 border-t border-slate-100 pt-4">
                        <label
                          htmlFor="admin-inquiry-notes"
                          className="block text-xs font-bold tracking-wider text-slate-900 uppercase"
                        >
                          Internal Estimator Notes
                        </label>
                        <textarea
                          id="admin-inquiry-notes"
                          rows={3}
                          value={activeInquiry.adminNotes ?? ''}
                          onChange={(e) =>
                            onUpdateInquiryNotes(activeInquiry.id, e.target.value)
                          }
                          placeholder="Log ocular inspection dates, assigned engineer, or BOQ quotation progress..."
                          className="mt-2 w-full rounded-md border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-700 focus:bg-white focus:outline-none"
                        />
                      </div>
                    </aside>
                  )}
                </div>
              )}
            </div>
          )}

          {/* MODULE 4: TEAM MANAGEMENT */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-950">
                    Team Profiles Management
                  </h1>
                  <p className="mt-1 text-sm text-slate-600">
                    Add, update, or remove leadership, engineering, and technical staff
                    displayed on the public Our Team page.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onOpenAddTeamMember}
                  className="inline-flex items-center gap-1.5 rounded-md bg-blue-700 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-800 whitespace-nowrap shrink-0"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  <span>Add Team Member</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {teamMembers.map((member) => (
                  <article
                    key={member.id}
                    className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5"
                  >
                    <div>
                      <div className="flex items-center gap-3.5">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-900 font-display text-sm font-bold text-white">
                          {member.initials}
                        </div>
                        <div className="min-w-0">
                          <h2 className="truncate text-base font-bold text-slate-950">
                            {member.name}
                          </h2>
                          <p className="truncate text-xs font-medium text-blue-700">
                            {member.role}
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 font-mono text-xs text-slate-700 tabular-nums">
                        {member.licenseLabel} · {member.experienceYears} yrs
                      </p>
                      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-600">
                        {member.bio}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                      <button
                        type="button"
                        onClick={() => onOpenEditTeamMember(member)}
                        aria-label={`Edit ${member.name}`}
                        className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                      >
                        <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteTeamMember(member.id)}
                        aria-label={`Remove ${member.name}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:border-red-300 hover:text-red-700"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 5: CREDENTIALS MANAGEMENT */}
          {activeTab === 'credentials' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-950">
                    Credentials &amp; Documents Management
                  </h1>
                  <p className="mt-1 text-sm text-slate-600">
                    Maintain regulatory licenses, corporate certifications, and reference
                    documents displayed on the public About Us page.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onOpenAddCredential}
                  className="inline-flex items-center gap-1.5 rounded-md bg-blue-700 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-800 whitespace-nowrap shrink-0"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  <span>Add Credential</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {credentials.map((cred) => (
                  <article
                    key={cred.id}
                    className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs font-bold text-blue-700">
                          {cred.code}
                        </span>
                        {cred.documentReference && (
                          <span className="font-mono text-[11px] text-slate-500">
                            {cred.documentReference}
                          </span>
                        )}
                      </div>
                      <h2 className="mt-2 text-lg font-bold text-slate-950">
                        {cred.title}
                      </h2>
                      <p className="mt-1 text-xs text-slate-500">
                        {cred.issuingBody} · {cred.classification}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        {cred.description}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                      <button
                        type="button"
                        onClick={() => onOpenEditCredential(cred)}
                        aria-label={`Edit credential ${cred.code}`}
                        className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                      >
                        <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteCredential(cred.id)}
                        aria-label={`Delete credential ${cred.code}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:border-red-300 hover:text-red-700"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
