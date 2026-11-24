import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  Images,
  Search,
  X,
} from 'lucide-react';
import type { ProjectCategory, ProjectItem, ProjectStatus } from '../types/construction';
import {
  buildFeaturedPhotoSlides,
  filterProjects,
  getFeaturedProjects,
} from '../utils/inquiryLogic';
import { ProjectSchematic } from './ArchitecturalVisuals';
import { SectionHeaderBar } from './SectionDivider';
import { getScrollCardMotionProps, ScrollReveal } from './ScrollReveal';

function ProjectCoverVisual({
  project,
  activePhotoIndex,
  onChangePhotoIndex,
}: {
  project: ProjectItem;
  activePhotoIndex: number;
  onChangePhotoIndex: (index: number) => void;
}) {
  const images = project.images ?? [];
  const photoCount = images.length;
  const safePhotoIndex =
    photoCount > 0 ? Math.min(activePhotoIndex, photoCount - 1) : 0;
  const activeUrl = images[safePhotoIndex];

  if (!activeUrl) {
    return (
      <div className="relative aspect-video w-full overflow-hidden border-b border-slate-200">
        <div className="h-full w-full transition-transform duration-300 group-hover:scale-[1.03]">
          <ProjectSchematic type={project.schematic} code={project.code} fillContainer />
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden border-b border-slate-200 bg-slate-900">
      <img
        src={activeUrl}
        alt={`${project.title} site photo ${safePhotoIndex + 1} of ${photoCount}`}
        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.04]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-slate-950/25 opacity-70 transition-opacity duration-200 group-hover:opacity-100" />

      {photoCount > 1 && (
        <>
          {/* Quick photo scrub bars on hover */}
          <div
            aria-label={`Preview photos for ${project.title}`}
            className="absolute inset-x-3 top-2.5 z-20 flex gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
          >
            {images.map((_, idx) => {
              const isCurrent = idx === safePhotoIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onMouseEnter={() => onChangePhotoIndex(idx)}
                  onClick={() => onChangePhotoIndex(idx)}
                  aria-label={`Preview photo ${idx + 1} of ${photoCount} for ${project.title}`}
                  aria-pressed={isCurrent}
                  className={`h-1.5 flex-1 rounded-sm transition-colors ${
                    isCurrent ? 'bg-blue-400' : 'bg-white/50 hover:bg-white/85'
                  }`}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={() =>
              onChangePhotoIndex(safePhotoIndex === 0 ? photoCount - 1 : safePhotoIndex - 1)
            }
            aria-label={`Previous preview photo for ${project.title}`}
            className="absolute top-1/2 left-2.5 z-20 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md border border-white/20 bg-slate-950/75 text-white opacity-0 transition-all duration-150 hover:bg-blue-700 group-hover:opacity-100 focus-visible:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => onChangePhotoIndex((safePhotoIndex + 1) % photoCount)}
            aria-label={`Next preview photo for ${project.title}`}
            className="absolute top-1/2 right-2.5 z-20 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md border border-white/20 bg-slate-950/75 text-white opacity-0 transition-all duration-150 hover:bg-blue-700 group-hover:opacity-100 focus-visible:opacity-100"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-slate-950/75 px-3.5 py-2 font-mono text-[11px] text-slate-100 backdrop-blur-xs">
        <span>{project.code}</span>
        <span className="inline-flex items-center gap-1.5 text-slate-200 tabular-nums">
          <Images className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
          <span>
            {photoCount > 1
              ? `${safePhotoIndex + 1}/${photoCount} · ${photoCount} photos`
              : '1 photo'}
          </span>
        </span>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  autoCycleMs,
  showOutcomeMetric = true,
  onSelectProject,
}: {
  project: ProjectItem;
  index: number;
  autoCycleMs?: number;
  showOutcomeMetric?: boolean;
  onSelectProject: (project: ProjectItem, initialImageIndex?: number) => void;
}) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const photoCount = project.images?.length ?? 0;
  const safePhotoIndex =
    photoCount > 0 ? Math.min(activePhotoIndex, photoCount - 1) : 0;

  useEffect(() => {
    if (!autoCycleMs || photoCount <= 1 || isPaused) return;
    const timer = window.setInterval(() => {
      setActivePhotoIndex((prev) => (prev + 1) % photoCount);
    }, autoCycleMs);
    return () => window.clearInterval(timer);
  }, [autoCycleMs, photoCount, isPaused]);

  return (
    <motion.article
      {...getScrollCardMotionProps(index % 3, 0.06)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-black/[0.08] bg-white transition-all duration-200 hover:-translate-y-1 hover:border-blue-600 hover:shadow-lg"
    >
      <div>
        <ProjectCoverVisual
          project={project}
          activePhotoIndex={safePhotoIndex}
          onChangePhotoIndex={setActivePhotoIndex}
        />

        <div className="p-6 lg:p-7">
          <h3 className="min-h-[3.25rem] line-clamp-2 text-lg font-bold leading-snug tracking-tight text-slate-950/95 transition-colors duration-200 group-hover:text-blue-700 lg:text-xl">
            {project.title}
          </h3>

          <div className="mt-2 flex items-center gap-x-2 truncate text-xs text-slate-950/54 sm:text-sm">
            <span className="shrink-0 font-semibold text-slate-950/76">
              {project.category}
            </span>
            <span aria-hidden="true" className="shrink-0">
              ·
            </span>
            <span
              className={`shrink-0 ${
                project.status === 'Ongoing'
                  ? 'font-semibold text-blue-700'
                  : 'font-medium text-slate-950/64'
              }`}
            >
              {project.status} {project.year}
            </span>
            <span aria-hidden="true" className="shrink-0">
              ·
            </span>
            <span className="truncate">{project.location}</span>
          </div>

          <p className="mt-3 min-h-[4.5rem] line-clamp-3 text-sm leading-relaxed text-slate-950/68 lg:text-base">
            {project.summary}
          </p>
        </div>
      </div>

      <div className="border-t border-black/[0.06] px-6 py-4 lg:px-7">
        <div className="flex items-center justify-between gap-2 text-xs text-slate-950/64 sm:text-sm">
          <span className="truncate font-mono tabular-nums">
            Area: <strong className="text-slate-950/92">{project.floorArea}</strong>
          </span>
          <span className="shrink-0 font-mono tabular-nums">
            Schedule: <strong className="text-slate-950/92">{project.duration}</strong>
          </span>
        </div>

        {showOutcomeMetric && (
          <p className="mt-2.5 truncate text-xs font-medium text-slate-950/80 sm:text-sm">
            {project.outcomeMetric}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onSelectProject(project, safePhotoIndex)}
        aria-label={`View project ${project.title}`}
        className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center rounded-2xl bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-600"
      >
        <span className="inline-flex scale-95 items-center gap-1.5 rounded-md bg-white/90 px-4 py-2 text-xs font-semibold text-slate-950/95 shadow-lg backdrop-blur-md transition-transform duration-200 group-hover:scale-100 group-focus-visible:scale-100">
          <Eye className="h-3.5 w-3.5 text-blue-700" aria-hidden="true" />
          <span>View Project</span>
        </span>
      </button>
    </motion.article>
  );
}

interface PortfolioSectionProps {
  mode?: 'preview' | 'full';
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem, initialImageIndex?: number) => void;
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
    () => getFeaturedProjects(projects),
    [projects]
  );

  const featuredSlides = useMemo(
    () => buildFeaturedPhotoSlides(featuredProjects),
    [featuredProjects]
  );

  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [isSpotlightPaused, setIsSpotlightPaused] = useState(false);

  const safeSpotlightIndex =
    featuredSlides.length > 0 ? spotlightIndex % featuredSlides.length : 0;
  const activeSpotlight = featuredSlides[safeSpotlightIndex] ?? null;

  useEffect(() => {
    if (mode !== 'preview' || featuredSlides.length <= 1 || isSpotlightPaused) {
      return;
    }
    const timer = window.setInterval(() => {
      setSpotlightIndex((prev) => (prev + 1) % featuredSlides.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [mode, featuredSlides.length, isSpotlightPaused]);

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
    const featuredGridClass =
      featuredProjects.length === 1
        ? 'grid-cols-1'
        : featuredProjects.length === 2
          ? 'grid-cols-1 md:grid-cols-2'
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

    return (
      <section
        id="featured-projects"
        className="scroll-mt-[4.25rem] border-b border-black/[0.08] bg-slate-100/80"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-10 lg:py-14">
          <SectionHeaderBar
            sectionNumber="03"
            eyebrow={`Selected Works · ${featuredProjects.length} Featured`}
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

          {/* Auto-switching Featured Photo Showcase synced with Admin Featured projects */}
          {activeSpotlight && (
            <div
              data-testid="featured-auto-switcher"
              onMouseEnter={() => setIsSpotlightPaused(true)}
              onMouseLeave={() => setIsSpotlightPaused(false)}
              className="mt-6 grid grid-cols-1 overflow-hidden rounded-xl border border-slate-200 bg-white lg:grid-cols-12"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-900 lg:col-span-7">
                {activeSpotlight.imageUrl ? (
                  <button
                    type="button"
                    onClick={() =>
                      onSelectProject(
                        activeSpotlight.project,
                        activeSpotlight.photoIndex
                      )
                    }
                    aria-label={`Inspect featured project ${activeSpotlight.project.title}`}
                    className="group relative block h-full w-full overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-500"
                  >
                    <img
                      key={activeSpotlight.id}
                      src={activeSpotlight.imageUrl}
                      alt={`${activeSpotlight.project.title} featured showcase`}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/30" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onSelectProject(activeSpotlight.project, 0)}
                    aria-label={`Inspect featured blueprint for ${activeSpotlight.project.title}`}
                    className="block h-full w-full text-left"
                  >
                    <ProjectSchematic
                      type={activeSpotlight.project.schematic}
                      code={activeSpotlight.project.code}
                    />
                  </button>
                )}

                {featuredSlides.length > 1 && (
                  <>
                    <div className="absolute inset-x-4 top-3 z-10 flex gap-1.5">
                      {featuredSlides.map((slide, idx) => {
                        const isActive = idx === safeSpotlightIndex;
                        return (
                          <button
                            key={slide.id}
                            type="button"
                            onClick={() => setSpotlightIndex(idx)}
                            aria-label={`Show featured slide ${idx + 1} of ${featuredSlides.length}`}
                            aria-current={isActive ? 'true' : undefined}
                            className={`h-1.5 flex-1 rounded-sm transition-colors ${
                              isActive
                                ? 'bg-blue-400'
                                : 'bg-white/40 hover:bg-white/75'
                            }`}
                          />
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setSpotlightIndex((prev) =>
                          prev === 0 ? featuredSlides.length - 1 : prev - 1
                        )
                      }
                      aria-label="Previous featured showcase photo"
                      className="absolute top-1/2 left-3 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md border border-white/20 bg-slate-950/75 text-white transition-colors hover:bg-blue-700"
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setSpotlightIndex(
                          (prev) => (prev + 1) % featuredSlides.length
                        )
                      }
                      aria-label="Next featured showcase photo"
                      className="absolute top-1/2 right-3 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md border border-white/20 bg-slate-950/75 text-white transition-colors hover:bg-blue-700"
                    >
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </>
                )}

                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-slate-950/80 px-4 py-2 font-mono text-[11px] text-slate-100">
                  <span>
                    {activeSpotlight.project.code} · {activeSpotlight.project.status}
                  </span>
                  <span className="tabular-nums text-blue-300">
                    Slide {safeSpotlightIndex + 1} / {featuredSlides.length} ·{' '}
                    {featuredProjects.length} Featured
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between p-6 lg:col-span-5">
                <div>
                  <p className="font-mono text-xs font-semibold text-blue-700">
                    Featured Project Showcase ({featuredProjects.length} Active)
                  </p>
                  <h3 className="mt-1.5 text-xl font-bold tracking-tight text-slate-950">
                    {activeSpotlight.project.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {activeSpotlight.project.category} · {activeSpotlight.project.location}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {activeSpotlight.project.summary}
                  </p>

                  <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3.5 text-xs">
                    <div>
                      <dt className="text-slate-500">Scale / Floor Area</dt>
                      <dd className="mt-0.5 font-mono font-semibold text-slate-950 tabular-nums">
                        {activeSpotlight.project.floorArea}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Duration</dt>
                      <dd className="mt-0.5 font-mono font-semibold text-slate-950 tabular-nums">
                        {activeSpotlight.project.duration}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() =>
                      onSelectProject(
                        activeSpotlight.project,
                        activeSpotlight.photoIndex
                      )
                    }
                    className="inline-flex w-full items-center justify-between rounded-md bg-blue-700 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-blue-800"
                  >
                    <span>
                      {activeSpotlight.totalProjectPhotos > 0
                        ? `Inspect Project & ${activeSpotlight.totalProjectPhotos} Photos`
                        : 'Inspect Technical Specifications'}
                    </span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className={`mt-6 grid gap-6 ${featuredGridClass}`}>
            {featuredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                autoCycleMs={3500}
                showOutcomeMetric={false}
                onSelectProject={onSelectProject}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="scroll-mt-[4.25rem] border-b border-black/[0.08] bg-slate-100/80"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-10 lg:py-14">
        <SectionHeaderBar
          sectionNumber="01"
          eyebrow="Engineering & Construction Portfolio"
          title="Completed Developments & Active Site Works"
          action={
            <p className="font-mono text-xs font-medium text-slate-950/68 tabular-nums sm:text-sm">
              Showing {filteredProjects.length} of {projects.length} documented projects
            </p>
          }
        />

        {/* Structured Filter & Search Divider Bar */}
        <ScrollReveal
          yOffset={10}
          className="mt-7 flex flex-col gap-3 rounded-2xl border border-black/[0.08] bg-white p-4 lg:flex-row lg:items-center lg:justify-between"
        >
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
                        ? 'bg-white text-slate-950/95 shadow-xs'
                        : 'text-slate-950/68 hover:text-slate-950/95'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div className="hidden h-6 w-px bg-black/[0.08] sm:block" aria-hidden="true" />

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
                        ? 'bg-slate-900 text-white/95'
                        : 'text-slate-950/68 hover:text-slate-950/95'
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
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-950/42"
              aria-hidden="true"
            />
            <input
              id="project-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search location or project..."
              className="w-full rounded-md border border-black/[0.1] bg-slate-100/60 py-2 pl-9 pr-8 text-sm text-slate-950/95 placeholder:text-slate-950/42 focus:border-blue-700 focus:bg-white focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear project search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-950/42 hover:text-slate-950/75"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </ScrollReveal>

        {/* Project Grid or Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="mt-6 rounded-xl border border-black/[0.08] bg-white p-10 text-center">
            <h3 className="text-lg font-bold text-slate-950/95">
              No projects match your current filter
            </h3>
            <p className="mt-2 text-sm text-slate-950/68">
              Try clearing your search query or switching sector and status filters.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 inline-flex items-center rounded-md border border-black/[0.12] bg-white px-4 py-2 text-sm font-semibold text-slate-950/88 hover:bg-slate-100"
            >
              Reset Project Filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                showOutcomeMetric
                onSelectProject={onSelectProject}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
