import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import { SERVICES } from '../data/companyData';
import type { ServiceItem } from '../types/construction';
import { getFeaturedServices } from '../utils/inquiryLogic';
import { SectionHeaderBar } from './SectionDivider';
import { getScrollCardMotionProps } from './ScrollReveal';

interface ServicesSectionProps {
  mode?: 'preview' | 'full';
  onSelectServiceForInquiry: (serviceTitle: string) => void;
}

export function ServicesSection({
  mode = 'full',
  onSelectServiceForInquiry,
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
        className="scroll-mt-[4.25rem] border-b border-black/[0.08] bg-white"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 py-10 lg:px-10 lg:py-12">
          <SectionHeaderBar title="Featured Engineering & Construction Services" />

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {displayedServices.map((service, idx) => (
              <motion.article
                key={service.id}
                {...getScrollCardMotionProps(idx % 2, 0.06)}
                className="flex flex-col justify-between rounded-2xl border border-black/[0.08] bg-slate-100/60 p-6 transition-colors duration-150 hover:border-black/[0.16] lg:p-7"
              >
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-slate-950/95 lg:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-950/68 lg:text-base lg:leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="mt-5 grid grid-cols-1 gap-1.5 border-t border-black/[0.06] pt-4 text-xs text-slate-950/75 sm:grid-cols-2 lg:text-sm">
                    {service.capabilities.slice(0, 2).map((cap) => (
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

                <div className="mt-6 flex items-center justify-between gap-4 border-t border-black/[0.06] pt-4">
                  <span className="font-mono text-xs text-slate-950/54 lg:text-sm">
                    {service.typicalTimeline}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectServiceForInquiry(service.title)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-700"
                  >
                    <span>Request a Quote</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
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
      className="scroll-mt-[4.25rem] border-b border-black/[0.08] bg-slate-100/80"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-10 lg:px-10 lg:py-12">
        <SectionHeaderBar title="Construction, Engineering, Architectural & Design-Build Scope" />

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedServices.map((service: ServiceItem, idx) => {
            const isExpanded = expandedId === service.id;
            const primaryCapabilities = service.capabilities.slice(0, 3);
            const extraCapabilities = service.capabilities.slice(3);

            return (
              <motion.article
                key={service.id}
                {...getScrollCardMotionProps(idx % 3, 0.06)}
                className="flex h-full flex-col justify-between rounded-2xl border border-black/[0.08] bg-white p-6 transition-colors duration-150 hover:border-black/[0.16] lg:p-7"
              >
                <div className="flex flex-1 flex-col">
                  <h3 className="min-h-[3.25rem] line-clamp-2 text-xl font-bold leading-snug tracking-tight text-slate-950/95">
                    {service.title}
                  </h3>

                  <p className="mt-1.5 font-mono text-xs font-medium text-blue-700">
                    {service.typicalTimeline}
                  </p>

                  <p className="mt-2.5 min-h-[2.75rem] line-clamp-2 text-sm font-semibold leading-relaxed text-slate-950/76">
                    {service.subtitle}
                  </p>

                  <p className="mt-2.5 min-h-[4.5rem] line-clamp-3 text-sm leading-relaxed text-slate-950/68">
                    {service.description}
                  </p>

                  <div className="mt-5 border-t border-black/[0.06] pt-4">
                    <p className="text-[11px] font-bold tracking-wider text-slate-950/54 uppercase">
                      Key Deliverables
                    </p>
                    <ul className="mt-2.5 min-h-[6.25rem] space-y-2 text-sm text-slate-950/75">
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
                    <div className="mt-4 space-y-2 border-t border-black/[0.06] pt-4 text-xs text-slate-950/68">
                      {extraCapabilities.length > 0 && (
                        <ul className="space-y-2 text-sm text-slate-950/75">
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
                        <span className="font-semibold text-slate-950/90">Governing Code: </span>
                        <span className="font-mono">{service.standards}</span>
                      </p>
                      <p>
                        <span className="font-semibold text-slate-950/90">Typical Timeline: </span>
                        <span className="tabular-nums">{service.typicalTimeline}</span>
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between gap-3 border-t border-black/[0.06] pt-4">
                  <button
                    type="button"
                    onClick={() => toggleExpand(service.id)}
                    aria-expanded={isExpanded}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-950/75 hover:text-slate-950 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-700"
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
                    className="inline-flex items-center gap-1.5 rounded-md bg-blue-700 px-4 py-2.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-blue-800 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-700"
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
