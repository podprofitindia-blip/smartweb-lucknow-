import React, { useState } from 'react';
import { X, Sliders, RotateCcw, Check, Sparkles, Send, Copy, Phone, MapPin } from 'lucide-react';
import { BusinessConfig, ColorTheme, Language } from '../types';

interface CustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: BusinessConfig;
  onChangeConfig: (newConfig: BusinessConfig) => void;
  lang: Language;
}

export const defaultBusinessConfig: BusinessConfig = {
  businessName: 'SmartWeb Lucknow',
  tagline: 'Professional Website Templates for Indian Businesses',
  taglineHi: 'भारतीय छोटे व्यापारियों के लिए आधुनिक वेबसाइट टेम्पलेट्स',
  city: 'Lucknow',
  phone: '+91 76520 08920',
whatsapp: '+91 76520 08920',
  email: 'contact@smartweblucknow.in',
  address: 'Hazratganj & Gomti Nagar, Lucknow, Uttar Pradesh',
  theme: 'emerald',
  turnaroundHours: 48,
};

export const CustomizerDrawer: React.FC<CustomizerDrawerProps> = ({
  isOpen,
  onClose,
  config,
  onChangeConfig,
  lang,
}) => {
  const isHi = lang === 'hi';
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleReset = () => {
    onChangeConfig(defaultBusinessConfig);
  };

  const handleShareCustomization = () => {
    const cleanPhone = config.whatsapp.replace(/\D/g, '');
    const message = encodeURIComponent(
      `Hello SmartWeb Lucknow!\nI customized my business details on your website tool:\n• Business Name: ${config.businessName}\n• City: ${config.city}\n• Calling Phone: ${config.phone}\n• WhatsApp: ${config.whatsapp}\n• Color Theme: ${config.theme}\nPlease send me the customized proposal.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const handleCopyDetails = () => {
    const text = `Business: ${config.businessName} | City: ${config.city} | Phone: ${config.phone} | Theme: ${config.theme}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const themes: { id: ColorTheme; label: string; bgClass: string }[] = [
    { id: 'emerald', label: isHi ? 'एमराल्ड ग्रीन (अनुशंसित)' : 'Emerald Green', bgClass: 'bg-emerald-600' },
    { id: 'blue', label: isHi ? 'रॉयल सफायर ब्लू' : 'Sapphire Blue', bgClass: 'bg-blue-600' },
    { id: 'indigo', label: isHi ? 'इंडिगो पर्पल' : 'Deep Indigo', bgClass: 'bg-indigo-600' },
    { id: 'amber', label: isHi ? 'गोल्डन एम्बर' : 'Warm Amber', bgClass: 'bg-amber-600' },
    { id: 'rose', label: isHi ? 'रोज़ पिंक' : 'Crimson Rose', bgClass: 'bg-rose-600' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-slide-left">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-600" />
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                {isHi ? 'लाइव कस्टमाइज़र टूल' : 'Live Customizer & White-Label'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {isHi ? 'नाम, शहर और रंग बदलें — वेबसाइट तुरंत बदलेगी' : 'Change details and preview live updates in real time'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Quick Preset Buttons for Indian Small Businesses */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {isHi ? 'त्वरित उदाहरण (1-क्लिक टेम्पलेट)' : 'Quick Sample Presets'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() =>
                  onChangeConfig({
                    ...config,
                    businessName: 'Sharma Sarees & Suits',
                    city: 'Hazratganj, Lucknow',
                    phone: '+91 94520 81234',
                    theme: 'amber',
                  })
                }
                className="px-2.5 py-1.5 text-[11px] text-left border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-800"
              >
                🛍️ Sharma Sarees (Shop)
              </button>
              <button
                type="button"
                onClick={() =>
                  onChangeConfig({
                    ...config,
                    businessName: 'Apex Science Academy',
                    city: 'Aliganj, Lucknow',
                    phone: '+91 94520 81234',
                    theme: 'blue',
                  })
                }
                className="px-2.5 py-1.5 text-[11px] text-left border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-800"
              >
                📚 Apex Academy (Coaching)
              </button>
              <button
                type="button"
                onClick={() =>
                  onChangeConfig({
                    ...config,
                    businessName: 'Sanjeevani Dental Clinic',
                    city: 'Gomti Nagar, Lucknow',
                    phone: '+91 94520 81234',
                    theme: 'emerald',
                  })
                }
                className="px-2.5 py-1.5 text-[11px] text-left border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-800"
              >
                🦷 Sanjeevani Dental (Clinic)
              </button>
              <button
                type="button"
                onClick={() =>
                  onChangeConfig({
                    ...config,
                    businessName: 'QuickFix Electricals',
                    city: 'Indira Nagar, Lucknow',
                    phone: '+91 94520 81234',
                    theme: 'rose',
                  })
                }
                className="px-2.5 py-1.5 text-[11px] text-left border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-800"
              >
                ⚡ QuickFix (Electrician)
              </button>
            </div>
          </div>

          {/* Business Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isHi ? 'व्यापार / दुकान का नाम' : 'Business / Brand Name'}
            </label>
            <input
              type="text"
              value={config.businessName}
              onChange={(e) => onChangeConfig({ ...config, businessName: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-emerald-600 focus:border-emerald-600"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isHi ? 'शहर / स्थान' : 'City / Target Location'}
            </label>
            <input
              type="text"
              value={config.city}
              onChange={(e) => onChangeConfig({ ...config, city: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-emerald-600 focus:border-emerald-600"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isHi ? 'कॉलिंग फोन नंबर' : 'Primary Calling Number'}
            </label>
            <input
              type="text"
              value={config.phone}
              onChange={(e) => onChangeConfig({ ...config, phone: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-emerald-600 focus:border-emerald-600"
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isHi ? 'व्हाट्सएप नंबर' : 'WhatsApp Number (for orders & chat)'}
            </label>
            <input
              type="text"
              value={config.whatsapp}
              onChange={(e) => onChangeConfig({ ...config, whatsapp: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-emerald-600 focus:border-emerald-600"
            />
          </div>

          {/* Color Palette */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {isHi ? 'ब्रांड कलर पैलेट' : 'Brand Primary Color Theme'}
            </label>
            <div className="space-y-1.5">
              {themes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onChangeConfig({ ...config, theme: t.id })}
                  className={`w-full flex items-center justify-between p-2 rounded-lg border text-xs transition-colors ${
                    config.theme === t.id
                      ? 'border-slate-900 bg-slate-50 font-semibold'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-3.5 h-3.5 rounded-full ${t.bgClass}`} />
                    <span>{t.label}</span>
                  </div>
                  {config.theme === t.id && <Check className="w-3.5 h-3.5 text-slate-900" />}
                </button>
              ))}
            </div>
          </div>

          {/* Info pill */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-[11px] text-emerald-800 leading-relaxed">
            {isHi
              ? '💡 आप इस कस्टमाइज़र का उपयोग किसी भी स्थानीय व्यापारी को यह दिखाने के लिए कर सकते हैं कि उनकी दुकान की वेबसाइट कैसी दिखेगी!'
              : '💡 Use this live customizer to pitch prospective clients in your city: enter their shop name and show them their website instantly!'}
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleShareCustomization}
              className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isHi ? 'व्हाट्सएप पर यह विवरण भेजें' : 'Share via WhatsApp'}</span>
            </button>
            <button
              onClick={handleCopyDetails}
              className="py-2.5 px-3 border border-slate-300 hover:bg-white text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
              title="Copy"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? (isHi ? 'कॉपी हो गया' : 'Copied!') : (isHi ? 'कॉपी' : 'Copy')}</span>
            </button>
          </div>

          <button
            onClick={handleReset}
            className="w-full py-2 text-slate-500 hover:text-slate-800 text-xs font-medium flex items-center justify-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{isHi ? 'डिफ़ॉल्ट पर रीसेट करें' : 'Reset to SmartWeb Defaults'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
