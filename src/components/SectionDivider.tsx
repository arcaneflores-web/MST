import type { ReactNode } from 'react';

interface SectionHeaderBarProps {
  sectionNumber?: string;
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
  dark?: boolean;
}

export function SectionHeaderBar({
  sectionNumber,
  eyebrow,
  title,
  description,
  action,
  dark = false,
}: SectionHeaderBarProps) {
  return (
    <div
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

      {/* Headline + right action / summary */}
      <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <h2
          className={`max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl ${
            dark ? 'text-white' : 'text-slate-950'
          }`}
          style={{ textWrap: 'balance' }}
        >
          {title}
        </h2>

        {action ? (
          <div className="shrink-0">{action}</div>
        ) : description ? (
          <p
            className={`max-w-md text-sm leading-relaxed ${
              dark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
