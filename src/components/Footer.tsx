import { ArrowUpRight, Lock } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import type { AppPage, PublicPage } from '../types/construction';
import { getPathnameForPage } from '../utils/inquiryLogic';
import { BrandMark } from './ArchitecturalVisuals';
import { ScrollReveal } from './ScrollReveal';

interface FooterProps {
  onNavigate: (page: AppPage) => void;
  onOpenInquiry: () => void;
}

const FOOTER_PAGES: Array<{ page: PublicPage; label: string }> = [
  { page: 'home', label: 'Home' },
  { page: 'about', label: 'About Us & Credentials' },
  { page: 'services', label: 'Engineering & Build Services' },
  { page: 'projects', label: 'Project Portfolio' },
  { page: 'team', label: 'Our Team' },
  { page: 'contact', label: 'Contact Us' },
];

export function Footer({ onNavigate, onOpenInquiry }: FooterProps) {
  return (
    <footer className="bg-slate-950 py-12 text-white/70 lg:py-16">
      <ScrollReveal yOffset={14} className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-8 border-b border-white/[0.12] pb-10 md:grid-cols-12 lg:gap-12">
          <div className="md:col-span-4">
            <a
              href={getPathnameForPage('home')}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              className="inline-flex items-center gap-2.5 text-base font-bold text-white/95"
            >
              <BrandMark className="h-6 w-6 shrink-0" />
              <span>{COMPANY_INFO.legalName}</span>
            </a>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
              Engineering, architectural design-build, and general contracting serving
              commercial, industrial, residential, and civil infrastructure clients across
              Pampanga and Central Luzon.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-medium text-white/75">
              {COMPANY_INFO.socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-1 hover:text-white underline underline-offset-4"
                >
                  <span>{social.label}</span>
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-xs font-bold tracking-wider text-white/95 uppercase">
              Pages
            </h3>
            <ul className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 md:grid-cols-1">
              {FOOTER_PAGES.map((item) => (
                <li key={item.page}>
                  <a
                    href={getPathnameForPage(item.page)}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.page);
                    }}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={onOpenInquiry}
                  className="text-left font-semibold text-blue-400 hover:text-blue-300"
                >
                  Request a Quote
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-xs font-bold tracking-wider text-white/95 uppercase">
              San Fernando Office
            </h3>
            <address className="mt-3 not-italic text-sm leading-relaxed text-white/60">
              <p>{COMPANY_INFO.addressLine1}</p>
              <p>{COMPANY_INFO.addressLine2}</p>
              <p className="mt-2 font-mono text-white/80 tabular-nums">
                {COMPANY_INFO.mobilePhone} · {COMPANY_INFO.landlinePhone}
              </p>
              <p className="mt-1 font-mono text-white/80">{COMPANY_INFO.email}</p>
              <p className="mt-1 text-xs text-white/56">{COMPANY_INFO.officeHours}</p>
            </address>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 text-xs text-white/48 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY_INFO.legalName}. City of San Fernando,
            Pampanga 2000, Philippines.
          </p>

          <a
            href={getPathnameForPage('admin')}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('admin');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white/56 hover:text-white/95 whitespace-nowrap shrink-0"
          >
            <Lock className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Admin Portal</span>
          </a>
        </div>
      </ScrollReveal>
    </footer>
  );
}
