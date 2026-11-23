import { useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import { SERVICES } from '../data/companyData';
import type { ServiceItem } from '../types/construction';
import { getFeaturedServices } from '../utils/inquiryLogic';
import { SectionHeaderBar } from './SectionDivider';

interface ServicesSectionProps {
  mode?: 'preview' | 'full';
  onSelectServiceForInquiry: (serviceTitle: string) => void;
  onViewAllServices?: () => void;
}

export function ServicesSection({
  mode = 'full',
  onSelectServiceForInquiry,
  onViewAllServices,
}: ServicesSectionProps) {
  const [expandedId, setExpandedId] = useState<string>(SERVICES[0].id);

  const displayedServices =
    mode === 'preview' ? getFeaturedServices(SERVICES, 4) : SERVICES;

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? '' : id));
  };

  if (mode === 'preview') {
    return (
      <section
        id="featured-services"
        className="border-b-2 border-slate-200 bg-white py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <SectionHeaderBar
            sectionNumber="02"
            eyebrow="Core Capabilities"
            title="Featured Engineering & Construction Services"
            action={
              onViewAllServices ? (
                <button
                  type="button"
                  onClick={onViewAllServices}
                  className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-900 transition-colors hover:border-blue-700 hover:text-blue-700 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-700"
                >
                  <span>View All 6 Services</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              ) : undefined
            }
          />

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {displayedServices.map((service) => (
              <article
                key={service.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/80 p-5 transition-colors duration-150 hover:border-slate-300"
              >
                <div>
                  <h3 className="text-base font-bold tracking-tight text-slate-950 sm:text-lg">
                    <span className="mr-2 font-mono text-sm font-medium text-blue-700 tabular-nums">
                      {service.index}
                    </span>{' '}
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4 border-t border-slate-200 pt-3.5">
                  <span className="font-mono text-xs text-slate-500">
                    {service.typicalTimeline}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectServiceForInquiry(service.title)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-700"
                  >
                    <span>Request a Quote</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
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
      id="services"
      className="scroll-mt-16 border-b-2 border-slate-200 bg-slate-100/70 py-10 lg:py-12"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeaderBar
          sectionNumber="01"
          eyebrow="Complete Service Offerings"
          title="Construction, Engineering, Architectural & Design-Build Scope"
          description="Every engagement follows National Structural Code of the Philippines (NSCP) standards, itemized cost estimation, and direct PRC engineering oversight."
        />

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {displayedServices.map((service: ServiceItem) => {
            const isExpanded = expandedId === service.id;
            return (
              <article
                key={service.id}
                className={`flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 transition-colors duration-150 hover:border-slate-300 ${
                  service.featuredSpan ? 'lg:col-span-2' : 'lg:col-span-1'
                }`}
              >
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
                    <span className="mr-2 font-mono text-base font-medium text-blue-700 tabular-nums">
                      {service.index}
                    </span>{' '}
                    {service.title}
                  </h3>

                  <p className="mt-1.5 text-sm font-medium text-slate-700">
                    {service.subtitle}
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>

                  <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-3.5 text-sm text-slate-700">
                    {service.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-2">
                        <span
                          className="mt-2 h-1 w-1 shrink-0 bg-slate-400"
                          aria-hidden="true"
                        />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>

                  {isExpanded && (
                    <div className="mt-3.5 space-y-1 border-t border-slate-100 pt-3.5 text-xs text-slate-600">
                      <p>
                        <span className="font-semibold text-slate-900">Governing Code: </span>
                        <span className="font-mono">{service.standards}</span>
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">Typical Timeline: </span>
                        <span className="tabular-nums">{service.typicalTimeline}</span>
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3.5">
                  <button
                    type="button"
                    onClick={() => toggleExpand(service.id)}
                    aria-expanded={isExpanded}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-700"
                  >
                    <span>{isExpanded ? 'Hide Specifications' : 'View Specifications'}</span>
                    {isExpanded ? (
                      <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectServiceForInquiry(service.title)}
                    className="inline-flex items-center gap-1.5 rounded-md bg-blue-700 px-3.5 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-blue-800 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-700"
                  >
                    <span>Request a Quote</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
