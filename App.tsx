import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import Cart from './components/Cart';
import Footer from './components/Footer';
import KitchenDashboard from './components/KitchenDashboard';
import OrderTracker from './components/OrderTracker';
import { MENU_ITEMS } from './data';
import { CartItem, MenuItem, Order } from './types';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<'customer' | 'kitchen'>('customer');

  // 1. Load Initial State from localStorage safely
  const [selectedTable, setSelectedTable] = useState<number | null>(() => {
    const saved = localStorage.getItem('neo_table_num');
    return saved ? parseInt(saved, 10) : null;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('neo_cart_items');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [hasActiveOrders, setHasActiveOrders] = useState(false);

  // Auto-detect table query parameter from QR code scans (e.g. ?table=1)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tableParam = params.get('table');
    if (tableParam) {
      const num = parseInt(tableParam, 10);
      if (!isNaN(num) && [1, 2, 3, 4].includes(num)) {
        setSelectedTable(num);
        // Clean up URL query parameter so it does not linger in the address bar
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  // Live monitor for any active/preparing orders to light up the status badge
  useEffect(() => {
    const checkActiveOrders = () => {
      try {
        const savedIdsStr = localStorage.getItem('neo_placed_order_ids');
        const savedOrdersStr = localStorage.getItem('neo_orders');
        
        if (!savedIdsStr || !savedOrdersStr) {
          setHasActiveOrders(false);
          return;
        }

        const ids: string[] = JSON.parse(savedIdsStr);
        const allOrders: Order[] = JSON.parse(savedOrdersStr);

        // Check if any order belonging to this session is in non-final state
        const active = allOrders.some(
          order => ids.includes(order.id) && 
          (order.status === 'Pending' || order.status === 'Preparing')
        );
        setHasActiveOrders(active);
      } catch (e) {
        setHasActiveOrders(false);
      }
    };

    checkActiveOrders();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'neo_orders' || e.key === 'neo_placed_order_ids') {
        checkActiveOrders();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // 2. Persist State Changes to localStorage
  useEffect(() => {
    if (selectedTable !== null) {
      localStorage.setItem('neo_table_num', selectedTable.toString());
    } else {
      localStorage.removeItem('neo_table_num');
    }
  }, [selectedTable]);

  useEffect(() => {
    localStorage.setItem('neo_cart_items', JSON.stringify(cart));
  }, [cart]);

  // 3. State Actions
  const handleSelectTable = (tableNum: number) => {
    setSelectedTable(tableNum);
  };

  const handleAddToCart = (menuItem: MenuItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.menuItem.id === menuItem.id);
      if (existing) {
        return prevCart.map((item) =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { menuItem, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.menuItem.id === itemId) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.menuItem.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Helper mapping for items counts
  const cartCountById = cart.reduce((acc, item) => {
    acc[item.menuItem.id] = item.quantity;
    return acc;
  }, {} as Record<string, number>);

  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotalPrice = cart.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);

  if (currentView === 'kitchen') {
    return <KitchenDashboard onBackToStore={() => setCurrentView('customer')} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] flex flex-col justify-between selection:bg-[#c5a880]/30 selection:text-[#c5a880]">
      
      {/* 1. Header (Navigation & Status) */}
      <Header
        selectedTable={selectedTable}
        cartCount={cartTotalItems}
        onOpenCart={() => setIsCartOpen(true)}
        onTableClick={() => {
          // Smooth scroll to table selector in hero
          const el = document.getElementById('hero');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenKitchen={() => setCurrentView('kitchen')}
        onOpenTracker={() => setIsTrackerOpen(true)}
        hasActiveOrders={hasActiveOrders}
      />


      {/* 2. Main Content */}
      <main className="flex-1">
        {/* Hero Section (Introduction & Table Selection) */}
        <Hero
          selectedTable={selectedTable}
          onSelectTable={handleSelectTable}
        />

        {/* Menu Listings */}
        <MenuSection
          items={MENU_ITEMS}
          cartCountById={cartCountById}
          onAddToCart={handleAddToCart}
        />
      </main>

      {/* 3. Footer (USP Highlights & Contact) */}
      <Footer onScrollToTop={handleScrollToTop} />

      {/* 4. Interactive Slide-over Cart Panel */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        selectedTable={selectedTable}
        onSelectTable={handleSelectTable}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderPlaced={() => {
          setIsTrackerOpen(true);
        }}
      />

      {/* Live Order Tracker Panel */}
      <OrderTracker
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        selectedTable={selectedTable}
      />

      {/* 5. Sticky Floating Order Banner (Desktop/Mobile overlay) */}
      <AnimatePresence>
        {cartTotalItems > 0 && !isCartOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-40 max-w-sm sm:w-80"
          >
            <button
              onClick={() => setIsCartOpen(true)}
              className="w-full bg-[#c5a880] text-black hover:bg-white p-4 rounded-xl flex items-center justify-between shadow-2xl transition-all duration-300 font-bold text-xs tracking-wider uppercase group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 shrink-0" />
                  <span className="absolute -top-1.5 -right-1.5 bg-[#859f7d] text-black text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                    {cartTotalItems}
                  </span>
                </div>
                <div>
                  <p className="text-[9px] text-black/60 font-light text-left tracking-widest leading-none">Your Order</p>
                  <p className="text-sm font-bold text-black font-mono mt-0.5">₹{cartTotalPrice.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5">
                <span>View Basket</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

