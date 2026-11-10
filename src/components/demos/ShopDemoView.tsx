import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Heart, Menu, Minus, Plus, Search, ShoppingBag, X } from 'lucide-react';
import { BusinessConfig, Language } from '../../types';
import { ClothingStoreConfig, defaultClothingStore, demoClothingProducts, StoreCurrency, StoreProduct } from '../../data/storefront';

type CartLine = { productId: string; quantity: number; size: string; color: string };
type Customer = { name: string; mobile: string; address: string; city: string; pin: string };
type Drawer = 'cart' | 'checkout' | 'admin' | null;

const PRODUCT_KEY = 'smartweb-clothing-products-v1';
const STORE_KEY = 'smartweb-clothing-store-v1';
const CART_KEY = 'smartweb-clothing-cart-v1';
const cleanNumber = (value: string) => value.replace(/\D/g, '');
const readStorage = <T,>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) as T : fallback;
  } catch {
    return fallback;
  }
};
const classField = 'w-full border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-stone-800';

interface ShopDemoViewProps { config: BusinessConfig; lang: Language }

export const ShopDemoView: React.FC<ShopDemoViewProps> = ({ config: agencyConfig, lang: initialLanguage }) => {
  const [store, setStore] = useState<ClothingStoreConfig>(() => ({
    ...defaultClothingStore,
    ...readStorage<Partial<ClothingStoreConfig>>(STORE_KEY, {}),
  }));
  const [products, setProducts] = useState<StoreProduct[]>(() => readStorage(PRODUCT_KEY, demoClothingProducts));
  const [cart, setCart] = useState<CartLine[]>(() => readStorage(CART_KEY, []));
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [activeProduct, setActiveProduct] = useState<StoreProduct | null>(null);
  const [drawer, setDrawer] = useState<Drawer>(null);
  const [adminReady, setAdminReady] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminTab, setAdminTab] = useState<'products' | 'store'>('products');
  const [editing, setEditing] = useState<StoreProduct | null>(null);
  const [formError, setFormError] = useState('');
  const [notice, setNotice] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [customer, setCustomer] = useState<Customer>({ name: '', mobile: '', address: '', city: '', pin: '' });
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const isHi = store.language === 'hi';
  const text = (en: string, hi: string) => isHi ? hi : en;
  const productById = (id: string) => products.find((product) => product.id === id);
  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cart.reduce((sum, line) => sum + (productById(line.productId)?.price ?? 0) * line.quantity, 0);
  const money = (amount: number) => new Intl.NumberFormat(isHi ? 'hi-IN' : 'en-IN', {
    style: 'currency', currency: store.currency, maximumFractionDigits: 0,
  }).format(amount);
  const filtered = useMemo(() => products.filter((product) => product.stock > 0
    && (category === 'All' || product.category === category)
    && `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(query.trim().toLowerCase())), [products, category, query]);
  const featured = products.filter((product) => product.featured && product.stock > 0);
  const bestsellers = products.filter((product) => product.bestseller && product.stock > 0);
  const newArrivals = products.filter((product) => product.isNew && product.stock > 0);

  useEffect(() => { localStorage.setItem(STORE_KEY, JSON.stringify(store)); }, [store]);
  useEffect(() => { localStorage.setItem(PRODUCT_KEY, JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }, [cart]);
  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(''), 3000);
    return () => window.clearTimeout(timer);
  }, [notice]);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setActiveProduct(null); setDrawer(null); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const availableForCart = (product: StoreProduct) => product.stock - cart
    .filter((line) => line.productId === product.id)
    .reduce((sum, line) => sum + line.quantity, 0);

  const addToCart = (product: StoreProduct, size = product.sizes[0] || 'One size', color = product.colors[0] || 'Default') => {
    if (availableForCart(product) < 1) {
      setNotice(text('Sorry, this item is out of stock.', 'क्षमा करें, यह उत्पाद स्टॉक में नहीं है।'));
      return;
    }
    setCart((current) => {
      const existing = current.find((line) => line.productId === product.id && line.size === size && line.color === color);
      if (existing) return current.map((line) => line === existing ? { ...line, quantity: line.quantity + 1 } : line);
      return [...current, { productId: product.id, quantity: 1, size, color }];
    });
    setNotice(text('Added to your bag', 'आपके बैग में जोड़ा गया'));
    setActiveProduct(null);
  };

  const changeQuantity = (line: CartLine, delta: number) => {
    setCart((current) => current.map((item) => {
      if (item !== line) return item;
      const product = productById(item.productId);
      if (!product) return item;
      const totalForProduct = current.filter((entry) => entry.productId === item.productId).reduce((sum, entry) => sum + entry.quantity, 0);
      return { ...item, quantity: Math.max(0, Math.min(item.quantity + delta, item.quantity + product.stock - totalForProduct)) };
    }).filter((item) => item.quantity > 0 && productById(item.productId)));
  };

  const openAdmin = () => { setDrawer('admin'); setAdminReady(false); setAdminPassword(''); setFormError(''); setEditing(null); };
  const loginAdmin = (event: React.FormEvent) => {
    event.preventDefault();
    if (adminPassword === 'demo123') { setAdminReady(true); setFormError(''); }
    else setFormError(text('Demo password is demo123.', 'डेमो पासवर्ड demo123 है।'));
  };

  const saveProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const price = Number(data.get('price'));
    const stock = Number(data.get('stock'));
    const compareAt = Number(data.get('compareAt')) || undefined;
    const next: StoreProduct = {
      id: editing?.id || `item-${Date.now()}`,
      name,
      description: String(data.get('description') ?? '').trim(),
      price,
      compareAt,
      category: String(data.get('category') ?? '').trim(),
      image: String(data.get('image') ?? '').trim(),
      sizes: String(data.get('sizes') ?? '').split(',').map((value) => value.trim()).filter(Boolean),
      colors: String(data.get('colors') ?? '').split(',').map((value) => value.trim()).filter(Boolean),
      stock,
      featured: data.get('featured') === 'on',
      bestseller: data.get('bestseller') === 'on',
      isNew: data.get('isNew') === 'on',
    };
    if (!name || !next.category || !next.image || !Number.isFinite(price) || price <= 0 || !Number.isInteger(stock) || stock < 0
      || (compareAt !== undefined && compareAt <= price)) {
      setFormError(text('Enter a name, category, image URL, valid stock and a valid price. Compare-at price must be higher than the selling price.', 'नाम, कैटेगरी, फोटो URL, सही स्टॉक और कीमत भरें। पुरानी कीमत बिक्री मूल्य से अधिक होनी चाहिए।'));
      return;
    }
    setProducts((current) => editing ? current.map((product) => product.id === editing.id ? next : product) : [next, ...current]);
    setEditing(null);
    setFormError('');
    setNotice(text('Product saved on this device.', 'उत्पाद इस डिवाइस पर सेव हुआ।'));
  };

  const sendOrder = (event: React.FormEvent) => {
    event.preventDefault();
    setFormError('');
    if (!customer.name.trim() || !customer.address.trim() || !customer.city.trim()) {
      setFormError(text('Complete all delivery details.', 'डिलीवरी की सभी जानकारी भरें।'));
      return;
    }
    if (!/^[6-9]\d{9}$/.test(cleanNumber(customer.mobile))) {
      setFormError(text('Enter a valid 10-digit Indian mobile number.', 'सही 10 अंकों का मोबाइल नंबर डालें।'));
      return;
    }
    if (!/^\d{6}$/.test(customer.pin)) {
      setFormError(text('Enter a valid 6-digit PIN code.', 'सही 6 अंकों का पिन कोड डालें।'));
      return;
    }
    const whatsapp = cleanNumber(store.whatsapp);
    if (!/^\d{10,15}$/.test(whatsapp)) {
      setFormError(text('The shop WhatsApp number is not configured. The shop owner must add a real number with country code in Demo Admin.', 'दुकान का WhatsApp नंबर सेट नहीं है। दुकान मालिक डेमो एडमिन में देश कोड सहित असली नंबर जोड़ें।'));
      return;
    }
    const orderLines = cart.flatMap((line) => {
      const product = productById(line.productId);
      return product ? [`• ${product.name} — ${money(product.price)} each | Size: ${line.size} | Colour: ${line.color} | Qty: ${line.quantity} | Line total: ${money(product.price * line.quantity)}`] : [];
    }).join('\n');
    const message = [
      `Website order request for ${store.name} (not confirmed)`, '', orderLines, '',
      `Subtotal: ${money(subtotal)}`, 'Delivery: To be confirmed by the shop', `Estimated total: ${money(subtotal)}`,
      '', `Customer name: ${customer.name.trim()}`, `Mobile: ${customer.mobile}`,
      `Delivery address: ${customer.address.trim()}, ${customer.city.trim()} - ${customer.pin}`,
      '', 'This is a message draft only. Please confirm availability, delivery charges and the order directly with the shop.',
    ].join('\n');
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setNotice(text('WhatsApp message draft prepared. This is not a confirmed order and no payment was taken.', 'WhatsApp संदेश ड्राफ्ट तैयार। यह पक्का ऑर्डर नहीं है और कोई भुगतान नहीं लिया गया।'));
  };

  const openProduct = (product: StoreProduct) => {
    setActiveProduct(product);
    setSelectedSize(product.sizes[0] || 'One size');
    setSelectedColor(product.colors[0] || 'Default');
  };
  const saveStore = () => {
    setStore((current) => ({ ...current, whatsapp: cleanNumber(current.whatsapp) }));
    setNotice(text('Store settings saved on this device.', 'स्टोर सेटिंग इस डिवाइस पर सेव हुई।'));
  };
  const categoryLabel = (value: string) => value === 'All' ? text('All pieces', 'सभी उत्पाद') : value;
  const closeDrawer = () => { setDrawer(null); setFormError(''); setEditing(null); };

  return <div className="min-h-screen bg-[#fbf9f6] text-[#29241f] font-sans" style={{ '--shop-primary': store.primary, '--shop-accent': store.accent } as React.CSSProperties}>
    <div className="bg-[#29241f] text-white text-center px-4 py-2 text-[11px] sm:text-xs tracking-wide">{store.banner} <span className="ml-2 text-amber-200">{text('Sample storefront · Demonstration products', 'नमूना स्टोर · डेमो उत्पाद')}</span></div>
    <header className="sticky top-0 z-30 bg-[#fbf9f6]/95 backdrop-blur border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-[72px] flex items-center justify-between gap-4">
        <button className="md:hidden p-2" aria-label={text('Open menu', 'मेन्यू खोलें')} onClick={() => setMobileMenu(!mobileMenu)}><Menu size={21}/></button>
        <a href="#home" className="flex items-center gap-2 min-w-0" aria-label={store.name}>
          <span className="w-9 h-9 rounded-full bg-[#32271f] text-white flex items-center justify-center font-serif overflow-hidden">{store.logo ? <img src={store.logo} alt="" className="w-full h-full object-cover"/> : store.name.charAt(0)}</span>
          <span className="font-serif text-lg sm:text-xl tracking-wide truncate">{store.name}</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[.15em] text-stone-600"><a href="#collection" className="hover:text-black">{text('Shop', 'खरीदें')}</a><a href="#story" className="hover:text-black">{text('Our story', 'हमारी कहानी')}</a><a href="#benefits" className="hover:text-black">{text('The details', 'विशेषताएँ')}</a></nav>
        <div className="flex items-center gap-1"><button onClick={() => setStore((current) => ({ ...current, language: current.language === 'en' ? 'hi' : 'en' }))} className="px-2 py-2 text-xs text-stone-600">{isHi ? 'EN' : 'हिं'}</button><button onClick={() => setDrawer('cart')} className="relative p-2.5 hover:bg-stone-100 rounded-full" aria-label={text('Open shopping bag', 'शॉपिंग बैग खोलें')}><ShoppingBag size={19}/>{cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 bg-[#a46c48] text-white rounded-full text-[10px] min-w-4 h-4 flex items-center justify-center px-1">{cartCount}</span>}</button></div>
      </div>
      {mobileMenu && <nav className="md:hidden px-5 pb-4 flex gap-5 text-xs uppercase tracking-widest"><a onClick={() => setMobileMenu(false)} href="#collection">{text('Shop', 'खरीदें')}</a><a onClick={() => setMobileMenu(false)} href="#story">{text('Our story', 'हमारी कहानी')}</a><a onClick={() => setMobileMenu(false)} href="#benefits">{text('Details', 'विशेषताएँ')}</a></nav>}
    </header>

    <main id="home">
      <section className="max-w-[1440px] mx-auto px-3 sm:px-8 pt-4 sm:pt-8"><div className="relative min-h-[440px] sm:min-h-[590px] overflow-hidden bg-[#e7ddd0] flex items-center rounded-sm">
        <img className="absolute inset-0 w-full h-full object-cover object-center" src={store.heroImage} alt={text('Demonstration fashion collection', 'डेमो फैशन कलेक्शन')} fetchPriority="high"/><div className="absolute inset-0 bg-gradient-to-r from-[#211a16]/75 via-[#211a16]/35 to-transparent"/>
        <div className="relative z-10 text-white max-w-xl px-7 sm:px-16 py-14"><span className="text-[10px] sm:text-xs tracking-[.28em] uppercase text-amber-100">{text('A considered collection · Demo store', 'चुना हुआ कलेक्शन · डेमो स्टोर')}</span><h1 className="font-serif text-4xl sm:text-6xl leading-[1.08] mt-5 mb-5">{text('Made for the moments that matter.', 'हर खास पल के लिए खास अंदाज़।')}</h1><p className="text-sm sm:text-base text-white/85 max-w-md leading-relaxed mb-8">{text('Thoughtful Indian wear, crafted to feel like you. Discover pieces made to be worn, loved and lived in.', 'आपके लिए बना खूबसूरत भारतीय परिधान। ऐसे कपड़े जो हर दिन और हर मौके पर आपके साथ रहें।')}</p><a href="#collection" className="inline-flex items-center gap-3 bg-white text-stone-900 px-6 py-3 text-xs uppercase tracking-widest hover:bg-amber-50 transition">{text('Explore collection', 'कलेक्शन देखें')}<ArrowRight size={15}/></a></div>
        <span className="absolute right-4 bottom-4 text-[9px] uppercase tracking-widest bg-black/45 text-white px-2 py-1">{text('Demo imagery', 'डेमो चित्र')}</span>
      </div></section>

      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-9"><div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-[10px] sm:text-xs tracking-wide text-stone-600"><div className="py-3 border-r border-stone-200">✳ &nbsp; {text('Made with intention', 'सलीके से चुना गया')}</div><div className="py-3 md:border-r border-stone-200">↗ &nbsp; {text('Easy WhatsApp ordering', 'आसान WhatsApp ऑर्डर')}</div><div className="py-3 border-r border-stone-200">♡ &nbsp; {text('Thoughtful details', 'खास ब���रीकियाँ')}</div><div className="py-3">⌂ &nbsp; {text('Local, personal service', 'स्थानीय व्यक्तिगत सेवा')}</div></div></section>
      {featured.length > 0 && <ProductSection title={text('The edit', 'खास पसंद')} kicker={text('Handpicked for you', 'आपके लिए चुना')} products={featured} onProduct={openProduct} money={money} text={text}/>}
      {bestsellers.length > 0 && <ProductSection title={text('Most loved', 'सबसे पसंदीदा')} kicker={text('Bestsellers', 'बेस्ट सेलर')} products={bestsellers} onProduct={openProduct} money={money} text={text}/>}
      {newArrivals.length > 0 && <ProductSection title={text('Just arrived', 'नया कलेक्शन')} kicker={text('New season', 'नया सीज़न')} products={newArrivals} onProduct={openProduct} money={money} text={text}/>}

      <section id="collection" className="bg-white border-y border-stone-200"><div className="max-w-7xl mx-auto px-4 sm:px-8 py-14"><div className="text-center mb-8"><p className="text-[10px] uppercase tracking-[.2em] text-[#a46c48]">{text('The collection', 'हमारा कलेक्शन')}</p><h2 className="font-serif text-3xl sm:text-4xl mt-2">{text('Find your new favourite', 'अपना नया पसंदीदा चुनें')}</h2><p className="text-xs text-stone-500 mt-3">{text('Thoughtful pieces for every day and every occasion.', 'हर दिन और हर खास मौके के लिए खूबसूरत परिधान।')}</p></div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7"><div className="flex gap-2 overflow-x-auto pb-1">{store.categories.map((cat) => <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 text-[11px] whitespace-nowrap border transition ${category === cat ? 'bg-[#32271f] text-white border-[#32271f]' : 'border-stone-300 hover:border-stone-800'}`}>{categoryLabel(cat)}</button>)}</div><label className="flex items-center gap-2 border-b border-stone-400 py-2 text-stone-500"><Search size={15}/><input aria-label={text('Search products', 'उत्पाद खोजें')} value={query} onChange={(event) => setQuery(event.target.value)} placeholder={text('Search the collection', 'उत्पाद खोजें')} className="bg-transparent outline-none text-xs w-full sm:w-44"/></label></div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-10">{filtered.map((product) => <ProductCard key={product.id} product={product} onClick={() => openProduct(product)} text={text} money={money}/>)}{filtered.length === 0 && <p className="col-span-full py-10 text-center text-sm text-stone-500">{text('No available pieces match your search.', 'आपकी खोज से मेल खाता उत्पाद नहीं मिला।')}</p>}</div>
      </div></section>
      <section id="story" className="max-w-7xl mx-auto px-4 sm:px-8 py-16 grid md:grid-cols-2 gap-10 items-center"><div className="aspect-[4/3] overflow-hidden bg-stone-200"><img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1100&q=80" alt={text('Demonstration clothing collection', 'डेमो कपड़ों का कलेक्शन')} loading="lazy" className="w-full h-full object-cover"/></div><div><p className="text-[10px] uppercase tracking-[.2em] text-[#a46c48]">{text('A little more personal', 'थोड़ा और व्यक्तिगत')}</p><h2 className="font-serif text-3xl sm:text-4xl leading-tight mt-3 mb-5">{text('Good clothes have a way of feeling like home.', 'अच्छे कपड़े, अपनेपन का एहसास देते हैं।')}</h2><p className="text-sm text-stone-600 leading-7">{text(`${store.name} brings together expressive Indian design and everyday ease. This demonstration store shows how your products, story and service can come together in a polished shopping experience.`, `${store.name} भारतीय डिज़ाइन और रोज़मर्रा के आराम को साथ लाता है। यह डेमो दिखाता है कि आपके उत्पाद, कहानी और सेवा एक सुंदर ऑनलाइन स्टोर में कैसे दिख सकते हैं।`)}</p><a href="#collection" className="inline-flex items-center gap-2 mt-6 text-xs uppercase tracking-widest border-b border-stone-800 pb-2">{text('Shop the collection', 'कलेक्शन खरीदें')}<ArrowRight size={14}/></a></div></section>
      <section id="benefits" className="bg-[#eee8e0] py-12"><div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-3 gap-7 text-center"><div><span className="font-serif text-2xl">01</span><h3 className="text-xs uppercase tracking-widest mt-2">{text('Personal service', 'व्यक्तिगत सेवा')}</h3><p className="text-xs text-stone-600 mt-2">{text('Questions? Chat directly with the shop.', 'सवाल हैं? दुकान से सीधे बात करें।')}</p></div><div><span className="font-serif text-2xl">02</span><h3 className="text-xs uppercase tracking-widest mt-2">{text('Delivery details', 'डिलीवरी जानकारी')}</h3><p className="text-xs text-stone-600 mt-2">{text('Delivery timing and charges confirmed by the store.', 'डिलीवरी समय व शुल्क स्टोर बताएगा।')}</p></div><div><span className="font-serif text-2xl">03</span><h3 className="text-xs uppercase tracking-widest mt-2">{text('Secure conversation', 'सीधी बातचीत')}</h3><p className="text-xs text-stone-600 mt-2">{text('No payment is collected on this demo website.', 'इस डेमो वेबसाइट पर भुगतान नहीं लिया जाता।')}</p></div></div></section>
    </main>

    <footer className="bg-[#29241f] text-white px-5 py-10 pb-24 sm:pb-10"><div className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-8"><div><h2 className="font-serif text-2xl">{store.name}</h2><p className="text-xs text-stone-300 mt-3 max-w-xs">{text('A demonstration storefront by SmartWeb Lucknow. Sample products and images are for preview only.', 'SmartWeb Lucknow का डेमो स्टोर। नमूना उत्पाद और चित्र केवल पूर्वावलोकन के लिए हैं।')}</p></div><div><h3 className="text-[10px] uppercase tracking-[.2em] text-amber-200">{text('Visit / contact', 'पता / संपर्क')}</h3><p className="text-xs text-stone-300 mt-3">{store.address || text('Address not configured', 'पता सेट नहीं है')}<br/>{store.phone || text('Phone not configured', 'फोन सेट नहीं है')}<br/>{store.email || text('Email not configured', 'ईमेल सेट नहीं है')}</p></div><div><h3 className="text-[10px] uppercase tracking-[.2em] text-amber-200">{text('Need a store like this?', 'ऐसा स्टोर चाहिए?')}</h3><p className="text-xs text-stone-300 mt-3">{text('Custom e-commerce websites from ₹2,999.', '₹2,999 से कस्टम ई-कॉमर्स वेबसाइट।')}</p><button onClick={openAdmin} className="mt-4 text-[10px] text-stone-400 underline underline-offset-4">{text('Demo Admin / customize', 'डेमो एडमिन / कस्टमाइज़')}</button></div></div><div className="max-w-7xl mx-auto border-t border-white/15 mt-8 pt-5 flex flex-col sm:flex-row justify-between gap-2 text-[10px] text-stone-400"><span>© {new Date().getFullYear()} {store.name} · {text('Demo store', 'डेमो स्टोर')}</span><span>{text('No real orders or payments are processed.', 'असली ऑर्डर या भुगतान नहीं होते।')}</span></div></footer>

    {notice && <div role="status" className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[80] bg-[#29241f] text-white text-xs px-5 py-3 shadow-xl max-w-[90vw] text-center">{notice}</div>}
    <button onClick={() => setDrawer('cart')} className="fixed md:hidden bottom-3 right-3 z-20 rounded-full bg-[#32271f] text-white px-4 py-3 shadow-xl flex items-center gap-2 text-xs"><ShoppingBag size={16}/>{text('Bag', 'बैग')} ({cartCount})</button>

    {activeProduct && <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-5" onClick={() => setActiveProduct(null)}><div role="dialog" aria-modal="true" aria-label={activeProduct.name} onClick={(event) => event.stopPropagation()} className="bg-[#fbf9f6] w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto grid sm:grid-cols-2 relative"><button onClick={() => setActiveProduct(null)} className="absolute right-3 top-3 z-10 p-2 rounded-full bg-white/90" aria-label={text('Close product', 'उत्पाद बंद करें')}><X size={18}/></button><img src={activeProduct.image} alt={activeProduct.name} className="w-full h-72 sm:h-full object-cover"/><div className="p-6 sm:p-8"><p className="text-[10px] uppercase tracking-widest text-[#a46c48]">{activeProduct.category}</p><h2 className="font-serif text-2xl mt-2">{activeProduct.name}</h2><p className="mt-3 text-sm text-stone-600 leading-6">{activeProduct.description}</p><div className="mt-4 flex gap-3 items-center"><strong>{money(activeProduct.price)}</strong>{activeProduct.compareAt && <del className="text-xs text-stone-400">{money(activeProduct.compareAt)}</del>}</div>
      {activeProduct.sizes.length > 0 && <div className="mt-5"><p className="text-[10px] uppercase tracking-widest mb-2">{text('Size', 'साइज़')}</p><div className="flex flex-wrap gap-2">{activeProduct.sizes.map((size) => <button key={size} onClick={() => setSelectedSize(size)} className={`px-3 py-2 border text-xs ${selectedSize === size ? 'border-[#32271f] bg-[#32271f] text-white' : 'border-stone-300'}`}>{size}</button>)}</div></div>}
      {activeProduct.colors.length > 0 && <div className="mt-4"><p className="text-[10px] uppercase tracking-widest mb-2">{text('Colour', 'रंग')}</p><div className="flex flex-wrap gap-2">{activeProduct.colors.map((color) => <button key={color} onClick={() => setSelectedColor(color)} className={`px-3 py-2 border text-xs ${selectedColor === color ? 'border-[#32271f] bg-[#32271f] text-white' : 'border-stone-300'}`}>{color}</button>)}</div></div>}
      <p className="text-xs text-stone-500 mt-4">{activeProduct.stock} {text('in sample stock', 'नमूना स्टॉक में उपलब्ध')}</p><button disabled={availableForCart(activeProduct) < 1} onClick={() => addToCart(activeProduct, selectedSize, selectedColor)} className="w-full mt-5 bg-[#32271f] disabled:bg-stone-400 text-white py-3 text-xs uppercase tracking-widest">{availableForCart(activeProduct) < 1 ? text('Out of stock', 'स्टॉक उपलब्ध नहीं') : `${text('Add to bag', 'बैग में डालें')} · ${money(activeProduct.price)}`}</button></div></div></div>}

    {drawer && <div className="fixed inset-0 z-[60] bg-black/50 flex justify-end" onClick={closeDrawer}><aside role="dialog" aria-modal="true" aria-label={drawer === 'cart' ? text('Shopping bag', 'शॉपिंग बैग') : drawer === 'checkout' ? text('Checkout', 'चेकआउट') : text('Demo admin', 'डेमो एडमिन')} onClick={(event) => event.stopPropagation()} className="w-full max-w-lg bg-[#fbf9f6] h-full overflow-y-auto shadow-2xl">
      <div className="sticky top-0 z-10 bg-[#fbf9f6] border-b border-stone-200 px-5 py-4 flex items-center justify-between"><div className="flex items-center gap-3"><button onClick={() => drawer === 'checkout' ? setDrawer('cart') : setDrawer(null)} className="p-1" aria-label={text('Back', 'वापस')}><ArrowLeft size={18}/></button><h2 className="font-serif text-xl">{drawer === 'cart' ? text('Your bag', 'आपका बैग') : drawer === 'checkout' ? text('Delivery details', 'डिलीवरी जानकारी') : text('Store demo admin', 'स्टोर डेमो एडमिन')}</h2></div><button onClick={closeDrawer} aria-label={text('Close', 'बंद करें')}><X size={20}/></button></div>
      {drawer === 'cart' && <div className="p-5">{cart.length === 0 ? <div className="py-14 text-center"><ShoppingBag className="mx-auto text-stone-400" size={32}/><p className="mt-4 font-serif text-xl">{text('Your bag is waiting.', 'आपका बैग खाली है।')}</p><button onClick={() => setDrawer(null)} className="mt-5 underline text-xs">{text('Continue shopping', 'खरीदारी जारी रखें')}</button></div> : <><div className="space-y-5">{cart.map((line) => { const product = productById(line.productId); if (!product) return null; return <div key={`${line.productId}-${line.size}-${line.color}`} className="flex gap-4 border-b border-stone-200 pb-5"><img src={product.image} alt={product.name} className="w-24 h-28 object-cover"/><div className="flex-1"><h3 className="font-serif">{product.name}</h3><p className="text-xs text-stone-500 mt-1">{line.size} · {line.color}</p><p className="text-sm mt-2">{money(product.price)}</p><div className="flex items-center gap-3 mt-3"><button onClick={() => changeQuantity(line, -1)} aria-label={text('Decrease quantity', 'मात्रा घटाएँ')}><Minus size={14}/></button><span className="text-xs">{line.quantity}</span><button disabled={availableForCart(product) < 1} onClick={() => changeQuantity(line, 1)} aria-label={text('Increase quantity', 'मात्रा बढ़ाएँ')}><Plus size={14}/></button><button onClick={() => setCart((current) => current.filter((item) => item !== line))} className="ml-auto text-[10px] underline text-stone-500">{text('Remove', 'हटाएँ')}</button></div></div></div>; })}</div><div className="mt-6 border-t border-stone-300 pt-5"><div className="flex justify-between text-sm"><span>{text('Subtotal', 'कुल')}</span><strong>{money(subtotal)}</strong></div><p className="text-[11px] text-stone-500 mt-2">{text('Delivery is confirmed by the shop. No payment is collected here.', 'डिलीवरी की जानकारी दुकान देगी। यहाँ कोई भुगतान नहीं होता।')}</p><button onClick={() => { setFormError(''); setDrawer('checkout'); }} className="w-full mt-5 bg-[#32271f] text-white py-3 text-xs uppercase tracking-widest">{text('Continue to checkout', 'चेकआउट जारी रखें')}</button></div></>}</div>}
      {drawer === 'checkout' && <form onSubmit={sendOrder} className="p-5 space-y-4"><div className="bg-stone-100 p-4 text-xs"><div className="flex justify-between"><span>{cartCount} {text('items', 'उत्पाद')}</span><strong>{money(subtotal)}</strong></div><p className="text-stone-500 mt-1">{text('Delivery: confirm with store · Estimated total:', 'डिलीवरी: दुकान से पूछें · अनुमानित कुल:')} {money(subtotal)}</p></div>{([
        ['name', 'Full name', 'पूरा नाम'], ['mobile', 'Mobile number', 'मोबाइल नंबर'], ['address', 'Full address', 'पूरा पता'], ['city', 'City', 'शहर'], ['pin', 'PIN code', 'पिन कोड'],
      ] as const).map(([key, en, hi]) => <label key={key} className="block text-xs">{text(en, hi)}<input required name={key} value={customer[key]} onChange={(event) => setCustomer((current) => ({ ...current, [key]: event.target.value }))} inputMode={key === 'mobile' || key === 'pin' ? 'numeric' : undefined} maxLength={key === 'mobile' ? 10 : key === 'pin' ? 6 : undefined} pattern={key === 'mobile' ? '[6-9][0-9]{9}' : key === 'pin' ? '[0-9]{6}' : undefined} className={`${classField} mt-1`} /></label>)}{formError && <p role="alert" className="text-xs text-red-700">{formError}</p>}<button className="w-full bg-[#147b53] text-white py-3 text-xs uppercase tracking-widest">{text('Prepare WhatsApp order', 'WhatsApp ऑर्डर तैयार करें')}</button><p className="text-[10px] text-stone-500 text-center">{text('This opens a message draft only. It does not create an order or process payment.', 'यह केवल संदेश ड्राफ्ट खोलता है। ऑर्डर या भुगतान नहीं होता।')}</p></form>}
      {drawer === 'admin' && <div className="p-5">{!adminReady ? <><div className="bg-amber-50 border border-amber-200 p-4 text-xs leading-5 mb-5"><strong>{text('Demo only — not secure authentication.', 'केवल डेमो — सुरक्षित लॉगिन नहीं।')}</strong><br/>{text('Products and settings are stored in this browser only. Production requires secure server-side authentication, authorization and a database.', 'उत्पाद और सेटिंग केवल इस ब्राउज़र में सेव हैं। असली उपयोग के लिए सुरक्षित सर्वर लॉगिन, अनुमति नियंत्रण और डेटाबेस जरूरी हैं।')}</div><form onSubmit={loginAdmin} className="space-y-3"><label className="block text-xs">{text('Demo password (demo123)', 'डेमो पासवर्ड (demo123)')}<input type="password" value={adminPassword} onChange={(event) => setAdminPassword(event.target.value)} className={`${classField} mt-1`} autoComplete="current-password"/></label>{formError && <p role="alert" className="text-xs text-red-700">{formError}</p>}<button className="w-full bg-[#32271f] text-white py-3 text-xs uppercase tracking-widest">{text('Enter demo admin', 'डेमो एडमिन खोलें')}</button></form></> : <><div className="flex border-b border-stone-200 mb-5"><button type="button" onClick={() => { setAdminTab('products'); setEditing(null); setFormError(''); }} className={`px-4 py-3 text-xs ${adminTab === 'products' ? 'border-b-2 border-stone-900' : ''}`}>{text('Products', 'उत्पाद')}</button><button type="button" onClick={() => { setAdminTab('store'); setEditing(null); setFormError(''); }} className={`px-4 py-3 text-xs ${adminTab === 'store' ? 'border-b-2 border-stone-900' : ''}`}>{text('Store settings', 'स्टोर सेटिंग')}</button></div>
        {adminTab === 'products' ? <><button type="button" onClick={() => { setFormError(''); setEditing({ id: '', name: '', description: '', price: 0, category: store.categories.find((value) => value !== 'All') || 'Kurtas', image: '', sizes: ['S', 'M', 'L'], colors: ['Ivory'], stock: 0 }); }} className="w-full border border-stone-400 py-3 text-xs mb-4">＋ {text('Add a product', 'नया उत्पाद जोड़ें')}</button>{editing && <form key={editing.id || 'new-product'} onSubmit={saveProduct} className="space-y-3 bg-white p-4 mb-5 border">{([
          ['name', 'Name'], ['description', 'Description'], ['price', 'Price'], ['compareAt', 'Compare-at price'], ['category', 'Category'], ['image', 'Image URL'], ['sizes', 'Sizes (comma separated)'], ['colors', 'Colours (comma separated)'], ['stock', 'Available stock'],
        ] as const).map(([key, label]) => <label key={key} className="block text-[11px]">{label}<input required={['name', 'price', 'category', 'image', 'stock'].includes(key)} type={key === 'price' || key === 'compareAt' || key === 'stock' ? 'number' : 'text'} min={key === 'stock' ? 0 : key === 'price' || key === 'compareAt' ? 1 : undefined} step="1" name={key} defaultValue={key === 'sizes' || key === 'colors' ? editing[key].join(', ') : String(editing[key] ?? '')} className={`${classField} mt-1`} /></label>)}<label className="text-xs flex gap-2"><input type="checkbox" name="featured" defaultChecked={editing.featured}/> Featured</label><label className="text-xs flex gap-2"><input type="checkbox" name="bestseller" defaultChecked={editing.bestseller}/> Bestseller</label><label className="text-xs flex gap-2"><input type="checkbox" name="isNew" defaultChecked={editing.isNew}/> New arrival</label>{formError && <p role="alert" className="text-xs text-red-700">{formError}</p>}<div className="flex gap-2"><button className="flex-1 bg-[#32271f] text-white py-2 text-xs">{text('Save product', 'उत्पाद सेव करें')}</button><button type="button" onClick={() => { setEditing(null); setFormError(''); }} className="px-4 border text-xs">{text('Cancel', 'रद्द करें')}</button></div></form>}
          <div className="space-y-3">{products.map((product) => <div key={product.id} className="flex gap-3 border-b pb-3"><img src={product.image} alt="" className="w-14 h-16 object-cover"/><div className="flex-1 min-w-0"><p className="text-xs font-medium truncate">{product.name}</p><p className="text-[10px] text-stone-500">{money(product.price)} · {product.stock} {text('in stock', 'स्टॉक में')}</p><div className="flex gap-3 mt-2"><button type="button" onClick={() => { setEditing(product); setFormError(''); }} className="text-[10px] underline">{text('Edit', 'बदलें')}</button><button type="button" onClick={() => { setProducts((current) => current.filter((item) => item.id !== product.id)); setCart((current) => current.filter((item) => item.productId !== product.id)); }} className="text-[10px] underline text-red-700">{text('Delete', 'हटाएँ')}</button></div></div></div>)}</div>
        </> : <div className="space-y-3">{([
          ['name', 'Store name'], ['logo', 'Logo image URL'], ['primary', 'Brand colour (hex)'], ['accent', 'Accent colour (hex)'], ['heroImage', 'Hero banner image URL'], ['whatsapp', 'Real WhatsApp number with country code'], ['phone', 'Contact phone'], ['email', 'Contact email'], ['address', 'Store address'], ['banner', 'Announcement banner'],
        ] as const).map(([key, label]) => <label key={key} className="block text-xs">{label}<input value={store[key]} onChange={(event) => setStore((current) => ({ ...current, [key]: event.target.value }))} placeholder={key === 'whatsapp' ? '+91…' : ''} className={`${classField} mt-1`} /></label>)}<label className="block text-xs">{text('Categories (comma separated)', 'कैटेगरी (कॉमा लगाकर)')}<input value={store.categories.filter((value) => value !== 'All').join(', ')} onChange={(event) => { const categories = [...new Set(event.target.value.split(',').map((value) => value.trim()).filter((value) => value && value !== 'All'))]; setStore((current) => ({ ...current, categories: ['All', ...categories] })); if (!store.categories.includes(category)) setCategory('All'); }} className={`${classField} mt-1`} /></label><label className="block text-xs">{text('Currency', 'मुद्रा')}<select value={store.currency} onChange={(event) => setStore((current) => ({ ...current, currency: event.target.value as StoreCurrency }))} className={`${classField} mt-1`}><option value="INR">INR — ₹</option><option value="USD">USD — $</option><option value="EUR">EUR — €</option><option value="GBP">GBP — £</option></select></label><label className="block text-xs">{text('Language', 'भाषा')}<select value={store.language} onChange={(event) => setStore((current) => ({ ...current, language: event.target.value as 'en' | 'hi' }))} className={`${classField} mt-1`}><option value="en">English</option><option value="hi">हिंदी</option></select></label><button type="button" onClick={saveStore} className="w-full bg-[#32271f] text-white py-3 text-xs uppercase tracking-widest">{text('Save store settings', 'स्टोर सेटिंग सेव करें')}</button><button type="button" onClick={() => { localStorage.removeItem(STORE_KEY); localStorage.removeItem(PRODUCT_KEY); localStorage.removeItem(CART_KEY); setStore(defaultClothingStore); setProducts(demoClothingProducts); setCart([]); setCategory('All'); setQuery(''); setNotice(text('Demo reset on this device.', 'इस डिवाइस का डेमो रीसेट हुआ।')); }} className="w-full text-xs underline text-stone-500">{text('Reset demo data on this device', 'इस डिवाइस का डेमो डेटा रीसेट करें')}</button><p className="text-[10px] text-stone-500 pt-3 border-t">{text('Changes stay in this browser. Never use this demo password or localStorage admin for a live store.', 'बदलाव इसी ब्राउज़र में रहते हैं। लाइव स्टोर में यह पासवर्ड या localStorage एडमिन इस्तेमाल न करें।')}</p></div>}
      </>}</div>}
    </aside></div>}
  </div>;
};

function ProductSection({ title, kicker, products, onProduct, money, text }: { title: string; kicker: string; products: StoreProduct[]; onProduct: (product: StoreProduct) => void; money: (amount: number) => string; text: (en: string, hi: string) => string }) {
  return <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-14"><div className="flex justify-between items-end mb-5"><div><p className="text-[10px] uppercase tracking-[.2em] text-[#a46c48]">{kicker}</p><h2 className="font-serif text-2xl sm:text-3xl mt-1">{title}</h2></div><a href="#collection" className="text-xs underline underline-offset-4">{text('View all', 'सब देखें')}</a></div><div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">{products.slice(0, 3).map((product) => <ProductCard key={product.id} product={product} onClick={() => onProduct(product)} text={text} money={money}/>)}</div></section>;
}

function ProductCard({ product, onClick, text, money }: { product: StoreProduct; onClick: () => void; text: (en: string, hi: string) => string; money: (amount: number) => string }) {
  const discount = product.compareAt && product.compareAt > product.price ? Math.round((1 - product.price / product.compareAt) * 100) : 0;
  return <button onClick={onClick} className="group text-left min-w-0"><div className="relative aspect-[4/5] overflow-hidden bg-stone-100"><img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"/>{(product.isNew || discount > 0) && <span className="absolute top-2 left-2 bg-white/90 px-2 py-1 text-[9px] uppercase tracking-widest">{product.isNew ? text('New', 'नया') : `${discount}% ${text('off', 'छूट')}`}</span>}<span className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full"><Heart size={13}/></span><span className="absolute bottom-2 right-2 bg-white text-stone-900 px-3 py-2 text-[10px] uppercase tracking-widest opacity-100 sm:opacity-0 group-hover:opacity-100 transition">{text('Quick view', 'देखें')} +</span></div><div className="pt-3 flex justify-between gap-2"><div className="min-w-0"><p className="font-serif text-sm sm:text-base truncate">{product.name}</p><p className="text-[10px] text-stone-500 mt-1">{product.category}</p></div><div className="text-right shrink-0"><p className="text-xs font-medium">{money(product.price)}</p>{product.compareAt && <del className="text-[10px] text-stone-400">{money(product.compareAt)}</del>}</div></div></button>;
}
