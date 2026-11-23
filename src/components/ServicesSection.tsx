import { useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import { SERVICES } from '../data/companyData';
import type { ServiceItem } from '../types/construction';

interface ServicesSectionProps {
  onSelectServiceForInquiry: (serviceTitle: string) => void;
}

export function ServicesSection({
  onSelectServiceForInquiry,
}: ServicesSectionProps) {
  const [expandedId, setExpandedId] = useState<string>(SERVICES[0].id);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? '' : id));
  };

  return (
    <section
      id="services"
      className="scroll-mt-16 border-b border-slate-200 bg-slate-50 py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-blue-700">
              Engineering Capabilities &amp; Scope
            </p>
            <h2
              className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              End-to-End Services from Pre-Construction to Handover
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-600">
            Every engagement follows National Structural Code of the Philippines (NSCP)
            standards, itemized cost estimation, and direct PRC engineering oversight.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service: ServiceItem) => {
            const isExpanded = expandedId === service.id;
            return (
              <article
                key={service.id}
                className={`flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 transition-colors duration-150 hover:border-slate-300 ${
                  service.featuredSpan ? 'lg:col-span-2' : 'lg:col-span-1'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold tracking-tight text-slate-950">
                      <span className="mr-2 font-mono text-base font-medium text-blue-700 tabular-nums">
                        {service.index}
                      </span>{' '}
                      {service.title}
                    </h3>
                  </div>

                  <p className="mt-2 text-sm font-medium text-slate-700">
                    {service.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>

                  {/* Capabilities list */}
                  <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-700">
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
                    <div className="mt-4 border-t border-slate-100 pt-4 text-xs text-slate-600 space-y-1.5">
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

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
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
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-700"
                  >
                    <span>Inquire About Scope</span>
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
