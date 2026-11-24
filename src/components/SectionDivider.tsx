import type { ReactNode } from 'react';
import { ScrollReveal } from './ScrollReveal';

interface SectionHeaderBarProps {
  sectionNumber?: string;
  eyebrow?: string;
  title: string;
  action?: ReactNode;
  dark?: boolean;
}

export function SectionHeaderBar({
  sectionNumber,
  eyebrow,
  title,
  action,
  dark = false,
}: SectionHeaderBarProps) {
  const hasEyebrow = Boolean(eyebrow);

  return (
    <ScrollReveal
      yOffset={12}
      className={`border-b ${hasEyebrow ? 'pb-6' : 'pb-5'} ${
        dark ? 'border-white/[0.12]' : 'border-black/[0.08]'
      }`}
    >
      {/* Top structural rule separator */}
      {hasEyebrow && (
        <div className="flex items-center gap-3">
          <span
            className={`font-mono text-xs font-semibold tracking-wide tabular-nums whitespace-nowrap shrink-0 sm:text-sm ${
              dark ? 'text-blue-400' : 'text-blue-700'
            }`}
          >
            {sectionNumber ? `${sectionNumber} · ${eyebrow}` : eyebrow}
          </span>
          <div
            className={`h-px flex-1 ${dark ? 'bg-white/[0.12]' : 'bg-black/[0.08]'}`}
            aria-hidden="true"
          />
        </div>
      )}

      {/* Headline + optional right action */}
      <div
        className={`${
          hasEyebrow ? 'mt-3.5 ' : ''
        }flex flex-col gap-4 md:flex-row md:items-end md:justify-between`}
      >
        <h2
          className={`max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.5rem] lg:leading-[1.12] ${
            dark ? 'text-white/95' : 'text-slate-950/95'
          }`}
          style={{ textWrap: 'balance' }}
        >
          {title}
        </h2>

        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </ScrollReveal>
  );
}
