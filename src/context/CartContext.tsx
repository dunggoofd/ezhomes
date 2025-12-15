import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Product } from '@/data/products';

export type CartItem = {
  id: string; // product id
  title: string;
  price: number;
  image?: string;
  quantity: number;
  variant?: string;
  size?: string;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product, opts?: { quantity?: number; variant?: string; size?: string; imageIndex?: number }) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, qty: number) => void;
  subtotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'ezhomes_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) as CartItem[] : [];
    } catch (e) {
      return [];
    }
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  }, [items]);

  const addToCart = (product: Product, opts?: { quantity?: number; variant?: string; size?: string; imageIndex?: number }) => {
    const quantity = opts?.quantity ?? 1;
    const variant = opts?.variant;
    const size = opts?.size;
    const image = product.externalImage ?? product.images?.[opts?.imageIndex ?? 0];

    setItems(prev => {
      // merge if same product + variant + size
      const idx = prev.findIndex(i => i.id === product.id && i.variant === variant && i.size === size);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + quantity };
        return copy;
      }

      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image,
          quantity,
          variant,
          size,
        },
      ];
    });
    
    // Open cart panel when item is added
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => setItems([]);

  const updateQuantity = (id: string, qty: number) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(0, qty) } : i).filter(i => i.quantity > 0));
  };
  
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, updateQuantity, subtotal, isCartOpen, openCart, closeCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

export default CartContext;
