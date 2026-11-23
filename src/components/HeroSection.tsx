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
    <section id="top" className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-14 lg:py-20">
        {/* 2-Column Hero Split with equal height stretch */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="flex flex-wrap items-center gap-4 text-sm font-medium text-blue-700">
              <span>
                {COMPANY_INFO.serviceRegion} · General Engineering &amp; Design-Build
              </span>
              <button
                type="button"
                onClick={onRequestQuote}
                className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors duration-150 hover:bg-blue-800 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                <span>Start Consultation</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </p>

            <h1
              className="mt-4 font-bold tracking-tight text-slate-950 leading-[1.08]"
              style={{
                fontSize: 'clamp(2.25rem, 4vw, 3.65rem)',
                textWrap: 'balance',
              }}
            >
              Disciplined Engineering for Commercial &amp; Civil Structures.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              MST Construction OPC delivers turnkey commercial buildings, industrial steel
              warehouses, custom residences, and heavy civil infrastructure across Pampanga
              with transparent costing and licensed engineering supervision.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={onRequestQuote}
                className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-800 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
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

        {/* Full-width 4-column KPI strip below hero split */}
        <div className="mt-12 grid grid-cols-1 gap-6 border-t border-slate-200 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {HERO_METRICS.map((metric) => (
            <div key={metric.label}>
              <p className="font-mono text-2xl font-semibold tracking-tight text-slate-950 tabular-nums">
                {metric.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{metric.label}</p>
              <p className="mt-0.5 text-xs text-slate-500">{metric.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
