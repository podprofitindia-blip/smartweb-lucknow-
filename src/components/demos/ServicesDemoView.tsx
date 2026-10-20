import React, { useState } from 'react';
import { Wrench, Zap, Droplets, ShieldCheck, Phone, MessageCircle, MapPin, CheckCircle, Clock } from 'lucide-react';
import { BusinessConfig, Language } from '../../types';

interface ServicesDemoViewProps {
  config: BusinessConfig;
  lang: Language;
}

export const ServicesDemoView: React.FC<ServicesDemoViewProps> = ({ config, lang }) => {
  const isHi = lang === 'hi';
  const [activeTab, setActiveTab] = useState<'all' | 'electric' | 'plumbing'>('all');
  const [requestedService, setRequestedService] = useState<string | null>(null);

  const services = [
    {
      id: 1,
      category: 'electric',
      title: isHi ? 'सीलिंग फैन इंस्टॉलेशन एवं रिपेयर' : 'Ceiling Fan Installation & Repair',
      price: 199,
      unit: isHi ? 'प्रति पंखा' : 'per unit',
      desc: isHi ? 'नया पंखा लगाना, रेगुलेटर बदलना, धीमी स्पीड या कंपन ठीक करना' : 'New installation, regulator replacement, bearing & noise fix',
    },
    {
      id: 2,
      category: 'electric',
      title: isHi ? 'एमसीबी ट्रिपिंग व शॉर्ट-सर्किट जांच' : 'MCB Tripping & Short-Circuit Fix',
      price: 299,
      unit: isHi ? 'विजिट शुल्क सहित' : 'with inspection',
      desc: isHi ? 'मल्टीमीटर से लीकेज करंट की जांच और मुख्य बोर्ड की सुरक्षित मरम्मत' : 'Multimeter wire tracing, fuse board & safety breaker repairs',
    },
    {
      id: 3,
      category: 'plumbing',
      title: isHi ? 'नल टपकना एवं पाइप लीकेज रिपेयर' : 'Tap Leakage & Water Pipe Repair',
      price: 249,
      unit: isHi ? 'प्रति पॉइंट' : 'per point',
      desc: isHi ? 'किचन सिंक, वॉश बेसिन या बाथरूम में रिसाव की तुरंत सीलिंग' : 'Sink, washbasin and concealed line leak sealing with Teflon',
    },
    {
      id: 4,
      category: 'plumbing',
      title: isHi ? 'सबमर्सिबल पंप व मोटर स्टार्टर जांच' : 'Submersible Pump & Motor Starter Fix',
      price: 499,
      unit: isHi ? 'डायग्नोस्टिक्स' : 'diagnostics',
      desc: isHi ? 'स्टार्टर रिले, कैपेसिटर बदलाव और पानी का कम प्रेशर ठीक करना' : 'Capacitor replacement, panel relay check & pressure fixing',
    },
    {
      id: 5,
      category: 'electric',
      title: isHi ? 'स्विच बोर्ड, सॉकेट एवं इन्वर्टर वायरिंग' : 'Switch Board & Inverter Connection',
      price: 149,
      unit: isHi ? 'प्रति स्विच बोर्ड' : 'per board',
      desc: isHi ? 'मॉड्यूलर स्विच बदलना, इन्वर्टर लाइन अलग करना व अर्थिंग चेक' : 'Modular socket fitting, separate inverter wiring & earthing test',
    },
    {
      id: 6,
      category: 'plumbing',
      title: isHi ? 'गीजर इंस्टॉलेशन एवं फ्लश रिपेयर' : 'Geyser Fitting & Flush Cistern Repair',
      price: 399,
      unit: isHi ? 'प्रति यूनिट' : 'per unit',
      desc: isHi ? 'नया वाटर हीटर कनेक्शन, सेफ्टी वाल्व एवं लीकेज-फ्री इनलेट पाइप' : 'Water heater mounting, safety valve installation & inlet connection',
    },
  ];

  const filtered = activeTab === 'all' 
    ? services 
    : services.filter(s => s.category === activeTab);

  const handleBook = (serviceName: string, price: number) => {
    const cleanPhone = config.whatsapp.replace(/\D/g, '');
    const msg = encodeURIComponent(
      `Hello ${config.businessName}, I need service for "${serviceName}" (₹${price}). Please dispatch an expert technician to my address.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
    setRequestedService(serviceName);
  };

  return (
    <div className="bg-amber-50/20 text-slate-900 min-h-screen font-sans pb-16">
      {/* Emergency Call Strip */}
      <div className="bg-amber-600 text-white px-4 py-2 text-xs text-center font-semibold flex items-center justify-center gap-2">
        <Zap className="w-3.5 h-3.5" />
        <span>
          {isHi
            ? `⚡ 30 मिनट में त्वरित सेवा! ${config.city} के सभी मुख्य क्षेत्रों में तकनीशियन उपलब्ध।`
            : `⚡ 30-Minute Fast Doorstep Arrival across all sectors of ${config.city}!`}
        </span>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <Wrench className="w-5 h-5 text-amber-600" />
              <span className="text-xl font-bold tracking-tight text-slate-900 block">
                {config.businessName}
              </span>
            </div>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-600" />
              {config.city} & Nearby Areas
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${config.phone}`}
              className="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg flex items-center gap-1.5 text-xs font-semibold shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{isHi ? 'टेक्नीशियन बुलाएं' : 'Call Now'}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-amber-100/50 to-slate-100 py-8 px-4 border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-wider uppercase text-amber-800 mb-2 inline-block">
            {isHi ? 'भरोसेमंद इलेक्ट्रीशियन एवं प्लंबर' : 'Certified Electrical & Plumbing Experts'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            {isHi
              ? `${config.businessName} - उचित रेट, पक्का काम, नो झंझट`
              : `Fast & Reliable Home Repairs at ${config.businessName}`}
          </h1>
          <p className="text-slate-600 text-sm max-w-xl mx-auto mb-4">
            {isHi
              ? 'बिजली और नल की हर समस्या का समाधान। फिक्स रेट कार्ड, कोई मनमाना चार्ज नहीं, प्रशिक्षित कारीगर।'
              : 'Fixed pricing, background-verified technicians, and 30-day service warranty on all electrical and plumbing jobs in Lucknow.'}
          </p>

          <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-700">
            <span className="bg-white px-3 py-1.5 rounded-full border border-slate-200 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-amber-600" /> {isHi ? '30 दिन की सर्विस गारंटी' : '30-Day Service Guarantee'}
            </span>
            <span className="bg-white px-3 py-1.5 rounded-full border border-slate-200 flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-600" /> {isHi ? 'समय पर घर पहुंच' : '30-Min Quick Arrival'}
            </span>
            <span className="bg-white px-3 py-1.5 rounded-full border border-slate-200 flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-amber-600" /> {isHi ? 'ओरिजिनल पार्ट्स' : 'Genuine Spares'}
            </span>
          </div>
        </div>
      </section>

      {/* Service Tabs */}
      <div className="max-w-5xl mx-auto px-4 mt-6">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {isHi ? 'सभी सेवाएं' : 'All Repairs'}
          </button>
          <button
            onClick={() => setActiveTab('electric')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors ${
              activeTab === 'electric'
                ? 'bg-amber-600 text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Zap className="w-3 h-3" />
            {isHi ? 'इलेक्ट्रिकल काम' : 'Electrical Works'}
          </button>
          <button
            onClick={() => setActiveTab('plumbing')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors ${
              activeTab === 'plumbing'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Droplets className="w-3 h-3" />
            {isHi ? 'प्लंबिंग व पानी रिपेयर' : 'Plumbing Services'}
          </button>
        </div>

        {requestedService && (
          <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-2 rounded-lg flex items-center justify-between">
            <span>
              {isHi
                ? `"${requestedService}" के लिए व्हाट्सएप रिक्वेस्ट तैयार हो गई है!`
                : `WhatsApp request prepared for "${requestedService}"!`}
            </span>
          </div>
        )}

        {/* Rate Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col justify-between hover:border-amber-400 transition-colors shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-slate-400 font-medium">
                    {item.category === 'electric' ? '⚡ ' + (isHi ? 'इलेक्ट्रिक' : 'Electrical') : '💧 ' + (isHi ? 'प्लंबिंग' : 'Plumbing')}
                  </span>
                  <span className="text-sm font-bold text-amber-700 tabular-nums">
                    ₹{item.price} <span className="text-[10px] text-slate-400 font-normal">/{item.unit}</span>
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-slate-600 mb-3">{item.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {isHi ? 'वारंटी लागू' : 'Warranty included'}
                </span>
                <button
                  onClick={() => handleBook(item.title, item.price)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{isHi ? 'बुक करें' : 'Book on WhatsApp'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coverage & Emergency Info */}
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-xl border border-slate-200 p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5 mb-2">
              <MapPin className="w-4 h-4 text-amber-600" />
              {isHi ? 'सेवा क्षेत्र (Service Area Coverage)' : 'Service Coverage Area'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isHi
                ? `हम ${config.city} के सभी प्रमुख इलाकों—हज़रतगंज, गोमती नगर, अलीगंज, इंदिरानगर, महानगर, राजाजीपुरम, आशियाना और तेलीबाग में 30 मिनट के भीतर सेवा प्रदान करते हैं।`
                : `We provide rapid 30-minute doorstep service across all residential and commercial zones in ${config.city} including Hazratganj, Gomti Nagar, Aliganj, and Indira Nagar.`}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5 mb-2">
              <Phone className="w-4 h-4 text-amber-600" />
              {isHi ? 'आपातकालीन कॉल हेल्पलाइन' : 'Direct Emergency Dispatch'}
            </h4>
            <p className="text-xs text-slate-600 mb-3">
              {isHi ? 'बिजली गुल होने या पाइप फटने पर बिना देर किए सीधे कॉल करें:' : 'Immediate assistance for electrical short-circuit or plumbing emergencies:'}
            </p>
            <a
              href={`tel:${config.phone}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{config.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
