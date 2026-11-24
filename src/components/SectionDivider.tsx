import type { ReactNode } from 'react';
import { ScrollReveal } from './ScrollReveal';

interface SectionHeaderBarProps {
  title: string;
  action?: ReactNode;
  dark?: boolean;
}

export function SectionHeaderBar({
  title,
  action,
  dark = false,
}: SectionHeaderBarProps) {
  return (
    <ScrollReveal
      yOffset={12}
      className={`border-b pb-5 ${
        dark ? 'border-white/[0.12]' : 'border-black/[0.08]'
      }`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
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
