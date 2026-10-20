import React, { useState } from 'react';
import { ShoppingBag, Phone, MapPin, Clock, Tag, MessageCircle, Check, Star } from 'lucide-react';
import { BusinessConfig, Language } from '../../types';

interface ShopDemoViewProps {
  config: BusinessConfig;
  lang: Language;
}

export const ShopDemoView: React.FC<ShopDemoViewProps> = ({ config, lang }) => {
  const isHi = lang === 'hi';
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'clothing' | 'festive' | 'daily'>('all');
  const [cartNotice, setCartNotice] = useState<string | null>(null);

  const products = [
    {
      id: 1,
      name: isHi ? 'लखनवी चिकनकारी कुर्ता सेट' : 'Lucknowi Chikankari Kurta Set',
      price: 1299,
      originalPrice: 1899,
      tag: isHi ? 'बेस्ट सेलर' : 'Best Seller',
      category: 'clothing',
      desc: isHi ? 'प्योर कॉटन, हाथ की महीन कढ़ाई, सभी साइज उपलब्ध' : 'Pure cotton, authentic hand embroidery, sizes M to XXL',
    },
    {
      id: 2,
      name: isHi ? 'चंदेरी सिल्क बनारसी साड़ी' : 'Chanderi Silk Banarasi Saree',
      price: 2499,
      originalPrice: 3499,
      tag: isHi ? 'प्रीमियम' : 'Premium',
      category: 'festive',
      desc: isHi ? 'जरी बॉर्डर, मैचिंग ब्लाउज पीस सहित, उत्सव स्पेशल' : 'Zari woven border with matching blouse piece, festival special',
    },
    {
      id: 3,
      name: isHi ? 'हैंडक्राफ्टेड दुपट्टा कलेक्शन' : 'Handcrafted Dupatta Collection',
      price: 599,
      originalPrice: 899,
      tag: isHi ? 'नई वैरायटी' : 'New Arrival',
      category: 'clothing',
      desc: isHi ? 'मल्टीकलर फ्लोरल डिजाइन, हल्के वजन में सुंदर लुक' : 'Multicolor floral design, lightweight elegant drape',
    },
    {
      id: 4,
      name: isHi ? 'डिजाइनर कॉटन अनारकली सूट' : 'Designer Cotton Anarkali Suit',
      price: 1899,
      originalPrice: 2699,
      tag: isHi ? 'ट्रेंडिंग' : 'Trending',
      category: 'festive',
      desc: isHi ? 'दुपट्टा और पैंट के साथ 3-पीस सेट, पार्टी वियर' : 'Complete 3-piece set with dupatta and pants, party wear',
    },
    {
      id: 5,
      name: isHi ? 'डेली वियर कॉटन कुर्तियां (कॉम्बो 2)' : 'Daily Wear Cotton Kurtis (Pack of 2)',
      price: 899,
      originalPrice: 1399,
      tag: isHi ? 'ऑफर' : 'Offer',
      category: 'daily',
      desc: isHi ? 'ऑफिस और कॉलेज के लिए आरामदायक सूती फैब्रिक' : 'Comfortable breathable fabric for office and daily casual wear',
    },
    {
      id: 6,
      name: isHi ? 'ज्वेलरी व मैचिंग एक्सेसरी सेट' : 'Matching Festive Jewellery Set',
      price: 499,
      originalPrice: 799,
      tag: isHi ? 'लोकप्रिय' : 'Popular',
      category: 'daily',
      desc: isHi ? 'कुंदन वर्क झुमका एवं नेकलेस सेट' : 'Kundan work earrings and choker necklace set',
    },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleOrder = (productName: string, price: number) => {
    const text = encodeURIComponent(
      `Hello ${config.businessName}, I would like to order "${productName}" (₹${price}) shown on your website. Please share available sizes and payment details.`
    );
    const cleanPhone = config.whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
    setCartNotice(productName);
    setTimeout(() => setCartNotice(null), 4000);
  };

  return (
    <div className="bg-stone-50 text-stone-900 min-h-screen font-sans pb-16">
      {/* Store Header */}
      <div className="bg-amber-900 text-amber-50 px-4 py-2.5 text-xs text-center font-medium">
        {isHi 
          ? '🎉 त्योहारी महाबचत: दुकान पर आने पर ₹500 की विशेष छूट!'
          : '🎉 Festival Mega Offer: Extra ₹500 off on in-store purchases above ₹2,000!'}
      </div>

      <header className="bg-white border-b border-stone-200 sticky top-0 z-20 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold tracking-tight text-amber-950 block">
              {config.businessName}
            </span>
            <span className="text-xs text-stone-500 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-800" />
              {config.city} {isHi ? 'मार्केट' : 'Market'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${config.phone}`}
              className="p-2 text-stone-700 hover:text-amber-900 bg-stone-100 rounded-lg flex items-center gap-1 text-xs font-semibold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isHi ? 'कॉल करें' : 'Call'}</span>
            </a>
            <a
              href={`https://wa.me/${config.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${config.businessName}, I want to check latest stock.`)}`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-1.5 text-xs font-semibold shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{isHi ? 'व्हाट्सएप चैट' : 'WhatsApp'}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-amber-50 to-stone-100 py-8 px-4 border-b border-stone-200">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-wider uppercase text-amber-800 mb-2 inline-block">
            {isHi ? 'प्रामाणिक पारंपरिक वस्त्र भंडार' : 'Authentic Traditional & Modern Apparel'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
            {isHi 
              ? `${config.businessName} - शादी व त्योहारों की बेहतरीन खरीदारी` 
              : `Welcome to ${config.businessName} - Festive & Daily Wear`}
          </h1>
          <p className="text-stone-600 text-sm max-w-xl mx-auto mb-4">
            {isHi 
              ? 'सर्वोत्तम गुणवत्ता, उचित दाम और लखनवी कारीगरी का अनूठा संगम। घर बैठे व्हाट्सएप पर ऑर्डर करें या दुकान पर पधारें।'
              : 'Handcrafted sarees, stylish suits, and kurtas at wholesale and retail rates. Order on WhatsApp or visit our showroom.'}
          </p>

          <div className="flex flex-wrap justify-center gap-2 text-xs text-stone-600">
            <span className="bg-white px-3 py-1.5 rounded-full border border-stone-200 flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-600" /> {isHi ? '100% शुद्ध कॉटन' : '100% Pure Fabric'}
            </span>
            <span className="bg-white px-3 py-1.5 rounded-full border border-stone-200 flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-600" /> {isHi ? 'होम डिलीवरी उपलब्ध' : 'Home Delivery in Lucknow'}
            </span>
            <span className="bg-white px-3 py-1.5 rounded-full border border-stone-200 flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-600" /> {isHi ? 'UPI व कैश स्वीकार्य' : 'Cash & UPI Accepted'}
            </span>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="max-w-5xl mx-auto px-4 mt-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-amber-900 text-white'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            {isHi ? 'सभी उत्पाद' : 'All Products'}
          </button>
          <button
            onClick={() => setSelectedCategory('clothing')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === 'clothing'
                ? 'bg-amber-900 text-white'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            {isHi ? 'कुर्ता व दुपट्टा' : 'Kurtas & Dupattas'}
          </button>
          <button
            onClick={() => setSelectedCategory('festive')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === 'festive'
                ? 'bg-amber-900 text-white'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            {isHi ? 'साड़ी व अनारकली' : 'Sarees & Anarkalis'}
          </button>
          <button
            onClick={() => setSelectedCategory('daily')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === 'daily'
                ? 'bg-amber-900 text-white'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            {isHi ? 'डेली वियर व कॉम्बो' : 'Daily Wear & Combos'}
          </button>
        </div>

        {cartNotice && (
          <div className="mt-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-2 rounded-lg flex items-center justify-between animate-fade-in">
            <span>
              {isHi ? `व्हाट्सएप पर "${cartNotice}" की पूछताछ तैयार हो गई है!` : `Opening WhatsApp for "${cartNotice}"...`}
            </span>
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl border border-stone-200 p-4 flex flex-col justify-between hover:border-amber-400 transition-colors shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                    {p.tag}
                  </span>
                  <span className="text-xs text-stone-400 line-through">₹{p.originalPrice}</span>
                </div>
                <h3 className="font-semibold text-stone-900 text-base leading-snug mb-1">
                  {p.name}
                </h3>
                <p className="text-stone-500 text-xs leading-relaxed mb-3">
                  {p.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-amber-950 tabular-nums">
                    ₹{p.price}
                  </span>
                  <span className="text-[11px] text-emerald-600 font-medium block">
                    {Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% {isHi ? 'बचत' : 'OFF'}
                  </span>
                </div>

                <button
                  onClick={() => handleOrder(p.name, p.price)}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{isHi ? 'व्हाट्सएप ऑर्डर' : 'Order on WhatsApp'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Store Location & Timing Card */}
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-xl border border-stone-200 p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-50 text-amber-900 rounded-lg shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                {isHi ? 'दुकान का पता' : 'Shop Address'}
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Shop No. 14, Main Market, {config.city}, UP. Near City Square.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-50 text-amber-900 rounded-lg shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                {isHi ? 'खुलने का समय' : 'Store Timings'}
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                {isHi ? 'सोमवार - शनिवार: 10:30 AM - 9:00 PM' : 'Mon - Sat: 10:30 AM - 9:00 PM'}
                <br />
                {isHi ? 'रविवार: 12:00 PM - 8:00 PM' : 'Sunday: 12:00 PM - 8:00 PM'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-50 text-amber-900 rounded-lg shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                {isHi ? 'संपर्क व पूछताछ' : 'Inquiries & WhatsApp'}
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                {config.phone}
                <br />
                {isHi ? 'थोक व फुटकर ऑर्डर के लिए संपर्क करें' : 'Contact for wholesale & retail inquiries'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
