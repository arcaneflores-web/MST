import { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, Clock, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
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
      className="scroll-mt-[4.25rem] flex flex-col justify-center border-b border-white/[0.12] bg-slate-950 text-white/95 lg:min-h-[calc(100svh-4.25rem)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-10 lg:py-16">
        <SectionHeaderBar
          sectionNumber="03"
          eyebrow="Verified Corporate Presence & Accreditation"
          title="Built on Accountability in San Fernando, Pampanga"
          dark
        />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
          {/* Left: Real Office Signage Photo & Verified Pampanga Office */}
          <ScrollReveal className="lg:col-span-5">
            <figure className="overflow-hidden rounded-2xl border border-white/[0.12] bg-slate-800/70">
              {!imageError ? (
                <img
                  src={COMPANY_INFO.officePhotoPath}
                  alt="MST Construction OPC office signage at 2nd Floor, JG Building, Dela Paz Norte, City of San Fernando, Pampanga"
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
                  <p className="mt-1 text-sm text-white/56">{COMPANY_INFO.fullAddress}</p>
                </div>
              )}
              <figcaption className="border-t border-white/[0.12] px-5 py-3 text-xs text-white/68 lg:text-sm">
                Headquarters Signage — 2nd Floor, JG Building, Dela Paz Norte, San Fernando
              </figcaption>
            </figure>

            <dl className="mt-6 space-y-3 border-t border-white/[0.12] pt-6 text-sm lg:text-base">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Office Address</dt>
                  <dd className="text-white/88">{COMPANY_INFO.fullAddress}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Telephone Numbers</dt>
                  <dd className="font-mono text-white/88 tabular-nums">
                    {COMPANY_INFO.mobilePhone} · {COMPANY_INFO.landlinePhone}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Email Address</dt>
                  <dd className="font-mono text-white/88">{COMPANY_INFO.email}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-1 h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Office Hours</dt>
                  <dd className="text-white/68">{COMPANY_INFO.officeHours}</dd>
                </div>
              </div>
            </dl>

            <div className="mt-5">
              <a
                href={COMPANY_INFO.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 underline underline-offset-4 hover:text-blue-400/80"
              >
                Get Directions to San Fernando Office
              </a>
            </div>
          </ScrollReveal>

          {/* Right: Credentials & Compliance Pillars */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7 lg:gap-6">
            {credentials.map((cred, idx) => (
              <motion.article
                key={cred.id}
                {...getScrollCardMotionProps(idx % 2, 0.06)}
                className="flex flex-col justify-between rounded-2xl border border-white/[0.12] bg-slate-800/65 p-6 lg:p-7"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-medium text-blue-400">
                      {cred.code}
                    </span>
                    <ShieldCheck className="h-4 w-4 text-white/40" aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-white/95">{cred.title}</h3>
                  <p className="mt-1 text-xs text-white/56 lg:text-sm">
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

            <ScrollReveal
              delay={0.08}
              className="rounded-2xl border border-white/[0.12] bg-slate-800/45 p-6 sm:col-span-2 lg:p-7"
            >
              <h3 className="text-base font-bold text-white/95">
                Transparent Billing &amp; Site Inspection Protocol
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/68 lg:text-base">
                Every contracted build includes a signed Bill of Quantities (BOQ), S-curve
                schedule tracking, third-party concrete cylinder &amp; rebar tensile testing
                records, and weekly photo progress reports for project owners.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
