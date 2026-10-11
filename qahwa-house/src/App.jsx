import React, { useState, useEffect } from 'react';
import { 
  Coffee, ShoppingBag, Menu as MenuIcon, X, Search, ChevronRight, 
  MapPin, Phone, Clock, 
  Trash2, Plus, Minus, CheckCircle, AlertCircle, Sparkles, 
  ArrowRight, ExternalLink, ArrowUp
} from 'lucide-react';

/* ==========================================================
   1. أقسام المنيو (Categories Catalog Section)
   ========================================================== */
const CATEGORIES = [
  { id: 'all', name: 'الكل' },
  { id: 'hot', name: 'مشروبات ساخنة' },
  { id: 'cold_coffee', name: 'آيس كوفي ومثلجات' },
  { id: 'smoothie_juice', name: 'سموزي وعصائر' },
  { id: 'soda_mix', name: 'موهيتو وصودا' },
  { id: 'dessert_waffle', name: 'وافل، كيك ودونتس' },
  { id: 'milkshake', name: 'ميلك شيك' },
  { id: 'matcha', name: 'ماتشا' },
  { id: 'ice_cream', name: 'آيس كريم' }
];

/* ==========================================================
   2. قائمة المنتجات والأصناف (Products Data Section)
   ========================================================== */
const PRODUCTS = [
  // --- قسم المشروبات الساخنة ---
  {
    id: 1,
    name: 'قهوة تركي',
    category: 'hot',
    price: 30,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    description: 'قهوة تركية أصيلة محضرة بعناية فائقة.',
    inStock: true,
    isBestSeller: true,
    hasSizes: false,
    additions: [
    
    ]
  },
  {
    id: 2,
    name: 'إسبريسو دبل',
    category: 'hot',
    price: 60,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80',
    description: 'شوت مزدوج من أجود حبوب الإسبريسو المركزة.',
    inStock: true,
    isBestSeller: true,
    hasSizes: false,
    additions: []
  },
  {
    id: 3,
    name: 'لاتيه',
    category: 'hot',
    price: 70,
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=600&q=80',
    description: 'مزيج رائع من الإسبريسو والحليب المبخر برغوة ناعمة.',
    inStock: true,
    isBestSeller: true,
    hasSizes: true,
    sizes: [
      { name: 'عادي', price: 70 },
      { name: 'كبير', price: 110 }
    ],
    additions: [
      { name: 'نكهة فانيليا / كاراميل', price: 25 }
    ]
  },
  {
    id: 4,
    name: 'كابتشينو',
    category: 'hot',
    price: 70,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80',
    description: 'إسبريسو غني مع طبقة متساوية من الحليب ورغوة الكابتشينو .',
    inStock: true,
    isBestSeller: false,
    hasSizes: false,
    additions: []
  },
  {
    id: 5,
    name: 'سبانيش لاتيه',
    category: 'hot',
    price: 80,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    description: 'إسبريسو مع الحليب المكثف المحلى .',
    inStock: true,
    isBestSeller: true,
    hasSizes: false,
    additions: []
  },
  {
    id: 6,
    name: 'هوت شوكليت',
    category: 'hot',
    price: 60,
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80',
    description: 'شوكولاتة ساخنة .',
    inStock: true,
    isBestSeller: false,
    hasSizes: false,
    additions: [
    
    ]
  },

  // --- قسم الآيس كوفي والمثلجات ---
  {
    id: 7,
    name: 'ايس كوفي بودا',
    category: 'cold_coffee',
    price: 80,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80',
    description: 'مشروب بودا المثلج الخاص والمميز.',
    inStock: true,
    isBestSeller: true,
    hasSizes: false,
    additions: []
  },
  {
    id: 8,
    name: 'ايس امريكانو',
    category: 'cold_coffee',
    price: 70,
    image: '/ice-am.jpg',
    description: 'إسبريسو بارد مع الماء والثلج المنعش.',
    inStock: true,
    isBestSeller: false,
    hasSizes: false,
    additions: []
  },
  {
    id: 9,
    name: 'ايس اسبانش لاتيه',
    category: 'cold_coffee',
    price: 80,
    image: '/Iced-Spanish-Latte-Recipe.jpg',
    description: 'المشروب الأكثر طلباً: إسبريسو وحليب مكثف وثلج مجروش.',
    inStock: true,
    isBestSeller: true,
    hasSizes: false,
    additions: []
  },

  // --- قسم السموذي والعصائر ---
  {
    id: 10,
    name: 'سموزي مانجو',
    category: 'smoothie_juice',
    price: 80,
    image: '/mango.jpg',
    description: 'سموزي مانجو طبيعي طازج وبارد.',
    inStock: true,
    isBestSeller: false,
    hasSizes: false,
    additions: []
  },
  {
    id: 11,
    name: 'عصير فراولة طازج',
    category: 'smoothie_juice',
    price: 80,
    image: '/st.jpg',
    description: 'عصير فراولة طبيعي 100%.',
    inStock: true,
    isBestSeller: false,
    hasSizes: false,
    additions: []
  },

  // --- قسم الموخيتو والصودا ---
  {
    id: 12,
    name: 'موهيتو ريدبول',
    category: 'soda_mix',
    price: 90,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    description: 'مشروب طاقة ريدبول مع النعناع والليمون المثلج.',
    inStock: true,
    isBestSeller: true,
    hasSizes: false,
    additions: []
  },
  {
    id: 13,
    name: 'صودا بلوبري',
    category: 'soda_mix',
    price: 80,
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80',
    description: 'صودا منعشة بنكهة التوت الأزرق.',
    inStock: true,
    isBestSeller: false,
    hasSizes: false,
    additions: []
  },

  // --- قسم الوافل والكيك ---
  {
    id: 14,
    name: 'وافل شوكولاتة',
    category: 'dessert_waffle',
    price: 60,
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80',
    description: 'وافل مقرمش مغطى بصوص الشوكولاتة .',
    inStock: true,
    isBestSeller: true,
    hasSizes: false,
    additions: [
      { name: 'إضافة آيس كريم فانيليا', price: 20 }
    ]
  },
  {
    id: 15,
    name: 'براوني ',
    category: 'dessert_waffle',
    price: 90,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    description: 'كيكة براوني شوكولاتة غنية ودافئة.',
    inStock: true,
    isBestSeller: false,
    hasSizes: false,
    additions: []
  },
  {
    id: 16,
    name: 'تشيز كيك فراولة',
    category: 'dessert_waffle',
    price: 80,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80',
    description: 'قطعة تشيز كيك ناعمة مع صوص الفراولة.',
    inStock: true,
    isBestSeller: true,
    hasSizes: false,
    additions: []
  },

  // --- قسم الميلك شيك ---
  {
    id: 17,
    name: 'ميلك شيك أوريو',
    category: 'milkshake',
    price: 90,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
    description: 'مزيج حليب وكريمة وبسكويت أوريو المطحون.',
    inStock: true,
    isBestSeller: true,
    hasSizes: false,
    additions: []
  },
  {
    id: 18,
    name: 'ميلك شيك لوتس',
    category: 'milkshake',
    price: 90,
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80',
    description: 'ميلك شيك غني بنكهة وزبدة اللوتس.',
    inStock: true,
    isBestSeller: false,
    hasSizes: false,
    additions: []
  },

  // --- قسم الماتشا ---
  {
    id: 19,
    name: 'ايس ماتشا لاتيه',
    category: 'matcha',
    price: 80,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
    description: 'ماتشا مع الحليب والثلج.',
    inStock: true,
    isBestSeller: true,
    hasSizes: false,
    additions: []
  },

  // --- قسم الآيس كريم ---
  {
    id: 20,
    name: 'آيس كريم فانيليا',
    category: 'ice_cream',
    price: 50,
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80',
    description: 'بولة آيس كريم فانيليا غنية ومنعشة.',
    inStock: true,
    isBestSeller: false,
    hasSizes: false,
    additions: []
  }
];

/* ==========================================================
   3. معلومات الفرع والتواصل (Branch Info Section)
   ========================================================== */
const BRANCH_INFO = {
  name: 'Boda Cafe',
  phone: '+201115305492',
  altPhone: '+201150407377',
  address: 'الفرع الأول: شارع السجل المدني أمام بنك مصر',
  altAddress: 'الفرع الثاني: شارع شركة الغاز',
  hours: 'يومياً من 8:00 صباحاً وحتى 1:00 منتصف الليل',
  deliveryFeeDefault: 35,
  facebookUrl: 'https://www.facebook.com/share/1QmjP1RQ5a/?mibextid=wwXIfr',
  instagramUrl: 'https://instagram.com/boda_cafee'
};

/* ==========================================================
   4. المكون الرئيسي للتطبيق (Main App Component)
   ========================================================== */
export default function App() {
  const [activeTab, setActiveTab] = useState('home'); 
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const [checkoutStep, setCheckoutStep] = useState(1); 
  const [deliveryType, setDeliveryType] = useState('pickup'); // جعل استلام من الكافيه هو الافتراضي
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    area: 'المنطقة الرئيسية',
    notes: ''
  });
  const [notification, setNotification] = useState(null);

  // حفظ واسترجاع السلة من التخزين المحلي
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('boda_cafe_cart_cream');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('boda_cafe_cart_cream', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [cart]);

  // إظهار زر الصعود لأعلى عند التمرير
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // إضافة منتج للسلة (بدون فتح السلة تلقائياً)
  const addToCart = (product, selectedSize, selectedAddition, quantity = 1) => {
    const cartItemId = `${product.id}-${selectedSize?.name || 'default'}-${selectedAddition?.name || 'none'}`;
    
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const unitPrice = (selectedSize?.price || product.price) + (selectedAddition?.price || 0);
        return [...prevCart, {
          cartItemId,
          id: product.id,
          name: product.name,
          image: product.image,
          unitPrice,
          size: selectedSize?.name || null,
          addition: selectedAddition?.name || null,
          quantity
        }];
      }
    });

    showNotification(`تمت إضافة "${product.name}" إلى سلة Boda Cafe بنجاح`);
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    showNotification('تم إزالة المنتَج من السلة', 'info');
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const deliveryFee = deliveryType === 'delivery' ? BRANCH_INFO.deliveryFeeDefault : 0;
  const totalAmount = subtotal + (deliveryType === 'delivery' && cart.length > 0 ? deliveryFee : 0);
  const totalCartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // تصفية المنتجات حسب القسم والبحث
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // إرسال الطلب عبر الواتساب
  const handleWhatsAppCheckout = (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone || (deliveryType === 'delivery' && !customerInfo.address)) {
      showNotification('يرجى استكمال البيانات الأساسية (الاسم، الهاتف، والعنوان للتوصيل)', 'error');
      return;
    }

    let msg = `*طلب جديد عبر موقع BODA CAFE* ☕✨\n\n`;
    msg += `👤 *العميل:* ${customerInfo.name}\n`;
    msg += `📱 *الهاتف:* ${customerInfo.phone}\n`;
    msg += `📍 *طريقة الاستلام:* ${deliveryType === 'delivery' ? 'توصيل للمنزل' : 'استلام من الكافيه'}\n`;
    if (deliveryType === 'delivery') {
      msg += `🏠 *العنوان:* ${customerInfo.address} (${customerInfo.area})\n`;
    }
    if (customerInfo.notes) {
      msg += `📝 *ملاحظات:* ${customerInfo.notes}\n`;
    }
    
    msg += `\n🛒 *المنتجات المطلوبة:*\n`;
    cart.forEach((item, index) => {
      msg += `${index + 1}. ${item.name} (${item.size || 'قياسي'}${item.addition ? ` + ${item.addition}` : ''})\n`;
      msg += `   الكمية: ${item.quantity} × ${item.unitPrice} ج.م = *${item.unitPrice * item.quantity} ج.م*\n`;
    });

    msg += `\n------------------\n`;
    msg += `🔹 *مجموع المنتجات:* ${subtotal} ج.م\n`;
    if (deliveryType === 'delivery') {
      msg += `🚚 *رسوم التوصيل:* ${deliveryFee} ج.م\n`;
    }
    msg += `💰 *الإجمالي النهائي:* *${totalAmount} ج.م*\n\n`;
    msg += `بانتظار تأكيد الطلب من طرفكم. شكراً لاختياركم Boda Cafe!`;

    const encodedMessage = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/${BRANCH_INFO.phone.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    
    setCart([]);
    setCheckoutStep(3);
    showNotification('تم تجهيز طلبك وإرساله عبر واتساب بنجاح!');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#4A3B32] font-sans selection:bg-[#EED9C4] selection:text-[#3A2A20] antialiased rtl" dir="rtl">
      
      {/* 5. قسم الإشعارات والتنبيهات (Notifications Banner) */}
      {notification && (
        <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-xl shadow-2xl backdrop-blur-md border transition-all duration-300 animate-bounce ${
          notification.type === 'error' 
            ? 'bg-red-900/90 border-red-500 text-red-100' 
            : 'bg-[#8C6D53] border-[#EED9C4] text-[#FDFBF7]'
        }`}>
          {notification.type === 'error' ? <AlertCircle className="w-5 h-5 text-red-300" /> : <CheckCircle className="w-5 h-5 text-[#EED9C4]" />}
          <span className="font-medium text-sm">{notification.message}</span>
        </div>
      )}

      {/* ==========================================================
         6. الهيدر وشريط التنقل العلوي (Header & Navbar Section)
         ========================================================== */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EED9C4] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
          
          {/* شعار الكافيه واسمه */}
          <div 
            onClick={() => setActiveTab('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-full bg-[#1A1A1A] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform overflow-hidden border-2 border-[#D4B595]">
              <img 
                src="/logo.jpg" 
                alt="Boda Cafe Logo" 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = '/logo.png';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-wide text-[#3A2A20] font-serif block">Boda Cafe</span>
              </div>
              <span className="text-[10px] tracking-widest text-[#8C6D53] uppercase block font-medium">Specialty Coffee & More</span>
            </div>
          </div>

          {/* روابط التصفح */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <button 
              onClick={() => setActiveTab('home')} 
              className={`transition-colors hover:text-[#8C6D53] ${activeTab === 'home' ? 'text-[#8C6D53] border-b-2 border-[#8C6D53] pb-1' : 'text-[#5C4231]'}`}
            >
              الرئيسية
            </button>
            <button 
              onClick={() => { setActiveTab('menu'); setActiveCategory('all'); }} 
              className={`transition-colors hover:text-[#8C6D53] ${activeTab === 'menu' ? 'text-[#8C6D53] border-b-2 border-[#8C6D53] pb-1' : 'text-[#5C4231]'}`}
            >
              المنيو الكامل
            </button>
            <button 
              onClick={() => setActiveTab('contact')} 
              className={`transition-colors hover:text-[#8C6D53] ${activeTab === 'contact' ? 'text-[#8C6D53] border-b-2 border-[#8C6D53] pb-1' : 'text-[#5C4231]'}`}
            >
              تواصل معنا
            </button>
          </nav>

          {/* أيقونات السلة والقائمة للجوّال */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-[#F5EFE6] border border-[#E3D4C4] text-[#3A2A20] hover:border-[#8C6D53] transition-all flex items-center justify-center group shadow-sm"
              aria-label="سلة المشتريات"
            >
              <ShoppingBag className="w-5 h-5 text-[#8C6D53] group-hover:scale-110 transition-transform" />
              {totalCartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#8C6D53] text-[#FDFBF7] font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow animate-pulse">
                  {totalCartItemsCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setActiveTab(activeTab === 'mobile-menu' ? 'home' : 'mobile-menu')}
              className="md:hidden p-2.5 rounded-full bg-[#F5EFE6] border border-[#E3D4C4] text-[#3A2A20]"
            >
              {activeTab === 'mobile-menu' ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* قائمة الجوال المنسدلة */}
      {activeTab === 'mobile-menu' && (
        <div className="md:hidden bg-[#F5EFE6] border-b border-[#EED9C4] px-6 py-6 space-y-4 animate-fadeIn">
          <button onClick={() => { setActiveTab('home'); }} className="block w-full text-right text-base font-semibold py-2 border-b border-[#EED9C4] text-[#3A2A20]">الرئيسية</button>
          <button onClick={() => { setActiveTab('menu'); setActiveCategory('all'); }} className="block w-full text-right text-base font-semibold py-2 border-b border-[#EED9C4] text-[#3A2A20]">المنيو الكامل</button>
          <button onClick={() => { setActiveTab('contact'); }} className="block w-full text-right text-base font-semibold py-2 text-[#3A2A20]">تواصل معنا</button>
        </div>
      )}

      {/* ==========================================================
         7. صفحة الرئيسية (Home View Section)
         ========================================================== */}
      {activeTab === 'home' && (
        <main>
          {/* قسم الهيرو (الواجهة البصرية الكبرى) */}
          <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#3A2A20]">
            <div className="absolute inset-0 z-0">
              <img 
                src="/boda-draink1.PNG" 
                alt="Boda Cafe Luxury Coffee" 
                className="w-full h-full object-cover filter brightness-[0.45] scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1F17] via-[#3A2A20]/50 to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center py-20">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4B595]/20 border border-[#D4B595]/40 text-[#D4B595] text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                أهلاً بكم في بودا كافيه
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#FDFBF7] leading-[1.8] sm:leading-[2] mb-6">
              استمتع بألذ المشروبات <br className="hidden sm:block" />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4B595] via-[#F4E3D0] to-[#C8A27B]">
             مصنوعة خصيصاً لأجلك
             </span>
              </h1>
              <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#EAE0D6] mb-10 leading-relaxed">
                وجهتك الأولى لألذ المشروبات الساخنة، المثلجات، الموخيتو، والحلويات الطازجة على مدار اليوم.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => { setActiveTab('menu'); setActiveCategory('all'); }}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#8C6D53] to-[#6B5344] text-[#FDFBF7] font-bold text-base shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3 border border-[#D4B595]/30"
                >
                  <span>تصفح المنيو والأسعار</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setActiveTab('contact')}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#FDFBF7]/10 border border-[#D4B595]/50 text-[#FDFBF7] font-semibold text-base hover:bg-[#FDFBF7]/20 backdrop-blur-md transition-all flex items-center justify-center gap-2"
                >
                  <MapPin className="w-5 h-5 text-[#D4B595]" />
                  <span>موقعنا وفروعنا</span>
                </button>
              </div>
            </div>
          </section>

          {/* شريط الأقسام السريعة */}
          <section className="py-10 bg-[#F5EFE6] border-y border-[#EED9C4]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="text-center font-serif font-bold text-xl text-[#3A2A20] mb-8">الأقسام الأكثر طلباً في المنيو</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  { id: 'hot', name: 'مشروبات ساخنة', icon: '☕' },
                  { id: 'cold_coffee', name: 'آيس كوفي', icon: '🧊' },
                  { id: 'smoothie_juice', name: 'عصائر وسموذي', icon: '🍹' },
                  { id: 'soda_mix', name: 'موخيتو وصودا', icon: '🥤' },
                  { id: 'dessert_waffle', name: 'وافل وكيك', icon: '🧇' },
                  { id: 'milkshake', name: 'ميلك شيك', icon: '🥛' }
                ].map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => { setActiveTab('menu'); setActiveCategory(cat.id); }}
                    className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E3D4C4] hover:border-[#8C6D53] hover:shadow-md transition-all text-center group"
                  >
                    <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">{cat.icon}</span>
                    <span className="font-bold text-sm text-[#3A2A20]">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* مختارات بودا المميزة (الأكثر مبيعاً) */}
          <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-[#8C6D53] text-xs font-semibold tracking-widest uppercase block mb-2">الأكثر مبيعاً في Boda Cafe</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3A2A20]"> اختيارات بودا المميزة</h2>
              </div>
              <button 
                onClick={() => { setActiveTab('menu'); setActiveCategory('all'); }}
                className="mt-4 md:mt-0 text-sm font-bold text-[#8C6D53] hover:text-[#5C4231] flex items-center gap-2 group"
              >
                <span>عرض المنيو كاملًا</span>
                <ChevronRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUCTS.filter(p => p.isBestSeller).slice(0, 4).map(product => (
                <div key={product.id} className="group bg-[#F5EFE6] rounded-2xl overflow-hidden border border-[#E3D4C4] hover:border-[#8C6D53] transition-all duration-300 flex flex-col shadow-sm">
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#3A2A20] mb-1">{product.name}</h3>
                      <p className="text-xs text-[#6B5B50] line-clamp-2 mb-4">{product.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-[#EED9C4]">
                      <div className="text-[#8C6D53] font-bold text-lg">
                        {product.price} <span className="text-xs font-normal text-[#6B5B50]">ج.م</span>
                      </div>
                      <button 
                        onClick={() => setSelectedProductModal(product)}
                        className="px-4 py-2 rounded-xl bg-[#8C6D53] text-[#FDFBF7] text-xs font-bold hover:bg-[#6B5344] transition-colors shadow"
                      >
                        اطلب الآن
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* ==========================================================
         8. صفحة المنيو الكامل والبحث (Menu Catalog & Search View)
         ========================================================== */}
      {activeTab === 'menu' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#3A2A20] mb-3">قائمة المنيو والأسعار</h1>
            <p className="text-sm text-[#6B5B50]">اختر مشروبك المفضل أو الوجبة الطازجة واستمتع بألذ طعم في Boda Cafe.</p>
          </div>

          {/* خانة البحث السريع (Live Search) */}
          <div className="max-w-md mx-auto mb-8 relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8C6D53]" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن مشروبك أو وجبتك المفضلة..."
              className="w-full pl-4 pr-12 py-3 rounded-2xl bg-[#F5EFE6] border border-[#E3D4C4] text-xs text-[#3A2A20] focus:border-[#8C6D53] outline-none shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#6B5B50] hover:text-[#3A2A20]"
              >
                مسح
              </button>
            )}
          </div>

          {/* أزرار الفلترة للأقسام */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border ${
                  activeCategory === cat.id 
                    ? 'bg-[#8C6D53] text-[#FDFBF7] border-[#8C6D53] shadow' 
                    : 'bg-[#F5EFE6] text-[#5C4231] border-[#E3D4C4] hover:border-[#8C6D53]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* شبكة عرض المنتجات */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="group bg-[#F5EFE6] rounded-2xl overflow-hidden border border-[#E3D4C4] hover:border-[#8C6D53] transition-all duration-300 flex flex-col shadow-sm">
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#3A2A20] mb-2">{product.name}</h3>
                    <p className="text-xs text-[#6B5B50] mb-4 leading-relaxed">{product.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-[#EED9C4]">
                    <div className="text-[#8C6D53] font-bold text-lg">
                      {product.price} <span className="text-xs font-normal text-[#6B5B50]">ج.م</span>
                    </div>
                    <button 
                      onClick={() => setSelectedProductModal(product)}
                      className="px-5 py-2.5 rounded-xl bg-[#8C6D53] text-[#FDFBF7] text-xs font-bold hover:bg-[#6B5344] transition-colors shadow flex items-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>اختر واطلب</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================================
         9. صفحة تواصل معنا والموقع (Contact View Section)
         ========================================================== */}
      {activeTab === 'contact' && (
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#8C6D53] text-xs font-semibold tracking-widest uppercase block mb-2">تواصل معنا</span>
            <h1 className="text-4xl font-serif font-bold text-[#3A2A20] mb-3">زورنا أو اطلب أينما كنت</h1>
            <p className="text-sm text-[#6B5B50]">نسعد باستقبال طلباتكم واستفساراتكم على مدار اليوم.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#E3D4C4] text-center space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#8C6D53]/10 text-[#8C6D53] flex items-center justify-center mx-auto">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#3A2A20]">عناوين الفروع</h3>
              <p className="text-xs text-[#6B5B50] space-y-1">
                <span className="block font-medium">{BRANCH_INFO.address}</span>
                <span className="block font-medium">{BRANCH_INFO.altAddress}</span>
              </p>
            </div>

            {/* أرقام تواصل مع خاصية الاتصال التلقائي (Tel Link) */}
            <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#E3D4C4] text-center space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#8C6D53]/10 text-[#8C6D53] flex items-center justify-center mx-auto">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#3A2A20]">أرقام الحجز والاتصال</h3>
              <p className="text-xs text-[#6B5B50]" dir="ltr">
                <a href={`tel:${BRANCH_INFO.phone}`} className="hover:text-[#8C6D53] underline block font-bold">{BRANCH_INFO.phone}</a>
                <a href={`tel:${BRANCH_INFO.altPhone}`} className="hover:text-[#8C6D53] underline block font-bold mt-1">{BRANCH_INFO.altPhone}</a>
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#E3D4C4] text-center space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#8C6D53]/10 text-[#8C6D53] flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#3A2A20]">مواعيد العمل</h3>
              <p className="text-xs text-[#6B5B50]">{BRANCH_INFO.hours}</p>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================
         10. النوافذ المنبثقة والسلة (Modals & Cart Drawer Section)
         ========================================================== */}
      {selectedProductModal && (
        <ProductModal 
          product={selectedProductModal} 
          onClose={() => setSelectedProductModal(null)} 
          onAddToCart={addToCart} 
        />
      )}

      {isCartOpen && (
        <CartDrawer 
          cart={cart}
          onClose={() => setIsCartOpen(false)}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          totalAmount={totalAmount}
          deliveryType={deliveryType}
          setDeliveryType={setDeliveryType}
          customerInfo={customerInfo}
          setCustomerInfo={setCustomerInfo}
          checkoutStep={checkoutStep}
          setCheckoutStep={setCheckoutStep}
          handleWhatsAppCheckout={handleWhatsAppCheckout}
        />
      )}

      {/* زر العودة لأعلى الصفحة (Scroll to Top Button) */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-[#8C6D53] text-[#FDFBF7] shadow-xl hover:bg-[#6B5344] transition-all animate-bounce"
          aria-label="العودة لأعلى"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* ==========================================================
         11. الفوتر (Footer Section)
         ========================================================== */}
      <footer className="bg-[#2C1F17] text-[#EAE0D6] pt-16 pb-12 mt-20 border-t border-[#4A3B30]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          
          {/* معلومات الكافيه في الفوتر */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#8C6D53] flex items-center justify-center text-[#FDFBF7] font-bold font-serif overflow-hidden border border-[#D4B595]">
                <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" onError={(e)=>{e.target.onerror=null; e.target.src='/logo.png';}} />
              </div>
              <span className="text-lg font-bold font-serif text-[#FDFBF7]">Boda Cafe</span>
            </div>
            <p className="text-xs text-[#B5A496] leading-relaxed">
              وجهتك المفضلة للمشروبات الساخنة، المثلجات، الموخيتو، والأطعم الفاخرة.
            </p>
          </div>

          {/* روابط سريعة */}
          <div>
            <h4 className="font-bold text-sm text-[#FDFBF7] mb-4">روابط سريعة</h4>
            <ul className="space-y-2.5 text-xs text-[#B5A496]">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-[#D4B595] transition-colors">الرئيسية</button></li>
              <li><button onClick={() => { setActiveTab('menu'); setActiveCategory('all'); }} className="hover:text-[#D4B595] transition-colors">المنيو الكامل</button></li>
              <li><button onClick={() => setActiveTab('contact')} className="hover:text-[#D4B595] transition-colors">تواصل معنا</button></li>
            </ul>
          </div>

          {/* منصات التواصل الاجتماعي وأرقام الاتصال التلقائي */}
          <div>
            <h4 className="font-bold text-sm text-[#FDFBF7] mb-4">تابعنا على منصات التواصل</h4>
            <div className="flex items-center gap-3 mb-6">
              <a 
                href={BRANCH_INFO.facebookUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-[#3A2A20] border border-[#5C4231] flex items-center justify-center text-[#D4B595] hover:bg-[#8C6D53] hover:text-[#FDFBF7] transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href={BRANCH_INFO.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-[#3A2A20] border border-[#5C4231] flex items-center justify-center text-[#D4B595] hover:bg-[#8C6D53] hover:text-[#FDFBF7] transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
            <p className="text-xs text-[#8F7E70]" dir="ltr">
              Hotline: <a href={`tel:${BRANCH_INFO.phone}`} className="hover:text-[#D4B595] underline">{BRANCH_INFO.phone}</a>
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#3A2A20] text-center text-xs text-[#8F7E70]">
         جميع الحقوق محفوظة © 2026 Boda Cafe.
        </div>
      </footer>
    </div>
  );
}

/* ==========================================================
   12. نافذة تفاصيل واختيارات المنتج (Product Modal Component)
   ========================================================== */
function ProductModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);
  const [selectedAddition, setSelectedAddition] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const unitPrice = (selectedSize?.price || product.price) + (selectedAddition?.price || 0);
  const totalPrice = unitPrice * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#F5EFE6] border border-[#E3D4C4] rounded-3xl overflow-hidden shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-[#3A2A20]/80 text-[#FDFBF7] hover:bg-[#8C6D53] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-56 sm:h-64">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5EFE6] via-transparent to-transparent"></div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-2xl font-serif font-bold text-[#3A2A20] mb-2">{product.name}</h3>
            <p className="text-xs text-[#6B5B50] leading-relaxed">{product.description}</p>
          </div>

          {/* اختيار الحجم إن وجد */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <label className="block text-xs font-semibold text-[#8C6D53] uppercase mb-2">اختر الحجم:</label>
              <div className="grid grid-cols-2 gap-2">
                {product.sizes.map((sz, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSize(sz)}
                    className={`p-3 rounded-xl border text-xs font-medium text-right flex justify-between items-center transition-all ${
                      selectedSize?.name === sz.name 
                        ? 'border-[#8C6D53] bg-[#8C6D53]/10 text-[#3A2A20] font-bold' 
                        : 'border-[#E3D4C4] bg-[#FDFBF7] text-[#6B5B50]'
                    }`}
                  >
                    <span>{sz.name}</span>
                    <span className="font-bold text-[#8C6D53]">{sz.price} ج.م</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* الإضافات الاختيارية إن وجدت */}
          {product.additions && product.additions.length > 0 && (
            <div>
              <label className="block text-xs font-semibold text-[#8C6D53] uppercase mb-2">إضافات اختيارية:</label>
              <div className="space-y-2">
                {product.additions.map((add, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedAddition(selectedAddition?.name === add.name ? null : add)}
                    className={`w-full p-2.5 rounded-xl border text-xs font-medium flex justify-between items-center transition-all ${
                      selectedAddition?.name === add.name 
                        ? 'border-[#8C6D53] bg-[#8C6D53]/10 text-[#3A2A20] font-bold' 
                        : 'border-[#E3D4C4] bg-[#FDFBF7] text-[#6B5B50]'
                    }`}
                  >
                    <span>{add.name}</span>
                    <span className="font-bold text-[#8C6D53]">+{add.price} ج.م</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* التحكم في الكمية والسعر */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E3D4C4]">
            <div className="flex items-center gap-3 bg-[#FDFBF7] border border-[#E3D4C4] rounded-xl p-1">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="p-1.5 rounded-lg text-[#3A2A20] hover:bg-[#EED9C4]"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold text-sm text-[#3A2A20] w-6 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="p-1.5 rounded-lg text-[#3A2A20] hover:bg-[#EED9C4]"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="text-left">
              <span className="text-xs text-[#6B5B50] block">الإجمالي</span>
              <span className="text-xl font-bold text-[#8C6D53]">{totalPrice} ج.م</span>
            </div>
          </div>

          <button 
            onClick={() => {
              onAddToCart(product, selectedSize, selectedAddition, quantity);
              onClose();
            }}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#8C6D53] to-[#6B5344] text-[#FDFBF7] font-bold text-sm shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>إضافة إلى سلة المشتريات</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================
   13. لوحة سلة المشتريات وإتمام الطلب (Cart & Checkout Drawer)
   ========================================================== */
function CartDrawer({ 
  cart, onClose, updateQuantity, removeFromCart, 
  subtotal, deliveryFee, totalAmount, deliveryType, setDeliveryType,
  customerInfo, setCustomerInfo, checkoutStep, setCheckoutStep, handleWhatsAppCheckout 
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-[#F5EFE6] border-r border-[#E3D4C4] h-full flex flex-col shadow-2xl">
        
        <div className="p-5 border-b border-[#E3D4C4] flex items-center justify-between bg-[#FDFBF7]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#8C6D53]" />
            <h2 className="font-serif font-bold text-lg text-[#3A2A20]">سلة المشتريات والطلبات</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-[#6B5B50] hover:text-[#3A2A20] hover:bg-[#EED9C4]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {checkoutStep === 3 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#8C6D53]/20 text-[#8C6D53] flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#3A2A20]">تم تجهيز طلبك بنجاح!</h3>
              <p className="text-xs text-[#6B5B50] leading-relaxed max-w-xs mx-auto">
                تم تحويل طلبك مباشرة إلى تطبيق واتساب الخاص بـ Boda Cafe. سنقوم بمراجعة الطلب وتأكيده معك فوراً.
              </p>
              <button 
                onClick={() => { setCheckoutStep(1); onClose(); }}
                className="mt-6 px-6 py-3 rounded-xl bg-[#8C6D53] text-[#FDFBF7] font-bold text-xs"
              >
                العودة للتسوق
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-24 space-y-4">
              <ShoppingBag className="w-16 h-16 text-[#E3D4C4] mx-auto" />
              <p className="text-sm text-[#6B5B50]">سلة المشتريات فارغة حالياً.</p>
            </div>
          ) : checkoutStep === 1 ? (
            <>
              {/* قائمة منتجات السلة */}
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.cartItemId} className="flex gap-4 p-4 rounded-2xl bg-[#FDFBF7] border border-[#E3D4C4] items-center shadow-sm">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-[#3A2A20]">{item.name}</h4>
                      <p className="text-[11px] text-[#8C6D53]">
                        {item.size} {item.addition ? `• ${item.addition}` : ''}
                      </p>
                      <div className="text-xs font-bold text-[#5C4231] mt-1">
                        {item.unitPrice * item.quantity} ج.م
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <button onClick={() => removeFromCart(item.cartItemId)} className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-2 bg-[#F5EFE6] border border-[#E3D4C4] rounded-lg px-2 py-1">
                        <button onClick={() => updateQuantity(item.cartItemId, -1)}>-</button>
                        <span className="text-xs font-bold text-[#3A2A20]">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cartItemId, 1)}>+</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* اختيار طريقة الاستلام (افتراضي: استلام من الكافيه) */}
              <div className="pt-4 border-t border-[#E3D4C4]">
                <label className="block text-xs font-semibold text-[#8C6D53] uppercase mb-2">طريقة الاستلام:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setDeliveryType('pickup')}
                    className={`p-3 rounded-xl border text-xs font-medium text-center transition-all ${
                      deliveryType === 'pickup' ? 'border-[#8C6D53] bg-[#8C6D53]/10 text-[#3A2A20] font-bold' : 'border-[#E3D4C4] bg-[#FDFBF7] text-[#6B5B50]'
                    }`}
                  >
                    استلام من الكافيه
                  </button>
                  <button 
                    onClick={() => setDeliveryType('delivery')}
                    className={`p-3 rounded-xl border text-xs font-medium text-center transition-all ${
                      deliveryType === 'delivery' ? 'border-[#8C6D53] bg-[#8C6D53]/10 text-[#3A2A20] font-bold' : 'border-[#E3D4C4] bg-[#FDFBF7] text-[#6B5B50]'
                    }`}
                  >
                    توصيل للمنزل (+{BRANCH_INFO.deliveryFeeDefault} ج.م)
                  </button>
                </div>
              </div>

              {/* ملخص الحساب */}
              <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E3D4C4] space-y-2 shadow-sm">
                <div className="flex justify-between text-xs text-[#6B5B50]">
                  <span>مجموع المنتجات:</span>
                  <span>{subtotal} ج.م</span>
                </div>
                {deliveryType === 'delivery' && (
                  <div className="flex justify-between text-xs text-[#6B5B50]">
                    <span>رسوم التوصيل:</span>
                    <span>{deliveryFee} ج.م</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-[#3A2A20] pt-2 border-t border-[#E3D4C4]">
                  <span>الإجمالي النهائي:</span>
                  <span className="text-[#8C6D53] text-base">{totalAmount} ج.م</span>
                </div>
              </div>

              <button 
                onClick={() => setCheckoutStep(2)}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#8C6D53] to-[#6B5344] text-[#FDFBF7] font-bold text-sm shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <span>متابعة إتمام الطلب</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            /* نموذج بيانات العميل للواتساب */
            <form onSubmit={handleWhatsAppCheckout} className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif font-bold text-sm text-[#3A2A20]">بيانات العميل والتوصيل</h3>
                <button type="button" onClick={() => setCheckoutStep(1)} className="text-xs text-[#8C6D53] underline">العودة للسلة</button>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#6B5B50] mb-1">الاسم  *</label>
                <input 
                  type="text" 
                  required
                  value={customerInfo.name}
                  onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                  placeholder="أدخل اسمك"
                  className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E3D4C4] text-xs text-[#3A2A20] focus:border-[#8C6D53] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#6B5B50] mb-1">رقم الهاتف (واتساب) *</label>
                <input 
                  type="tel" 
                  dir="rtl"
                  required
                  value={customerInfo.phone}
                  onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  placeholder="رقم الهاتف"
                  className="w-full px-4 py-3 rounded-xl bg-[#FCF9F5] border border-[#E3D4C4] text-xs text-[#3A2A20] focus:border-[#8C6D53] outline-none text-right"
                />
              </div>

              {deliveryType === 'delivery' && (
                <div>
                  <label className="block text-xs font-medium text-[#6B5B50] mb-1">عنوان التوصيل بالتفصيل *</label>
                  <textarea 
                    required
                    rows="2"
                    value={customerInfo.address}
                    onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})}
                    placeholder="الشارع، رقم العمارة، الطابق، الشقة، وأقرب علامة مميزة"
                    className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E3D4C4] text-xs text-[#3A2A20] focus:border-[#8C6D53] outline-none resize-none"
                  ></textarea>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-[#6B5B50] mb-1">ملاحظات إضافية (اختياري)</label>
                <input 
                  type="text" 
                  value={customerInfo.notes}
                  onChange={e => setCustomerInfo({...customerInfo, notes: e.target.value})}
                  placeholder="مثل: بدون سكر، زيادة ثلج..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E3D4C4] text-xs text-[#3A2A20] focus:border-[#8C6D53] outline-none"
                />
              </div>

              <div className="p-4 rounded-xl bg-[#FDFBF7] border border-[#E3D4C4] text-xs text-[#6B5B50] space-y-1 shadow-sm">
                <div className="flex justify-between font-bold text-[#3A2A20]">
                  <span>إجمالي المبلغ المطلوب:</span>
                  <span className="text-[#8C6D53]">{totalAmount} ج.م</span>
                </div>
                <p className="text-[10px]">بالضغط أدناه سيتم فتح تطبيق واتساب لإرسال رسالة تفصيلية بالطلب إلى إدارة Boda Cafe.</p>
              </div>

              <button 
                type="submit"
                className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>تأكيد وإرسال الطلب عبر واتساب</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}