import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ShoppingBag, User, Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from './ui/button';

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Virtual Tour', href: '/virtual-tour' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'FAQ', href: '/faq' },
];

export const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { items } = useCart();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground py-2.5 text-center text-sm">
        <p className="font-medium tracking-wide">
          <span className="text-accent font-semibold">FREE SHIPPING</span> on all orders over $999 | 
          <span className="text-accent font-semibold ml-1">30-DAY</span> Risk-Free Trial
        </p>
      </div>

      {/* Main Header */}
      <header className="bg-background/95 backdrop-blur-md sticky top-0 z-50 border-b border-border/50">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center py-4 -ml-2 px-2 active:scale-95 transition-transform">
              <span className="text-2xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-primary">
                ezhomes
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    isActive(link.href) 
                      ? 'text-accent' 
                      : 'text-foreground/80'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Header Actions */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <button className="hidden sm:flex p-2 text-foreground/80 hover:text-primary transition-colors active:scale-95">
                <User className="h-5 w-5" />
              </button>
              <button 
                className="p-3 md:p-2 text-foreground/80 hover:text-primary transition-colors relative active:scale-95"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <ShoppingBag className="h-6 md:h-5 w-6 md:w-5" />
                <span className="absolute top-0 right-0 md:-top-0.5 md:-right-0.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full h-5 w-5 md:h-4 md:w-4 flex items-center justify-center">
                  {items.length}
                </span>
              </button>
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-3 text-foreground/80 hover:text-primary transition-colors active:scale-95"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-border/50">
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-base font-medium py-2 transition-colors hover:text-accent ${
                      isActive(link.href) 
                        ? 'text-accent' 
                        : 'text-foreground/80'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Cart Drawer */}
      {isCartOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-2xl animate-slide-in-right">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-lg font-semibold">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-muted rounded-full">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <CartDrawerContent onClose={() => setIsCartOpen(false)} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

// Separate component so hooks can be called outside conditional rendering
const CartDrawerContent: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { items, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();

  if (!items || items.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground mb-6">Your cart is empty</p>
          <button 
            onClick={onClose}
            className="btn-primary"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-6 overflow-y-auto">
        <ul className="space-y-4">
          {items.map((it) => (
            <li key={it.id} className="flex items-center gap-4">
              <div className="w-16 h-16 rounded overflow-hidden bg-muted shrink-0">
                {it.image && <img src={it.image} alt={it.title} className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-foreground">{it.title}</div>
                    <div className="text-sm text-muted-foreground">{it.variant ?? ''} {it.size ? `• ${it.size}` : ''}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary">${it.price.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Qty: {it.quantity}</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button onClick={() => updateQuantity(it.id, it.quantity - 1)} className="px-3 py-1 bg-muted rounded">−</button>
                  <span className="px-3">{it.quantity}</span>
                  <button onClick={() => updateQuantity(it.id, it.quantity + 1)} className="px-3 py-1 bg-muted rounded">+</button>
                  <button onClick={() => removeFromCart(it.id)} className="ml-4 text-sm text-destructive">Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 border-t border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-muted-foreground">Subtotal</div>
          <div className="font-semibold text-foreground">${subtotal.toLocaleString()}</div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="w-full" onClick={onClose} asChild>
            <Link to="/shop">Continue Shopping</Link>
          </Button>
          <Button className="w-full" asChild>
            <Link to="/checkout" onClick={onClose}>Checkout</Link>
          </Button>
        </div>
        <div className="mt-3 text-xs text-muted-foreground flex items-center justify-between">
          <button onClick={() => clearCart()} className="underline">Clear Cart</button>
          <span>Secure checkout • Easy returns</span>
        </div>
      </div>
    </div>
  );
};
