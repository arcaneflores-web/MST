import { COMPANY_INFO } from '../data/companyData';
import { BrandMark } from './ArchitecturalVisuals';

export function Footer({ onOpenInquiry }: { onOpenInquiry: () => void }) {
  return (
    <footer className="bg-slate-950 py-12 text-slate-300">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 gap-8 border-b border-slate-800 pb-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 text-base font-bold text-white">
              <BrandMark className="h-6 w-6 shrink-0" />
              <span>{COMPANY_INFO.legalName}</span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
              Engineering, architectural design-build, and general contracting serving
              commercial, industrial, residential, and civil infrastructure clients across
              Pampanga and Central Luzon.
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-bold tracking-wider text-white uppercase">
              Sections
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#services" className="hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white">
                  Project Portfolio
                </a>
              </li>
              <li>
                <a href="#credentials" className="hover:text-white">
                  Credentials
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-white">
                  Engineering Team
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenInquiry}
                  className="hover:text-white text-left"
                >
                  Request Quotation
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-xs font-bold tracking-wider text-white uppercase">
              San Fernando Office
            </h3>
            <address className="mt-3 not-italic text-sm leading-relaxed text-slate-400">
              <p>{COMPANY_INFO.addressLine1}</p>
              <p>{COMPANY_INFO.addressLine2}</p>
              <p className="mt-2 font-mono text-slate-300 tabular-nums">
                {COMPANY_INFO.mobilePhone} · {COMPANY_INFO.landlinePhone}
              </p>
              <p className="mt-1 font-mono text-slate-300">{COMPANY_INFO.email}</p>
            </address>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.legalName}. All rights reserved.</p>
          <p>City of San Fernando, Pampanga 2000, Philippines</p>
        </div>
      </div>
    </footer>
  );
}
