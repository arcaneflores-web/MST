import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { ProjectItem, TeamMember } from '../types/construction';
import { ProjectSchematic } from './ArchitecturalVisuals';
import { TeamAvatar } from './TeamAvatar';

interface ProjectModalProps {
  project: ProjectItem | null;
  initialImageIndex?: number;
  onClose: () => void;
  onRequestSimilar: (projectTitle: string) => void;
}

export function ProjectModal({
  project,
  initialImageIndex = 0,
  onClose,
  onRequestSimilar,
}: ProjectModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(initialImageIndex);

  useEffect(() => {
    setActiveImageIndex(initialImageIndex);
  }, [project?.id, initialImageIndex]);

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  const images = project?.images ?? [];
  const safeIndex =
    images.length > 0 ? Math.min(activeImageIndex, images.length - 1) : 0;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28, mass: 0.8 }}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <span className="font-mono text-xs font-medium text-slate-600">
            {project.code} · {project.status} {project.year}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project specifications"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-700 hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {images.length > 0 ? (
          <div className="border-b border-slate-200 bg-slate-950">
            <div className="relative aspect-video w-full overflow-hidden">
              <img
                src={images[safeIndex]}
                alt={`${project.title} site photo ${safeIndex + 1} of ${images.length}`}
                className="h-full w-full object-cover object-center"
              />

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1
                      )
                    }
                    aria-label="Previous project photo"
                    className="absolute top-1/2 left-3 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md border border-slate-700 bg-slate-950/75 text-white transition-colors hover:bg-slate-900"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev + 1) % images.length)
                    }
                    aria-label="Next project photo"
                    className="absolute top-1/2 right-3 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md border border-slate-700 bg-slate-950/75 text-white transition-colors hover:bg-slate-900"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </>
              )}

              <div className="absolute right-3 bottom-3 rounded bg-slate-950/80 px-2.5 py-1 font-mono text-[11px] font-medium text-white tabular-nums">
                {safeIndex + 1} / {images.length}
              </div>
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2 border-t border-slate-800 bg-slate-900 p-2.5 sm:grid-cols-10">
                {images.map((imgUrl, idx) => {
                  const isCurrent = idx === safeIndex;
                  return (
                    <button
                      key={`${idx}-${imgUrl.slice(0, 24)}`}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      aria-label={`View project photo ${idx + 1}`}
                      aria-current={isCurrent ? 'true' : undefined}
                      className={`overflow-hidden rounded border transition-opacity ${
                        isCurrent
                          ? 'border-blue-400 ring-2 ring-blue-500/70 opacity-100'
                          : 'border-slate-700 opacity-65 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`${project.title} thumbnail ${idx + 1}`}
                        className="h-11 w-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <ProjectSchematic type={project.schematic} code={project.code} />
        )}

        <div className="p-6 sm:p-8">
          <h3 id="project-modal-title" className="text-2xl font-bold text-slate-950">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            {project.category} · {project.clientSector} · {project.location}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-slate-200 py-4 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-xs text-slate-500">Scale / Floor Area</dt>
              <dd className="mt-0.5 font-mono font-semibold text-slate-950 tabular-nums">
                {project.floorArea}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Contract Duration</dt>
              <dd className="mt-0.5 font-mono font-semibold text-slate-950 tabular-nums">
                {project.duration}
              </dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="text-xs text-slate-500">Completion Status</dt>
              <dd className="mt-0.5 font-semibold text-blue-700">
                {project.status} ({project.year})
              </dd>
            </div>
          </dl>

          <p className="mt-5 text-sm leading-relaxed text-slate-700">{project.summary}</p>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h4 className="text-xs font-bold tracking-wide text-slate-900 uppercase">
                Engineering Highlights
              </h4>
              <ul className="mt-2.5 space-y-2 text-sm text-slate-700">
                {project.engineeringHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 bg-blue-700" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-wide text-slate-900 uppercase">
                Contract Deliverables
              </h4>
              <ul className="mt-2.5 space-y-2 text-sm text-slate-700">
                {project.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 bg-slate-400" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800">
            <strong className="text-slate-950">Verified Outcome: </strong>
            {project.outcomeMetric}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onRequestSimilar(project.title);
                onClose();
              }}
              className="rounded-md bg-blue-700 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Inquire About Similar Build
            </button>
          </div>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface TeamModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

export function TeamModal({ member, onClose }: TeamModalProps) {
  useEffect(() => {
    if (!member) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [member, onClose]);

  return (
    <AnimatePresence>
      {member && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="team-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28, mass: 0.8 }}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <TeamAvatar
              name={member.name}
              initials={member.initials}
              photoUrl={member.photoUrl}
              sizeClass="h-16 w-16"
              textSizeClass="text-lg"
              decorative
            />
            <div>
              <h3 id="team-modal-title" className="text-xl font-bold text-slate-950">
                {member.name}
              </h3>
              <p className="text-sm font-medium text-blue-700">{member.role}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={`Close profile for ${member.name}`}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-200 text-slate-700 hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <dl className="mt-6 space-y-2 border-y border-slate-200 py-4 text-sm">
          {member.licenseLabel && (
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Registration</dt>
              <dd className="font-mono text-right text-slate-900 tabular-nums">
                {member.licenseLabel}
              </dd>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Practice Tenure</dt>
            <dd className="font-mono text-right text-slate-900 tabular-nums">
              {member.experienceYears} Years
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Education</dt>
            <dd className="text-right text-slate-900">{member.education}</dd>
          </div>
        </dl>

        <p className="mt-5 text-sm leading-relaxed text-slate-700">{member.bio}</p>

        <div className="mt-5">
          <h4 className="text-xs font-bold tracking-wide text-slate-900 uppercase">
            Core Technical Specializations
          </h4>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
            {member.specializations.map((spec) => (
              <li key={spec} className="flex items-start gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 bg-blue-700" aria-hidden="true" />
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5">
          <h4 className="text-xs font-bold tracking-wide text-slate-900 uppercase">
            Assigned MST Projects
          </h4>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
            {member.notableProjects.map((proj) => (
              <li key={proj} className="flex items-start gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 bg-slate-400" aria-hidden="true" />
                <span>{proj}</span>
              </li>
            ))}
          </ul>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
