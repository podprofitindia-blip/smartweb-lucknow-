import React, { useState } from 'react';
import {
  MessageCircle,
  Phone,
  Sparkles,
  Zap,
  CheckCircle2,
  Sliders,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Clock,
  Laptop,
  Layers,
  Store,
  GraduationCap,
  HeartPulse,
  Wrench,
  HelpCircle,
  FileText,
  Eye,
  Check,
  Send,
  ExternalLink,
} from 'lucide-react';

import { BusinessCategory, BusinessConfig, Language } from './types';
import { translations } from './data/translations';
import { pricingPlans, addonServices } from './data/packages';
import { demoItems } from './data/demos';
import { defaultBusinessConfig, CustomizerDrawer } from './components/CustomizerDrawer';
import { DemoModal } from './components/demos/DemoModal';
import { EnquiryModal } from './components/EnquiryModal';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileQuickBar } from './components/MobileQuickBar';

export default function App() {
  const [lang, setLang] = useState<Language>('hi'); // Default to Hindi for Lucknow small business market
  const [config, setConfig] = useState<BusinessConfig>(defaultBusinessConfig);
  const [activeDemo, setActiveDemo] = useState<BusinessCategory | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryPlan, setEnquiryPlan] = useState<string>('growth');
  const [enquiryCategory, setEnquiryCategory] = useState<BusinessCategory>('shop');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Inline Quick Quote state
  const [quickName, setQuickName] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickBusiness, setQuickBusiness] = useState('');
  const [quickCategory, setQuickCategory] = useState<BusinessCategory>('shop');
  const [quickSubmitted, setQuickSubmitted] = useState(false);

  const t = translations[lang];
  const isHi = lang === 'hi';
  const cleanPhone = config.whatsapp.replace(/\D/g, '');

  const handleOpenDemo = (category: BusinessCategory) => {
    setActiveDemo(category);
  };

  const handleOpenEnquiryForPlan = (planId: string, category: BusinessCategory = 'shop') => {
    setEnquiryPlan(planId);
    setEnquiryCategory(category);
    setIsEnquiryOpen(true);
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPhone.trim()) return;

    const message = encodeURIComponent(
      `Hello ${config.businessName}!\nI want to get a business website for:\n• Name: ${quickName || 'Client'}\n• Business: ${quickBusiness || 'Local Business'}\n• Category: ${quickCategory.toUpperCase()}\n• City: ${config.city}\nPlease send me the demo links and price quotation.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
    setQuickSubmitted(true);
  };

  const categoryIcons: Record<BusinessCategory, React.ReactNode> = {
    shop: <Store className="w-5 h-5" />,
    coaching: <GraduationCap className="w-5 h-5" />,
    clinic: <HeartPulse className="w-5 h-5" />,
    services: <Wrench className="w-5 h-5" />,
    other: <Layers className="w-5 h-5" />,
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Notice Bar with local identity */}
      <div className="bg-slate-900 text-slate-200 px-4 py-2 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="font-semibold text-emerald-400">
              {config.city} {isHi ? 'डिजिटल हब' : 'Web Studio'}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="truncate text-slate-300">
              {isHi
                ? 'दुकान, कोचिंग, क्लिनिक और तकनीशियनों के लिए 48 घंटे में रेडी वेबसाइट्स'
                : 'Customizable websites delivered in 48 hours with WhatsApp order integration'}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${config.phone}`}
              className="hidden sm:inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>{config.phone}</span>
            </a>
            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="text-[11px] bg-slate-800 hover:bg-slate-700 text-emerald-400 px-2 py-0.5 rounded border border-slate-700 transition-colors"
            >
              ⚙️ {isHi ? 'कस्टमाइज़र' : 'Customize Live'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <Navbar
        config={config}
        lang={lang}
        onToggleLang={() => setLang(lang === 'en' ? 'hi' : 'en')}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
      />

      <main>
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-white border-b border-slate-200 pt-8 pb-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Headline and Call-to-actions */}
              <div className="lg:col-span-7 space-y-6">
                {/* Location kicker */}
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isHi ? `${config.city} एवं उत्तर प्रदेश के छोटे व्यापारियों के लिए` : `Made for Local Businesses in ${config.city} & India`}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 text-balance leading-tight">
                  {t.hero.titleLine1}{' '}
                  <span className="text-emerald-700 underline decoration-emerald-300 underline-offset-4">
                    {t.hero.titleHighlight}
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                  {t.hero.description}
                </p>

                {/* Proof Pills */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700 pt-1">
                  <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.hero.guaranteePill1}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.hero.guaranteePill2}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.hero.guaranteePill3}</span>
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <a
                    href="#demos"
                    className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <span>{t.hero.ctaPrimary}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                      isHi
                        ? `नमस्ते ${config.businessName}! मुझे अपनी दुकान/कोचिंग की वेबसाइट बनवानी है। कृपया जानकारी दें।`
                        : `Hello ${config.businessName}! I want to create a website for my business.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.hero.ctaSecondary}</span>
                  </a>

                  <button
                    onClick={() => setIsCustomizerOpen(true)}
                    className="px-4 py-3.5 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Sliders className="w-4 h-4 text-slate-500" />
                    <span className="truncate">{isHi ? 'लाइव कस्टमाइज़' : 'Try Customizer'}</span>
                  </button>
                </div>

                {/* Quick Indian Metrics Strip */}
                <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-4">
                  <div>
                    <span className="text-lg sm:text-xl font-bold text-slate-900 tabular-nums block">
                      ₹2,999
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {isHi ? 'किफायती शुरुआती कीमत' : 'Starting Price'}
                    </span>
                  </div>
                  <div>
                    <span className="text-lg sm:text-xl font-bold text-slate-900 tabular-nums block">
                      &lt; 2s
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {isHi ? 'जियो/एयरटेल 4G स्पीड' : 'Loads on 4G'}
                    </span>
                  </div>
                  <div>
                    <span className="text-lg sm:text-xl font-bold text-emerald-700 tabular-nums block">
                      48h
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {isHi ? 'तैयार व लाइव डिलीवरी' : 'Turnaround Time'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Studio Visual Asset */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100">
                  <img
                    src="/src/assets/images/hero_smartweb_studio_1792489119791.jpg"
                    alt="SmartWeb Lucknow Digital Studio creating websites for Indian businesses"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover aspect-16/9 sm:aspect-4/3"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-4 sm:p-6 text-white">
                    <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-1">
                      {config.businessName} · {config.city} Studio
                    </span>
                    <p className="text-sm sm:text-base font-bold text-white leading-snug">
                      {isHi
                        ? 'दुकानदारों व छोटे व्यापारियों को ऑनलाइन ऑर्डर दिलाने वाली आधुनिक वेबसाइट्स'
                        : 'Custom, high-conversion websites that convert casual visitors into paying customers on WhatsApp.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DEMO WEBSITES SHOWROOM SECTION */}
        <section id="demos" className="py-16 sm:py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase mb-2 block">
                {t.demosSection.eyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                {t.demosSection.heading}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.demosSection.subheading}
              </p>
            </div>

            {/* Demo Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {demoItems.map((demo) => (
                <div
                  key={demo.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Visual slot */}
                    <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                      <img
                        src={demo.image}
                        alt={isHi ? demo.titleHi : demo.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5">
                        {categoryIcons[demo.id]}
                        <span>{isHi ? demo.categoryLabelHi : demo.categoryLabel}</span>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <button
                          onClick={() => handleOpenDemo(demo.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-md transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{t.demosSection.previewAction}</span>
                        </button>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6">
                      <div className="text-xs text-slate-500 mb-1 flex items-center gap-2">
                        <span>{demo.sampleBusinessName}</span>
                        <span aria-hidden="true">·</span>
                        <span>{demo.sampleLocation}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                        {isHi ? demo.titleHi : demo.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                        {isHi ? demo.subtitleHi : demo.subtitle}
                      </p>

                      {/* Features list */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        {(isHi ? demo.featuresHi : demo.features).map((feat, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="p-5 sm:p-6 pt-0 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenDemo(demo.id)}
                      className="flex-1 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Laptop className="w-3.5 h-3.5" />
                      <span>{isHi ? 'लाइव चलाकर देखें' : 'Test Live Website'}</span>
                    </button>

                    <button
                      onClick={() => handleOpenEnquiryForPlan('growth', demo.id)}
                      className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                      title="Order this template"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{isHi ? 'यह डिज़ाइन लें' : 'Get This Design'}</span>
                      <span className="sm:hidden">{isHi ? 'ऑर्डर' : 'Order'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Note below demos */}
            <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center max-w-2xl mx-auto text-xs text-emerald-900 leading-relaxed">
              <strong>{isHi ? '💡 आसान कस्टमाइज़ेशन:' : '💡 Complete Customization:'}</strong>{' '}
              {t.demosSection.customBrandNotice}
            </div>
          </div>
        </section>

        {/* PRICING & PACKAGES SECTION */}
        <section id="pricing" className="py-16 sm:py-20 bg-white border-t border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase mb-2 block">
                {t.pricingSection.eyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                {t.pricingSection.heading}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.pricingSection.subheading}
              </p>
            </div>

            {/* 3 Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`rounded-2xl border p-6 flex flex-col justify-between transition-all relative ${
                    plan.popular
                      ? 'border-emerald-600 shadow-md bg-emerald-50/20 ring-1 ring-emerald-600'
                      : 'border-slate-200 bg-white shadow-2xs'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-700 text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                      {t.pricingSection.mostPopular}
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {isHi ? plan.nameHi : plan.name}
                    </h3>
                    <p className="text-xs text-slate-500 mb-4 min-h-[32px]">
                      {isHi ? plan.bestForHi : plan.bestFor}
                    </p>

                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
                        ₹{plan.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-sm text-slate-400 line-through tabular-nums">
                        ₹{plan.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="text-[11px] text-emerald-700 font-semibold mb-6 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{t.pricingSection.deliveryLabel}: {isHi ? plan.deliveryTimeHi : plan.deliveryTime}</span>
                    </div>

                    <div className="space-y-2.5 pt-4 border-t border-slate-100">
                      {(isHi ? plan.featuresHi : plan.features).map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 space-y-2">
                    <button
                      onClick={() => handleOpenEnquiryForPlan(plan.id, plan.includedDemoId)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                        plan.popular
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{t.pricingSection.getStarted}</span>
                    </button>

                    <button
                      onClick={() => handleOpenDemo(plan.includedDemoId)}
                      className="w-full py-2 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isHi ? 'संबंधित डेमो देखें' : 'View Sample Demo'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Optional Add-on upgrades */}
            <div className="mt-14 max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-slate-900">
                  {t.pricingSection.addonsTitle}
                </h3>
                <p className="text-xs text-slate-500">
                  {t.pricingSection.addonsSub}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {addonServices.map((addon, i) => (
                  <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-bold text-slate-900">
                        {isHi ? addon.nameHi : addon.name}
                      </h4>
                      <span className="text-xs font-bold text-emerald-700 tabular-nums">
                        ₹{addon.price}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {isHi ? addon.descHi : addon.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="process" className="py-16 sm:py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase mb-2 block">
                {t.processSection.eyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                {t.processSection.heading}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.processSection.subheading}
              </p>
            </div>

            {/* 4 Editorial Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-2">
                <span className="text-xs font-bold text-emerald-700 tracking-wider">01.</span>
                <h3 className="text-base font-bold text-slate-900">
                  {t.processSection.step1Title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.processSection.step1Desc}
                </p>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-2">
                <span className="text-xs font-bold text-emerald-700 tracking-wider">02.</span>
                <h3 className="text-base font-bold text-slate-900">
                  {t.processSection.step2Title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.processSection.step2Desc}
                </p>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-2">
                <span className="text-xs font-bold text-emerald-700 tracking-wider">03.</span>
                <h3 className="text-base font-bold text-slate-900">
                  {t.processSection.step3Title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.processSection.step3Desc}
                </p>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-2">
                <span className="text-xs font-bold text-emerald-700 tracking-wider">04.</span>
                <h3 className="text-base font-bold text-slate-900">
                  {t.processSection.step4Title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.processSection.step4Desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY US / AUTHENTIC COMMITMENTS SECTION */}
        <section id="why-us" className="py-16 sm:py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase mb-2 block">
                {t.whyUsSection.eyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                {t.whyUsSection.heading}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.whyUsSection.subheading}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-lg w-fit">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {t.whyUsSection.card1Title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.whyUsSection.card1Desc}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-lg w-fit">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {t.whyUsSection.card2Title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.whyUsSection.card2Desc}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-lg w-fit">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {t.whyUsSection.card3Title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.whyUsSection.card3Desc}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-lg w-fit">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {t.whyUsSection.card4Title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.whyUsSection.card4Desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CUSTOMER ENQUIRY INLINE FORM */}
        <section id="enquiry" className="py-16 sm:py-20 bg-slate-900 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase block">
                  {t.enquiry.eyebrow}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                  {t.enquiry.heading}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t.enquiry.subheading}
                </p>

                <div className="space-y-2 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{isHi ? '48 घंटे में वेबसाइट का लाइव ड्राफ्ट' : 'Live prototype within 48 hours'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{isHi ? 'सीधे व्हाट्सएप पर फोटो व विवरण साझा करें' : 'Share content directly on WhatsApp'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{isHi ? 'बिना संतुष्टि के कोई अग्रिम भुगतान नहीं' : 'Zero advance until you review draft'}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href={`https://wa.me/${cleanPhone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{isHi ? 'व्हाट्सएप चैट शुरू करें' : 'Direct WhatsApp Chat'}</span>
                  </a>
                </div>
              </div>

              {/* Form Card */}
              <div className="lg:col-span-7 bg-white text-slate-900 rounded-2xl p-6 sm:p-7 shadow-xl">
                {quickSubmitted ? (
                  <div className="text-center py-6 space-y-3">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {isHi ? 'व्हाट्सएप पर संपर्क तैयार है!' : 'Ready on WhatsApp!'}
                    </h3>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto">
                      {isHi
                        ? 'आपका अनुरोध तैयार कर दिया गया है। त्वरित बातचीत के लिए नीचे दिए गए बटन पर क्लिक करें।'
                        : 'Your request has been formatted. Click below to continue directly in WhatsApp.'}
                    </p>
                    <button
                      onClick={() => setQuickSubmitted(false)}
                      className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700"
                    >
                      {isHi ? 'नया फॉर्म भरें' : 'Fill another'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleQuickSubmit} className="space-y-3">
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      {isHi ? 'अपनी दुकान या व्यापार का विवरण भरें' : 'Tell Us About Your Business'}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          {isHi ? 'आपका नाम *' : 'Your Name *'}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder={isHi ? 'उदा. अमित गुप्ता' : 'e.g. Amit Gupta'}
                          value={quickName}
                          onChange={(e) => setQuickName(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-emerald-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          {isHi ? 'व्हाट्सएप नंबर *' : 'WhatsApp Number *'}
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="10-digit number (e.g. 9876543210)"
                          value={quickPhone}
                          onChange={(e) => setQuickPhone(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-emerald-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          {isHi ? 'दुकान या संस्थान का नाम' : 'Shop / Business Name'}
                        </label>
                        <input
                          type="text"
                          placeholder={isHi ? 'उदा. गुप्ता किराना स्टोर' : 'e.g. Gupta Store'}
                          value={quickBusiness}
                          onChange={(e) => setQuickBusiness(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-emerald-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          {isHi ? 'व्यापार का प्रकार' : 'Business Vertical'}
                        </label>
                        <select
                          value={quickCategory}
                          onChange={(e) => setQuickCategory(e.target.value as BusinessCategory)}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-emerald-600 bg-white"
                        >
                          <option value="shop">{isHi ? 'दुकान / रिटेल स्टोर' : 'Retail Shop / Boutique'}</option>
                          <option value="coaching">{isHi ? 'कोचिंग / ट्यूशन' : 'Coaching Institute'}</option>
                          <option value="clinic">{isHi ? 'डॉक्टर क्लिनिक / डेंटल' : 'Doctor & Clinic'}</option>
                          <option value="services">{isHi ? 'इलेक्ट्रीशियन / प्लंबर' : 'Electrician & Plumber'}</option>
                          <option value="other">{isHi ? 'अन्य व्यापार' : 'Other Business'}</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors mt-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{isHi ? 'व्हाट्सएप पर तुरंत कोटेशन व डेमो प्राप्त करें' : 'Get Live Demo & Quote on WhatsApp'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section id="faq" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase mb-2 block">
                {t.faq.eyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                {t.faq.heading}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.faq.subheading}
              </p>
            </div>

            <div className="space-y-3">
              {[
                { q: t.faq.q1, a: t.faq.a1 },
                { q: t.faq.q2, a: t.faq.a2 },
                { q: t.faq.q3, a: t.faq.a3 },
                { q: t.faq.q4, a: t.faq.a4 },
                { q: t.faq.q5, a: t.faq.a5 },
                { q: t.faq.q6, a: t.faq.a6 },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 text-sm hover:text-emerald-700 transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                        openFaq === idx ? 'rotate-180 text-emerald-600' : ''
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer
        config={config}
        lang={lang}
        onOpenDemo={handleOpenDemo}
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* MOBILE BOTTOM QUICK BAR (15% mobile sticky cap compliant) */}
      <MobileQuickBar
        config={config}
        lang={lang}
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
        onScrollToDemos={() => {
          document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* FLOATING WHATSAPP BUTTON (Desktop & Tablet) */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40">
        <a
          href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
            isHi
              ? `नमस्ते ${config.businessName}! मुझे अपने व्यापार के लिए वेबसाइट बनवानी है।`
              : `Hello ${config.businessName}! I am interested in building a website.`
          )}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-xl hover:shadow-2xl transition-all font-semibold text-xs group"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
          <span className="pr-1">{isHi ? 'व्हाट्सएप पर बात करें' : 'Chat on WhatsApp'}</span>
        </a>
      </div>

      {/* MODALS */}
      <DemoModal
        demoId={activeDemo}
        onClose={() => setActiveDemo(null)}
        config={config}
        lang={lang}
        onSelectTemplate={(category) => {
          setActiveDemo(null);
          handleOpenEnquiryForPlan('growth', category);
        }}
      />

      <CustomizerDrawer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        config={config}
        onChangeConfig={setConfig}
        lang={lang}
      />

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        config={config}
        lang={lang}
        defaultPlan={enquiryPlan}
        defaultCategory={enquiryCategory}
      />
    </div>
  );
}
