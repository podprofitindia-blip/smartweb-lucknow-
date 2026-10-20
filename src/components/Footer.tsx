import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, ShieldCheck } from 'lucide-react';
import { BusinessCategory, BusinessConfig, Language } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  config: BusinessConfig;
  lang: Language;
  onOpenDemo: (category: BusinessCategory) => void;
  onOpenEnquiry: () => void;
  onOpenCustomizer: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  lang,
  onOpenDemo,
  onOpenEnquiry,
  onOpenCustomizer,
}) => {
  const t = translations[lang].footer;
  const isHi = lang === 'hi';
  const cleanPhone = config.whatsapp.replace(/\D/g, '');

  return (
    <footer id="contact" className="bg-slate-950 text-slate-300 pt-16 pb-24 sm:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4">
            <span className="text-xl font-bold tracking-tight text-white block">
              {config.businessName}
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.aboutText}
            </p>
            <div className="pt-2">
              <span className="text-[11px] text-emerald-400 font-semibold block uppercase tracking-wider mb-1">
                {isHi ? 'स्थानीय व्यापार सशक्तिकरण' : 'Local Business Empowerment'}
              </span>
              <p className="text-xs text-slate-400">
                {isHi ? 'लखनऊ, कानपुर व पूरे उत्तर प्रदेश के छोटे व्यापारियों का सच्चा डिजिटल साथी।' : 'Empowering retail shops, tutors, clinics, and technicians across Uttar Pradesh.'}
              </p>
            </div>
          </div>

          {/* Col 2: Demos Showroom */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {t.demoCategories}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onOpenDemo('shop')}
                  className="hover:text-white transition-colors text-left"
                >
                  🛍️ {t.shopDemo}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDemo('coaching')}
                  className="hover:text-white transition-colors text-left"
                >
                  📚 {t.coachingDemo}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDemo('clinic')}
                  className="hover:text-white transition-colors text-left"
                >
                  🩺 {t.clinicDemo}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDemo('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  ⚡ {t.servicesDemo}
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenCustomizer}
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  ⚙️ {isHi ? 'लाइव कस्टमाइज़र खोलें' : 'Open Live Customizer'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#demos" className="hover:text-white transition-colors">
                  {translations[lang].nav.demos}
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  {translations[lang].nav.pricing}
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  {translations[lang].nav.process}
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">
                  {translations[lang].nav.features}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  {translations[lang].nav.faq}
                </a>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenEnquiry}
                  className="text-white hover:text-emerald-400 font-semibold transition-colors"
                >
                  📝 {translations[lang].nav.getQuote}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Lucknow Studio Location & Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              {isHi ? 'हमारा डिजिटल स्टूडियो' : 'Lucknow Digital Studio'}
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{t.officeAddress}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
              <a href={`tel:${config.phone}`} className="hover:text-white transition-colors">
                {config.phone}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                {config.whatsapp} (WhatsApp Business)
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
              <a href={`mailto:${config.email}`} className="hover:text-white transition-colors">
                {config.email}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{t.hours}</span>
            </div>
          </div>
        </div>

        {/* Transparent Disclaimer Notice */}
        <div className="py-6 border-b border-slate-900 text-[11px] text-slate-500 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p>{t.disclaimer}</p>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>{t.copyright}</p>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-500">
              {isHi ? 'उत्तर प्रदेश एमएसएमई सहायता पहल' : 'UP MSME Digital Initiative'}
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-medium">
              {isHi ? '100% प्रामाणिक कोड व डोमेन स्वामित्व' : '100% Genuine Code Ownership'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
