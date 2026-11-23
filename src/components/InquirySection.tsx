import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, ClipboardList, Mail, MapPin, Phone, Send } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import type {
  InquiryFormInput,
  InquiryValidationErrors,
  SubmittedInquiry,
} from '../types/construction';
import { validateInquiryForm } from '../utils/inquiryLogic';

interface InquirySectionProps {
  preselectedServiceNote: string | null;
  inquiries: SubmittedInquiry[];
  onSubmitInquiry: (input: InquiryFormInput) => SubmittedInquiry;
  onOpenInquiryLog: () => void;
}

const DEFAULT_FORM_STATE: InquiryFormInput = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  projectCategory: 'Commercial',
  location: '',
  estimatedBudget: 'PHP 5M – 15M',
  targetStart: 'Within 1–3 Months',
  projectScope: '',
};

export function InquirySection({
  preselectedServiceNote,
  inquiries,
  onSubmitInquiry,
  onOpenInquiryLog,
}: InquirySectionProps) {
  const [formState, setFormState] = useState<InquiryFormInput>(DEFAULT_FORM_STATE);
  const [errors, setErrors] = useState<InquiryValidationErrors>({});
  const [submittedReceipt, setSubmittedReceipt] = useState<SubmittedInquiry | null>(null);

  useEffect(() => {
    if (!preselectedServiceNote) return;
    setFormState((prev) => ({
      ...prev,
      projectScope: prev.projectScope
        ? prev.projectScope
        : `Requesting quotation and technical consultation for: ${preselectedServiceNote}.`,
    }));
    setSubmittedReceipt(null);
  }, [preselectedServiceNote]);

  const handleChange = (
    field: keyof InquiryFormInput,
    value: string
  ) => {
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
    <section
      id="inquiry"
      className="scroll-mt-16 border-b border-slate-200 bg-white py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Direct Consultation Details & Inquiry Queue Trigger */}
          <div className="lg:col-span-5">
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
              Share your site location, target floor area, and project objectives. Our
              estimating engineers respond within 48 business hours to schedule a site
              inspection or preliminary Bill of Quantities review.
            </p>

            {/* Consultation steps */}
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

            {/* Direct Office Channels */}
            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-3 text-sm">
              <h3 className="text-sm font-bold text-slate-950">
                Direct Engineering Desk
              </h3>
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

              <div className="border-t border-slate-200 pt-3">
                <button
                  type="button"
                  onClick={onOpenInquiryLog}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-blue-700"
                >
                  <ClipboardList className="h-4 w-4" aria-hidden="true" />
                  <span className="tabular-nums">
                    Manage Submitted Inquiries ({inquiries.length})
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Quotation Form or Confirmation State */}
          <div className="lg:col-span-7">
            {submittedReceipt ? (
              <div
                role="status"
                aria-live="polite"
                className="rounded-xl border border-slate-200 bg-slate-50 p-8"
              >
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
                    <dt className="text-xs text-slate-500">Estimated Budget Band</dt>
                    <dd className="mt-1 font-mono text-slate-900 tabular-nums">
                      {submittedReceipt.estimatedBudget}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setSubmittedReceipt(null)}
                    className="rounded-md bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-blue-700"
                  >
                    Submit Another Inquiry
                  </button>
                  <button
                    type="button"
                    onClick={onOpenInquiryLog}
                    className="rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-blue-700"
                  >
                    View Inquiry Tracker ({inquiries.length})
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8"
              >
                {errorCount > 0 && (
                  <div
                    role="alert"
                    className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                  >
                    Please review and correct the {errorCount} highlighted{' '}
                    {errorCount === 1 ? 'field' : 'fields'} below before submitting.
                  </div>
                )}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                </div>

                <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-slate-500">
                    Direct review by MST Construction OPC Estimating Desk.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-800 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>Submit Project Inquiry</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
