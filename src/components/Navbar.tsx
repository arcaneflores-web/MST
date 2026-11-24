import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import type { PublicPage } from '../types/construction';
import { getPathnameForPage } from '../utils/inquiryLogic';
import { BrandMark } from './ArchitecturalVisuals';
import { ScrollProgressBar } from './ScrollReveal';

interface NavbarProps {
  currentPage: PublicPage;
  contactDialogOpen: boolean;
  onNavigate: (page: PublicPage) => void;
  onOpenContactDialog: () => void;
  onRequestQuote: () => void;
}

const NAV_ITEMS: Array<{ page: PublicPage; label: string }> = [
  { page: 'home', label: 'Home' },
  { page: 'about', label: 'About Us' },
  { page: 'services', label: 'Services' },
  { page: 'projects', label: 'Projects' },
  { page: 'team', label: 'Our Team' },
  { page: 'contact', label: 'Contact Us' },
];

export function Navbar({
  currentPage,
  contactDialogOpen,
  onNavigate,
  onOpenContactDialog,
  onRequestQuote,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeNavPage: PublicPage = contactDialogOpen ? 'contact' : currentPage;

  const handleNavClick = (page: PublicPage) => {
    setMobileMenuOpen(false);
    if (page === 'contact') {
      onOpenContactDialog();
      return;
    }
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-black/[0.08] bg-white/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 py-3.5 lg:gap-8 lg:px-10">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href={getPathnameForPage('home')}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-950/95 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
        >
          <BrandMark className="h-7 w-7 shrink-0" />
          <span>MST Construction OPC</span>
        </a>

        {/* Zone 2: Clean single-line public page links with sliding indicator */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-medium text-slate-950/70"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeNavPage === item.page;
            return (
              <a
                key={item.page}
                href={getPathnameForPage(item.page)}
                aria-current={isActive ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.page);
                }}
                className={`relative whitespace-nowrap shrink-0 py-1.5 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 ${
                  isActive
                    ? 'font-semibold text-blue-700'
                    : 'text-slate-950/70 hover:text-slate-950'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-indicator"
                    transition={{ type: 'spring', stiffness: 440, damping: 34 }}
                    className="absolute right-0 bottom-0 left-0 h-0.5 bg-blue-700"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + mobile drawer button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onRequestQuote}
            className="hidden sm:inline-flex items-center justify-center rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-all duration-150 hover:bg-blue-800 active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Request a Quote
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-700 md:hidden hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-blue-700"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="overflow-hidden border-t border-slate-200 bg-white md:hidden"
          >
            <div className="flex flex-col gap-1.5 px-6 py-4">
              {NAV_ITEMS.map((item) => {
                const isActive = activeNavPage === item.page;
                return (
                  <a
                    key={item.page}
                    href={getPathnameForPage(item.page)}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.page);
                    }}
                    className={`rounded-md px-3 py-2 text-base font-medium transition-colors duration-150 ${
                      isActive
                        ? 'bg-blue-50 font-semibold text-blue-700'
                        : 'text-slate-800 hover:bg-slate-50 hover:text-blue-700'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestQuote();
                }}
                className="mt-2 w-full rounded-md bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
              >
                Request a Quote
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      <ScrollProgressBar />
    </header>
  );
}
