import { DemoItem } from '../types';
import retailShopImage from '../assets/images/demo_retail_shop_1792489119052.jpg';
import coachingImage from '../assets/images/demo_coaching_centre_1792489119868.jpg';
import clinicImage from '../assets/images/demo_doctor_clinic_1792489120712.jpg';
import servicesImage from '../assets/images/demo_electrician_plumber_1792489120359.jpg';

export const demoItems: DemoItem[] = [
  {
    id: 'shop',
    title: 'Retail Shop & Boutique Store',
    titleHi: 'दुकान, बुटीक एवं वस्त्र भंडार',
    subtitle: 'Showcase clothing collections, groceries, or goods with direct WhatsApp ordering and location directions.',
    subtitleHi: 'कपड़ों, किराना या उत्पादों का कैटलॉग, डायरेक्ट व्हाट्सएप ऑर्डर और दुकान के लोकेशन के साथ।',
    categoryLabel: 'Retail & Store',
    categoryLabelHi: 'दुकान व स्टोर',
    image: retailShopImage,
    sampleBusinessName: 'Aarya Ethnic Collection',
    sampleLocation: 'Hazratganj Market, Lucknow',
    features: [
      'Digital Product Showcase with price & sizes',
      'Direct "Order on WhatsApp" button on every item',
      'Store hours, Google Map directions & Click-to-Call',
      'Festival discount banner & customer FAQ',
    ],
    featuresHi: [
      'कीमत और साइज के साथ डिजिटल प्रोडक्ट कैटलॉग',
      'हर आइटम पर "व्हाट्सएप पर ऑर्डर करें" बटन',
      'दुकान का समय, गूगल मैप्स दिशा-निर्देश व कॉल बटन',
      'त्योहारी डिस्काउंट ऑफर बैनर व सामान्य प्रश्न',
    ],
  },
  {
    id: 'coaching',
    title: 'Coaching Centre & Tuition Institute',
    titleHi: 'कोचिंग सेंटर एवं ट्यूशन संस्थान',
    subtitle: 'Present faculty, batch timings, admission fees, and allow students/parents to book free demo classes.',
    subtitleHi: 'शिक्षकों का परिचय, नए बैच का समय, फीस विवरण और फ्री डेमो क्लास बुकिंग की आसान सुविधा।',
    categoryLabel: 'Education & Coaching',
    categoryLabelHi: 'शिक्षा व कोचिंग',
    image: coachingImage,
    sampleBusinessName: 'Apex Science & Math Academy',
    sampleLocation: 'Aliganj & Kapoorthala, Lucknow',
    features: [
      'Course list: Class 9-12, IIT-JEE / NEET foundation',
      'Live batch schedule & syllabus download link',
      'Book Free 2-Day Demo Class form with instant WhatsApp notification',
      'Teacher qualifications & student classroom gallery',
    ],
    featuresHi: [
      'कक्षा 9-12, IIT-JEE व NEET फाउंडेशन कोर्स सूची',
      'नए बैचों का समय और सिलेबस विवरण',
      '2 दिन की फ्री डेमो क्लास बुक करने का फॉर्म (सीधे व्हाट्सएप पर)',
      'शिक्षकों की योग्यता और आधुनिक क्लासरूम फोटो गैलरी',
    ],
  },
  {
    id: 'clinic',
    title: 'Clinic, Doctor & Dental Care',
    titleHi: 'डॉक्टर क्लिनिक एवं दंत चिकित्सा',
    subtitle: 'Professional medical presence with consultation fees, OPD timings, doctor credentials, and 1-tap appointment booking.',
    subtitleHi: 'डॉक्टर की डिग्री, ओपीडी का समय, परामर्श शुल्क और मरीज के लिए 1-क्लिक व्हाट्सएप अपॉइंटमेंट।',
    categoryLabel: 'Healthcare & Clinic',
    categoryLabelHi: 'स्वास्थ्य व क्लिनिक',
    image: clinicImage,
    sampleBusinessName: 'Sanjeevani Clinic & Dental Care',
    sampleLocation: 'Gomti Nagar, Lucknow',
    features: [
      'Doctor profiles (MBBS, MD / BDS) and experience',
      'Transparent consultation charges (₹300 - ₹800)',
      'Morning & Evening OPD schedule',
      'Instant "Book Appointment on WhatsApp" button with date/slot picker',
    ],
    featuresHi: [
      'डॉक्टर की योग्यता (MBBS, MD / BDS) व अनुभव',
      'पारदर्शी परामर्श शुल्क विवरण (₹300 - ₹800)',
      'सुबह एवं शाम का ओपीडी समय सारणी',
      'व्हाट्सएप पर तारीख व स्लॉट चुनकर तुरंत अपॉइंटमेंट बुक करने की सुविधा',
    ],
  },
  {
    id: 'services',
    title: 'Electrician, Plumber & Home Services',
    titleHi: 'इलेक्ट्रीशियन, प्लंबर व होम रिपेयर',
    subtitle: 'High-conversion service page with transparent repair rate card, 30-min emergency response, and 1-tap call button.',
    subtitleHi: 'पारदर्शी रिपेयर रेट कार्ड, 30 मिनट में त्वरित आगमन और 1-क्लिक सीधा कॉलिंग बटन।',
    categoryLabel: 'Home Services',
    categoryLabelHi: 'होम रिपेयर व सेवाएं',
    image: servicesImage,
    sampleBusinessName: 'Lucknow QuickFix Electrical & Plumbing',
    sampleLocation: 'Covering Hazratganj, Gomti Nagar, Indira Nagar, Aliganj',
    features: [
      'Fixed rate card (Fan install ₹199, Leak repair ₹249, Wiring ₹499)',
      'Instant Emergency "Call Technician Now" floating button',
      'Service area coverage map across Lucknow and nearby areas',
      'Verified technicians with safety multimeter & genuine spare parts',
    ],
    featuresHi: [
      'फिक्स रेट लिस्ट (पंखा इंस्टाल ₹199, पाइप लीकेज ₹249, वायरिंग ₹499)',
      'आपातकालीन "टेक्नीशियन को तुरंत कॉल करें" बटन',
      'लखनऊ के सभी प्रमुख इलाकों में 30 मिनट में पहुंच',
      'अनुभवी कारीगर, सुरक्षा मीटर और ओरिजिनल पार्ट्स की गारंटी',
    ],
  },
];
