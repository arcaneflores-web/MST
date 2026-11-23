import { ABOUT_MST, CONSTRUCTION_PROCESS } from '../data/companyData';

export function AboutProcessSection() {
  return (
    <section
      id="about"
      className="scroll-mt-16 border-b border-slate-200 bg-[#F8F7F4] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Part 1: About MST & Differentiators */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-sm font-medium text-blue-700">{ABOUT_MST.eyebrow}</p>
            <h2
              className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              {ABOUT_MST.headline}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700">
              {ABOUT_MST.overview}
            </p>

            <div className="mt-8 space-y-5 border-t border-slate-200 pt-6">
              <div>
                <h3 className="text-xs font-bold tracking-wider text-slate-900 uppercase">
                  Mission
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                  {ABOUT_MST.mission}
                </p>
              </div>
              <div>
                <h3 className="text-xs font-bold tracking-wider text-slate-900 uppercase">
                  Vision
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                  {ABOUT_MST.vision}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
            {ABOUT_MST.differentiators.map((item, idx) => (
              <article
                key={item.title}
                className="rounded-xl border border-slate-200 bg-white p-6"
              >
                <p className="font-mono text-xs font-medium text-blue-700 tabular-nums">
                  {String(idx + 1).padStart(2, '0')}.
                </p>
                <h3 className="mt-2 text-base font-bold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Part 2: 7-Step Construction Process */}
        <div id="process" className="scroll-mt-20 mt-16 border-t border-slate-200 pt-14">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700">
                7-Step Construction Delivery Framework
              </p>
              <h3
                className="mt-1.5 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl"
                style={{ textWrap: 'balance' }}
              >
                From Initial Consultation to Project Turnover
              </h3>
            </div>
            <p className="max-w-md text-sm text-slate-600">
              A disciplined, milestone-tracked workflow ensuring code compliance, budget
              control, and documented quality inspections.
            </p>
          </div>

          <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CONSTRUCTION_PROCESS.map((item) => (
              <li
                key={item.step}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5"
              >
                <div>
                  <span className="font-mono text-xs font-semibold text-blue-700 tabular-nums">
                    Step {item.step}
                  </span>
                  <h4 className="mt-2 text-base font-bold text-slate-950">{item.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
                <p className="mt-4 border-t border-slate-100 pt-3 text-[11px] font-medium text-slate-700">
                  Output: {item.deliverable}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
