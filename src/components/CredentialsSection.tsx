import { useState } from 'react';
import { motion } from 'motion/react';
import { Building2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import type { CredentialItem } from '../types/construction';
import { SectionHeaderBar } from './SectionDivider';
import { getScrollCardMotionProps, ScrollReveal } from './ScrollReveal';

interface CredentialsSectionProps {
  credentials: CredentialItem[];
}

export function CredentialsSection({ credentials }: CredentialsSectionProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="credentials"
      className="scroll-mt-[4.25rem] border-b border-white/[0.12] bg-slate-950 text-white/95"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-10 lg:px-10 lg:py-12">
        <SectionHeaderBar
          title="Built on Accountability in San Fernando, Pampanga"
          dark
        />

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
          {/* Left: Real Office Signage Photo & Inspection Protocol */}
          <ScrollReveal className="space-y-5 lg:col-span-5">
            <figure className="overflow-hidden rounded-2xl border border-white/[0.12] bg-slate-800/70">
              {!imageError ? (
                <img
                  src={COMPANY_INFO.officePhotoPath}
                  alt="MST Construction OPC official office signage in San Fernando, Pampanga"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="aspect-[4/3] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[4/3] w-full flex-col items-center justify-center bg-slate-800/70 p-8 text-center">
                  <Building2 className="h-10 w-10 text-blue-400" aria-hidden="true" />
                  <p className="mt-3 text-base font-semibold text-white/95">
                    {COMPANY_INFO.legalName}
                  </p>
                  <p className="mt-1 text-sm text-white/56">
                    City of San Fernando, Pampanga
                  </p>
                </div>
              )}
              <figcaption className="border-t border-white/[0.12] px-5 py-3 text-xs text-white/68 lg:text-sm">
                MST Construction OPC Office Signage — City of San Fernando, Pampanga
              </figcaption>
            </figure>

            <div className="rounded-2xl border border-white/[0.12] bg-slate-800/45 p-6">
              <h3 className="text-base font-bold text-white/95">
                Transparent Billing &amp; Site Inspection Protocol
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/68">
                Every contracted build includes a signed Bill of Quantities (BOQ), S-curve
                schedule tracking, third-party concrete cylinder &amp; rebar tensile testing
                records, and weekly photo progress reports for project owners.
              </p>
            </div>
          </ScrollReveal>

          {/* Right: Credentials & Compliance Pillars */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
            {credentials.map((cred, idx) => (
              <motion.article
                key={cred.id}
                {...getScrollCardMotionProps(idx % 2, 0.06)}
                className="flex flex-col justify-between rounded-2xl border border-white/[0.12] bg-slate-800/65 p-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-white/95">{cred.title}</h3>
                  <p className="mt-1.5 text-xs text-white/56 lg:text-sm">
                    {cred.issuingBody} · {cred.classification}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/68">
                    {cred.description}
                  </p>
                </div>
                {cred.documentReference && (
                  <p className="mt-4 border-t border-white/[0.12] pt-3 font-mono text-xs text-white/56">
                    {cred.documentReference}
                  </p>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
