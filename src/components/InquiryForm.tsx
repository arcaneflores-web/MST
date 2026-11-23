import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import type {
  InquiryFormInput,
  InquiryValidationErrors,
  PreferredContactMethod,
  SubmittedInquiry,
} from '../types/construction';
import { validateInquiryForm } from '../utils/inquiryLogic';

interface InquiryFormProps {
  idPrefix: string;
  preselectedServiceNote?: string | null;
  onSubmitInquiry: (input: InquiryFormInput) => SubmittedInquiry;
  onCancel?: () => void;
  submitLabel?: string;
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

export function InquiryForm({
  idPrefix,
  preselectedServiceNote = null,
  onSubmitInquiry,
  onCancel,
  submitLabel = 'Submit Project Inquiry',
}: InquiryFormProps) {
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

  if (submittedReceipt) {
    return (
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
          Your quotation request has been assigned to our estimating engineering desk in
          San Fernando, Pampanga. Please keep your reference number below for follow-ups.
        </p>

        <dl className="mt-6 grid grid-cols-1 gap-4 border-y border-slate-200 py-5 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs text-slate-500">Reference Number</dt>
            <dd className="mt-1 font-mono font-semibold text-slate-950 tabular-nums">
              {submittedReceipt.referenceCode}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Status</dt>
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

        <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setSubmittedReceipt(null)}
            className="rounded-md bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-blue-700"
          >
            Submit Another Inquiry
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
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
        <div>
          <label
            htmlFor={`${idPrefix}-fullName`}
            className="block text-xs font-semibold text-slate-800"
          >
            Full Name *
          </label>
          <input
            id={`${idPrefix}-fullName`}
            name="fullName"
            type="text"
            required
            value={formState.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="e.g., Juan Dela Cruz"
            aria-invalid={Boolean(errors.fullName)}
            className={`mt-1.5 w-full rounded-md border px-3.5 py-2.5 text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none ${
              errors.fullName
                ? 'border-red-500 bg-red-50/40 focus:border-red-600'
                : 'border-slate-300 bg-white focus:border-blue-700'
            }`}
          />
          {errors.fullName && (
            <p className="mt-1.5 text-xs font-medium text-red-700">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-companyName`}
            className="block text-xs font-semibold text-slate-800"
          >
            Company / Organization (Optional)
          </label>
          <input
            id={`${idPrefix}-companyName`}
            name="companyName"
            type="text"
            value={formState.companyName}
            onChange={(e) => handleChange('companyName', e.target.value)}
            placeholder="e.g., Pampanga Logistics Corp."
            className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-email`}
            className="block text-xs font-semibold text-slate-800"
          >
            Email Address *
          </label>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            required
            value={formState.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="name@company.com"
            aria-invalid={Boolean(errors.email)}
            className={`mt-1.5 w-full rounded-md border px-3.5 py-2.5 text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none ${
              errors.email
                ? 'border-red-500 bg-red-50/40 focus:border-red-600'
                : 'border-slate-300 bg-white focus:border-blue-700'
            }`}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs font-medium text-red-700">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-phone`}
            className="block text-xs font-semibold text-slate-800"
          >
            Mobile or Landline Number *
          </label>
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            required
            value={formState.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+63 919 000 0000"
            aria-invalid={Boolean(errors.phone)}
            className={`mt-1.5 w-full rounded-md border px-3.5 py-2.5 text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none ${
              errors.phone
                ? 'border-red-500 bg-red-50/40 focus:border-red-600'
                : 'border-slate-300 bg-white focus:border-blue-700'
            }`}
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs font-medium text-red-700">{errors.phone}</p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-preferredContact`}
            className="block text-xs font-semibold text-slate-800"
          >
            Preferred Contact Method
          </label>
          <select
            id={`${idPrefix}-preferredContact`}
            value={formState.preferredContact}
            onChange={(e) =>
              handleChange('preferredContact', e.target.value as PreferredContactMethod)
            }
            className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 focus:border-blue-700 focus:outline-none"
          >
            <option value="Email">Email</option>
            <option value="Mobile Call / SMS">Mobile Call / SMS</option>
            <option value="Viber / WhatsApp">Viber / WhatsApp</option>
          </select>
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-category`}
            className="block text-xs font-semibold text-slate-800"
          >
            Project Type *
          </label>
          <select
            id={`${idPrefix}-category`}
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

        <div>
          <label
            htmlFor={`${idPrefix}-location`}
            className="block text-xs font-semibold text-slate-800"
          >
            Project Site Location *
          </label>
          <input
            id={`${idPrefix}-location`}
            name="location"
            type="text"
            required
            value={formState.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="e.g., San Fernando, Pampanga"
            aria-invalid={Boolean(errors.location)}
            className={`mt-1.5 w-full rounded-md border px-3.5 py-2.5 text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none ${
              errors.location
                ? 'border-red-500 bg-red-50/40 focus:border-red-600'
                : 'border-slate-300 bg-white focus:border-blue-700'
            }`}
          />
          {errors.location && (
            <p className="mt-1.5 text-xs font-medium text-red-700">{errors.location}</p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-floorArea`}
            className="block text-xs font-semibold text-slate-800"
          >
            Estimated Floor Area (Optional)
          </label>
          <input
            id={`${idPrefix}-floorArea`}
            type="text"
            value={formState.estimatedFloorArea}
            onChange={(e) => handleChange('estimatedFloorArea', e.target.value)}
            placeholder="e.g., 1,200 sqm"
            className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-budget`}
            className="block text-xs font-semibold text-slate-800"
          >
            Estimated Budget Range
          </label>
          <select
            id={`${idPrefix}-budget`}
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

        <div>
          <label
            htmlFor={`${idPrefix}-start`}
            className="block text-xs font-semibold text-slate-800"
          >
            Target Mobilization Window
          </label>
          <select
            id={`${idPrefix}-start`}
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

        <div className="sm:col-span-2">
          <label
            htmlFor={`${idPrefix}-readiness`}
            className="block text-xs font-semibold text-slate-800"
          >
            Project Readiness
          </label>
          <select
            id={`${idPrefix}-readiness`}
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

        <div className="sm:col-span-2">
          <label
            htmlFor={`${idPrefix}-scope`}
            className="block text-xs font-semibold text-slate-800"
          >
            Project Scope, Lot / Floor Area &amp; Requirements *
          </label>
          <textarea
            id={`${idPrefix}-scope`}
            name="projectScope"
            rows={4}
            required
            value={formState.projectScope}
            onChange={(e) => handleChange('projectScope', e.target.value)}
            placeholder="Describe the proposed structure, approximate floor area in sqm, number of storeys, and whether architectural plans are already available..."
            aria-invalid={Boolean(errors.projectScope)}
            className={`mt-1.5 w-full rounded-md border px-3.5 py-2.5 text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none ${
              errors.projectScope
                ? 'border-red-500 bg-red-50/40 focus:border-red-600'
                : 'border-slate-300 bg-white focus:border-blue-700'
            }`}
          />
          {errors.projectScope && (
            <p className="mt-1.5 text-xs font-medium text-red-700">{errors.projectScope}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
            <input
              id={`${idPrefix}-privacyConsent`}
              type="checkbox"
              checked={formState.privacyConsent}
              onChange={(e) => handleChange('privacyConsent', e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-700"
            />
            <span>
              I consent to MST Construction OPC processing my submitted contact and project
              details strictly for engineering evaluation and quotation preparation. *
            </span>
          </label>
          {errors.privacyConsent && (
            <p className="mt-1.5 text-xs font-medium text-red-700">
              {errors.privacyConsent}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-800 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          <span>{submitLabel}</span>
        </button>
      </div>
    </form>
  );
}
