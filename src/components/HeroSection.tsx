import { ArrowRight } from 'lucide-react';
import { COMPANY_INFO, HERO_METRICS } from '../data/companyData';
import { HeroBlueprintCanvas } from './ArchitecturalVisuals';

interface HeroSectionProps {
  onRequestQuote: () => void;
  onExploreProjects: () => void;
}

export function HeroSection({
  onRequestQuote,
  onExploreProjects,
}: HeroSectionProps) {
  return (
    <section id="top" className="border-b-2 border-slate-200 bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-8 lg:py-12">
        {/* 2-Column Hero Split */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="flex flex-wrap items-center gap-3 text-sm font-medium text-blue-700">
              <span>
                {COMPANY_INFO.serviceRegion} · General Engineering &amp; Design-Build
              </span>
              <button
                type="button"
                onClick={onRequestQuote}
                className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors duration-150 hover:bg-blue-800 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                <span>Start Consultation</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </p>

            <h1
              className="mt-3 font-bold tracking-tight text-slate-950 leading-[1.08]"
              style={{
                fontSize: 'clamp(2.15rem, 3.8vw, 3.35rem)',
                textWrap: 'balance',
              }}
            >
              Building Excellence. Creating Lasting Foundations.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Delivering construction and engineering solutions through thoughtful planning,
              technical expertise, and quality execution across Pampanga and Central Luzon.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-slate-100 pt-5">
              <button
                type="button"
                onClick={onRequestQuote}
                className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-800 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                <span>Request Project Quotation</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onExploreProjects}
                className="inline-flex items-center py-2 text-sm font-semibold text-slate-800 underline underline-offset-4 transition-colors duration-150 hover:text-blue-700 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
              >
                Explore Completed Works
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <HeroBlueprintCanvas />
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
