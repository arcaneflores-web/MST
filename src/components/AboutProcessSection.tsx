import { motion } from 'motion/react';
import { ABOUT_MST, CONSTRUCTION_PROCESS } from '../data/companyData';
import { SectionHeaderBar } from './SectionDivider';
import { getScrollCardMotionProps, ScrollReveal } from './ScrollReveal';

interface AboutProcessSectionProps {
  mode?: 'preview' | 'full';
}

export function AboutProcessSection({
  mode = 'full',
}: AboutProcessSectionProps) {
  if (mode === 'preview') {
    return (
      <section
        id="about-preview"
        className="scroll-mt-[4.25rem] flex flex-col justify-center border-b border-black/[0.08] bg-slate-100/80 lg:min-h-[calc(100svh-4.25rem)]"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-10 lg:py-16">
          <SectionHeaderBar title={ABOUT_MST.headline} />

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-8">
            <ScrollReveal className="flex flex-col justify-between rounded-2xl border border-black/[0.08] bg-white p-7 lg:col-span-6 lg:p-10">
              <div>
                <h3 className="text-xs font-bold tracking-wider text-slate-950/88 uppercase">
                  Company Overview
                </h3>
                <p className="mt-3.5 text-base leading-relaxed text-slate-950/68 lg:text-lg lg:leading-relaxed">
                  {ABOUT_MST.overview}
                </p>
              </div>

              <dl className="mt-8 grid grid-cols-1 gap-5 border-t border-black/[0.06] pt-6 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-medium text-slate-950/54">
                    Corporate Registration
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-950/95">
                    SEC-Registered OPC · PCAB Accredited
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-slate-950/54">
                    Service Territory
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-950/95">
                    San Fernando, Pampanga &amp; Central Luzon
                  </dd>
                </div>
              </dl>
            </ScrollReveal>

            <ScrollReveal
              delay={0.07}
              className="flex flex-col justify-between rounded-2xl border border-black/[0.08] bg-white p-7 lg:col-span-6 lg:p-10"
            >
              <div>
                <h3 className="text-xs font-bold tracking-wider text-blue-700 uppercase">
                  Our Mission
                </h3>
                <p className="mt-3.5 text-lg font-medium leading-relaxed text-slate-950/88 lg:text-xl lg:leading-relaxed">
                  {ABOUT_MST.mission}
                </p>
              </div>

              <div className="mt-8 border-t border-black/[0.06] pt-6">
                <h4 className="text-xs font-bold tracking-wider text-slate-950/88 uppercase">
                  Our Vision
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-950/68 lg:text-base">
                  {ABOUT_MST.vision}
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* 4-column core engineering commitments */}
          <div className="mt-6 grid grid-cols-1 divide-y divide-black/[0.08] overflow-hidden rounded-2xl border border-black/[0.08] bg-white sm:grid-cols-2 sm:divide-y-0 lg:mt-8 lg:grid-cols-4 lg:divide-x">
            {ABOUT_MST.differentiators.map((item, idx) => (
              <motion.article
                key={item.title}
                {...getScrollCardMotionProps(idx, 0.05)}
                className="p-6 lg:p-7"
              >
                <p className="font-mono text-xs font-semibold text-blue-700 tabular-nums">
                  {String(idx + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-2 text-base font-bold text-slate-950/95">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-950/68">
                  {item.detail}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        id="about"
        className="scroll-mt-[4.25rem] flex flex-col justify-center border-b border-black/[0.08] bg-slate-100/80 lg:min-h-[calc(100svh-8.75rem)]"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-10 lg:py-16">
          <SectionHeaderBar
            sectionNumber="01"
            eyebrow={ABOUT_MST.eyebrow}
            title={ABOUT_MST.headline}
          />

          {/* Part 1: Mission, Vision & 4 Differentiators */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
            <ScrollReveal className="flex flex-col justify-between rounded-2xl border border-black/[0.08] bg-white p-7 lg:col-span-5 lg:p-9">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold tracking-wider text-blue-700 uppercase">
                    Mission
                  </h3>
                  <p className="mt-2.5 text-base leading-relaxed text-slate-950/80 lg:text-lg lg:leading-relaxed">
                    {ABOUT_MST.mission}
                  </p>
                </div>

                <div className="border-t border-black/[0.06] pt-6">
                  <h3 className="text-xs font-bold tracking-wider text-slate-950/88 uppercase">
                    Vision
                  </h3>
                  <p className="mt-2.5 text-base leading-relaxed text-slate-950/68">
                    {ABOUT_MST.vision}
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-black/[0.06] pt-5 text-xs text-slate-950/54 lg:text-sm">
                Headquarters: 2nd Floor, JG Building, Dela Paz Norte, City of San Fernando,
                Pampanga
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7 lg:gap-6">
              {ABOUT_MST.differentiators.map((item, idx) => (
                <motion.article
                  key={item.title}
                  {...getScrollCardMotionProps(idx, 0.055)}
                  className="flex flex-col justify-between rounded-2xl border border-black/[0.08] bg-white p-6 lg:p-8"
                >
                  <div>
                    <p className="font-mono text-xs font-semibold text-blue-700 tabular-nums">
                      {String(idx + 1).padStart(2, '0')}.
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-slate-950/95 lg:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-950/68 lg:text-base">
                      {item.detail}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Part 2: 7-Step Construction Process full-viewport section */}
      <section
        id="process"
        className="scroll-mt-[4.25rem] flex flex-col justify-center border-b border-black/[0.08] bg-white lg:min-h-[calc(100svh-4.25rem)]"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-10 lg:py-16">
          <SectionHeaderBar
            sectionNumber="02"
            eyebrow="7-Step Construction Delivery Framework"
            title="From Initial Consultation to Project Turnover"
          />

          <ol className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {CONSTRUCTION_PROCESS.map((item, idx) => (
              <motion.li
                key={item.step}
                {...getScrollCardMotionProps(idx % 4, 0.05)}
                className="flex flex-col justify-between rounded-2xl border border-black/[0.08] bg-slate-100/60 p-6 lg:min-h-[240px] lg:p-7"
              >
                <div>
                  <span className="font-mono text-xs font-semibold text-blue-700 tabular-nums">
                    Step {item.step}
                  </span>
                  <h4 className="mt-2 text-lg font-bold text-slate-950/95">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-950/68">
                    {item.description}
                  </p>
                </div>
                <p className="mt-4 border-t border-black/[0.06] pt-3 text-xs font-medium text-slate-950/75">
                  Output: {item.deliverable}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
