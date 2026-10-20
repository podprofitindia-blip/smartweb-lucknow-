import React, { useState } from 'react';
import { X, Send, MessageCircle, CheckCircle2, Calculator, ShieldCheck, Phone, MapPin } from 'lucide-react';
import { BusinessCategory, BusinessConfig, EnquirySubmission, Language } from '../types';
import { pricingPlans, addonServices } from '../data/packages';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BusinessConfig;
  lang: Language;
  defaultPlan?: string;
  defaultCategory?: BusinessCategory;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  config,
  lang,
  defaultPlan = 'growth',
  defaultCategory = 'shop',
}) => {
  const isHi = lang === 'hi';
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState<BusinessCategory>(defaultCategory);
  const [city, setCity] = useState(config.city);
  const [selectedPlan, setSelectedPlan] = useState<string>(defaultPlan);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState<EnquirySubmission | null>(null);
  const [phoneError, setPhoneError] = useState('');

  if (!isOpen) return null;

  // Calculate live estimate
  const currentPlan = pricingPlans.find((p) => p.id === selectedPlan) || pricingPlans[1];
  const addonsTotal = selectedAddons.reduce((sum, name) => {
    const addon = addonServices.find((a) => a.name === name);
    return sum + (addon ? addon.price : 0);
  }, 0);
  const totalEstimate = currentPlan.price + addonsTotal;

  const toggleAddon = (name: string) => {
    if (selectedAddons.includes(name)) {
      setSelectedAddons(selectedAddons.filter((n) => n !== name));
    } else {
      setSelectedAddons([...selectedAddons, name]);
    }
  };

  const validatePhone = (num: string) => {
    const clean = num.replace(/\D/g, '');
    if (clean.length < 10) {
      setPhoneError(isHi ? 'कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें' : 'Please enter a valid 10-digit mobile number');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(phone)) return;

    const newEnquiry: EnquirySubmission = {
      id: `SWL-${Date.now().toString().slice(-6)}`,
      fullName,
      phone,
      businessName,
      category,
      city,
      selectedPlan: currentPlan.name,
      notes,
      estimatedTotal: totalEstimate,
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    // Save to local storage for agency inquiries history
    try {
      const existing = JSON.parse(localStorage.getItem('smartweb_enquiries') || '[]');
      localStorage.setItem('smartweb_enquiries', JSON.stringify([newEnquiry, ...existing]));
    } catch {
      // ignore
    }

    setSubmitted(newEnquiry);
  };

  const handleWhatsAppDirect = () => {
    const cleanAgencyPhone = config.whatsapp.replace(/\D/g, '');
    const addonText = selectedAddons.length > 0 ? `\n• Add-ons: ${selectedAddons.join(', ')}` : '';
    const message = encodeURIComponent(
      `*New Website Consultation Request - SmartWeb Lucknow*\n\n` +
      `• Name: ${fullName || 'Client'}\n` +
      `• Mobile: ${phone || 'Not provided'}\n` +
      `• Business: ${businessName || 'My Business'}\n` +
      `• Category: ${category.toUpperCase()}\n` +
      `• City: ${city}\n` +
      `• Selected Package: ${currentPlan.name} (₹${currentPlan.price})${addonText}\n` +
      `• Total Estimated: ₹${totalEstimate.toLocaleString('en-IN')}\n` +
      (notes ? `• Requirements: ${notes}\n` : '') +
      `\nPlease share the draft mockup and 48-hour timeline.`
    );
    window.open(`https://wa.me/${cleanAgencyPhone}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-fade-in my-8">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-emerald-700 tracking-wider uppercase block">
              {isHi ? 'मुफ्त परामर्श एवं कोटेशन' : 'Instant Quote & Consultation'}
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              {isHi ? 'अपने व्यापार के लिए वेबसाइट का अनुरोध करें' : 'Get Your Custom Business Website'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">
                {isHi ? 'पूछताछ सफलतापूर्वक दर्ज की गई!' : 'Enquiry Received Successfully!'}
              </h4>
              <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                {isHi
                  ? `आपकी संदर्भ संख्या #${submitted.id} है। हमारी टीम 2 घंटे के भीतर संपर्क करेगी।`
                  : `Your Reference ID is #${submitted.id}. Our Lucknow development team will review and get in touch within 2 business hours.`}
              </p>
            </div>

            {/* Summary card */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-1.5 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-500">{isHi ? 'व्यापार का नाम:' : 'Business Name:'}</span>
                <span className="font-semibold text-slate-900">{submitted.businessName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{isHi ? 'पैकेज:' : 'Package:'}</span>
                <span className="font-semibold text-slate-900">{submitted.selectedPlan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{isHi ? 'अनुमानित कुल लागत:' : 'Estimated Total:'}</span>
                <span className="font-bold text-emerald-700 tabular-nums">₹{submitted.estimatedTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleWhatsAppDirect}
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isHi ? 'सीधे व्हाट्सएप पर भेजें (त्वरित)' : 'Send on WhatsApp for Instant Reply'}</span>
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold transition-colors"
              >
                {isHi ? 'बंद करें' : 'Close'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isHi ? 'आपका पूरा नाम *' : 'Your Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isHi ? 'उदा. राकेश वर्मा' : 'e.g. Rakesh Verma'}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isHi ? 'मोबाइल / व्हाट्सएप नंबर *' : 'WhatsApp Number *'}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit number (e.g. 9876543210)"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (phoneError) validatePhone(e.target.value);
                  }}
                  className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-emerald-600 ${
                    phoneError ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {phoneError && <p className="text-[10px] text-red-600 mt-1">{phoneError}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isHi ? 'दुकान या व्यापार का नाम *' : 'Shop or Business Name *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isHi ? 'उदा. लक्ष्मी वस्त्रालय' : 'e.g. Laxmi Garments / Apex Tutorials'}
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isHi ? 'शहर / ज़िला' : 'City / District'}
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isHi ? 'व्यापार का प्रकार' : 'Business Category'}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as BusinessCategory)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-emerald-600 bg-white"
                >
                  <option value="shop">{isHi ? 'दुकान / रिटेल स्टोर' : 'Retail Shop / Store'}</option>
                  <option value="coaching">{isHi ? 'कोचिंग / ट्यूशन' : 'Coaching Centre / Tuitions'}</option>
                  <option value="clinic">{isHi ? 'डॉक्टर क्लिनिक / डेंटल' : 'Clinic & Doctor'}</option>
                  <option value="services">{isHi ? 'इलेक्ट्रीशियन / प्लंबर' : 'Electrician & Plumber'}</option>
                  <option value="other">{isHi ? 'अन्य व्यापार' : 'Other Small Business'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isHi ? 'पसंदीदा पैकेज' : 'Preferred Website Package'}
                </label>
                <select
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-emerald-600 bg-white font-medium"
                >
                  {pricingPlans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {isHi ? p.nameHi : p.name} (₹{p.price.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Optional Addons */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {isHi ? 'अतिरिक्त सुविधाएं (वैकल्पिक)' : 'Optional Add-on Features'}
              </label>
              <div className="space-y-1.5">
                {addonServices.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.name);
                  return (
                    <label
                      key={addon.name}
                      className={`flex items-center justify-between p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                        isChecked
                          ? 'border-emerald-600 bg-emerald-50/50 text-emerald-950 font-medium'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleAddon(addon.name)}
                          className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                        />
                        <span>{isHi ? addon.nameHi : addon.name}</span>
                      </div>
                      <span className="font-semibold tabular-nums text-slate-900">+₹{addon.price}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isHi ? 'विशेष विवरण या उत्पाद (वैकल्पिक)' : 'Specific Products / Requirements'}
              </label>
              <textarea
                rows={2}
                placeholder={isHi ? 'जैसे: 20 कुर्तियों के फोटो हैं, गूगल मैप्स लिंक आदि...' : 'e.g. Products list, timing, existing Facebook page link...'}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-emerald-600 resize-none"
              />
            </div>

            {/* Live Price Estimation Bar */}
            <div className="bg-slate-900 text-white rounded-xl p-3.5 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block">
                  {isHi ? 'अनुमानित कुल लागत (1 बार)' : 'Estimated Total (One-time)'}
                </span>
                <span className="text-xl font-bold tabular-nums text-emerald-400">
                  ₹{totalEstimate.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="text-right text-[11px] text-slate-300">
                <span className="block font-medium">{isHi ? '48 घंटे में लाइव डिलीवरी' : '48h Launch Guarantee'}</span>
                <span className="text-slate-400">{isHi ? 'कोई छुपा शुल्क नहीं' : 'No Hidden Charges'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
              <button
                type="submit"
                className="w-full sm:flex-1 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isHi ? 'पूछताछ सबमिट करें' : 'Submit Enquiry'}</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="w-full sm:flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{isHi ? 'व्हाट्सएप पर तुरंत भेजें' : 'Send via WhatsApp'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
