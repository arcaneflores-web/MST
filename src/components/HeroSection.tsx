import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Images,
} from 'lucide-react';
import { HERO_METRICS } from '../data/companyData';
import type { ProjectItem } from '../types/construction';
import {
  buildFeaturedPhotoSlides,
  getFeaturedProjects,
} from '../utils/inquiryLogic';
import { ProjectSchematic } from './ArchitecturalVisuals';

interface HeroSectionProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem, initialImageIndex?: number) => void;
  onExploreProjects: () => void;
}

export function HeroSection({
  projects,
  onSelectProject,
  onExploreProjects,
}: HeroSectionProps) {
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
    if (featuredSlides.length <= 1 || isSpotlightPaused) {
      return;
    }
    const timer = window.setInterval(() => {
      setSpotlightIndex((prev) => (prev + 1) % featuredSlides.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [featuredSlides.length, isSpotlightPaused]);

  return (
    <section id="top" className="border-b-2 border-slate-200 bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-8 lg:py-10">
        {/* 2-Column Hero Split: Concise Intro Left + Large Fixed 16:9 Featured Photo Showcase Right */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-center lg:col-span-5">
            <h1
              className="font-bold tracking-tight text-slate-950 leading-[1.08]"
              style={{
                fontSize: 'clamp(2.05rem, 3.4vw, 3.1rem)',
                textWrap: 'balance',
              }}
            >
              Building Excellence. Creating Lasting Foundations.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Delivering construction and engineering solutions through thoughtful planning,
              technical expertise, and quality execution across Pampanga and Central Luzon.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-5">
              <button
                type="button"
                onClick={onExploreProjects}
                className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-700 hover:border-blue-700 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                <span>Explore Completed Works</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            {activeSpotlight && (
              <div
                data-testid="featured-auto-switcher"
                onMouseEnter={() => setIsSpotlightPaused(true)}
                onMouseLeave={() => setIsSpotlightPaused(false)}
                className="overflow-hidden rounded-xl border border-slate-200 bg-slate-950 shadow-sm"
              >
                {/* Fixed 16:9 Image Container — dimensions never expand regardless of source image size */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
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
                        alt={`${activeSpotlight.project.title} featured site view`}
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/35" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSelectProject(activeSpotlight.project, 0)}
                      aria-label={`Inspect featured blueprint for ${activeSpotlight.project.title}`}
                      className="block h-full w-full text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-500"
                    >
                      <ProjectSchematic
                        type={activeSpotlight.project.schematic}
                        code={activeSpotlight.project.code}
                        fillContainer
                      />
                    </button>
                  )}

                  {featuredSlides.length > 1 && (
                    <>
                      <div
                        aria-label="Featured project slides"
                        className="absolute inset-x-4 top-3 z-10 flex gap-1.5"
                      >
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
                                  : 'bg-white/40 hover:bg-white/80'
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

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-slate-950/80 px-4 py-2 font-mono text-[11px] text-slate-100 backdrop-blur-xs">
                    <span className="min-w-0 truncate">
                      {activeSpotlight.project.code} · {activeSpotlight.project.status}{' '}
                      {activeSpotlight.project.year}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-blue-300 tabular-nums shrink-0">
                      <Images className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>
                        Slide {safeSpotlightIndex + 1} / {featuredSlides.length} ·{' '}
                        {featuredProjects.length} Featured
                      </span>
                    </span>
                  </div>
                </div>

                {/* Fixed-alignment Project Info Bar below the 16:9 image */}
                <div className="flex flex-col gap-3 border-t border-slate-800 bg-slate-950 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] font-medium text-blue-400">
                      <span className="font-mono uppercase tracking-wider">
                        Featured Project
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-300">
                        {activeSpotlight.project.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-slate-300 tabular-nums">
                        {activeSpotlight.project.floorArea}
                      </span>
                    </div>

                    <h2 className="mt-1 truncate text-base font-bold tracking-tight text-white sm:text-lg">
                      {activeSpotlight.project.title}
                    </h2>

                    <p className="mt-0.5 truncate text-xs text-slate-400">
                      {activeSpotlight.project.location}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onSelectProject(
                        activeSpotlight.project,
                        activeSpotlight.photoIndex
                      )
                    }
                    className="inline-flex items-center justify-center gap-1.5 rounded-md bg-blue-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-600 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                  >
                    <span>
                      {activeSpotlight.totalProjectPhotos > 0
                        ? `View Project (${activeSpotlight.totalProjectPhotos} Photos)`
                        : 'View Specifications'}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Full-width 4-column KPI strip with crisp cell dividers */}
        <div className="mt-8 grid grid-cols-1 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-slate-50/70 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {HERO_METRICS.map((metric) => (
            <div key={metric.label} className="px-5 py-4">
              <p className="font-mono text-xl font-bold tracking-tight text-slate-950 tabular-nums">
                {metric.value}
              </p>
              <p className="mt-0.5 text-xs font-semibold text-slate-900">{metric.label}</p>
              <p className="mt-0.5 text-[11px] text-slate-500">{metric.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
