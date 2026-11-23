import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { ImagePlus, Save, Trash2, Upload, X } from 'lucide-react';
import type {
  ProjectCategory,
  ProjectFormInput,
  ProjectItem,
  ProjectStatus,
  ProjectValidationErrors,
  VisualSchematicType,
} from '../types/construction';
import { processProjectPhotoUpload } from '../utils/imageUpload';
import { MAX_PROJECT_IMAGES, validateProjectForm } from '../utils/inquiryLogic';

interface ProjectFormModalProps {
  open: boolean;
  editingProject: ProjectItem | null;
  onClose: () => void;
  onSaveProject: (input: ProjectFormInput, existingProject: ProjectItem | null) => void;
}

const DEFAULT_PROJECT_FORM: ProjectFormInput = {
  code: '',
  title: '',
  category: 'Commercial',
  status: 'Ongoing',
  location: '',
  year: '2026',
  clientSector: '',
  floorArea: '',
  duration: '',
  summary: '',
  outcomeMetric: '',
  schematic: 'commercial-hub',
  highlightsText: '',
  deliverablesText: '',
  images: [],
  featured: false,
};

const SCHEMATIC_BY_CATEGORY: Record<ProjectCategory, VisualSchematicType> = {
  Commercial: 'commercial-hub',
  Industrial: 'steel-warehouse',
  Infrastructure: 'road-drainage',
  Residential: 'modern-residence',
};

export function ProjectFormModal({
  open,
  editingProject,
  onClose,
  onSaveProject,
}: ProjectFormModalProps) {
  const [formState, setFormState] = useState<ProjectFormInput>(DEFAULT_PROJECT_FORM);
  const [errors, setErrors] = useState<ProjectValidationErrors>({});
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [imageUploadMessage, setImageUploadMessage] = useState('');
  const [imageUploadError, setImageUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    if (editingProject) {
      setFormState({
        code: editingProject.code,
        title: editingProject.title,
        category: editingProject.category,
        status: editingProject.status,
        location: editingProject.location,
        year: editingProject.year,
        clientSector: editingProject.clientSector,
        floorArea: editingProject.floorArea,
        duration: editingProject.duration,
        summary: editingProject.summary,
        outcomeMetric: editingProject.outcomeMetric,
        schematic: editingProject.schematic,
        highlightsText: editingProject.engineeringHighlights.join('\n'),
        deliverablesText: editingProject.deliverables.join('\n'),
        images: editingProject.images ? [...editingProject.images] : [],
        featured: Boolean(editingProject.featured),
      });
    } else {
      setFormState(DEFAULT_PROJECT_FORM);
    }
    setErrors({});
    setIsUploadingImages(false);
    setImageUploadMessage('');
    setImageUploadError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [open, editingProject]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleChange = (
    field: keyof ProjectFormInput,
    value: string | boolean | string[]
  ) => {
    setFormState((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'category' && !editingProject && typeof value === 'string') {
        next.schematic = SCHEMATIC_BY_CATEGORY[value as ProjectCategory];
      }
      return next;
    });
    if (field in errors) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof ProjectValidationErrors];
        return next;
      });
    }
  };

  const handleProjectImagesChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    if (selectedFiles.length === 0) return;

    setImageUploadError('');
    setImageUploadMessage('');

    const remainingSlots = MAX_PROJECT_IMAGES - formState.images.length;
    if (remainingSlots <= 0) {
      setImageUploadError(
        `Maximum of ${MAX_PROJECT_IMAGES} images per project reached. Remove an existing photo before uploading another.`
      );
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const filesToProcess = selectedFiles.slice(0, remainingSlots);
    const skippedCount = selectedFiles.length - filesToProcess.length;

    setIsUploadingImages(true);
    try {
      const uploaded = await Promise.all(
        filesToProcess.map((file) => processProjectPhotoUpload(file))
      );

      setFormState((prev) => {
        const available = Math.max(0, MAX_PROJECT_IMAGES - prev.images.length);
        const accepted = uploaded.slice(0, available);
        return { ...prev, images: [...prev.images, ...accepted] };
      });
      setErrors((prev) => {
        if (!prev.images) return prev;
        const next = { ...prev };
        delete next.images;
        return next;
      });
      if (skippedCount > 0) {
        setImageUploadMessage(
          `Added ${uploaded.length} image${uploaded.length === 1 ? '' : 's'}. Skipped ${skippedCount} extra file${skippedCount === 1 ? '' : 's'} to stay within the ${MAX_PROJECT_IMAGES}-image limit.`
        );
      }
    } catch (err) {
      setImageUploadError(
        err instanceof Error ? err.message : 'Unable to process one of the selected images.'
      );
    } finally {
      setIsUploadingImages(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImageUploadError('');
    setImageUploadMessage('');
    handleChange(
      'images',
      formState.images.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSetCoverImage = (indexToPromote: number) => {
    if (indexToPromote <= 0 || indexToPromote >= formState.images.length) return;
    const selected = formState.images[indexToPromote];
    const reordered = [
      selected,
      ...formState.images.filter((_, index) => index !== indexToPromote),
    ];
    handleChange('images', reordered);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateProjectForm(formState);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onSaveProject(formState, editingProject);
    onClose();
  };

  const errorCount = Object.keys(errors).length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-form-modal-title"
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
              {editingProject
                ? `Portfolio Manager · ${editingProject.code}`
                : 'Portfolio Manager · MST Construction OPC'}
            </p>
            <h2
              id="project-form-modal-title"
              className="mt-0.5 text-lg font-bold tracking-tight text-slate-950 sm:text-xl"
            >
              {editingProject
                ? `Edit Project: ${editingProject.title}`
                : 'Add New Construction Project'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project form dialog"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-200 text-slate-700 hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto p-6 sm:px-8 sm:py-6">
          {errorCount > 0 && (
            <div
              role="alert"
              className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            >
              Please review the {errorCount} highlighted{' '}
              {errorCount === 1 ? 'field' : 'fields'} below before saving.
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2 rounded-lg border border-slate-200 bg-slate-50/80 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <ImagePlus className="h-4 w-4 text-blue-700" aria-hidden="true" />
                    <p className="text-xs font-bold text-slate-900">
                      Project Site Photos ({formState.images.length} / {MAX_PROJECT_IMAGES})
                    </p>
                  </div>
                  <p className="mt-1 text-xs text-slate-600">
                    Upload up to {MAX_PROJECT_IMAGES} photos showing completed or ongoing site
                    progress. Photo #1 is used as the portfolio card cover.
                  </p>
                </div>

                <div className="shrink-0">
                  <input
                    ref={fileInputRef}
                    id="project-images-upload"
                    type="file"
                    multiple
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    disabled={isUploadingImages || formState.images.length >= MAX_PROJECT_IMAGES}
                    onChange={handleProjectImagesChange}
                    aria-label="Upload project photos"
                    className="sr-only"
                  />
                  <label
                    htmlFor="project-images-upload"
                    className={`inline-flex items-center gap-1.5 rounded-md border px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                      formState.images.length >= MAX_PROJECT_IMAGES
                        ? 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400'
                        : 'cursor-pointer border-slate-300 bg-white text-slate-900 hover:border-blue-700 hover:text-blue-700'
                    }`}
                  >
                    <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>
                      {isUploadingImages
                        ? 'Processing Photos...'
                        : formState.images.length >= MAX_PROJECT_IMAGES
                          ? 'Maximum 10 Photos Reached'
                          : 'Upload Project Photos'}
                    </span>
                  </label>
                </div>
              </div>

              {imageUploadMessage && (
                <p role="status" className="mt-2.5 text-xs font-medium text-blue-700">
                  {imageUploadMessage}
                </p>
              )}

              {(imageUploadError || errors.images) && (
                <p role="alert" className="mt-2.5 text-xs font-medium text-red-700">
                  {imageUploadError || errors.images}
                </p>
              )}

              {formState.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
                  {formState.images.map((imgSrc, index) => (
                    <div
                      key={`${index}-${imgSrc.slice(0, 32)}`}
                      className="group relative overflow-hidden rounded-md border border-slate-200 bg-white"
                    >
                      <img
                        src={imgSrc}
                        alt={`Project upload ${index + 1}`}
                        className="h-20 w-full object-cover"
                      />
                      <div className="flex items-center justify-between border-t border-slate-100 px-1.5 py-1 text-[10px]">
                        {index === 0 ? (
                          <span className="font-bold text-blue-700">Cover</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSetCoverImage(index)}
                            className="font-semibold text-slate-600 hover:text-blue-700"
                          >
                            Set Cover
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          aria-label={`Remove project photo ${index + 1}`}
                          className="inline-flex h-5 w-5 items-center justify-center rounded text-slate-500 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="proj-title"
                className="block text-xs font-semibold text-slate-800"
              >
                Project Name / Title *
              </label>
              <input
                id="proj-title"
                type="text"
                required
                value={formState.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g., Sto. Tomas Logistics & Warehouse Annex"
                className={`mt-1.5 w-full rounded-md border px-3.5 py-2.5 text-sm text-slate-950 focus:outline-none ${
                  errors.title
                    ? 'border-red-500 bg-red-50/40'
                    : 'border-slate-300 bg-white focus:border-blue-700'
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-xs font-medium text-red-700">{errors.title}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="proj-code"
                className="block text-xs font-semibold text-slate-800"
              >
                Project Code <span className="font-normal text-slate-500">(optional on new)</span>
              </label>
              <input
                id="proj-code"
                type="text"
                value={formState.code ?? ''}
                onChange={(e) => handleChange('code', e.target.value)}
                placeholder="Auto-generated (e.g., MST-COM-025)"
                className={`mt-1.5 w-full rounded-md border px-3.5 py-2.5 font-mono text-sm uppercase text-slate-950 focus:outline-none ${
                  errors.code
                    ? 'border-red-500 bg-red-50/40'
                    : 'border-slate-300 bg-white focus:border-blue-700'
                }`}
              />
              {errors.code && (
                <p className="mt-1 text-xs font-medium text-red-700">{errors.code}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="proj-category"
                className="block text-xs font-semibold text-slate-800"
              >
                Sector / Category *
              </label>
              <select
                id="proj-category"
                value={formState.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 focus:border-blue-700 focus:outline-none"
              >
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Residential">Residential</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="proj-status"
                className="block text-xs font-semibold text-slate-800"
              >
                Project Status *
              </label>
              <select
                id="proj-status"
                value={formState.status}
                onChange={(e) => handleChange('status', e.target.value as ProjectStatus)}
                className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 focus:border-blue-700 focus:outline-none"
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="proj-location"
                className="block text-xs font-semibold text-slate-800"
              >
                Project Location *
              </label>
              <input
                id="proj-location"
                type="text"
                required
                value={formState.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="e.g., San Fernando, Pampanga"
                className={`mt-1.5 w-full rounded-md border px-3.5 py-2.5 text-sm text-slate-950 focus:outline-none ${
                  errors.location
                    ? 'border-red-500 bg-red-50/40'
                    : 'border-slate-300 bg-white focus:border-blue-700'
                }`}
              />
              {errors.location && (
                <p className="mt-1 text-xs font-medium text-red-700">{errors.location}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="proj-year"
                className="block text-xs font-semibold text-slate-800"
              >
                Project Year *
              </label>
              <input
                id="proj-year"
                type="text"
                required
                value={formState.year}
                onChange={(e) => handleChange('year', e.target.value)}
                placeholder="2026"
                className={`mt-1.5 w-full rounded-md border px-3.5 py-2.5 font-mono text-sm text-slate-950 tabular-nums focus:outline-none ${
                  errors.year
                    ? 'border-red-500 bg-red-50/40'
                    : 'border-slate-300 bg-white focus:border-blue-700'
                }`}
              />
              {errors.year && (
                <p className="mt-1 text-xs font-medium text-red-700">{errors.year}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="proj-floorArea"
                className="block text-xs font-semibold text-slate-800"
              >
                Floor Area / Scale *
              </label>
              <input
                id="proj-floorArea"
                type="text"
                required
                value={formState.floorArea}
                onChange={(e) => handleChange('floorArea', e.target.value)}
                placeholder="e.g., 1,650 sqm"
                className={`mt-1.5 w-full rounded-md border px-3.5 py-2.5 text-sm text-slate-950 focus:outline-none ${
                  errors.floorArea
                    ? 'border-red-500 bg-red-50/40'
                    : 'border-slate-300 bg-white focus:border-blue-700'
                }`}
              />
              {errors.floorArea && (
                <p className="mt-1 text-xs font-medium text-red-700">{errors.floorArea}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="proj-duration"
                className="block text-xs font-semibold text-slate-800"
              >
                Contract Duration / Progress *
              </label>
              <input
                id="proj-duration"
                type="text"
                required
                value={formState.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
                placeholder="e.g., 8 Months (45% Complete)"
                className={`mt-1.5 w-full rounded-md border px-3.5 py-2.5 text-sm text-slate-950 focus:outline-none ${
                  errors.duration
                    ? 'border-red-500 bg-red-50/40'
                    : 'border-slate-300 bg-white focus:border-blue-700'
                }`}
              />
              {errors.duration && (
                <p className="mt-1 text-xs font-medium text-red-700">{errors.duration}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="proj-sector"
                className="block text-xs font-semibold text-slate-800"
              >
                Client Sector
              </label>
              <input
                id="proj-sector"
                type="text"
                value={formState.clientSector}
                onChange={(e) => handleChange('clientSector', e.target.value)}
                placeholder="e.g., Retail & Office Leasing"
                className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 focus:border-blue-700 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="proj-schematic"
                className="block text-xs font-semibold text-slate-800"
              >
                Blueprint Schematic Style
              </label>
              <select
                id="proj-schematic"
                value={formState.schematic}
                onChange={(e) => handleChange('schematic', e.target.value)}
                className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 focus:border-blue-700 focus:outline-none"
              >
                <option value="commercial-hub">Multi-Storey Commercial Frame</option>
                <option value="steel-warehouse">Clear-Span Steel Warehouse</option>
                <option value="road-drainage">Roadway &amp; Box Culvert Section</option>
                <option value="medical-clinic">Clinical / Institutional Facility</option>
                <option value="modern-residence">Modern Tropical Residence</option>
                <option value="office-fitout">Interior Floor Plan &amp; Fit-Out</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="proj-summary"
                className="block text-xs font-semibold text-slate-800"
              >
                Project Summary &amp; Scope *
              </label>
              <textarea
                id="proj-summary"
                rows={3}
                required
                value={formState.summary}
                onChange={(e) => handleChange('summary', e.target.value)}
                placeholder="Describe structural system, floor count, MEPFS integration, and key site works..."
                className={`mt-1.5 w-full rounded-md border px-3.5 py-2.5 text-sm text-slate-950 focus:outline-none ${
                  errors.summary
                    ? 'border-red-500 bg-red-50/40'
                    : 'border-slate-300 bg-white focus:border-blue-700'
                }`}
              />
              {errors.summary && (
                <p className="mt-1 text-xs font-medium text-red-700">{errors.summary}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="proj-outcome"
                className="block text-xs font-semibold text-slate-800"
              >
                Key Outcome / Milestone Note
              </label>
              <input
                id="proj-outcome"
                type="text"
                value={formState.outcomeMetric}
                onChange={(e) => handleChange('outcomeMetric', e.target.value)}
                placeholder="e.g., Structural slab poured on schedule with zero safety incidents"
                className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 focus:border-blue-700 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="proj-highlights"
                className="block text-xs font-semibold text-slate-800"
              >
                Engineering Highlights (1 per line)
              </label>
              <textarea
                id="proj-highlights"
                rows={3}
                value={formState.highlightsText}
                onChange={(e) => handleChange('highlightsText', e.target.value)}
                placeholder="Seismic Zone 4 ductile frame&#10;Elevated flood datum"
                className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 focus:border-blue-700 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="proj-deliverables"
                className="block text-xs font-semibold text-slate-800"
              >
                Deliverables (1 per line)
              </label>
              <textarea
                id="proj-deliverables"
                rows={3}
                value={formState.deliverablesText}
                onChange={(e) => handleChange('deliverablesText', e.target.value)}
                placeholder="Design-Build Construction&#10;MEPFS Installation"
                className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 focus:border-blue-700 focus:outline-none"
              />
            </div>


            <div className="sm:col-span-2 pt-1">
              <label className="flex items-center gap-2.5 text-xs font-medium text-slate-800 cursor-pointer">
                <input
                  id="proj-featured"
                  type="checkbox"
                  checked={Boolean(formState.featured)}
                  onChange={(e) => handleChange('featured', e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-700"
                />
                <span>Feature this project on the public Homepage preview</span>
              </label>
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
              disabled={isUploadingImages}
              className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
            >
              <Save className="h-4 w-4" aria-hidden="true" />
              <span>{editingProject ? 'Save Project Update' : 'Add Project to Portfolio'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
