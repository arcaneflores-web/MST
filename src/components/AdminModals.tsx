import { useEffect, useState, type FormEvent } from 'react';
import { Save, X } from 'lucide-react';
import type {
  CredentialFormInput,
  CredentialItem,
  CredentialValidationErrors,
  TeamFormInput,
  TeamMember,
  TeamValidationErrors,
} from '../types/construction';
import { validateCredentialForm, validateTeamForm } from '../utils/inquiryLogic';

interface TeamFormModalProps {
  open: boolean;
  editingMember: TeamMember | null;
  onClose: () => void;
  onSaveMember: (input: TeamFormInput, existingMember: TeamMember | null) => void;
}

const DEFAULT_TEAM_FORM: TeamFormInput = {
  name: '',
  initials: '',
  role: '',
  discipline: '',
  licenseLabel: '',
  experienceYears: '5',
  education: '',
  bio: '',
  specializationsText: '',
  notableProjectsText: '',
};

export function TeamFormModal({
  open,
  editingMember,
  onClose,
  onSaveMember,
}: TeamFormModalProps) {
  const [formState, setFormState] = useState<TeamFormInput>(DEFAULT_TEAM_FORM);
  const [errors, setErrors] = useState<TeamValidationErrors>({});

  useEffect(() => {
    if (!open) return;
    if (editingMember) {
      setFormState({
        name: editingMember.name,
        initials: editingMember.initials,
        role: editingMember.role,
        discipline: editingMember.discipline,
        licenseLabel: editingMember.licenseLabel,
        experienceYears: String(editingMember.experienceYears),
        education: editingMember.education,
        bio: editingMember.bio,
        specializationsText: editingMember.specializations.join('\n'),
        notableProjectsText: editingMember.notableProjects.join('\n'),
      });
    } else {
      setFormState(DEFAULT_TEAM_FORM);
    }
    setErrors({});
  }, [open, editingMember]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleChange = (field: keyof TeamFormInput, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (field in errors) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof TeamValidationErrors];
        return next;
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateTeamForm(formState);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    onSaveMember(formState, editingMember);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="team-form-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">
          <div>
            <p className="text-xs font-medium text-blue-700">
              Team Directory · Admin Portal
            </p>
            <h2
              id="team-form-modal-title"
              className="mt-0.5 text-lg font-bold tracking-tight text-slate-950 sm:text-xl"
            >
              {editingMember ? `Edit Profile: ${editingMember.name}` : 'Add Team Member'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close team form dialog"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-200 text-slate-700 hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto p-6 sm:px-8 sm:py-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="team-name" className="block text-xs font-semibold text-slate-800">
                  Full Name &amp; Title *
                </label>
                <input
                  id="team-name"
                  type="text"
                  value={formState.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="e.g., Engr. Carlo D. Rivera, CE"
                  className={`mt-1.5 w-full rounded-md border px-3.5 py-2.5 text-sm text-slate-950 focus:outline-none ${
                    errors.name ? 'border-red-500 bg-red-50/40' : 'border-slate-300 bg-white focus:border-blue-700'
                  }`}
                />
                {errors.name && <p className="mt-1 text-xs text-red-700">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="team-role" className="block text-xs font-semibold text-slate-800">
                  Position / Role *
                </label>
                <input
                  id="team-role"
                  type="text"
                  value={formState.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  placeholder="e.g., Structural Project Engineer"
                  className={`mt-1.5 w-full rounded-md border px-3.5 py-2.5 text-sm text-slate-950 focus:outline-none ${
                    errors.role ? 'border-red-500 bg-red-50/40' : 'border-slate-300 bg-white focus:border-blue-700'
                  }`}
                />
                {errors.role && <p className="mt-1 text-xs text-red-700">{errors.role}</p>}
              </div>

              <div>
                <label htmlFor="team-discipline" className="block text-xs font-semibold text-slate-800">
                  Technical Discipline *
                </label>
                <input
                  id="team-discipline"
                  type="text"
                  value={formState.discipline}
                  onChange={(e) => handleChange('discipline', e.target.value)}
                  placeholder="e.g., Structural Engineering"
                  className={`mt-1.5 w-full rounded-md border px-3.5 py-2.5 text-sm text-slate-950 focus:outline-none ${
                    errors.discipline ? 'border-red-500 bg-red-50/40' : 'border-slate-300 bg-white focus:border-blue-700'
                  }`}
                />
                {errors.discipline && <p className="mt-1 text-xs text-red-700">{errors.discipline}</p>}
              </div>

              <div>
                <label htmlFor="team-license" className="block text-xs font-semibold text-slate-800">
                  License / Accreditation *
                </label>
                <input
                  id="team-license"
                  type="text"
                  value={formState.licenseLabel}
                  onChange={(e) => handleChange('licenseLabel', e.target.value)}
                  placeholder="e.g., PRC Civil Engineer · #0142091"
                  className={`mt-1.5 w-full rounded-md border px-3.5 py-2.5 text-sm text-slate-950 focus:outline-none ${
                    errors.licenseLabel ? 'border-red-500 bg-red-50/40' : 'border-slate-300 bg-white focus:border-blue-700'
                  }`}
                />
                {errors.licenseLabel && <p className="mt-1 text-xs text-red-700">{errors.licenseLabel}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="team-years" className="block text-xs font-semibold text-slate-800">
                    Years Exp. *
                  </label>
                  <input
                    id="team-years"
                    type="number"
                    min={0}
                    max={65}
                    value={formState.experienceYears}
                    onChange={(e) => handleChange('experienceYears', e.target.value)}
                    className={`mt-1.5 w-full rounded-md border px-3 py-2.5 font-mono text-sm text-slate-950 tabular-nums focus:outline-none ${
                      errors.experienceYears ? 'border-red-500 bg-red-50/40' : 'border-slate-300 bg-white focus:border-blue-700'
                    }`}
                  />
                </div>
                <div>
                  <label htmlFor="team-initials" className="block text-xs font-semibold text-slate-800">
                    Initials
                  </label>
                  <input
                    id="team-initials"
                    type="text"
                    maxLength={3}
                    value={formState.initials}
                    onChange={(e) => handleChange('initials', e.target.value)}
                    placeholder="Auto"
                    className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 font-mono text-sm text-slate-950 focus:border-blue-700 focus:outline-none"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="team-education" className="block text-xs font-semibold text-slate-800">
                  Educational Background
                </label>
                <input
                  id="team-education"
                  type="text"
                  value={formState.education}
                  onChange={(e) => handleChange('education', e.target.value)}
                  placeholder="e.g., B.S. Civil Engineering, Holy Angel University"
                  className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 focus:border-blue-700 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="team-bio" className="block text-xs font-semibold text-slate-800">
                  Professional Summary *
                </label>
                <textarea
                  id="team-bio"
                  rows={3}
                  value={formState.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  placeholder="Describe field oversight responsibilities, technical strengths, and site leadership..."
                  className={`mt-1.5 w-full rounded-md border px-3.5 py-2.5 text-sm text-slate-950 focus:outline-none ${
                    errors.bio ? 'border-red-500 bg-red-50/40' : 'border-slate-300 bg-white focus:border-blue-700'
                  }`}
                />
                {errors.bio && <p className="mt-1 text-xs text-red-700">{errors.bio}</p>}
              </div>

              <div>
                <label htmlFor="team-specs" className="block text-xs font-semibold text-slate-800">
                  Specializations (1 per line)
                </label>
                <textarea
                  id="team-specs"
                  rows={3}
                  value={formState.specializationsText}
                  onChange={(e) => handleChange('specializationsText', e.target.value)}
                  placeholder="Structural Framing&#10;Foundation Engineering"
                  className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 focus:border-blue-700 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="team-projects" className="block text-xs font-semibold text-slate-800">
                  Assigned Projects (1 per line)
                </label>
                <textarea
                  id="team-projects"
                  rows={3}
                  value={formState.notableProjectsText}
                  onChange={(e) => handleChange('notableProjectsText', e.target.value)}
                  placeholder="McArthur Highway Commercial Arcade"
                  className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 focus:border-blue-700 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
            >
              <Save className="h-4 w-4" aria-hidden="true" />
              <span>{editingMember ? 'Save Member Changes' : 'Add Team Member'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface CredentialFormModalProps {
  open: boolean;
  editingCredential: CredentialItem | null;
  onClose: () => void;
  onSaveCredential: (
    input: CredentialFormInput,
    existingCredential: CredentialItem | null
  ) => void;
}

const DEFAULT_CREDENTIAL_FORM: CredentialFormInput = {
  code: '',
  title: '',
  issuingBody: '',
  classification: '',
  description: '',
  documentReference: '',
};

export function CredentialFormModal({
  open,
  editingCredential,
  onClose,
  onSaveCredential,
}: CredentialFormModalProps) {
  const [formState, setFormState] = useState<CredentialFormInput>(
    DEFAULT_CREDENTIAL_FORM
  );
  const [errors, setErrors] = useState<CredentialValidationErrors>({});

  useEffect(() => {
    if (!open) return;
    if (editingCredential) {
      setFormState({
        code: editingCredential.code,
        title: editingCredential.title,
        issuingBody: editingCredential.issuingBody,
        classification: editingCredential.classification,
        description: editingCredential.description,
        documentReference: editingCredential.documentReference ?? '',
      });
    } else {
      setFormState(DEFAULT_CREDENTIAL_FORM);
    }
    setErrors({});
  }, [open, editingCredential]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleChange = (field: keyof CredentialFormInput, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (field in errors) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof CredentialValidationErrors];
        return next;
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateCredentialForm(formState);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    onSaveCredential(formState, editingCredential);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="credential-form-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="flex max-h-[88vh] w-full max-w-xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">
          <div>
            <p className="text-xs font-medium text-blue-700">
              Credentials &amp; Documents · Admin Portal
            </p>
            <h2
              id="credential-form-modal-title"
              className="mt-0.5 text-lg font-bold tracking-tight text-slate-950 sm:text-xl"
            >
              {editingCredential
                ? `Update Credential (${editingCredential.code})`
                : 'Add Corporate Credential'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close credential form dialog"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-200 text-slate-700 hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto p-6 sm:px-8 sm:py-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="cred-code" className="block text-xs font-semibold text-slate-800">
                  Short Code *
                </label>
                <input
                  id="cred-code"
                  type="text"
                  value={formState.code}
                  onChange={(e) => handleChange('code', e.target.value)}
                  placeholder="e.g., PCAB, PRC, ISO"
                  className={`mt-1.5 w-full rounded-md border px-3.5 py-2.5 font-mono text-sm text-slate-950 focus:outline-none ${
                    errors.code ? 'border-red-500 bg-red-50/40' : 'border-slate-300 bg-white focus:border-blue-700'
                  }`}
                />
                {errors.code && <p className="mt-1 text-xs text-red-700">{errors.code}</p>}
              </div>

              <div>
                <label htmlFor="cred-docref" className="block text-xs font-semibold text-slate-800">
                  Document / Registry Ref.
                </label>
                <input
                  id="cred-docref"
                  type="text"
                  value={formState.documentReference}
                  onChange={(e) => handleChange('documentReference', e.target.value)}
                  placeholder="e.g., Cert. No. 2026-R3-092"
                  className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 font-mono text-sm text-slate-950 focus:border-blue-700 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="cred-title" className="block text-xs font-semibold text-slate-800">
                  Credential / License Title *
                </label>
                <input
                  id="cred-title"
                  type="text"
                  value={formState.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="e.g., PCAB Licensed General Contractor"
                  className={`mt-1.5 w-full rounded-md border px-3.5 py-2.5 text-sm text-slate-950 focus:outline-none ${
                    errors.title ? 'border-red-500 bg-red-50/40' : 'border-slate-300 bg-white focus:border-blue-700'
                  }`}
                />
                {errors.title && <p className="mt-1 text-xs text-red-700">{errors.title}</p>}
              </div>

              <div>
                <label htmlFor="cred-body" className="block text-xs font-semibold text-slate-800">
                  Issuing Authority *
                </label>
                <input
                  id="cred-body"
                  type="text"
                  value={formState.issuingBody}
                  onChange={(e) => handleChange('issuingBody', e.target.value)}
                  placeholder="e.g., Philippine Contractors Accreditation Board"
                  className={`mt-1.5 w-full rounded-md border px-3.5 py-2.5 text-sm text-slate-950 focus:outline-none ${
                    errors.issuingBody ? 'border-red-500 bg-red-50/40' : 'border-slate-300 bg-white focus:border-blue-700'
                  }`}
                />
                {errors.issuingBody && <p className="mt-1 text-xs text-red-700">{errors.issuingBody}</p>}
              </div>

              <div>
                <label htmlFor="cred-class" className="block text-xs font-semibold text-slate-800">
                  Classification *
                </label>
                <input
                  id="cred-class"
                  type="text"
                  value={formState.classification}
                  onChange={(e) => handleChange('classification', e.target.value)}
                  placeholder="e.g., General Building & Engineering"
                  className={`mt-1.5 w-full rounded-md border px-3.5 py-2.5 text-sm text-slate-950 focus:outline-none ${
                    errors.classification ? 'border-red-500 bg-red-50/40' : 'border-slate-300 bg-white focus:border-blue-700'
                  }`}
                />
                {errors.classification && (
                  <p className="mt-1 text-xs text-red-700">{errors.classification}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="cred-desc" className="block text-xs font-semibold text-slate-800">
                  Scope &amp; Compliance Description *
                </label>
                <textarea
                  id="cred-desc"
                  rows={3}
                  value={formState.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Summarize authorization scope and regulatory adherence..."
                  className={`mt-1.5 w-full rounded-md border px-3.5 py-2.5 text-sm text-slate-950 focus:outline-none ${
                    errors.description ? 'border-red-500 bg-red-50/40' : 'border-slate-300 bg-white focus:border-blue-700'
                  }`}
                />
                {errors.description && (
                  <p className="mt-1 text-xs text-red-700">{errors.description}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
            >
              <Save className="h-4 w-4" aria-hidden="true" />
              <span>{editingCredential ? 'Save Credential Changes' : 'Add Credential'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
