import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import { SERVICES } from '../data/companyData';
import type { ServiceItem } from '../types/construction';
import { getFeaturedServices } from '../utils/inquiryLogic';
import { SectionHeaderBar } from './SectionDivider';
import { getScrollCardMotionProps } from './ScrollReveal';

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
  const [expandedId, setExpandedId] = useState<string>('');

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
            {displayedServices.map((service, idx) => (
              <motion.article
                key={service.id}
                {...getScrollCardMotionProps(idx % 2, 0.06)}
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
              </motion.article>
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
        />

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {displayedServices.map((service: ServiceItem, idx) => {
            const isExpanded = expandedId === service.id;
            const primaryCapabilities = service.capabilities.slice(0, 3);
            const extraCapabilities = service.capabilities.slice(3);

            return (
              <motion.article
                key={service.id}
                {...getScrollCardMotionProps(idx % 3, 0.06)}
                className="flex h-full flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 transition-colors duration-150 hover:border-slate-300"
              >
                <div className="flex flex-1 flex-col">
                  <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <span className="whitespace-nowrap shrink-0 font-mono text-xs font-bold tracking-wider text-blue-700 tabular-nums">
                      SERVICE {service.index.replace('.', '')}
                    </span>
                    <span className="min-w-0 truncate font-mono text-[11px] font-medium text-slate-500">
                      {service.typicalTimeline}
                    </span>
                  </div>

                  <h3 className="mt-3.5 min-h-[3.25rem] line-clamp-2 text-lg font-bold leading-snug tracking-tight text-slate-950">
                    {service.title}
                  </h3>

                  <p className="mt-1.5 min-h-[2.5rem] line-clamp-2 text-xs font-semibold leading-relaxed text-slate-700 sm:text-sm">
                    {service.subtitle}
                  </p>

                  <p className="mt-2.5 min-h-[4.25rem] line-clamp-3 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>

                  <div className="mt-4 border-t border-slate-100 pt-3.5">
                    <p className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                      Key Deliverables
                    </p>
                    <ul className="mt-2 min-h-[5.75rem] space-y-1.5 text-sm text-slate-700">
                      {primaryCapabilities.map((cap) => (
                        <li key={cap} className="flex items-start gap-2">
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-700"
                            aria-hidden="true"
                          />
                          <span className="leading-snug">{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 space-y-2 border-t border-slate-100 pt-3.5 text-xs text-slate-600">
                      {extraCapabilities.length > 0 && (
                        <ul className="space-y-1.5 text-sm text-slate-700">
                          {extraCapabilities.map((cap) => (
                            <li key={cap} className="flex items-start gap-2">
                              <span
                                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-700"
                                aria-hidden="true"
                              />
                              <span className="leading-snug">{cap}</span>
                            </li>
                          ))}
                        </ul>
                      )}
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

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
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
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
