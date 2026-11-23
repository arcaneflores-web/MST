import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { InquiryFormInput, SubmittedInquiry } from '../types/construction';
import { InquiryForm } from './InquiryForm';

interface InquiryModalProps {
  open: boolean;
  preselectedServiceNote: string | null;
  onClose: () => void;
  onSubmitInquiry: (input: InquiryFormInput) => SubmittedInquiry;
}

export function InquiryModal({
  open,
  preselectedServiceNote,
  onClose,
  onSubmitInquiry,
}: InquiryModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">
          <div>
            <p className="text-xs font-medium text-blue-700">
              MST Construction OPC · Estimating Desk
            </p>
            <h2
              id="inquiry-modal-title"
              className="mt-0.5 text-lg font-bold tracking-tight text-slate-950 sm:text-xl"
            >
              Project Inquiry &amp; Quotation Request
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project inquiry dialog"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-200 text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-blue-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <p className="mb-5 text-sm leading-relaxed text-slate-600">
            Provide your site details and scope below. Our engineers respond within 48
            business hours to schedule an ocular visit or preliminary Bill of Quantities
            review.
          </p>

          <InquiryForm
            idPrefix="modal-inquiry"
            preselectedServiceNote={preselectedServiceNote}
            onSubmitInquiry={onSubmitInquiry}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}
