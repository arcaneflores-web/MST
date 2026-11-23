import { ArrowUpRight } from 'lucide-react';
import type { TeamMember } from '../types/construction';
import { SectionHeaderBar } from './SectionDivider';

interface TeamSectionProps {
  members: TeamMember[];
  onSelectMember: (member: TeamMember) => void;
}

export function TeamSection({ members, onSelectMember }: TeamSectionProps) {
  return (
    <section
      id="team"
      className="scroll-mt-16 border-b-2 border-slate-200 bg-slate-100/70 py-10 lg:py-12"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeaderBar
          sectionNumber="01"
          eyebrow="Engineering Leadership & Technical Team"
          title="Licensed Professionals Overseeing Every Job Site"
          description="Select any team profile to inspect PRC licensing credentials, educational background, and delivered projects."
        />

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <article
              key={member.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 transition-colors duration-150 hover:border-slate-400"
            >
              <div>
                <div className="flex items-center gap-3.5">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-900 font-display text-base font-bold tracking-tight text-white"
                    aria-hidden="true"
                  >
                    {member.initials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-slate-950">{member.name}</h3>
                    <p className="mt-0.5 text-xs font-medium text-blue-700">{member.role}</p>
                  </div>
                </div>

                <div className="mt-3.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                  <span>{member.discipline}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">
                    {member.experienceYears} yrs experience
                  </span>
                </div>

                <p className="mt-1.5 font-mono text-xs text-slate-700 tabular-nums">
                  {member.licenseLabel}
                </p>

                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{member.bio}</p>
              </div>

              <div className="mt-4 border-t border-slate-100 pt-3.5">
                <button
                  type="button"
                  onClick={() => onSelectMember(member)}
                  className="inline-flex w-full items-center justify-between text-xs font-semibold text-slate-900 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-blue-700"
                >
                  <span>View Credentials &amp; Track Record</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
