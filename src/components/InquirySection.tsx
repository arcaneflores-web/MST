import { ArrowRight, ClipboardList, Mail, MapPin, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import type { SubmittedInquiry } from '../types/construction';

interface InquirySectionProps {
  inquiries: SubmittedInquiry[];
  onOpenInquiryDialog: () => void;
  onOpenInquiryLog: () => void;
}

export function InquirySection({
  inquiries,
  onOpenInquiryDialog,
  onOpenInquiryLog,
}: InquirySectionProps) {
  return (
    <section
      id="inquiry"
      className="scroll-mt-16 border-b border-slate-200 bg-white py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Consultation Steps */}
          <div className="lg:col-span-6">
            <p className="text-sm font-medium text-blue-700">
              Project Inquiry &amp; Quotation Request
            </p>
            <h2
              className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Request an Itemized Construction Estimate
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Share your site location, target floor area, and project objectives through
              our project inquiry dialog. Our estimating engineers respond within 48 business
              hours to schedule a site inspection or preliminary Bill of Quantities review.
            </p>

            <ol className="mt-8 space-y-4 border-t border-slate-200 pt-6 text-sm text-slate-700">
              <li>
                <span className="font-mono font-semibold text-blue-700">01.</span>{' '}
                <strong className="text-slate-950">Scope Intake:</strong> Submit project
                parameters, site location, and target timeline.
              </li>
              <li>
                <span className="font-mono font-semibold text-blue-700">02.</span>{' '}
                <strong className="text-slate-950">Ocular Site Visit:</strong> Engineering
                team assesses lot elevation, access, and soil conditions.
              </li>
              <li>
                <span className="font-mono font-semibold text-blue-700">03.</span>{' '}
                <strong className="text-slate-950">BOQ &amp; Proposal:</strong> Receive an
                itemized Bill of Quantities and construction schedule.
              </li>
            </ol>
          </div>

          {/* Right Column: Dialog Launcher Card & Direct Engineering Desk */}
          <div className="lg:col-span-6">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-950">
                Direct Engineering Desk
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Ready to start a commercial, industrial, residential, or civil build in
                Pampanga or Central Luzon? Open the inquiry dialog to request an itemized
                quotation.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenInquiryDialog}
                  className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-800 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                >
                  <span>Open Project Inquiry Form</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={onOpenInquiryLog}
                  className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition-colors duration-150 hover:bg-slate-100 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-700"
                >
                  <ClipboardList className="h-4 w-4 text-blue-700" aria-hidden="true" />
                  <span className="tabular-nums">
                    Manage Submitted Inquiries ({inquiries.length})
                  </span>
                </button>
              </div>

              <div className="mt-6 space-y-3 border-t border-slate-200 pt-6 text-sm">
                <p className="flex items-start gap-2.5 text-slate-700">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                  <span>{COMPANY_INFO.fullAddress}</span>
                </p>
                <p className="flex items-center gap-2.5 font-mono text-slate-700 tabular-nums">
                  <Phone className="h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                  <span>
                    {COMPANY_INFO.mobilePhone} / {COMPANY_INFO.landlinePhone}
                  </span>
                </p>
                <p className="flex items-center gap-2.5 font-mono text-slate-700">
                  <Mail className="h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                  <span>{COMPANY_INFO.email}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
