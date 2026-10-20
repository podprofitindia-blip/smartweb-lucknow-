import React from 'react';
import { Phone, MessageCircle, MonitorPlay, FileText } from 'lucide-react';
import { BusinessConfig, Language } from '../types';
import { translations } from '../data/translations';

interface MobileQuickBarProps {
  config: BusinessConfig;
  lang: Language;
  onOpenEnquiry: () => void;
  onScrollToDemos: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({
  config,
  lang,
  onOpenEnquiry,
  onScrollToDemos,
}) => {
  const t = translations[lang].mobileBar;
  const isHi = lang === 'hi';
  const cleanPhone = config.whatsapp.replace(/\D/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    isHi
      ? `नमस्ते ${config.businessName}! मुझे अपने व्यापार के लिए वेबसाइट की जानकारी चाहिए।`
      : `Hello ${config.businessName}! I am interested in getting a website for my business.`
  )}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg">
      <div className="grid grid-cols-4 gap-1 text-center">
        {/* Call */}
        <a
          href={`tel:${config.phone}`}
          className="flex flex-col items-center justify-center py-1 text-slate-700 active:text-slate-900"
        >
          <Phone className="w-4 h-4 text-slate-700 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-tight">{t.call}</span>
        </a>

        {/* WhatsApp */}
        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center py-1 text-emerald-700 active:text-emerald-900"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-tight">{t.whatsapp}</span>
        </a>

        {/* Demos */}
        <button
          onClick={onScrollToDemos}
          className="flex flex-col items-center justify-center py-1 text-slate-700 active:text-slate-900"
        >
          <MonitorPlay className="w-4 h-4 text-blue-600 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-tight">{t.demos}</span>
        </button>

        {/* Quote */}
        <button
          onClick={onOpenEnquiry}
          className="flex flex-col items-center justify-center py-1 text-slate-900 font-bold active:text-emerald-700"
        >
          <FileText className="w-4 h-4 text-amber-600 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-tight">{t.quote}</span>
        </button>
      </div>
    </div>
  );
};
