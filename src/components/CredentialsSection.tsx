import { useState } from 'react';
import { Building2, Clock, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO, CREDENTIALS } from '../data/companyData';

export function CredentialsSection() {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="credentials"
      className="scroll-mt-16 border-b border-slate-800 bg-slate-950 py-16 text-slate-100 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left: Real Office Signage Photo & Verified Pampanga Office */}
          <div className="lg:col-span-5">
            <p className="text-sm font-medium text-blue-400">
              Verified Corporate Presence &amp; Accreditation
            </p>
            <h2
              className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Built on Accountability in San Fernando, Pampanga
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Clients and project owners can meet our engineering team directly at our
              San Fernando headquarters. Every quotation, structural plan, and progress
              billing is backed by verified Philippine regulatory compliance.
            </p>

            {/* Real Office Signage Image */}
            <figure className="mt-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
              {!imageError ? (
                <img
                  src={COMPANY_INFO.officePhotoPath}
                  alt="MST Construction OPC office signage at 2nd Floor, JG Building, Dela Paz Norte, City of San Fernando, Pampanga"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="aspect-[4/3] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[4/3] w-full flex-col items-center justify-center bg-slate-900 p-6 text-center">
                  <Building2 className="h-10 w-10 text-blue-400" aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold text-white">
                    {COMPANY_INFO.legalName}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{COMPANY_INFO.fullAddress}</p>
                </div>
              )}
              <figcaption className="border-t border-slate-800 px-4 py-3 text-xs text-slate-300">
                Headquarters Signage — 2nd Floor, JG Building, Dela Paz Norte, City of San
                Fernando, Pampanga
              </figcaption>
            </figure>

            {/* Direct Office Contact Facts */}
            <dl className="mt-6 space-y-3 border-t border-slate-800 pt-6 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Office Address</dt>
                  <dd className="text-slate-200">{COMPANY_INFO.fullAddress}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Telephone Numbers</dt>
                  <dd className="font-mono text-slate-200 tabular-nums">
                    {COMPANY_INFO.mobilePhone} · {COMPANY_INFO.landlinePhone}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Email Address</dt>
                  <dd className="font-mono text-slate-200">{COMPANY_INFO.email}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Office Hours</dt>
                  <dd className="text-slate-300">{COMPANY_INFO.officeHours}</dd>
                </div>
              </div>
            </dl>

            <div className="mt-5">
              <a
                href={COMPANY_INFO.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 underline underline-offset-4 hover:text-blue-300"
              >
                Get Directions to San Fernando Office
              </a>
            </div>
          </div>

          {/* Right: 4 Credentials & Compliance Pillars */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
            {CREDENTIALS.map((cred) => (
              <article
                key={cred.id}
                className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900 p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-medium text-blue-400">
                      {cred.code}
                    </span>
                    <ShieldCheck className="h-4 w-4 text-slate-500" aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-white">{cred.title}</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    {cred.issuingBody} · {cred.classification}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {cred.description}
                  </p>
                </div>
              </article>
            ))}

            {/* Quality Assurance Charter Strip */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 sm:col-span-2">
              <h3 className="text-base font-bold text-white">
                Transparent Billing &amp; Site Inspection Protocol
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Every contracted build includes a signed Bill of Quantities (BOQ), S-curve
                schedule tracking, third-party concrete cylinder &amp; rebar tensile testing
                records, and weekly photo progress reports for project owners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
