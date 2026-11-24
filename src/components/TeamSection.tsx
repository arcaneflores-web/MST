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
      className="scroll-mt-[4.25rem] flex flex-col justify-center border-b border-black/[0.08] bg-slate-100/80 lg:min-h-[calc(100svh-8.75rem)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-10 lg:py-16">
        <SectionHeaderBar
          sectionNumber="01"
          eyebrow="Engineering Leadership & Technical Team"
          title="Licensed Professionals Overseeing Every Job Site"
        />

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {members.map((member, idx) => (
            <motion.article
              key={member.id}
              {...getScrollCardMotionProps(idx % 3, 0.06)}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-black/[0.08] bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-blue-600 hover:shadow-lg lg:p-7"
            >
              <div className="flex flex-1 flex-col">
                <div className="flex items-start gap-4">
                  <TeamAvatar
                    name={member.name}
                    initials={member.initials}
                    photoUrl={member.photoUrl}
                    sizeClass="h-16 w-16"
                    textSizeClass="text-lg"
                    decorative
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="min-h-[3rem] line-clamp-2 text-lg font-bold leading-snug text-slate-950/95 transition-colors duration-200 group-hover:text-blue-700">
                      {member.name}
                    </h3>
                    <p className="mt-1 min-h-[2.25rem] line-clamp-2 text-xs font-semibold leading-snug text-blue-700 sm:text-sm">
                      {member.role}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2 border-t border-black/[0.06] pt-3.5 text-xs text-slate-950/54 sm:text-sm">
                  <span className="min-w-0 truncate">{member.discipline}</span>
                  <span className="shrink-0 font-mono tabular-nums">
                    {member.experienceYears} yrs exp.
                  </span>
                </div>

                <div className="mt-2 min-h-[1.35rem]">
                  {member.licenseLabel ? (
                    <p className="truncate font-mono text-xs text-slate-950/75 tabular-nums sm:text-sm">
                      {member.licenseLabel}
                    </p>
                  ) : (
                    <p className="font-mono text-xs text-slate-400" aria-hidden="true">
                      &nbsp;
                    </p>
                  )}
                </div>

                <p className="mt-3 min-h-[6rem] line-clamp-4 text-sm leading-relaxed text-slate-950/68 lg:text-base lg:leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSelectMember(member)}
                aria-label={`View credentials for ${member.name}`}
                className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center rounded-2xl bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-600"
              >
                <span className="inline-flex scale-95 items-center gap-1.5 rounded-md bg-white/90 px-4 py-2 text-xs font-semibold text-slate-950/95 shadow-lg backdrop-blur-md transition-transform duration-200 group-hover:scale-100 group-focus-visible:scale-100">
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
