import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { subscribeToNewsletter } from '@/services/klaviyo';
import { toast } from 'sonner';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    const result = await subscribeToNewsletter({ email, source: 'Website Footer' });
    setLoading(false);

    if (result.success) {
      toast.success(result.message);
      setEmail('');
    } else {
      toast.error(result.message);
    }
  };

  const footerLinks = {
    shop: [
      { name: 'All Products', href: '/shop' },
      { name: 'Tables', href: '/tables' },
      { name: 'Sofas', href: '/sofas' },
      { name: 'Accessories', href: '/accessories' },
    ],
    support: [
      { name: 'How It Works', href: '/how-it-works' },
      { name: 'Assembly Guide', href: '/assembly' },
      { name: 'FAQ', href: '/faq' },
    ],
    company: [
      { name: 'About Us', href: '/AboutUs' },
      { name: 'Reviews', href: '/reviews' },
      { name: 'Contact', href: '/Contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/PrivacyPolicy' },
      { name: 'Terms of Service', href: '/TermsOfService' },
      { name: 'Returns & Warranty', href: '/ReturnsWarranty' },
    ]
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Get 10% Off Your First Order
            </h3>
            <p className="text-primary-foreground/70 mb-8">
              Subscribe for exclusive deals, design tips, and new product launches.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 px-4 py-3 focus:outline-none focus:border-accent disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={loading}
                className="bg-accent text-accent-foreground px-8 py-3 font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="col-span-2">
            <a href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold">ezhomes</span>
            </a>
            
            <p className="text-primary-foreground/70 mb-6 max-w-xs">
              Modular, space-saving furniture designed for modern living. 
              Trusted in 300,000+ homes worldwide.
            </p>
            
            <div className="space-y-3 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4" />
                <span>Brisbane, Queensland, Australia</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4" />
                <span>+61433267318</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4" />
                <span>ezhomesinfo@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold mb-6 uppercase tracking-wide text-sm">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-6 uppercase tracking-wide text-sm">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-6 uppercase tracking-wide text-sm">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-6 uppercase tracking-wide text-sm">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-sm text-primary-foreground/60">
              © 2024 ezhomes. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              <a href="https://www.instagram.com/ezhomes.co/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-2 text-xs text-primary-foreground/60">
              <span className="px-2 py-1 border border-primary-foreground/20 rounded">Visa</span>
              <span className="px-2 py-1 border border-primary-foreground/20 rounded">Mastercard</span>
              <span className="px-2 py-1 border border-primary-foreground/20 rounded">PayPal</span>
              <span className="px-2 py-1 border border-primary-foreground/20 rounded">Afterpay</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
