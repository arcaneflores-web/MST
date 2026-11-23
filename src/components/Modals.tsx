import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { ProjectItem, TeamMember } from '../types/construction';
import { ProjectSchematic } from './ArchitecturalVisuals';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onRequestSimilar: (projectTitle: string) => void;
}

export function ProjectModal({
  project,
  onClose,
  onRequestSimilar,
}: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
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

        <ProjectSchematic type={project.schematic} code={project.code} />

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
      </div>
    </div>
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

  if (!member) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="team-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-slate-900 font-display text-lg font-bold text-white"
              aria-hidden="true"
            >
              {member.initials}
            </div>
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
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Registration</dt>
            <dd className="font-mono text-right text-slate-900 tabular-nums">
              {member.licenseLabel}
            </dd>
          </div>
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
      </div>
    </div>
  );
}
