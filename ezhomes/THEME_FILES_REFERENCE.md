# ezhomes WordPress Theme - Complete File Reference

This document contains instructions for setting up the ezhomes WordPress/WooCommerce theme.

## Theme Structure

```
ezhomes/
├── woocommerce/
│   ├── archive-product.php    (Shop page - /shop) *required subfolder*
│   └── single-product.php     (Product page - /product/:id)
├── 404.php
├── archive.php
├── comments.php
├── footer.php
├── front-page.php
├── functions.php
├── header.php
├── index.php
├── main.js
├── page.php
├── product-interactions.js
├── quick-add.js
├── screenshot.png
├── search.php
├── searchform.php
├── sidebar.php
├── single.php
├── style.css
└── wpcode-ezhomes-complete.php
```

**Note:** The `woocommerce/` subfolder is required by WordPress/WooCommerce to detect template overrides.

## Installation Instructions

1. **Download all files** from the `ezhomes` folder
2. **Create a ZIP file** named `ezhomes.zip` containing the entire folder
3. **Upload to WordPress**: 
   - Go to WordPress Admin → Appearance → Themes → Add New → Upload Theme
   - Select your `ezhomes.zip` file
   - Click "Install Now"
4. **Activate the theme**
5. **Install WooCommerce** plugin if not already installed
6. **Configure theme options** in Appearance → Customize

## Brand Colors (Matching Lovable Design)

```css
/* Primary = Navy */
--ez-navy: #142638;
--ez-primary: #142638;

/* Accent = Gold */
--ez-gold: #E8C964;
--ez-accent: #E8C964;

/* Text/Light backgrounds */
--ez-cream: #DDD5C7;
--ez-sand: #C9BFB0;

/* Background */
--ez-background: #ffffff;
```

## Key Features

### Shop Page (archive-product.php)
- Promo banner with discount messaging
- Category filter pills
- Product grid with:
  - "SUMMER SALE" badges
  - Discount percentage badges
  - Color swatches
  - Star ratings
  - Monthly payment pricing
  - Quick Add overlay

### Product Page (single-product.php)
- Image gallery with thumbnails
- Size selector (e.g., 180cm, 200cm)
- Color/finish selector
- Stock status indicator
- "What's Included" section
- Add-ons with quantity controls
- Trust badges (Free Shipping, Warranty, Returns, Assembly)
- Delivery ETA
- Payment method icons
- Product tabs (Dimensions, Materials, Weight)
- Customer reviews
- Related products
- Sticky mobile Add to Cart bar

## Required Plugins

- **WooCommerce** - Core e-commerce functionality
- **WPCode** (optional) - For custom snippets without editing theme files

## Customizer Options

The theme adds these customizer sections:
- **Announcement Bar** - Enable/disable, custom text
- **Hero Section** - Title, subtitle, background image
- **Contact Information** - Phone, email
- **Social Media Links** - Facebook, Instagram, YouTube, etc.

## Notes

- The theme requires WooCommerce to be installed and activated
- All colors use CSS custom properties for easy theming
- JavaScript files handle cart drawer, gallery, and interactive elements
- The theme is mobile-responsive with sticky CTA on product pages
