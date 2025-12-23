import { Button } from '@/components/ui/button';
import { Play, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-sofa.jpg';

export const Hero = () => {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] md:min-h-[100vh] flex items-center">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="ezhomes modular furniture in modern living space"
          className="w-full h-full object-cover md:object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent md:from-black/70 md:via-black/40"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6 md:mb-8 animate-fade-up">
            <span className="text-xs sm:text-sm font-medium tracking-wide">TRUSTED IN 300,000+ HOMES</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-[1.1] animate-fade-up [animation-delay:0.1s]">
            Furniture That
            <span className="block text-accent">Transforms</span>
            Your Space
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-10 leading-relaxed max-w-2xl animate-fade-up [animation-delay:0.2s]">
            Modular, space-saving furniture designed to adapt to how you live. 
            Ships in a compact box. Assembles in minutes.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 animate-fade-up [animation-delay:0.3s]">
            <div className="flex flex-col gap-2">
              <Button 
                asChild
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 text-base font-semibold px-6 sm:px-8 py-5 sm:py-6 rounded-none min-h-[52px] active:scale-95 transition-transform"
              >
                <Link to="/shop">Shop Now</Link>
              </Button>
              {/* Delivery ETA Badge */}
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>Order today, arrives <strong>Wed–Fri</strong></span>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-4 sm:gap-6 md:gap-8 mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/20 animate-fade-up [animation-delay:0.4s]">
            <div className="text-white/80">
              <div className="text-xl md:text-2xl font-bold text-white">4.9★</div>
              <div className="text-xs md:text-sm">2,000+ Reviews</div>
            </div>
            <div className="text-white/80">
              <div className="text-xl md:text-2xl font-bold text-white">10 Year</div>
              <div className="text-xs md:text-sm">Warranty</div>
            </div>
            <div className="text-white/80">
              <div className="text-xl md:text-2xl font-bold text-white">30 Day</div>
              <div className="text-xs md:text-sm">Free Returns</div>
            </div>
            <div className="text-white/80">
              <div className="text-xl md:text-2xl font-bold text-white">Free</div>
              <div className="text-xs md:text-sm">AU Shipping</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={scrollToProducts}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-white/60 hover:text-white transition-colors animate-bounce"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
};
