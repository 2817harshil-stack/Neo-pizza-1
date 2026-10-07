import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // --- NEO-POLITAN STYLE PIZZAS ---
  {
    id: 'pizza-classic-marinara',
    name: 'Classic Marinara',
    description: 'A timeless Italian favourite with tomato marinara, aromatic herbs and a light cheese layer on a crisp crust.',
    price: 99,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'pizza-green-bell-pepper',
    name: 'Green Bell Pepper',
    description: 'Fresh green capsicum layered on classic sauce and cheese, delivering a bold crunch with every bite.',
    price: 111,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'pizza-cheesy-corn',
    name: 'Cheesy Corn',
    description: 'Sweet corn folded with creamy cheese, baked till perfectly molten on a rich tomato base: simple, smooth and comforting.',
    price: 119,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80'
  },

  {
    id: 'pizza-pesto-delight',
    name: 'Pesto Delight',
    description: 'Fragrant basil pesto spread over a golden crust, topped with cheese and garden basil for a fresh, herby finish.',
    price: 139, // Special Sticker Price
    category: 'pizza',
    image: '/src/assets/images/regenerated_image_1784018663314.jpg',
    isFeature: true
  },
  {
    id: 'pizza-zucchini-crunch',
    name: 'Zucchini Crunch',
    description: 'Lightly seasoned zucchini and cucumber slices paired with mild cheese for a refreshing, crisp and modern pizza experience.',
    price: 169,
    category: 'pizza',
    image: '/src/assets/images/regenerated_image_1784018661132.jpg'
  },
  {
    id: 'pizza-cherry-tomato-blast',
    name: 'Cherry Tomato Blast',
    description: 'Juicy cherry tomatoes roasted to perfection, releasing sweet tangy flavours over melted cheese and Italian herbs.',
    price: 179,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },

  // --- MAGGI ---
  {
    id: 'maggi-classic',
    name: 'Classic Maggi',
    description: 'Simple, smooth and comforting maggi tossed in light butter and seasoning.',
    price: 55,
    category: 'maggi',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'maggi-masala',
    name: 'Masala Maggi',
    description: 'Classic maggi cooked with smoky Indian spices for a soulful bite.',
    price: 75,
    category: 'maggi',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'maggi-cheese-melt',
    name: 'Cheese Melt Maggi',
    description: 'Creamy, cheesy maggi finished with a rich melt for pure comfort indulgence.',
    price: 85,
    category: 'maggi',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=600&auto=format&fit=crop&q=80'
  },

  // --- SIDES & BEVERAGES ---
  {
    id: 'side-french-fries',
    name: 'French Fries',
    description: 'Crispy, golden skin-on potatoes seasoned lightly with salt, baked/fried to rustic perfection.',
    price: 79,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'bev-cold-coffee',
    name: 'Cold Coffee',
    description: 'Creamy, richly brewed cold coffee blended to frothy perfection. Simple, smooth, and refreshing.',
    price: 49,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  }
];

export const APP_HIGHLIGHTS = [
  {
    id: 'pure-veg',
    label: 'Pure Veg',
    description: 'Strictly 100% pure vegetarian preparation, adhering to the highest standards of purity.',
    emoji: '🌱'
  },
  {
    id: 'no-mayo',
    label: 'No Mayonnaise',
    description: 'Zero processed mayonnaise or artificial emulsions. Only high-quality olive oils and natural cheeses.',
    emoji: '🚫'
  },
  {
    id: 'premium-cheese',
    label: 'Premium Cheese',
    description: 'Real fior di latte mozzarella and cheddar cheeses. Absolutely no analog or hydrogenated fat blends.',
    emoji: '🧀'
  },
  {
    id: 'no-maida',
    label: '00\' Flour, No Maida',
    description: 'Authentic Italian Tipo 00 soft wheat flour, slow-fermented for 48 hours. Light on the stomach, zero maida.',
    emoji: '🌾'
  }
];
