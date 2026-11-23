import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Clock, Mail, MapPin, Phone, X } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import type { InquiryFormInput, SubmittedInquiry } from '../types/construction';
import { InquiryForm } from './InquiryForm';

interface ContactUsModalProps {
  open: boolean;
  onClose: () => void;
  onSubmitInquiry: (input: InquiryFormInput) => SubmittedInquiry;
}

export function ContactUsModal({
  open,
  onClose,
  onSubmitInquiry,
}: ContactUsModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-dialog-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28, mass: 0.8 }}
            className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dialog Header */}
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 bg-slate-900 px-6 py-4 text-white">
              <div>
                <p className="font-mono text-xs font-medium text-blue-400">
                  MST Construction OPC · San Fernando Headquarters
                </p>
                <h2
                  id="contact-dialog-title"
                  className="mt-0.5 text-lg font-bold tracking-tight text-white sm:text-xl"
                >
                  Contact MST Construction OPC
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close Contact Us dialog"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-700 bg-slate-800 text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-700 hover:text-white focus-visible:outline-2 focus-visible:outline-blue-400"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable Body: Directory + Live Inquiry Form */}
            <div className="grid flex-1 grid-cols-1 divide-y divide-slate-200 overflow-y-auto lg:grid-cols-12 lg:divide-x lg:divide-y-0">
              {/* Left Column: Office Details */}
              <div className="bg-slate-50/80 p-6 lg:col-span-5">
                <h3 className="text-sm font-bold tracking-tight text-slate-950">
                  Headquarters &amp; Contact Directory
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  Reach our civil engineers and estimating desk directly for ocular site
                  inspections or consultations.
                </p>

                <dl className="mt-5 space-y-4 border-t border-slate-200 pt-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin
                      className="mt-0.5 h-4 w-4 shrink-0 text-blue-700"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="text-[11px] font-bold tracking-wider text-slate-900 uppercase">
                        Office Address
                      </dt>
                      <dd className="mt-0.5 text-xs leading-relaxed text-slate-700">
                        {COMPANY_INFO.fullAddress}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone
                      className="mt-0.5 h-4 w-4 shrink-0 text-blue-700"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="text-[11px] font-bold tracking-wider text-slate-900 uppercase">
                        Contact Numbers
                      </dt>
                      <dd className="mt-0.5 font-mono text-xs text-slate-800 tabular-nums">
                        {COMPANY_INFO.mobilePhone} / {COMPANY_INFO.landlinePhone}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail
                      className="mt-0.5 h-4 w-4 shrink-0 text-blue-700"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="text-[11px] font-bold tracking-wider text-slate-900 uppercase">
                        Official Email
                      </dt>
                      <dd className="mt-0.5 font-mono text-xs text-slate-800">
                        {COMPANY_INFO.email}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock
                      className="mt-0.5 h-4 w-4 shrink-0 text-blue-700"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="text-[11px] font-bold tracking-wider text-slate-900 uppercase">
                        Office Hours
                      </dt>
                      <dd className="mt-0.5 text-xs text-slate-700">
                        {COMPANY_INFO.officeHours}
                      </dd>
                    </div>
                  </div>
                </dl>

                <div className="mt-5 border-t border-slate-200 pt-4">
                  <p className="text-[11px] font-bold tracking-wider text-slate-900 uppercase">
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
                    className="mt-3 inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 transition-colors duration-150 hover:border-blue-700 hover:text-blue-700"
                  >
                    <span>Open in Google Maps</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Right Column: Project Inquiry Form */}
              <div className="bg-white p-6 lg:col-span-7">
                <div className="mb-4 border-b border-slate-200 pb-3">
                  <h3 className="text-sm font-bold tracking-tight text-slate-950">
                    Send a Direct Message or Project Inquiry
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-600">
                    Our engineering team responds within 48 business hours.
                  </p>
                </div>

                <InquiryForm
                  idPrefix="contact-dialog-inquiry"
                  onSubmitInquiry={onSubmitInquiry}
                  onCancel={onClose}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
