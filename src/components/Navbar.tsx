import React, { useState } from 'react';
import { MessageCircle, Globe, Sliders, Menu, X, Phone } from 'lucide-react';
import { BusinessConfig, Language } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  config: BusinessConfig;
  lang: Language;
  onToggleLang: () => void;
  onOpenCustomizer: () => void;
  onOpenEnquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  lang,
  onToggleLang,
  onOpenCustomizer,
  onOpenEnquiry,
}) => {
  const t = translations[lang].nav;
  const isHi = lang === 'hi';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cleanPhone = config.whatsapp.replace(/\D/g, '');
  const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    isHi
      ? `नमस्ते ${config.businessName}! मुझे अपने व्यापार के लिए वेबसाइट बनवानी है। कृपया जानकारी साझा करें।`
      : `Hello ${config.businessName}! I want to build a website for my business. Please share details.`
  )}`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span>{config.businessName}</span>
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#demos" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              {t.demos}
            </a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              {t.pricing}
            </a>
            <a href="#process" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              {t.process}
            </a>
            <a href="#why-us" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              {t.features}
            </a>
            <a href="#faq" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              {t.faq}
            </a>
            <a href="#contact" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              {t.contact}
            </a>
          </nav>

          {/* Zone 3: Actions (Language toggle + Customizer button + 1 primary CTA) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
              title="Toggle Hindi / English"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* Live Customizer trigger */}
            <button
              onClick={onOpenCustomizer}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors whitespace-nowrap shrink-0"
              title="Customize Name, City & Colors"
            >
              <Sliders className="w-3.5 h-3.5 text-slate-600" />
              <span>{t.customize}</span>
            </button>

            {/* Primary Action Button (WhatsApp CTA) */}
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{t.whatsappCta}</span>
              <span className="sm:hidden">{isHi ? 'व्हाट्सएप' : 'Chat'}</span>
            </a>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 shadow-lg">
          <a
            href="#demos"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            {t.demos}
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            {t.pricing}
          </a>
          <a
            href="#process"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            {t.process}
          </a>
          <a
            href="#why-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            {t.features}
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            {t.faq}
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            {t.contact}
          </a>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCustomizer();
              }}
              className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{t.customize}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-slate-900 text-white flex items-center justify-center gap-1.5"
            >
              <span>{t.getQuote}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
