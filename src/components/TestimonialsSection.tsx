import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data/companyData';
import { SectionHeaderBar } from './SectionDivider';
import { getScrollCardMotionProps } from './ScrollReveal';

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-16 border-b-2 border-slate-200 bg-white py-10 lg:py-12"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeaderBar
          sectionNumber="04"
          eyebrow="Client Feedback & Outcomes"
          title="Trusted by Commercial Developers & Facility Owners"
        />

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((item, idx) => (
            <motion.figure
              key={item.id}
              {...getScrollCardMotionProps(idx)}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5"
            >
              <div>
                <p className="text-xs font-semibold text-blue-700">{item.projectTitle}</p>
                <blockquote className="mt-2.5 text-sm leading-relaxed text-slate-700">
                  “{item.quote}”
                </blockquote>
              </div>

              <figcaption className="mt-4 border-t border-slate-100 pt-3.5">
                <p className="text-sm font-bold text-slate-950">{item.clientName}</p>
                <p className="mt-0.5 text-xs text-slate-600">
                  {item.role} · {item.organization}
                </p>
                <p className="mt-1.5 font-mono text-[11px] font-medium text-slate-700">
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
