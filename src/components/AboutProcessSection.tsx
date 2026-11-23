import { ArrowRight } from 'lucide-react';
import { ABOUT_MST, CONSTRUCTION_PROCESS } from '../data/companyData';
import { SectionHeaderBar } from './SectionDivider';

interface AboutProcessSectionProps {
  mode?: 'preview' | 'full';
  onViewFullAbout?: () => void;
}

export function AboutProcessSection({
  mode = 'full',
  onViewFullAbout,
}: AboutProcessSectionProps) {
  if (mode === 'preview') {
    return (
      <section
        id="about-preview"
        className="border-b-2 border-slate-200 bg-slate-100/70 py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <SectionHeaderBar
            sectionNumber="01"
            eyebrow={ABOUT_MST.eyebrow}
            title={ABOUT_MST.headline}
            action={
              onViewFullAbout ? (
                <button
                  type="button"
                  onClick={onViewFullAbout}
                  className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-900 transition-colors duration-150 hover:border-blue-700 hover:text-blue-700 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-700"
                >
                  <span>Company Background &amp; Credentials</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              ) : undefined
            }
          />

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
            <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 lg:col-span-6">
              <div>
                <h3 className="text-xs font-bold tracking-wider text-slate-900 uppercase">
                  Company Overview
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-700">
                  {ABOUT_MST.overview}
                </p>
              </div>

              <dl className="mt-5 grid grid-cols-1 gap-4 border-t border-slate-200 pt-4 sm:grid-cols-2">
                <div>
                  <dt className="text-[11px] font-medium text-slate-500">
                    Corporate Registration
                  </dt>
                  <dd className="mt-0.5 text-xs font-semibold text-slate-950">
                    SEC-Registered OPC · PCAB Accredited
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-medium text-slate-500">
                    Service Territory
                  </dt>
                  <dd className="mt-0.5 text-xs font-semibold text-slate-950">
                    San Fernando, Pampanga &amp; Central Luzon
                  </dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 lg:col-span-6">
              <div>
                <h3 className="text-xs font-bold tracking-wider text-blue-700 uppercase">
                  Our Mission
                </h3>
                <p className="mt-2.5 text-sm font-medium leading-relaxed text-slate-900 sm:text-base">
                  {ABOUT_MST.mission}
                </p>
              </div>

              <div className="mt-5 border-t border-slate-200 pt-4">
                <h4 className="text-xs font-bold tracking-wider text-slate-900 uppercase">
                  Our Vision
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  {ABOUT_MST.vision}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="about"
      className="scroll-mt-16 border-b-2 border-slate-200 bg-slate-100/70 py-10 lg:py-12"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeaderBar
          sectionNumber="01"
          eyebrow={ABOUT_MST.eyebrow}
          title={ABOUT_MST.headline}
          description={ABOUT_MST.overview}
        />

        {/* Part 1: Mission, Vision & 4 Differentiators */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 lg:col-span-5">
            <div className="space-y-5">
              <div>
                <h3 className="text-xs font-bold tracking-wider text-blue-700 uppercase">
                  Mission
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-800">
                  {ABOUT_MST.mission}
                </p>
              </div>

              <div className="border-t border-slate-200 pt-5">
                <h3 className="text-xs font-bold tracking-wider text-slate-900 uppercase">
                  Vision
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {ABOUT_MST.vision}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-4 text-xs text-slate-500">
              Headquarters: 2nd Floor, JG Building, Dela Paz Norte, City of San Fernando,
              Pampanga
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {ABOUT_MST.differentiators.map((item, idx) => (
              <article
                key={item.title}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <p className="font-mono text-xs font-semibold text-blue-700 tabular-nums">
                  {String(idx + 1).padStart(2, '0')}.
                </p>
                <h3 className="mt-1.5 text-base font-bold text-slate-950">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Part 2: 7-Step Construction Process with explicit divider */}
        <div id="process" className="scroll-mt-20 mt-10 border-t-2 border-slate-200 pt-8">
          <SectionHeaderBar
            sectionNumber="02"
            eyebrow="7-Step Construction Delivery Framework"
            title="From Initial Consultation to Project Turnover"
            description="A disciplined, milestone-tracked workflow ensuring code compliance, budget control, and documented quality inspections."
          />

          <ol className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CONSTRUCTION_PROCESS.map((item) => (
              <li
                key={item.step}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5"
              >
                <div>
                  <span className="font-mono text-xs font-semibold text-blue-700 tabular-nums">
                    Step {item.step}
                  </span>
                  <h4 className="mt-1.5 text-base font-bold text-slate-950">{item.title}</h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
                <p className="mt-3 border-t border-slate-100 pt-2.5 text-[11px] font-medium text-slate-700">
                  Output: {item.deliverable}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
