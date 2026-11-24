import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data/companyData';
import { SectionHeaderBar } from './SectionDivider';
import { getScrollCardMotionProps } from './ScrollReveal';

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-[4.25rem] border-b border-black/[0.08] bg-white"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-10 lg:py-14">
        <SectionHeaderBar title="Trusted by Commercial Developers & Facility Owners" />

        <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((item, idx) => (
            <motion.figure
              key={item.id}
              {...getScrollCardMotionProps(idx)}
              className="flex flex-col justify-between rounded-2xl border border-black/[0.08] bg-slate-100/50 p-6 lg:p-7"
            >
              <div>
                <p className="text-xs font-semibold tracking-wide text-blue-700 lg:text-sm">
                  {item.projectTitle}
                </p>
                <blockquote className="mt-3.5 text-base leading-relaxed text-slate-950/78 lg:text-[1.0625rem] lg:leading-relaxed">
                  “{item.quote}”
                </blockquote>
              </div>

              <figcaption className="mt-6 border-t border-black/[0.06] pt-4">
                <p className="text-base font-bold text-slate-950/95">{item.clientName}</p>
                <p className="mt-1 text-xs text-slate-950/54 lg:text-sm">
                  {item.role} · {item.organization}
                </p>
                <p className="mt-2.5 font-mono text-xs font-semibold text-blue-700">
                  {item.outcomeSummary}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
