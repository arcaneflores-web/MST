import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, ClipboardList, Send, X } from 'lucide-react';
import type {
  InquiryFormInput,
  InquiryValidationErrors,
  PreferredContactMethod,
  SubmittedInquiry,
} from '../types/construction';
import { validateInquiryForm } from '../utils/inquiryLogic';

interface InquiryModalProps {
  open: boolean;
  preselectedServiceNote: string | null;
  inquiryCount: number;
  onClose: () => void;
  onSubmitInquiry: (input: InquiryFormInput) => SubmittedInquiry;
  onOpenInquiryLog: () => void;
}

const DEFAULT_FORM_STATE: InquiryFormInput = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  preferredContact: 'Email',
  projectCategory: 'Commercial',
  location: '',
  estimatedFloorArea: '',
  estimatedBudget: 'PHP 5M – 15M',
  targetStart: 'Within 1–3 Months',
  readinessStatus: 'Titled Lot Ready',
  projectScope: '',
  privacyConsent: false,
};

export function InquiryModal({
  open,
  preselectedServiceNote,
  inquiryCount,
  onClose,
  onSubmitInquiry,
  onOpenInquiryLog,
}: InquiryModalProps) {
  const [formState, setFormState] = useState<InquiryFormInput>(DEFAULT_FORM_STATE);
  const [errors, setErrors] = useState<InquiryValidationErrors>({});
  const [submittedReceipt, setSubmittedReceipt] = useState<SubmittedInquiry | null>(null);

  useEffect(() => {
    if (!preselectedServiceNote) return;
    setFormState((prev) => ({
      ...prev,
      projectScope: `Requesting quotation and technical consultation for: ${preselectedServiceNote}.`,
    }));
    setSubmittedReceipt(null);
  }, [preselectedServiceNote]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleChange = (field: keyof InquiryFormInput, value: string | boolean) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (field in errors) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof InquiryValidationErrors];
        return next;
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateInquiryForm(formState);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const created = onSubmitInquiry(formState);
    setSubmittedReceipt(created);
    setErrors({});
    setFormState(DEFAULT_FORM_STATE);
  };

  const errorCount = Object.keys(errors).length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Dialog Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">
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

        <div className="p-6 sm:p-8">
          {submittedReceipt ? (
            <div role="status" aria-live="polite">
              <div className="flex items-center gap-3 text-emerald-700">
                <CheckCircle2 className="h-6 w-6 shrink-0" aria-hidden="true" />
                <span className="text-sm font-semibold">
                  Project Inquiry Logged Successfully
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-950">
                Thank you, {submittedReceipt.fullName}.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Your quotation request has been assigned to our estimating engineering desk
                in San Fernando, Pampanga. Keep your reference number below for follow-ups.
              </p>

              <dl className="mt-6 grid grid-cols-1 gap-4 border-y border-slate-200 py-5 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-slate-500">Reference Number</dt>
                  <dd className="mt-1 font-mono font-semibold text-slate-950 tabular-nums">
                    {submittedReceipt.referenceCode}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Workflow Status</dt>
                  <dd className="mt-1 font-semibold text-blue-700">
                    {submittedReceipt.workflowStatus}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Project Type &amp; Location</dt>
                  <dd className="mt-1 text-slate-900">
                    {submittedReceipt.projectCategory} · {submittedReceipt.location}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Preferred Contact &amp; Budget</dt>
                  <dd className="mt-1 font-mono text-slate-900 tabular-nums">
                    {submittedReceipt.preferredContact} · {submittedReceipt.estimatedBudget}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSubmittedReceipt(null)}
                    className="rounded-md bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-blue-700"
                  >
                    Submit Another Inquiry
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenInquiryLog();
                    }}
                    className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-blue-700"
                  >
                    <ClipboardList className="h-4 w-4" aria-hidden="true" />
                    <span className="tabular-nums">View Inquiry Tracker ({inquiryCount})</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <p className="mb-5 text-sm leading-relaxed text-slate-600">
                Provide your site details and scope below. Our engineers respond within 48
                business hours to schedule an ocular visit or preliminary Bill of Quantities
                review.
              </p>

              {errorCount > 0 && (
                <div
                  role="alert"
                  className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                >
                  Please review and correct the {errorCount} highlighted{' '}
                  {errorCount === 1 ? 'field' : 'fields'} below before submitting.
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="inquiry-fullName"
                    className="block text-xs font-semibold text-slate-800"
                  >
                    Full Name *
                  </label>
                  <input
                    id="inquiry-fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formState.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="e.g., Juan Dela Cruz"
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? 'error-fullName' : undefined}
                    className={`mt-1.5 w-full rounded-md border px-3.5 py-2.5 text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none ${
                      errors.fullName
                        ? 'border-red-500 bg-red-50/40 focus:border-red-600'
                        : 'border-slate-300 bg-white focus:border-blue-700'
                    }`}
                  />
                  {errors.fullName && (
                    <p id="error-fullName" className="mt-1.5 text-xs font-medium text-red-700">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Company / Organization */}
                <div>
                  <label
                    htmlFor="inquiry-companyName"
                    className="block text-xs font-semibold text-slate-800"
                  >
                    Company / Organization (Optional)
                  </label>
                  <input
                    id="inquiry-companyName"
                    name="companyName"
                    type="text"
                    value={formState.companyName}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                    placeholder="e.g., Pampanga Logistics Corp."
                    className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="inquiry-email"
                    className="block text-xs font-semibold text-slate-800"
                  >
                    Email Address *
                  </label>
                  <input
                    id="inquiry-email"
                    name="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="name@company.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'error-email' : undefined}
                    className={`mt-1.5 w-full rounded-md border px-3.5 py-2.5 text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none ${
                      errors.email
                        ? 'border-red-500 bg-red-50/40 focus:border-red-600'
                        : 'border-slate-300 bg-white focus:border-blue-700'
                    }`}
                  />
                  {errors.email && (
                    <p id="error-email" className="mt-1.5 text-xs font-medium text-red-700">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Contact Number */}
                <div>
                  <label
                    htmlFor="inquiry-phone"
                    className="block text-xs font-semibold text-slate-800"
                  >
                    Mobile or Landline Number *
                  </label>
                  <input
                    id="inquiry-phone"
                    name="phone"
                    type="tel"
                    required
                    value={formState.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+63 919 000 0000"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'error-phone' : undefined}
                    className={`mt-1.5 w-full rounded-md border px-3.5 py-2.5 text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none ${
                      errors.phone
                        ? 'border-red-500 bg-red-50/40 focus:border-red-600'
                        : 'border-slate-300 bg-white focus:border-blue-700'
                    }`}
                  />
                  {errors.phone && (
                    <p id="error-phone" className="mt-1.5 text-xs font-medium text-red-700">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label
                    htmlFor="inquiry-preferredContact"
                    className="block text-xs font-semibold text-slate-800"
                  >
                    Preferred Contact Method
                  </label>
                  <select
                    id="inquiry-preferredContact"
                    value={formState.preferredContact}
                    onChange={(e) =>
                      handleChange(
                        'preferredContact',
                        e.target.value as PreferredContactMethod
                      )
                    }
                    className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 focus:border-blue-700 focus:outline-none"
                  >
                    <option value="Email">Email</option>
                    <option value="Mobile Call / SMS">Mobile Call / SMS</option>
                    <option value="Viber / WhatsApp">Viber / WhatsApp</option>
                  </select>
                </div>

                {/* Project Category */}
                <div>
                  <label
                    htmlFor="inquiry-category"
                    className="block text-xs font-semibold text-slate-800"
                  >
                    Project Type *
                  </label>
                  <select
                    id="inquiry-category"
                    name="projectCategory"
                    value={formState.projectCategory}
                    onChange={(e) => handleChange('projectCategory', e.target.value)}
                    className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 focus:border-blue-700 focus:outline-none"
                  >
                    <option value="Commercial">Commercial Building</option>
                    <option value="Industrial">Industrial / Steel Warehouse</option>
                    <option value="Infrastructure">Civil &amp; Site Infrastructure</option>
                    <option value="Residential">Custom Residential</option>
                    <option value="Renovation / Fit-Out">Renovation / Interior Fit-Out</option>
                    <option value="Engineering Consultancy">
                      Architectural / Structural Consultancy
                    </option>
                  </select>
                </div>

                {/* Site Location */}
                <div>
                  <label
                    htmlFor="inquiry-location"
                    className="block text-xs font-semibold text-slate-800"
                  >
                    Project Site Location *
                  </label>
                  <input
                    id="inquiry-location"
                    name="location"
                    type="text"
                    required
                    value={formState.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    placeholder="e.g., San Fernando, Pampanga"
                    aria-invalid={Boolean(errors.location)}
                    aria-describedby={errors.location ? 'error-location' : undefined}
                    className={`mt-1.5 w-full rounded-md border px-3.5 py-2.5 text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none ${
                      errors.location
                        ? 'border-red-500 bg-red-50/40 focus:border-red-600'
                        : 'border-slate-300 bg-white focus:border-blue-700'
                    }`}
                  />
                  {errors.location && (
                    <p id="error-location" className="mt-1.5 text-xs font-medium text-red-700">
                      {errors.location}
                    </p>
                  )}
                </div>

                {/* Estimated Floor Area */}
                <div>
                  <label
                    htmlFor="inquiry-floorArea"
                    className="block text-xs font-semibold text-slate-800"
                  >
                    Estimated Floor Area (Optional)
                  </label>
                  <input
                    id="inquiry-floorArea"
                    type="text"
                    value={formState.estimatedFloorArea}
                    onChange={(e) => handleChange('estimatedFloorArea', e.target.value)}
                    placeholder="e.g., 1,200 sqm"
                    className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none"
                  />
                </div>

                {/* Estimated Budget */}
                <div>
                  <label
                    htmlFor="inquiry-budget"
                    className="block text-xs font-semibold text-slate-800"
                  >
                    Estimated Budget Range
                  </label>
                  <select
                    id="inquiry-budget"
                    name="estimatedBudget"
                    value={formState.estimatedBudget}
                    onChange={(e) => handleChange('estimatedBudget', e.target.value)}
                    className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 focus:border-blue-700 focus:outline-none"
                  >
                    <option value="Under PHP 5M">Under PHP 5M</option>
                    <option value="PHP 5M – 15M">PHP 5M – 15M</option>
                    <option value="PHP 15M – 30M">PHP 15M – 30M</option>
                    <option value="PHP 30M – 75M">PHP 30M – 75M</option>
                    <option value="Above PHP 75M">Above PHP 75M</option>
                  </select>
                </div>

                {/* Target Start */}
                <div>
                  <label
                    htmlFor="inquiry-start"
                    className="block text-xs font-semibold text-slate-800"
                  >
                    Target Mobilization Window
                  </label>
                  <select
                    id="inquiry-start"
                    name="targetStart"
                    value={formState.targetStart}
                    onChange={(e) => handleChange('targetStart', e.target.value)}
                    className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 focus:border-blue-700 focus:outline-none"
                  >
                    <option value="Immediate (Within 30 Days)">Immediate (Within 30 Days)</option>
                    <option value="Within 1–3 Months">Within 1–3 Months</option>
                    <option value="Q1 2027">Q1 2027</option>
                    <option value="Q2 2027 or Later">Q2 2027 or Later</option>
                  </select>
                </div>

                {/* Readiness Status */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="inquiry-readiness"
                    className="block text-xs font-semibold text-slate-800"
                  >
                    Project Readiness
                  </label>
                  <select
                    id="inquiry-readiness"
                    value={formState.readinessStatus}
                    onChange={(e) => handleChange('readinessStatus', e.target.value)}
                    className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 focus:border-blue-700 focus:outline-none"
                  >
                    <option value="Titled Lot Ready">Titled Lot Ready (Need Design &amp; Build)</option>
                    <option value="Architectural Plans Available">
                      Architectural / Structural Plans Available (Need Construction Bid)
                    </option>
                    <option value="Existing Building for Fit-Out / Retrofit">
                      Existing Structure for Fit-Out or Retrofit
                    </option>
                    <option value="Feasibility / Budgeting Stage">
                      Feasibility &amp; Budgeting Stage
                    </option>
                  </select>
                </div>

                {/* Project Scope Description */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="inquiry-scope"
                    className="block text-xs font-semibold text-slate-800"
                  >
                    Project Scope, Lot / Floor Area &amp; Requirements *
                  </label>
                  <textarea
                    id="inquiry-scope"
                    name="projectScope"
                    rows={4}
                    required
                    value={formState.projectScope}
                    onChange={(e) => handleChange('projectScope', e.target.value)}
                    placeholder="Describe the proposed structure, approximate floor area in sqm, number of storeys, and whether architectural plans are already available..."
                    aria-invalid={Boolean(errors.projectScope)}
                    aria-describedby={errors.projectScope ? 'error-scope' : undefined}
                    className={`mt-1.5 w-full rounded-md border px-3.5 py-2.5 text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none ${
                      errors.projectScope
                        ? 'border-red-500 bg-red-50/40 focus:border-red-600'
                        : 'border-slate-300 bg-white focus:border-blue-700'
                    }`}
                  />
                  {errors.projectScope && (
                    <p id="error-scope" className="mt-1.5 text-xs font-medium text-red-700">
                      {errors.projectScope}
                    </p>
                  )}
                </div>

                {/* Privacy Consent */}
                <div className="sm:col-span-2">
                  <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      id="inquiry-privacyConsent"
                      type="checkbox"
                      checked={formState.privacyConsent}
                      onChange={(e) => handleChange('privacyConsent', e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-700"
                    />
                    <span>
                      I consent to MST Construction OPC processing my submitted contact and
                      project details strictly for engineering evaluation and quotation
                      preparation. *
                    </span>
                  </label>
                  {errors.privacyConsent && (
                    <p className="mt-1.5 text-xs font-medium text-red-700">
                      {errors.privacyConsent}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenInquiryLog();
                  }}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-700"
                >
                  <ClipboardList className="h-4 w-4" aria-hidden="true" />
                  <span className="tabular-nums">
                    Manage Submitted Inquiries ({inquiryCount})
                  </span>
                </button>

                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-800 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>Submit Project Inquiry</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
