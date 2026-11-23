import { ArrowUpRight } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/companyData';
import type { TeamMember } from '../types/construction';

interface TeamSectionProps {
  onSelectMember: (member: TeamMember) => void;
}

export function TeamSection({ onSelectMember }: TeamSectionProps) {
  return (
    <section
      id="team"
      className="scroll-mt-16 border-b border-slate-200 bg-slate-50 py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-blue-700">
              Engineering Leadership &amp; Technical Team
            </p>
            <h2
              className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Licensed Professionals Overseeing Every Job Site
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-600">
            Select any team profile to inspect PRC licensing credentials, educational
            background, and delivered projects.
          </p>
        </div>

        {/* 3-in-a-row desktop grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TEAM_MEMBERS.map((member) => (
            <article
              key={member.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 transition-colors duration-150 hover:border-slate-400"
            >
              <div>
                <div className="flex items-center gap-4">
                  {/* Consistent 64px monogram block with clean architectural framing */}
                  <div
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-900 font-display text-lg font-bold tracking-tight text-white"
                    aria-hidden="true"
                  >
                    {member.initials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-slate-950">{member.name}</h3>
                    <p className="mt-0.5 text-sm font-medium text-blue-700">{member.role}</p>
                  </div>
                </div>

                {/* Unboxed metadata with typographic separator */}
                <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                  <span>{member.discipline}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">
                    {member.experienceYears} yrs experience
                  </span>
                </div>

                <p className="mt-2 font-mono text-xs text-slate-700 tabular-nums">
                  {member.licenseLabel}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">{member.bio}</p>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-4">
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
