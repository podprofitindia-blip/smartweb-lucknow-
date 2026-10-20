import React, { useState } from 'react';
import { HeartPulse, Stethoscope, Clock, Calendar, Phone, MessageCircle, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';
import { BusinessConfig, Language } from '../../types';

interface ClinicDemoViewProps {
  config: BusinessConfig;
  lang: Language;
}

export const ClinicDemoView: React.FC<ClinicDemoViewProps> = ({ config, lang }) => {
  const isHi = lang === 'hi';
  const [patientName, setPatientName] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. S. K. Awasthi (Physician)');
  const [slot, setSlot] = useState('Evening (5:00 PM - 7:00 PM)');
  const [booked, setBooked] = useState(false);

  const treatments = [
    {
      name: isHi ? 'सामान्य चिकित्सा एवं परामर्श (General OPD)' : 'General Health Consultation (OPD)',
      fee: 300,
      detail: isHi ? 'बीपी, शुगर, बुखार, सर्दी-खांसी एवं मौसमी बीमारियों का इलाज' : 'Fever, cough, seasonal illness, BP & blood sugar checkup',
    },
    {
      name: isHi ? 'दंत परीक्षण एवं स्केलिंग (Dental Cleaning)' : 'Dental Scaling & Teeth Polishing',
      fee: 799,
      detail: isHi ? 'दांतों की सफाई, मसूड़ों की सूजन व टार्टर हटाने का आधुनिक उपचार' : 'Advanced ultrasonic scaling, plaque removal & gum checkup',
    },
    {
      name: isHi ? 'रूट कैनाल ट्रीटमेंट (Root Canal RCT)' : 'Root Canal Therapy (RCT)',
      fee: 2499,
      detail: isHi ? 'दर्द रहित रोटरी आरसीटी, कैप एवं फिलिंग विकल्प सहित' : 'Painless single/multi-sitting rotary root canal treatment',
    },
    {
      name: isHi ? 'बाल रोग परामर्श एवं टीकाकरण (Pediatrics)' : 'Child Consultation & Vaccination',
      fee: 400,
      detail: isHi ? 'नवजात से 12 वर्ष तक के बच्चों का विकास चार्ट व अनिवार्य टीके' : 'Growth milestones, newborn checkups & government approved vaccines',
    },
    {
      name: isHi ? 'डिजिटल डेंटल एक्स-रे (RVG X-Ray)' : 'Digital Dental RVG X-Ray',
      fee: 250,
      detail: isHi ? 'तुरंत कंप्यूटर स्क्रीन पर दांतों की अंदरूनी जांच रिपोर्ट' : 'Instant high-resolution digital X-ray with minimal radiation',
    },
  ];

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) return;

    const message = encodeURIComponent(
      `Hello ${config.businessName}, I would like to book an appointment.\nPatient Name: ${patientName}\nDoctor: ${selectedDoctor}\nPreferred Slot: ${slot}\nPlease confirm available token number.`
    );
    const cleanPhone = config.whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
    setBooked(true);
  };

  return (
    <div className="bg-emerald-50/30 text-slate-900 min-h-screen font-sans pb-16">
      {/* Top Banner */}
      <div className="bg-teal-900 text-teal-100 px-4 py-2.5 text-xs text-center font-medium">
        {isHi
          ? '🩺 सुरक्षित एवं स्वच्छ वातावरण। सभी उपकरण ऑटोक्लेव से पूर्णतः विसंक्रमित (Sterilized)।'
          : '🩺 100% Hygienic Clinic Environment. Modern Digital Diagnostics & Autoclaved Equipment.'}
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <HeartPulse className="w-5 h-5 text-teal-700" />
              <span className="text-xl font-bold tracking-tight text-slate-900 block">
                {config.businessName}
              </span>
            </div>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-teal-700" />
              {config.city} {isHi ? 'शाखा' : 'Center'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${config.phone}`}
              className="p-2 text-slate-700 hover:text-teal-900 bg-slate-100 rounded-lg flex items-center gap-1 text-xs font-semibold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isHi ? 'कॉल करें' : 'Call'}</span>
            </a>
            <a
              href={`https://wa.me/${config.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${config.businessName}, I want to consult a doctor.`)}`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg flex items-center gap-1.5 text-xs font-semibold shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{isHi ? 'अपॉइंटमेंट लें' : 'WhatsApp'}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-teal-50 to-emerald-50/50 py-8 px-4 border-b border-teal-100">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-wider uppercase text-teal-800 mb-2 inline-block">
            {isHi ? 'अनुभवी डॉक्टरों द्वारा व्यक्तिगत देखभाल' : 'Trusted Family & Dental Healthcare'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            {isHi
              ? `${config.businessName} - आपकी और आपके परिवार की सेहत हमारी प्राथमिकता`
              : `Comprehensive Healthcare at ${config.businessName}`}
          </h1>
          <p className="text-slate-600 text-sm max-w-xl mx-auto mb-4">
            {isHi
              ? 'सामान्य चिकित्सा, बाल रोग परामर्श एवं आधुनिक डेंटल केयर एक ही छत के नीचे। बिना लंबी लाइन में लगे व्हाट्सएप पर स्लॉट बुक करें।'
              : 'Affordable, transparent family medical care & dental clinic in Lucknow. Book your time token on WhatsApp to avoid long waiting.'}
          </p>

          <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-700">
            <span className="bg-white px-3 py-1.5 rounded-full border border-teal-200 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-teal-700" /> {isHi ? 'पंजीकृत चिकित्सक' : 'Govt. Registered Doctors'}
            </span>
            <span className="bg-white px-3 py-1.5 rounded-full border border-teal-200 flex items-center gap-1">
              <Clock className="w-3 h-3 text-teal-700" /> {isHi ? 'कम प्रतीक्षा समय' : 'Zero Wait Token System'}
            </span>
            <span className="bg-white px-3 py-1.5 rounded-full border border-teal-200 flex items-center gap-1">
              <Stethoscope className="w-3 h-3 text-teal-700" /> {isHi ? 'सटीक निदान' : 'Digital Diagnosis'}
            </span>
          </div>
        </div>
      </section>

      {/* Appointment Booking Box */}
      <div className="max-w-4xl mx-auto px-4 -mt-4">
        <div className="bg-white rounded-xl border border-teal-200 p-4 sm:p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-teal-700" />
            <h3 className="text-sm font-bold text-slate-900">
              {isHi ? 'व्हाट्सएप पर तुरंत अपॉइंटमेंट टोकन लें' : 'Book an Appointment Token via WhatsApp'}
            </h3>
          </div>

          {booked ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-lg flex items-center justify-between">
              <span>
                {isHi
                  ? `धन्यवाद ${patientName}! आपका अपॉइंटमेंट अनुरोध व्हाट्सएप पर प्रेषित कर दिया गया है।`
                  : `Appointment request sent on WhatsApp for ${patientName}.`}
              </span>
              <button
                onClick={() => setBooked(false)}
                className="text-xs font-bold text-emerald-900 underline"
              >
                {isHi ? 'नया मरीज जोड़ें' : 'Reset'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookAppointment} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <input
                type="text"
                placeholder={isHi ? 'मरीज का नाम' : "Patient's Full Name"}
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
                className="px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-teal-600"
              />
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-teal-600 bg-white"
              >
                <option value="Dr. S. K. Awasthi (Physician)">Dr. S. K. Awasthi (MBBS, MD - Medicine)</option>
                <option value="Dr. Neha Awasthi (Dental Surgeon)">Dr. Neha Awasthi (BDS - Dental Specialist)</option>
              </select>
              <select
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                className="px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-teal-600 bg-white"
              >
                <option value="Morning (9:30 AM - 1:00 PM)">Morning: 9:30 AM - 1:00 PM</option>
                <option value="Evening (5:00 PM - 8:30 PM)">Evening: 5:00 PM - 8:30 PM</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{isHi ? 'टोकन प्राप्त करें' : 'Book Token'}</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Services & Fees */}
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <h2 className="text-lg font-bold text-slate-900 mb-1">
          {isHi ? 'परामर्श एवं उपचार शुल्क (पारदर्शी दरें)' : 'Consultation & Treatment Rate Card'}
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          {isHi ? 'कोई छुपा हुआ शुल्क नहीं। स्पष्ट और किफ़ायती इलाज।' : 'Transparent consultation charges with genuine pharmaceutical prescriptions.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {treatments.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col justify-between hover:border-teal-400 transition-colors shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-slate-900 text-sm">{t.name}</h3>
                  <span className="text-sm font-bold text-teal-800 tabular-nums">₹{t.fee}</span>
                </div>
                <p className="text-xs text-slate-600 mb-3">{t.detail}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {isHi ? 'ओपीडी समय में उपलब्ध' : 'Available in OPD hours'}
                </span>
                <a
                  href={`https://wa.me/${config.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${config.businessName}, I would like to consult for: ${t.name}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-900 rounded-lg text-xs font-semibold flex items-center gap-1"
                >
                  <MessageCircle className="w-3 h-3 text-teal-700" />
                  <span>{isHi ? 'पूछें' : 'Consult'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clinic OPD Timings */}
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-xl border border-slate-200 p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5 mb-2">
              <Clock className="w-4 h-4 text-teal-700" />
              {isHi ? 'ओपीडी परामर्श समय' : 'OPD Consultation Hours'}
            </h4>
            <div className="space-y-1.5 text-xs text-slate-600">
              <p className="flex justify-between border-b border-slate-100 pb-1">
                <span>{isHi ? 'सोमवार से शनिवार (सुबह)' : 'Monday - Saturday (Morning)'}</span>
                <span className="font-semibold text-slate-900">09:30 AM - 01:30 PM</span>
              </p>
              <p className="flex justify-between border-b border-slate-100 pb-1">
                <span>{isHi ? 'सोमवार से शनिवार (शाम)' : 'Monday - Saturday (Evening)'}</span>
                <span className="font-semibold text-slate-900">05:00 PM - 08:30 PM</span>
              </p>
              <p className="flex justify-between">
                <span>{isHi ? 'रविवार' : 'Sunday'}</span>
                <span className="font-semibold text-teal-700">{isHi ? 'केवल सुबह (10 AM - 1 PM)' : 'Morning Only (10 AM - 1 PM)'}</span>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5 mb-2">
              <MapPin className="w-4 h-4 text-teal-700" />
              {isHi ? 'क्लिनिक का पता व इमरजेंसी' : 'Clinic Address & Contact'}
            </h4>
            <p className="text-xs text-slate-600 mb-3">
              Sector 4, Near City Hospital Square, {config.city}, UP.
            </p>
            <div className="flex items-center gap-2">
              <a
                href={`tel:${config.phone}`}
                className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{isHi ? 'इमरजेंसी कॉल' : 'Emergency Call'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
