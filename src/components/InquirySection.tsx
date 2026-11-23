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
      className="scroll-mt-16 border-b-2 border-slate-200 bg-slate-100/70 py-10 lg:py-12"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeaderBar
          sectionNumber="01"
          eyebrow="San Fernando Headquarters & Estimating Desk"
          title="Visit or Message Our Engineering Team"
        />

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Complete Office Information & Google Maps Location */}
          <ScrollReveal className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-5">
            <h3 className="text-base font-bold text-slate-950">
              Headquarters &amp; Contact Directory
            </h3>

            <dl className="mt-4 space-y-4 border-t border-slate-100 pt-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                <div>
                  <dt className="text-[11px] font-bold tracking-wider text-slate-900 uppercase">
                    Office Address
                  </dt>
                  <dd className="mt-0.5 text-slate-700">{COMPANY_INFO.fullAddress}</dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                <div>
                  <dt className="text-[11px] font-bold tracking-wider text-slate-900 uppercase">
                    Contact Numbers
                  </dt>
                  <dd className="mt-0.5 font-mono text-slate-800 tabular-nums">
                    {COMPANY_INFO.mobilePhone} / {COMPANY_INFO.landlinePhone}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                <div>
                  <dt className="text-[11px] font-bold tracking-wider text-slate-900 uppercase">
                    Official Email
                  </dt>
                  <dd className="mt-0.5 font-mono text-slate-800">{COMPANY_INFO.email}</dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                <div>
                  <dt className="text-[11px] font-bold tracking-wider text-slate-900 uppercase">
                    Office Hours
                  </dt>
                  <dd className="mt-0.5 text-slate-700">{COMPANY_INFO.officeHours}</dd>
                </div>
              </div>
            </dl>

            <div className="mt-6 border-t border-slate-200 pt-5">
              <p className="text-xs font-bold tracking-wider text-slate-900 uppercase">
                Google Maps Location
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                2nd Floor, JG Building, Dela Paz Norte (along McArthur Highway corridor),
                City of San Fernando, Pampanga 2000.
              </p>
              <a
                href={COMPANY_INFO.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-900 transition-colors duration-150 hover:border-blue-700 hover:text-blue-700"
              >
                <span>Open in Google Maps</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </ScrollReveal>

          {/* Right Column: Live Project Inquiry Form */}
          <ScrollReveal delay={0.07} className="lg:col-span-7">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="mb-5 border-b border-slate-200 pb-3.5">
                <h3 className="text-lg font-bold tracking-tight text-slate-950">
                  Project Inquiry &amp; Quotation Form
                </h3>
                <p className="mt-1 text-xs text-slate-600">
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
