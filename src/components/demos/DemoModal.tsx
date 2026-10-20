import React, { useState } from 'react';
import { X, Smartphone, Tablet, Monitor, MessageCircle, ExternalLink, Sparkles, Check } from 'lucide-react';
import { BusinessCategory, BusinessConfig, Language } from '../../types';
import { demoItems } from '../../data/demos';
import { ShopDemoView } from './ShopDemoView';
import { CoachingDemoView } from './CoachingDemoView';
import { ClinicDemoView } from './ClinicDemoView';
import { ServicesDemoView } from './ServicesDemoView';

interface DemoModalProps {
  demoId: BusinessCategory | null;
  onClose: () => void;
  config: BusinessConfig;
  lang: Language;
  onSelectTemplate: (category: BusinessCategory) => void;
}

type DeviceMode = 'desktop' | 'tablet' | 'mobile';

export const DemoModal: React.FC<DemoModalProps> = ({
  demoId,
  onClose,
  config,
  lang,
  onSelectTemplate,
}) => {
  const [device, setDevice] = useState<DeviceMode>('desktop');
  const [demoLang, setDemoLang] = useState<Language>(lang);

  if (!demoId) return null;

  const currentDemo = demoItems.find((d) => d.id === demoId) || demoItems[0];
  const isHi = demoLang === 'hi';

  const handleOrderTemplate = () => {
    const cleanPhone = config.whatsapp.replace(/\D/g, '');
    const msg = encodeURIComponent(
      `Hello SmartWeb Lucknow! I tried the "${currentDemo.title}" live demo on your website and want this exact template customized for my business.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
    onSelectTemplate(demoId);
  };

  const renderContent = () => {
    switch (demoId) {
      case 'shop':
        return <ShopDemoView config={config} lang={demoLang} />;
      case 'coaching':
        return <CoachingDemoView config={config} lang={demoLang} />;
      case 'clinic':
        return <ClinicDemoView config={config} lang={demoLang} />;
      case 'services':
      default:
        return <ServicesDemoView config={config} lang={demoLang} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/90 backdrop-blur-md">
      {/* Top Controller Bar */}
      <div className="bg-slate-900 border-b border-slate-800 text-white px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase tracking-wider hidden sm:inline">
            {isHi ? 'लाइव डेमो प्रीव्यू' : 'Live Demo'}
          </span>
          <h3 className="text-sm font-bold truncate text-slate-100">
            {isHi ? currentDemo.titleHi : currentDemo.title}
          </h3>
        </div>

        {/* Device Switcher (Desktop / Tablet / Mobile) */}
        <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
          <button
            onClick={() => setDevice('desktop')}
            title="Desktop View"
            className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
              device === 'desktop' ? 'bg-slate-950 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDevice('tablet')}
            title="Tablet View (768px)"
            className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
              device === 'tablet' ? 'bg-slate-950 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDevice('mobile')}
            title="Mobile Phone View (375px)"
            className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
              device === 'mobile' ? 'bg-slate-950 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Language switch & actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDemoLang(demoLang === 'en' ? 'hi' : 'en')}
            className="text-xs px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
          >
            {demoLang === 'en' ? 'हिंदी में देखें' : 'View in English'}
          </button>

          <button
            onClick={handleOrderTemplate}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{isHi ? 'यह टेम्पलेट ऑर्डर करें' : 'I Want This Template'}</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Demo Viewport Area */}
      <div className="flex-1 overflow-auto p-2 sm:p-6 flex items-start justify-center">
        {device === 'desktop' && (
          <div className="w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-700/50 min-h-[85vh]">
            {renderContent()}
          </div>
        )}

        {device === 'tablet' && (
          <div className="w-full max-w-[768px] bg-white rounded-2xl shadow-2xl overflow-hidden border-8 border-slate-800 min-h-[85vh]">
            <div className="bg-slate-800 h-4 flex items-center justify-center">
              <div className="w-12 h-1 bg-slate-700 rounded-full"></div>
            </div>
            {renderContent()}
          </div>
        )}

        {device === 'mobile' && (
          <div className="w-full max-w-[390px] bg-white rounded-[36px] shadow-2xl overflow-hidden border-[10px] border-slate-900 min-h-[750px] relative">
            {/* Phone notch */}
            <div className="bg-slate-900 h-5 flex items-center justify-center sticky top-0 z-30">
              <div className="w-20 h-3 bg-slate-950 rounded-b-xl flex items-center justify-center">
                <div className="w-8 h-1 bg-slate-800 rounded-full"></div>
              </div>
            </div>
            {renderContent()}
          </div>
        )}
      </div>

      {/* Bottom Sticky Action on mobile */}
      <div className="md:hidden bg-slate-900 border-t border-slate-800 p-2.5 flex items-center justify-between gap-2 shrink-0">
        <span className="text-[11px] text-slate-400 truncate">
          {isHi ? '48 घंटे में लाइव डिलीवरी' : '48h Launch Guarantee'}
        </span>
        <button
          onClick={handleOrderTemplate}
          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shrink-0"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>{isHi ? 'व्हाट्सएप ऑर्डर' : 'Order on WhatsApp'}</span>
        </button>
      </div>
    </div>
  );
};
