import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { WHY_CHOOSE_MST } from '../data/companyData';
import type { ProjectItem, PublicPage } from '../types/construction';
import { HeroSection } from './HeroSection';
import { AboutProcessSection } from './AboutProcessSection';
import { ServicesSection } from './ServicesSection';
import { TestimonialsSection } from './TestimonialsSection';
import { SectionHeaderBar } from './SectionDivider';
import { getScrollCardMotionProps, ScrollReveal } from './ScrollReveal';

interface HomePageProps {
  projects: ProjectItem[];
  onNavigate: (page: PublicPage) => void;
  onRequestQuote: () => void;
  onSelectServiceForInquiry: (serviceTitle: string) => void;
  onSelectProject: (project: ProjectItem, initialImageIndex?: number) => void;
}

export function HomePage({
  projects,
  onNavigate,
  onRequestQuote,
  onSelectServiceForInquiry,
  onSelectProject,
}: HomePageProps) {
  return (
    <>
      {/* 1. Hero Section with Large Auto-Switching Featured Project Photo Showcase */}
      <HeroSection
        projects={projects}
        onSelectProject={onSelectProject}
        onExploreProjects={() => onNavigate('projects')}
      />

      {/* 2. About MST (Brief Preview) */}
      <AboutProcessSection
        mode="preview"
        onViewFullAbout={() => onNavigate('about')}
      />

      {/* 3. Featured Services (4 main services) */}
      <ServicesSection
        mode="preview"
        onSelectServiceForInquiry={onSelectServiceForInquiry}
        onViewAllServices={() => onNavigate('services')}
      />

      {/* 4. Why Choose MST? */}
      <section
        id="why-choose-mst"
        className="border-b-2 border-slate-200 bg-slate-100/70 py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <SectionHeaderBar
            sectionNumber="03"
            eyebrow="Why Choose MST?"
            title="Disciplined Engineering, Safety & Cost Control on Every Site"
          />

          <div className="mt-6 grid grid-cols-1 divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {WHY_CHOOSE_MST.map((item, idx) => (
              <motion.article
                key={item.pillar}
                {...getScrollCardMotionProps(idx)}
                className="p-5"
              >
                <p className="font-mono text-xs font-semibold text-blue-700">
                  {item.metric}
                </p>
                <h3 className="mt-2 text-base font-bold text-slate-950">
                  {item.pillar}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  {item.summary}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <TestimonialsSection />

      {/* 6. Call to Action */}
      <section
        id="home-cta"
        className="border-b border-slate-800 bg-slate-900 py-10 text-white lg:py-12"
      >
        <ScrollReveal className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 px-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-semibold text-blue-400">
              05 · Start Your Build With Confidence
            </p>
            <h2
              className="mt-1.5 text-2xl font-bold tracking-tight text-white sm:text-3xl"
              style={{ textWrap: 'balance' }}
            >
              Have a Project in Mind?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Request an itemized construction estimate or schedule an ocular site
              inspection with our San Fernando engineering desk within 48 business hours.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onRequestQuote}
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-500 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              <span>Request a Quote</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center rounded-md border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-100 transition-colors duration-150 hover:border-slate-400 hover:bg-slate-800 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-400"
            >
              Contact Office
            </button>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
