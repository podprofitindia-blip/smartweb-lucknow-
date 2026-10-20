import React, { useState } from 'react';
import { BookOpen, GraduationCap, Calendar, Users, Phone, MessageCircle, CheckCircle2, Clock, MapPin, Award } from 'lucide-react';
import { BusinessConfig, Language } from '../../types';

interface CoachingDemoViewProps {
  config: BusinessConfig;
  lang: Language;
}

export const CoachingDemoView: React.FC<CoachingDemoViewProps> = ({ config, lang }) => {
  const isHi = lang === 'hi';
  const [studentName, setStudentName] = useState('');
  const [targetClass, setTargetClass] = useState('Class 10');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const courses = [
    {
      id: 1,
      title: isHi ? 'कक्षा 9वीं एवं 10वीं - बोर्ड बूस्टर' : 'Class 9th & 10th - Board Booster',
      subjects: isHi ? 'विज्ञान, गणित, अंग्रेजी एवं सामाजिक विज्ञान' : 'Science, Maths, English & Social Studies',
      timing: isHi ? 'शाम 4:00 - 6:00 बजे' : '4:00 PM - 6:00 PM',
      fee: isHi ? '₹1,500 / माह' : '₹1,500 / month',
      badge: isHi ? 'नया बैच शुरू' : 'New Batch Starting',
    },
    {
      id: 2,
      title: isHi ? 'कक्षा 11वीं एवं 12वीं - PCM / PCB' : 'Class 11th & 12th - Science (PCM/PCB)',
      subjects: isHi ? 'भौतिकी, रसायन विज्ञान, गणित एवं जीव विज्ञान' : 'Physics, Chemistry, Mathematics & Biology',
      timing: isHi ? 'सुबह 7:00 - 9:30 बजे' : '7:00 AM - 9:30 AM',
      fee: isHi ? '₹2,200 / माह' : '₹2,200 / month',
      badge: isHi ? 'सीटें सीमित' : 'Limited Seats',
    },
    {
      id: 3,
      title: isHi ? 'IIT-JEE / NEET फाउंडेशन कोर्स' : 'IIT-JEE & NEET Foundation Course',
      subjects: isHi ? 'कॉन्सेप्ट क्लैरिटी, DPP शीट्स एवं साप्ताहिक टेस्ट' : 'Concept Mastery, DPP Sheets, Weekly Mock Tests',
      timing: isHi ? 'शाम 6:00 - 8:30 बजे' : '6:00 PM - 8:30 PM',
      fee: isHi ? '₹3,000 / माह' : '₹3,000 / month',
      badge: isHi ? 'प्रीमियम बैच' : 'Star Batch',
    },
    {
      id: 4,
      title: isHi ? 'स्पोकन इंग्लिश एवं पर्सनैलिटी डेवलपमेंट' : 'Spoken English & Personality Development',
      subjects: isHi ? 'इंटरव्यू तैयारी, फ्लूएंसी, ग्रामर एवं स्टेज कॉन्फिडेंस' : 'Fluency, Public Speaking, Grammar & Interview Prep',
      timing: isHi ? 'दोपहर 3:00 - 4:00 बजे' : '3:00 PM - 4:00 PM',
      fee: isHi ? '₹1,200 / माह' : '₹1,200 / month',
      badge: isHi ? 'सभी के लिए' : 'Open to All',
    },
  ];

  const faculty = [
    {
      name: isHi ? 'प्रो. आर. के. वर्मा' : 'Prof. R.K. Verma',
      exp: isHi ? '14+ वर्ष अनुभव (M.Sc Physics)' : '14+ Yrs Exp (M.Sc Physics)',
      subject: isHi ? 'भौतिक विज्ञान विशेषज्ञ' : 'Senior Physics Faculty',
    },
    {
      name: isHi ? 'डॉ. अंकिता शुक्ला' : 'Dr. Ankita Shukla',
      exp: isHi ? '10+ वर्ष अनुभव (Ph.D Chemistry)' : '10+ Yrs Exp (Ph.D Chemistry)',
      subject: isHi ? 'रसायन विज्ञान मेंटॉर' : 'Chemistry Mentor',
    },
    {
      name: isHi ? 'इंजी. अमित श्रीवास्तव' : 'Er. Amit Srivastava',
      exp: isHi ? '8+ वर्ष अनुभव (B.Tech, Maths Mentor)' : '8+ Yrs Exp (B.Tech Maths)',
      subject: isHi ? 'गणित एवं रीज़निंग' : 'Maths & Quantitative Faculty',
    },
  ];

  const handleBookDemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;

    const msg = encodeURIComponent(
      `Hello ${config.businessName}, I want to book a Free 2-Day Demo Class. Student Name: ${studentName}, Target Class: ${targetClass}. Please confirm batch timing.`
    );
    const cleanPhone = config.whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
    setBookingSuccess(true);
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen font-sans pb-16">
      {/* Top Banner */}
      <div className="bg-blue-900 text-blue-100 px-4 py-2.5 text-xs text-center font-medium">
        {isHi
          ? '🎯 नए सत्र 2026-27 के लिए प्रवेश प्रारंभ! पहले 30 विद्यार्थियों को रजिस्ट्रेशन फीस पर 100% छूट।'
          : '🎯 Admissions Open for Academic Session 2026-27! Register today for 2-Day Free Trial.'}
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <GraduationCap className="w-5 h-5 text-blue-700" />
              <span className="text-xl font-bold tracking-tight text-slate-900 block">
                {config.businessName}
              </span>
            </div>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-blue-700" />
              {config.city} {isHi ? 'सेंटर' : 'Main Center'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${config.phone}`}
              className="p-2 text-slate-700 hover:text-blue-900 bg-slate-100 rounded-lg flex items-center gap-1 text-xs font-semibold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isHi ? 'कॉल करें' : 'Call'}</span>
            </a>
            <a
              href={`https://wa.me/${config.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${config.businessName}, please share prospectus and fee structure.`)}`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg flex items-center gap-1.5 text-xs font-semibold shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{isHi ? 'एडमिशन पूछताछ' : 'WhatsApp'}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-slate-100 py-8 px-4 border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-wider uppercase text-blue-800 mb-2 inline-block">
            {isHi ? 'उत्कृष्ट परिणाम एवं समर्पित शिक्षक' : 'Dedicated Faculty & Proven Results'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            {isHi
              ? `${config.businessName} - सफलता की सच्ची राह`
              : `Building Bright Careers at ${config.businessName}`}
          </h1>
          <p className="text-slate-600 text-sm max-w-xl mx-auto mb-4">
            {isHi
              ? 'कक्षा 9 से 12 एवं प्रतियोगी परीक्षाओं की संपूर्ण तैयारी। छोटे बैच, व्यक्तिगत ध्यान और नियमित टेस्ट सीरीज।'
              : 'Comprehensive coaching for CBSE, ICSE, UP Board and competitive foundation exams in Lucknow with experienced faculty.'}
          </p>

          <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-700">
            <span className="bg-white px-3 py-1.5 rounded-full border border-slate-200 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-blue-600" /> {isHi ? 'साप्ताहिक मॉक टेस्ट' : 'Weekly Mock Tests'}
            </span>
            <span className="bg-white px-3 py-1.5 rounded-full border border-slate-200 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-blue-600" /> {isHi ? 'मुद्रित स्टडी नोट्स' : 'Printed Study Material'}
            </span>
            <span className="bg-white px-3 py-1.5 rounded-full border border-slate-200 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-blue-600" /> {isHi ? '2 दिन फ्री डेमो क्लास' : '2-Day Free Trial Class'}
            </span>
          </div>
        </div>
      </section>

      {/* Booking Drawer Card */}
      <div className="max-w-4xl mx-auto px-4 -mt-4">
        <div className="bg-white rounded-xl border border-blue-200 p-4 sm:p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-blue-700" />
            <h3 className="text-sm font-bold text-slate-900">
              {isHi ? '2 दिन की फ्री ट्रायल क्लास बुक करें' : 'Book a 2-Day Free Trial Demo Class'}
            </h3>
          </div>

          {bookingSuccess ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-lg flex items-center justify-between">
              <span>
                {isHi
                  ? `धन्यवाद ${studentName}! आपका डेमो क्लास अनुरोध व्हाट्सएप पर प्रेषित कर दिया गया है।`
                  : `Thank you ${studentName}! Your trial request has been opened on WhatsApp.`}
              </span>
              <button
                onClick={() => setBookingSuccess(false)}
                className="text-xs font-bold text-emerald-900 underline"
              >
                {isHi ? 'नया फॉर्म' : 'Reset'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookDemo} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder={isHi ? 'विद्यार्थी का नाम' : "Student's Full Name"}
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
                className="px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-blue-600"
              />
              <select
                value={targetClass}
                onChange={(e) => setTargetClass(e.target.value)}
                className="px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-blue-600 bg-white"
              >
                <option value="Class 9">Class 9 (CBSE / ICSE / UP)</option>
                <option value="Class 10">Class 10 Board Batch</option>
                <option value="Class 11">Class 11 Science (PCM / PCB)</option>
                <option value="Class 12">Class 12 Board + Foundation</option>
                <option value="IIT-JEE/NEET">IIT-JEE / NEET Foundation</option>
                <option value="Spoken English">Spoken English</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{isHi ? 'फ्री ट्रायल क्लास बुक करें' : 'Book Demo via WhatsApp'}</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <h2 className="text-lg font-bold text-slate-900 mb-1">
          {isHi ? 'उपलब्ध कोर्सेस एवं फीस' : 'Academic Courses & Batches'}
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          {isHi ? 'सभी बैचों में अनुभवी शिक्षकों द्वारा प्रत्यक्ष मार्गदर्शन दिया जाता है।' : 'Weekly doubt sessions and chapter-wise progress reports sent to parents.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col justify-between hover:border-blue-400 transition-colors shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {course.badge}
                  </span>
                  <span className="text-xs font-bold text-slate-900 tabular-nums">
                    {course.fee}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-600 mb-2">
                  {course.subjects}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                  <Clock className="w-3.5 h-3.5 text-blue-700" />
                  <span>{course.timing}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {isHi ? 'सीमित 25 विद्यार्थी / बैच' : 'Max 25 Students per Batch'}
                </span>
                <a
                  href={`https://wa.me/${config.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${config.businessName}, I want details for: ${course.title}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3 h-3 text-emerald-400" />
                  <span>{isHi ? 'पूछताछ करें' : 'Enquire'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Faculty */}
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <h2 className="text-lg font-bold text-slate-900 mb-3">
          {isHi ? 'हमारे समर्पित शिक्षक (Faculty)' : 'Senior Faculty Mentors'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {faculty.map((f, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-4">
              <h4 className="font-bold text-slate-900 text-sm">{f.name}</h4>
              <p className="text-xs text-blue-700 font-medium mt-0.5">{f.subject}</p>
              <p className="text-xs text-slate-500 mt-1">{f.exp}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
