import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { HERO_METRICS } from '../data/companyData';
import type { ProjectItem } from '../types/construction';
import {
  buildFeaturedPhotoSlides,
  getFeaturedProjects,
} from '../utils/inquiryLogic';
import { ProjectSchematic } from './ArchitecturalVisuals';
import { getScrollCardMotionProps } from './ScrollReveal';

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
    <section id="top" className="border-b border-black/[0.08] bg-white">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col justify-between px-6 py-8 lg:min-h-[calc(100svh-4.25rem)] lg:px-10 lg:py-10">
        {/* 2-Column Hero Split: Concise Intro Left + Large Fixed 16:9 Featured Photo Showcase Right */}
        <div className="my-auto grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-center lg:col-span-5">
            <h1
              className="font-bold tracking-tight text-slate-950/95 leading-[1.06]"
              style={{
                fontSize: 'clamp(2.25rem, 3.8vw, 3.6rem)',
                textWrap: 'balance',
              }}
            >
              Building Excellence. Creating Lasting Foundations.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-950/68 lg:text-lg">
              Delivering construction and engineering solutions through thoughtful planning,
              technical expertise, and quality execution across Pampanga and Central Luzon.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-black/[0.08] pt-6">
              <button
                type="button"
                onClick={onExploreProjects}
                className="inline-flex items-center gap-2 rounded-md border border-transparent bg-slate-950 px-6 py-3 text-sm font-semibold text-white/95 transition-colors duration-150 hover:bg-blue-700 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
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
                        showCodeLabel={false}
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
                        className="absolute top-1/2 left-3 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md border border-white/20 bg-black/45 text-white/95 backdrop-blur-md transition-colors hover:bg-blue-700/90"
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
                        className="absolute top-1/2 right-3 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md border border-white/20 bg-black/45 text-white/95 backdrop-blur-md transition-colors hover:bg-blue-700/90"
                      >
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </>
                  )}

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-5 pt-10 pb-4">
                    <h2 className="min-w-0 truncate text-base font-bold tracking-tight text-white/95 drop-shadow-sm sm:text-xl">
                      {activeSpotlight.project.title}
                    </h2>
                    {featuredSlides.length > 1 && (
                      <span className="shrink-0 font-mono text-[11px] font-medium text-white/75 tabular-nums">
                        {safeSpotlightIndex + 1} / {featuredSlides.length}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Full-width 4-column KPI strip with crisp cell dividers */}
        <div className="mt-8 grid grid-cols-1 divide-y divide-black/[0.08] rounded-lg border border-black/[0.08] bg-slate-100/80 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {HERO_METRICS.map((metric, idx) => (
            <motion.div
              key={metric.label}
              {...getScrollCardMotionProps(idx, 0.05)}
              className="px-5 py-4"
            >
              <p className="font-mono text-xl font-bold tracking-tight text-slate-950/95 tabular-nums">
                {metric.value}
              </p>
              <p className="mt-0.5 text-xs font-semibold text-slate-950/88">{metric.label}</p>
              <p className="mt-0.5 text-[11px] text-slate-950/54">{metric.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
