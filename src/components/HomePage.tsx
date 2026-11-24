import { ArrowRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { COMPANY_INFO, WHY_CHOOSE_MST } from '../data/companyData';
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

const PILLAR_STANDARDS = [
  'Signed & sealed civil, structural & architectural plans',
  'Third-party lab cylinder breaks & mill certificates',
  'Dedicated DOLE COSH Safety Officers on site daily',
  'Weekly S-curve progress tracking & photo audit logs',
];

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
      <AboutProcessSection mode="preview" />

      {/* 3. Featured Services (4 main services) */}
      <ServicesSection
        mode="preview"
        onSelectServiceForInquiry={onSelectServiceForInquiry}
      />

      {/* 4. Why Choose MST? */}
      <section
        id="why-choose-mst"
        className="scroll-mt-[4.25rem] flex flex-col justify-center border-b border-black/[0.08] bg-slate-100/80 lg:min-h-[calc(100svh-4.25rem)]"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-10 lg:py-16">
          <SectionHeaderBar title="Disciplined Engineering, Safety & Cost Control on Every Site" />

          <div className="mt-8 grid grid-cols-1 divide-y divide-black/[0.08] overflow-hidden rounded-2xl border border-black/[0.08] bg-white sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {WHY_CHOOSE_MST.map((item, idx) => (
              <motion.article
                key={item.pillar}
                {...getScrollCardMotionProps(idx)}
                className="flex flex-col justify-between p-7 lg:min-h-[380px] lg:p-9"
              >
                <div>
                  <span className="font-mono text-xs font-semibold tracking-wide text-blue-700">
                    0{idx + 1} · {item.metric}
                  </span>
                  <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-950/95 lg:text-2xl">
                    {item.pillar}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-950/68 lg:text-base lg:leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <p className="mt-8 border-t border-black/[0.06] pt-4 text-xs font-medium leading-relaxed text-slate-950/54 lg:text-sm">
                  {PILLAR_STANDARDS[idx]}
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
        className="scroll-mt-[4.25rem] flex flex-col justify-center border-b border-white/[0.12] bg-slate-900 text-white/95 lg:min-h-[calc(100svh-4.25rem)]"
      >
        <ScrollReveal className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 px-6 py-14 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:py-20">
          <div className="lg:col-span-7">
            <h2
              className="text-3xl font-bold tracking-tight text-white/95 sm:text-5xl lg:leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              Have a Project in Mind? Let’s Engineer It Right from Day One.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/68 lg:text-lg">
              Request an itemized Bill of Quantities (BOQ) construction estimate or
              schedule an on-site ocular inspection with our San Fernando engineering desk
              within 48 business hours.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onRequestQuote}
                className="inline-flex items-center gap-2.5 rounded-md bg-blue-600 px-7 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:bg-blue-500 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                <span>Request a Quote</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center rounded-md border border-white/[0.2] px-7 py-3.5 text-base font-semibold text-white/90 transition-colors duration-150 hover:border-white/[0.35] hover:bg-white/[0.08] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-400"
              >
                Contact Office
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.12] bg-white/[0.04] p-7 lg:col-span-5 lg:p-9">
            <p className="font-mono text-xs font-semibold tracking-wider text-blue-400 uppercase">
              Direct Engineering &amp; Estimating Desk
            </p>
            <h3 className="mt-2.5 text-xl font-bold text-white/95">
              San Fernando, Pampanga Headquarters
            </h3>

            <dl className="mt-6 space-y-4 border-t border-white/[0.12] pt-6 text-sm lg:text-base">
              <div className="flex items-start gap-3.5">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Address</dt>
                  <dd className="text-white/88">{COMPANY_INFO.fullAddress}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Phone</dt>
                  <dd className="font-mono text-white/88 tabular-nums">
                    {COMPANY_INFO.mobilePhone} · {COMPANY_INFO.landlinePhone}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <Mail className="mt-1 h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Email</dt>
                  <dd className="font-mono text-white/88">{COMPANY_INFO.email}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <Clock className="mt-1 h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Hours</dt>
                  <dd className="text-white/68">{COMPANY_INFO.officeHours}</dd>
                </div>
              </div>
            </dl>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
