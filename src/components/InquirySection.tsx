import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import type { InquiryFormInput, SubmittedInquiry } from '../types/construction';
import { InquiryForm } from './InquiryForm';
import { SectionHeaderBar } from './SectionDivider';
import { ScrollReveal } from './ScrollReveal';

interface InquirySectionProps {
  onSubmitInquiry: (input: InquiryFormInput) => SubmittedInquiry;
}

export function InquirySection({ onSubmitInquiry }: InquirySectionProps) {
  return (
    <section
      id="inquiry"
      className="scroll-mt-[4.25rem] flex flex-col justify-center border-b border-black/[0.08] bg-slate-100/80 lg:min-h-[calc(100svh-8.75rem)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-10 lg:py-16">
        <SectionHeaderBar
          sectionNumber="01"
          eyebrow="San Fernando Headquarters & Estimating Desk"
          title="Visit or Message Our Engineering Team"
        />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
          {/* Left Column: Complete Office Information & Google Maps Location */}
          <ScrollReveal className="flex flex-col justify-between rounded-2xl border border-black/[0.08] bg-white p-7 lg:col-span-5 lg:p-9">
            <div>
              <h3 className="text-lg font-bold text-slate-950/95 lg:text-xl">
                Headquarters &amp; Contact Directory
              </h3>

              <dl className="mt-6 space-y-5 border-t border-black/[0.06] pt-6 text-sm lg:text-base">
                <div className="flex items-start gap-3.5">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                  <div>
                    <dt className="text-[11px] font-bold tracking-wider text-slate-950/88 uppercase">
                      Office Address
                    </dt>
                    <dd className="mt-1 text-slate-950/68">{COMPANY_INFO.fullAddress}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="mt-1 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                  <div>
                    <dt className="text-[11px] font-bold tracking-wider text-slate-950/88 uppercase">
                      Contact Numbers
                    </dt>
                    <dd className="mt-1 font-mono text-slate-950/88 tabular-nums">
                      {COMPANY_INFO.mobilePhone} / {COMPANY_INFO.landlinePhone}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="mt-1 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                  <div>
                    <dt className="text-[11px] font-bold tracking-wider text-slate-950/88 uppercase">
                      Official Email
                    </dt>
                    <dd className="mt-1 font-mono text-slate-950/88">{COMPANY_INFO.email}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="mt-1 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                  <div>
                    <dt className="text-[11px] font-bold tracking-wider text-slate-950/88 uppercase">
                      Office Hours
                    </dt>
                    <dd className="mt-1 text-slate-950/68">{COMPANY_INFO.officeHours}</dd>
                  </div>
                </div>
              </dl>
            </div>

            <div className="mt-8 border-t border-black/[0.06] pt-6">
              <p className="text-xs font-bold tracking-wider text-slate-950/88 uppercase">
                Google Maps Location
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-950/68">
                2nd Floor, JG Building, Dela Paz Norte (along McArthur Highway corridor),
                City of San Fernando, Pampanga 2000.
              </p>
              <a
                href={COMPANY_INFO.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-md border border-black/[0.12] bg-slate-100/70 px-4 py-2.5 text-xs font-semibold text-slate-950/92 transition-colors duration-150 hover:border-blue-700 hover:text-blue-700 sm:text-sm"
              >
                <span>Open in Google Maps</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </ScrollReveal>

          {/* Right Column: Live Project Inquiry Form */}
          <ScrollReveal delay={0.07} className="lg:col-span-7">
            <div className="h-full rounded-2xl border border-black/[0.08] bg-white p-7 lg:p-9">
              <div className="mb-6 border-b border-black/[0.06] pb-4">
                <h3 className="text-xl font-bold tracking-tight text-slate-950/95">
                  Project Inquiry &amp; Quotation Form
                </h3>
                <p className="mt-1.5 text-sm text-slate-950/68">
                  Complete the fields below to request an itemized construction estimate or
                  schedule a site inspection.
                </p>
              </div>

              <InquiryForm
                idPrefix="contact-inquiry"
                onSubmitInquiry={onSubmitInquiry}
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
