import type { ReactNode } from 'react';
import { ScrollReveal } from './ScrollReveal';

interface SectionHeaderBarProps {
  sectionNumber?: string;
  eyebrow: string;
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
  return (
    <ScrollReveal
      yOffset={12}
      className={`border-b pb-5 ${
        dark ? 'border-slate-800' : 'border-slate-200'
      }`}
    >
      {/* Top structural rule separator */}
      <div className="flex items-center gap-3">
        <span
          className={`font-mono text-xs font-semibold tabular-nums whitespace-nowrap shrink-0 ${
            dark ? 'text-blue-400' : 'text-blue-700'
          }`}
        >
          {sectionNumber ? `${sectionNumber} · ${eyebrow}` : eyebrow}
        </span>
        <div
          className={`h-px flex-1 ${dark ? 'bg-slate-800' : 'bg-slate-200'}`}
          aria-hidden="true"
        />
      </div>

      {/* Headline + optional right action */}
      <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <h2
          className={`max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl ${
            dark ? 'text-white' : 'text-slate-950'
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
