import { motion } from 'motion/react';
import { Eye } from 'lucide-react';
import type { TeamMember } from '../types/construction';
import { SectionHeaderBar } from './SectionDivider';
import { TeamAvatar } from './TeamAvatar';
import { getScrollCardMotionProps } from './ScrollReveal';

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
        />

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member, idx) => (
            <motion.article
              key={member.id}
              {...getScrollCardMotionProps(idx % 3, 0.06)}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-blue-600 hover:shadow-lg"
            >
              <div className="flex flex-1 flex-col">
                <div className="flex items-start gap-3.5">
                  <TeamAvatar
                    name={member.name}
                    initials={member.initials}
                    photoUrl={member.photoUrl}
                    sizeClass="h-14 w-14"
                    textSizeClass="text-base"
                    decorative
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="min-h-[2.75rem] line-clamp-2 text-base font-bold leading-snug text-slate-950 transition-colors duration-200 group-hover:text-blue-700">
                      {member.name}
                    </h3>
                    <p className="mt-0.5 min-h-[2rem] line-clamp-2 text-xs font-medium leading-snug text-blue-700">
                      {member.role}
                    </p>
                  </div>
                </div>

                <div className="mt-3.5 flex items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs text-slate-500">
                  <span className="min-w-0 truncate">{member.discipline}</span>
                  <span className="shrink-0 font-mono tabular-nums">
                    {member.experienceYears} yrs exp.
                  </span>
                </div>

                <div className="mt-1.5 min-h-[1.25rem]">
                  {member.licenseLabel ? (
                    <p className="truncate font-mono text-xs text-slate-700 tabular-nums">
                      {member.licenseLabel}
                    </p>
                  ) : (
                    <p className="font-mono text-xs text-slate-400" aria-hidden="true">
                      &nbsp;
                    </p>
                  )}
                </div>

                <p className="mt-2.5 min-h-[5.75rem] line-clamp-4 text-sm leading-relaxed text-slate-600">
                  {member.bio}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSelectMember(member)}
                aria-label={`View credentials for ${member.name}`}
                className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center rounded-xl bg-slate-950/45 opacity-0 backdrop-blur-[1px] transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-600"
              >
                <span className="inline-flex scale-95 items-center gap-1.5 rounded-md bg-white/95 px-4 py-2 text-xs font-semibold text-slate-950 shadow-md transition-transform duration-200 group-hover:scale-100 group-focus-visible:scale-100">
                  <Eye className="h-3.5 w-3.5 text-blue-700" aria-hidden="true" />
                  <span>View Credentials</span>
                </span>
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
