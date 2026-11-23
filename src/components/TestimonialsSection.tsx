import { TESTIMONIALS } from '../data/companyData';

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-16 border-b border-slate-200 bg-[#F8F7F4] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-blue-700">Client Feedback &amp; Outcomes</p>
            <h2
              className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Trusted by Commercial Developers &amp; Facility Owners
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-600">
            Verified project delivery feedback from commercial, logistics, and institutional
            clients in Pampanga.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <figure
              key={item.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6"
            >
              <div>
                <p className="text-xs font-medium text-blue-700">{item.projectTitle}</p>
                <blockquote className="mt-3 text-sm leading-relaxed text-slate-700">
                  “{item.quote}”
                </blockquote>
              </div>

              <figcaption className="mt-6 border-t border-slate-100 pt-4">
                <p className="text-sm font-bold text-slate-950">{item.clientName}</p>
                <p className="mt-0.5 text-xs text-slate-600">
                  {item.role} · {item.organization}
                </p>
                <p className="mt-2 font-mono text-[11px] font-medium text-slate-700">
                  {item.outcomeSummary}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
