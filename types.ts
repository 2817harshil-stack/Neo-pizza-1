export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'pizza' | 'maggi' | 'sides' | 'beverages';
  image?: string;
  isFeature?: boolean;
  isPopular?: boolean;
  spicyLevel?: 0 | 1 | 2 | 3;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface AppState {
  selectedTable: number | null;
  cart: CartItem[];
  isCartOpen: boolean;
}

export interface Order {
  id: string;
  tableNumber: number;
  customerName: string;
  items: {
    menuItemId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  status: 'Pending' | 'Preparing' | 'Completed' | 'Cancelled';
  createdAt: string;
}

