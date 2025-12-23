import { ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';

export const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (roughly 100vh)
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      setIsVisible(scrollY > heroHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background border-t border-border shadow-2xl transform transition-transform duration-300 animate-in slide-in-from-bottom-5">
      <div className="flex items-center justify-between px-4 py-3 gap-3">
        {/* Price Summary */}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground">Starting from</p>
          <p className="text-base sm:text-lg font-bold text-primary truncate">$1,499 <span className="text-xs sm:text-sm font-normal text-muted-foreground">or $375/wk</span></p>
        </div>

        {/* CTA Button */}
        <a 
          href="/shop"
          className="flex items-center gap-2 bg-accent text-accent-foreground px-5 sm:px-6 py-3 font-semibold hover:bg-accent/90 transition-all rounded-lg active:scale-95 min-h-[48px]"
        >
          <ShoppingBag className="h-5 w-5" />
          <span className="hidden xs:inline">Shop Now</span>
        </a>
      </div>

      {/* Delivery Promise */}
      <div className="bg-primary/5 px-4 py-2 flex items-center justify-center gap-2 text-xs sm:text-sm">
        <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        <span className="text-primary truncate">Free delivery • Arrives Wed–Fri</span>
      </div>
    </div>
  );
};
