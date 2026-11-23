import { useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight, Search, X } from 'lucide-react';
import type { ProjectCategory, ProjectItem, ProjectStatus } from '../types/construction';
import { filterProjects, getFeaturedProjects } from '../utils/inquiryLogic';
import { ProjectSchematic } from './ArchitecturalVisuals';
import { SectionHeaderBar } from './SectionDivider';

interface PortfolioSectionProps {
  mode?: 'preview' | 'full';
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  onViewAllProjects?: () => void;
}

const CATEGORY_TABS: Array<'All' | ProjectCategory> = [
  'All',
  'Commercial',
  'Industrial',
  'Infrastructure',
  'Residential',
];

const STATUS_TABS: Array<'All' | ProjectStatus> = ['All', 'Completed', 'Ongoing'];

export function PortfolioSection({
  mode = 'full',
  projects,
  onSelectProject,
  onViewAllProjects,
}: PortfolioSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProjectCategory>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | ProjectStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredProjects = useMemo(
    () => getFeaturedProjects(projects, 3),
    [projects]
  );

  const filteredProjects = useMemo(
    () =>
      filterProjects(projects, {
        category: selectedCategory,
        status: selectedStatus,
        searchQuery,
      }),
    [projects, selectedCategory, selectedStatus, searchQuery]
  );

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedStatus('All');
    setSearchQuery('');
  };

  if (mode === 'preview') {
    return (
      <section
        id="featured-projects"
        className="border-b-2 border-slate-200 bg-slate-100/70 py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <SectionHeaderBar
            sectionNumber="03"
            eyebrow="Selected Works"
            title="Featured Completed & Ongoing Projects"
            action={
              onViewAllProjects ? (
                <button
                  type="button"
                  onClick={onViewAllProjects}
                  className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-900 transition-colors hover:border-blue-700 hover:text-blue-700 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-700"
                >
                  <span>View Full Portfolio ({projects.length})</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              ) : undefined
            }
          />

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <article
                key={project.id}
                className="flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white transition-colors duration-150 hover:border-slate-400"
              >
                <div>
                  <ProjectSchematic type={project.schematic} code={project.code} />

                  <div className="p-5">
                    <h3 className="text-base font-bold tracking-tight text-slate-950 sm:text-lg">
                      {project.title}
                    </h3>

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span
                        className={
                          project.status === 'Ongoing'
                            ? 'font-semibold text-blue-700'
                            : 'font-medium text-slate-600'
                        }
                      >
                        {project.status} {project.year}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{project.location}</span>
                    </div>

                    <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 px-5 py-3.5">
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="inline-flex w-full items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-900 transition-colors duration-150 hover:border-blue-700 hover:bg-blue-50 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-blue-700"
                  >
                    <span>Inspect Technical Specifications</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="scroll-mt-16 border-b-2 border-slate-200 bg-slate-100/70 py-10 lg:py-12"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeaderBar
          sectionNumber="01"
          eyebrow="Engineering & Construction Portfolio"
          title="Completed Developments & Active Site Works"
          action={
            <p className="font-mono text-xs font-medium text-slate-600 tabular-nums">
              Showing {filteredProjects.length} of {projects.length} documented projects
            </p>
          }
        />

        {/* Structured Filter & Search Divider Bar */}
        <div className="mt-5 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3.5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div
              role="group"
              aria-label="Filter projects by sector"
              className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1"
            >
              {CATEGORY_TABS.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    aria-pressed={active}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-700 ${
                      active
                        ? 'bg-white text-slate-950 shadow-xs'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div className="hidden h-6 w-px bg-slate-200 sm:block" aria-hidden="true" />

            <div
              role="group"
              aria-label="Filter projects by completion status"
              className="flex items-center gap-1 rounded-lg bg-slate-100 p-1"
            >
              {STATUS_TABS.map((status) => {
                const active = selectedStatus === status;
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setSelectedStatus(status)}
                    aria-pressed={active}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-700 ${
                      active
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    {status === 'All' ? 'All Statuses' : status}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative w-full lg:w-72">
            <label htmlFor="project-search" className="sr-only">
              Search projects by name, location, or sector
            </label>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              id="project-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search location or project..."
              className="w-full rounded-md border border-slate-200 bg-slate-50 py-2 pl-9 pr-8 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:bg-white focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear project search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Project Grid or Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-10 text-center">
            <h3 className="text-lg font-bold text-slate-900">
              No projects match your current filter
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Try clearing your search query or switching sector and status filters.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              Reset Project Filters
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white transition-colors duration-150 hover:border-slate-400"
              >
                <div>
                  <ProjectSchematic type={project.schematic} code={project.code} />

                  <div className="p-5">
                    <h3 className="text-base font-bold tracking-tight text-slate-950 sm:text-lg">
                      {project.title}
                    </h3>

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span
                        className={
                          project.status === 'Ongoing'
                            ? 'font-semibold text-blue-700'
                            : 'font-medium text-slate-600'
                        }
                      >
                        {project.status} {project.year}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{project.location}</span>
                    </div>

                    <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 px-5 py-3.5">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span className="font-mono tabular-nums">
                      Area: <strong className="text-slate-900">{project.floorArea}</strong>
                    </span>
                    <span className="font-mono tabular-nums">
                      Schedule: <strong className="text-slate-900">{project.duration}</strong>
                    </span>
                  </div>

                  <p className="mt-2 text-xs font-medium text-slate-800">
                    {project.outcomeMetric}
                  </p>

                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="mt-3.5 inline-flex w-full items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-900 transition-colors duration-150 hover:border-blue-700 hover:bg-blue-50 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-blue-700"
                  >
                    <span>Inspect Technical Specifications</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
