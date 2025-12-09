# ezhomes - Shopify Setup Guide

## 🚀 Complete Installation & Configuration Guide

### Prerequisites
- Shopify Plus or Advanced plan (for Online Store 2.0)
- Admin access to Shopify store
- Domain configured (ezhomes.com.au recommended)
- Basic understanding of Shopify admin

---

## Phase 1: Theme Installation

### 1.1 Upload Theme Files
```bash
# After building the React app, convert to Shopify theme structure
npm run build

# Use Shopify CLI to create theme package
shopify theme package
shopify theme push --store=your-store.myshopify.com
```

### 1.2 Theme Settings Configuration
Navigate to **Online Store > Themes > Customize**

#### Brand Colors
- Primary Color: `#1e293b` (Navy)
- Accent Color: `#f59e0b` (Gold)  
- Text Color: `#d9d4c7` (Cream)
- Background: `#ffffff` (White)

#### Typography
- Heading Font: System UI Stack
- Body Font: System UI Stack
- Font sizes: Automatic scaling based on viewport

---

## Phase 2: Product Setup

### 2.1 Product Categories
Create these collections in **Products > Collections**:

1. **All Products** (automatic, all products)
2. **Sofas** (manual selection)
3. **Sofa Beds** (manual selection)  
4. **Corner Units** (manual selection)
5. **Accessories** (manual selection)

### 2.2 Product Information Architecture

#### Required Product Fields:
```
Title: [Product Name] - [Color]
Handle: [automatic-url-slug]
Description: [Rich text with features, benefits, specifications]
Product Type: Sofa | Sofa Bed | Corner Unit | Accessory
Vendor: Star Sofa
Tags: bestseller, new, small-spaces, family-size, etc.
```

#### Essential Metafields:
```
Assembly Time: [Number] (e.g., 10)
Delivery Estimate: [Text] (e.g., "2-3 days Brisbane metro")
Frame Warranty: [Text] (e.g., "10 years")
Fabric Warranty: [Text] (e.g., "2 years")  
Ideal For: [Text] (e.g., "Apartments, Small spaces")
Dimensions: [Text] (e.g., "200cm W x 90cm D x 85cm H")
Weight: [Number] (in kg)
Shipping Box Size: [Text] (e.g., "120cm x 80cm x 40cm")
```

### 2.3 Product Variants Setup

#### Standard Variant Structure:
- **Color Options**: Navy, Charcoal, Cream, Sand
- **Size Options**: Compact, Standard, Large
- **Material Options**: Standard Fabric, Premium Fabric, Leather

#### Pricing Structure (AUD, GST included):
```
Compact 2-Seater: $899 - $1,199
Standard 3-Seater: $1,299 - $1,599  
Large 3-Seater: $1,599 - $1,999
Corner L-Shape: $1,899 - $2,399
Sofa Beds: $1,599 - $2,199
```

---

## Phase 3: Shopify App Integration

### 3.1 Essential Apps

#### Reviews & Ratings
**Recommended: Judge.me Product Reviews**
```
Settings:
- Enable review request emails (7 days after delivery)
- Photo/video reviews encouraged  
- Q&A section enabled
- Review widgets on product pages
- Overall rating in search results
```

#### Email Marketing
**Recommended: Klaviyo**
```
Flows to setup:
- Welcome series (3 emails)
- Abandoned cart (3 emails over 3 days)
- Post-purchase follow-up
- Review request sequence
- Winback campaign (90 days inactive)
```

#### Inventory Management
**Recommended: Stocky or native Shopify**
```
Settings:
- Track quantity
- Continue selling when out of stock: NO
- Low stock notifications: 5 units
- Inventory locations: Brisbane warehouse
```

### 3.2 Payment Gateways

#### Required for Australian Market:
1. **Shopify Payments** (primary)
2. **PayPal Express** 
3. **Afterpay** (Buy now, pay later)
4. **Zip** (Alternative BNPL)
5. **Apple Pay** (wallet)
6. **Google Pay** (wallet)

---

## Phase 4: Shipping Configuration

### 4.1 Shipping Zones

#### Zone 1: Brisbane Metro
```
Free shipping threshold: $1,000
Standard delivery: FREE (2-3 business days)
Express delivery: $29 (next business day)
Large items: $49 (assembly service available)
```

#### Zone 2: Major Cities (Sydney, Melbourne, Perth, Adelaide)
```
Free shipping threshold: $1,200
Standard delivery: $29 (3-4 business days)
Express delivery: $59 (1-2 business days)
Large items: $89
```

#### Zone 3: Regional Australia
```
Free shipping threshold: $1,500
Standard delivery: $49 (5-7 business days)
Express delivery: $99 (3-4 business days)
Large items: $149
```

### 4.2 Delivery Estimates
Configure in **Settings > Shipping and delivery**:

```liquid
{% comment %} In product templates {% endcomment %}
{% if customer.default_address.city contains 'Brisbane' %}
  <span class="delivery-badge">📦 2-3 days</span>
{% elsif customer.default_address.province == 'QLD' or customer.default_address.province == 'NSW' or customer.default_address.province == 'VIC' %}
  <span class="delivery-badge">📦 3-4 days</span>
{% else %}
  <span class="delivery-badge">📦 5-7 days</span>
{% endif %}
```

---

## Phase 5: SEO & Analytics

### 5.1 SEO Configuration

#### Search Engine Listing Preview:
```
Title: Star Sofa - Premium Compression Sofas | Australia's #1 Smart Furniture
Description: Revolutionary compression sofas that ship in compact boxes and assemble in 10 minutes. Premium quality, free AU shipping, 30-day returns. Sofa so good, ships so smart!
```

#### Meta Tags (in theme.liquid):
```html
<meta name="keywords" content="compression sofa, compact furniture, flat pack sofa, Brisbane furniture, Australian made sofa">
<meta name="author" content="Star Sofa">
<link rel="canonical" href="{{ canonical_url }}">
```

### 5.2 Google Analytics 4 Setup

#### Required Events:
```javascript
// Enhanced Ecommerce Events
gtag('event', 'view_item', {
  currency: 'AUD',
  value: {{ product.price | money_without_currency }},
  items: [{
    item_id: '{{ product.id }}',
    item_name: '{{ product.title }}',
    category: '{{ product.type }}',
    quantity: 1,
    price: {{ product.price | money_without_currency }}
  }]
});
```

### 5.3 Facebook Pixel Integration
Add to theme.liquid before closing `</head>`:

```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

---

## Phase 6: Legal & Compliance

### 6.1 Required Pages

#### Privacy Policy
Key points for Australian compliance:
- Data collection practices
- Cookie usage
- Email marketing consent
- Third-party integrations (GA, Facebook)
- Australian Privacy Principles compliance

#### Terms of Service  
Include:
- Purchase terms and conditions
- Delivery terms
- Assembly service terms
- Returns and refunds policy
- Warranty information
- Dispute resolution

#### Shipping Policy
Detail:
- Delivery timeframes by region
- Shipping costs and free shipping thresholds
- Special delivery services
- International shipping (if applicable)
- Packaging and handling information

### 6.2 GDPR/Privacy Compliance

#### Cookie Consent (if EU traffic expected):
```html
<div id="cookie-banner" class="fixed bottom-0 left-0 right-0 bg-primary text-primary-foreground p-4 z-50">
  <div class="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
    <p class="text-sm">We use cookies to enhance your shopping experience. By continuing, you agree to our cookie policy.</p>
    <div class="flex gap-2">
      <button onclick="acceptCookies()" class="btn-accent text-sm px-4 py-2">Accept</button>
      <a href="/cookie-policy" class="btn-ghost text-sm px-4 py-2">Learn More</a>
    </div>
  </div>
</div>
```

---

## Phase 7: Performance Optimization

### 7.1 Image Optimization
```liquid
{% comment %} Responsive image snippet {% endcomment %}
{% assign image_sizes = '(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw' %}

<img 
  src="{{ product.featured_image | img_url: '800x600' }}"
  srcset="
    {{ product.featured_image | img_url: '400x300' }} 400w,
    {{ product.featured_image | img_url: '800x600' }} 800w,
    {{ product.featured_image | img_url: '1200x900' }} 1200w
  "
  sizes="{{ image_sizes }}"
  alt="{{ product.featured_image.alt | escape }}"
  loading="lazy"
>
```

### 7.2 Critical CSS Inlining
```html
<style>
  /* Critical above-the-fold CSS */
  .hero-section { /* inline critical styles */ }
  .header { /* inline header styles */ }
</style>

<link rel="preload" href="{{ 'global.css' | asset_url }}" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

---

## Phase 8: Testing & QA

### 8.1 Pre-Launch Checklist

#### Functional Testing:
- [ ] All navigation links work
- [ ] Product pages display correctly
- [ ] Add to cart functions properly
- [ ] Checkout process completes
- [ ] Email confirmations send
- [ ] Mobile responsiveness verified

#### Performance Testing:
- [ ] PageSpeed Insights score > 90
- [ ] GTmetrix grade A
- [ ] Core Web Vitals pass
- [ ] Images load progressively
- [ ] No console errors

#### Accessibility Testing:
- [ ] WAVE accessibility checker passes
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Color contrast ratios verified
- [ ] Alt text on all images

### 8.2 Cross-Browser Testing
Test on:
- Chrome (desktop & mobile)
- Safari (desktop & iOS)
- Firefox (desktop)
- Edge (desktop)
- Samsung Internet (Android)

---

## Phase 9: Launch & Monitoring

### 9.1 Soft Launch Process
1. **Password protection** enabled
2. **Internal team testing** (1 week)
3. **Beta customer testing** (select customers)
4. **Full public launch**

### 9.2 Post-Launch Monitoring

#### Week 1 - Daily Monitoring:
- Site uptime and performance
- Conversion rates
- Customer feedback
- Technical issues

#### Week 2-4 - Weekly Reviews:
- Analytics performance
- Customer support tickets
- A/B testing results
- Inventory levels

#### Monthly - Growth Reviews:
- SEO rankings
- Conversion optimization
- Customer lifetime value
- Expansion opportunities

---

## 🆘 Troubleshooting Guide

### Common Issues:

#### Theme Not Loading Properly:
```bash
# Clear theme cache
shopify theme pull --store=your-store.myshopify.com
shopify theme push --store=your-store.myshopify.com
```

#### Images Not Displaying:
- Check file paths in asset folder
- Verify image alt text
- Ensure responsive image syntax

#### Checkout Issues:
- Verify payment gateway settings
- Check shipping zone configuration
- Test tax calculations

#### Performance Problems:
- Optimize image sizes
- Minimize JavaScript
- Enable Shopify's CDN
- Check third-party app impact

---

## 📞 Support Contacts

**Shopify Support**: Available 24/7 via admin panel
**Theme Developer**: [Your contact information]
**Ongoing Maintenance**: [Maintenance contact]

---

**Setup Complete!** 🎉 

Your Star Sofa Shopify store is now ready to revolutionize furniture delivery in Australia!