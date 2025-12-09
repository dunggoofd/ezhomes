# ezhomes WordPress/WooCommerce Integration Guide

Complete step-by-step instructions for integrating the ezhomes design system into WordPress/WooCommerce.

---

# Option 1: Custom Theme Development (Recommended)

This is broken into **7 phases**. Complete each phase in order.

---

# PHASE 1: Initial Setup

## Step 1.1: Access Your WordPress Installation

1. Connect to your hosting via FTP or File Manager
2. Navigate to: `wp-content/themes/`

## Step 1.2: Create Theme Folder

Create a new folder named `ezhomes`:
```
wp-content/themes/ezhomes/
```

## Step 1.3: Create Folder Structure

Inside `ezhomes/`, create these folders:

```
ezhomes/
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── inc/
├── template-parts/
│   ├── header/
│   ├── components/
│   └── footer/
└── woocommerce/
    ├── cart/
    ├── single-product/
    │   └── add-to-cart/
    └── checkout/
```

## Step 1.4: Upload Your Images

Copy these images to `assets/images/`:
- `hero-sofa.jpg` (from `src/assets/hero-sofa.jpg`)
- `compression-demo.jpg` (from `src/assets/compression-demo.jpg`)
- `assembly-guide.jpg` (from `src/assets/assembly-guide.jpg`)

## Step 1.5: Create Required Empty Files

Create these files (content added in later phases):

| File | Purpose |
|------|---------|
| `style.css` | Theme stylesheet (Phase 2) |
| `functions.php` | Theme functions (Phase 3) |
| `index.php` | Fallback template |
| `header.php` | Site header (Phase 4) |
| `footer.php` | Site footer (Phase 4) |
| `front-page.php` | Homepage (Phase 5) |

---

# PHASE 2: Theme Stylesheet (style.css)

Create `style.css` in the theme root. This is the main stylesheet.

## Step 2.1: Theme Header (REQUIRED)

This header is **required** for WordPress to recognize your theme:

```css
/*
Theme Name: ezhomes
Theme URI: https://ezhomes.com.au
Author: ezhomes
Description: Premium compression furniture e-commerce theme
Version: 1.0.0
Requires at least: 6.0
Tested up to: 6.4
Requires PHP: 8.0
License: GNU General Public License v2 or later
Text Domain: ezhomes
*/
```

## Step 2.2: Design Tokens (CSS Variables)

Add immediately after the theme header:

```css
/* ============================================
   DESIGN TOKENS
   ============================================ */

:root {
  /* Primary Colors */
  --primary: 222 47% 11%;           /* Deep Navy */
  --primary-foreground: 45 29% 97%; /* Cream */
  
  /* Secondary Colors */
  --secondary: 220 14% 96%;
  --secondary-foreground: 222 47% 11%;
  
  /* Accent - Warm Gold */
  --accent: 36 60% 50%;
  --accent-foreground: 222 47% 11%;
  
  /* Background & Foreground */
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  
  /* Muted */
  --muted: 220 14% 96%;
  --muted-foreground: 220 9% 46%;
  
  /* Border & Input */
  --border: 220 13% 91%;
  --input: 220 13% 91%;
  --ring: 222 47% 11%;
  
  /* Card */
  --card: 0 0% 100%;
  --card-foreground: 222 47% 11%;
  
  /* Destructive */
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 98%;
  
  /* Radius */
  --radius: 0.5rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}
```

## Step 2.3: Dark Mode (Optional)

```css
/* Dark Mode */
.dark {
  --background: 222 47% 6%;
  --foreground: 45 29% 97%;
  --card: 222 47% 8%;
  --card-foreground: 45 29% 97%;
  --muted: 222 47% 15%;
  --muted-foreground: 220 9% 70%;
  --border: 222 47% 20%;
}
```

## Step 2.4: Base Styles

```css
/* ============================================
   BASE STYLES
   ============================================ */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  line-height: 1.6;
}
```

## Step 2.5: Typography

```css
/* ============================================
   TYPOGRAPHY
   ============================================ */

h1, h2, h3, h4, h5, h6 {
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

h1 { font-size: clamp(2.5rem, 5vw, 4.5rem); }
h2 { font-size: clamp(2rem, 4vw, 3rem); }
h3 { font-size: clamp(1.5rem, 3vw, 2rem); }
h4 { font-size: clamp(1.25rem, 2vw, 1.5rem); }
```

## Step 2.6: Button Styles

```css
/* ============================================
   BUTTONS
   ============================================ */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-primary {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.btn-outline {
  background-color: transparent;
  border: 1px solid hsl(var(--primary));
  color: hsl(var(--primary));
}

.btn-outline:hover {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.btn-ghost {
  background-color: transparent;
  color: hsl(var(--foreground));
}

.btn-ghost:hover {
  background-color: hsl(var(--muted));
}

.btn-full {
  width: 100%;
}
```

## Step 2.7: Header Styles

```css
/* ============================================
   HEADER
   ============================================ */

.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: hsl(var(--background) / 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid hsl(var(--border));
}

.site-header.scrolled {
  box-shadow: var(--shadow-md);
}

.announcement-bar {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  padding: 0.5rem;
  text-align: center;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.header-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.site-logo {
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-decoration: none;
  color: hsl(var(--foreground));
}

.main-nav {
  display: flex;
  gap: 2rem;
}

.main-nav a {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-decoration: none;
  color: hsl(var(--foreground));
  transition: opacity 0.3s;
}

.main-nav a:hover {
  opacity: 0.7;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cart-count {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 18px;
  height: 18px;
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
  font-size: 0.625rem;
  font-weight: 600;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-menu-toggle {
  display: none;
}

@media (max-width: 768px) {
  .main-nav {
    display: none;
  }
  
  .main-nav.open {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: hsl(var(--background));
    padding: 1rem;
    border-top: 1px solid hsl(var(--border));
  }
  
  .mobile-menu-toggle {
    display: block;
  }
}
```

## Step 2.8: Hero Section Styles

```css
/* ============================================
   HERO SECTION
   ============================================ */

.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    hsl(var(--background) / 0.9) 0%,
    hsl(var(--background) / 0.5) 50%,
    transparent 100%
  );
}

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 1400px;
  width: 100%;
  padding: 0 2rem;
}

.hero-title {
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  max-width: 600px;
}

.hero-subtitle {
  font-size: 1.125rem;
  color: hsl(var(--muted-foreground));
  margin-bottom: 2rem;
  max-width: 500px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-trust {
  display: flex;
  gap: 2rem;
  margin-top: 3rem;
  flex-wrap: wrap;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-actions {
    flex-direction: column;
  }
}
```

## Step 2.9: Product Grid Styles

```css
/* ============================================
   PRODUCT GRID
   ============================================ */

.products-section {
  padding: 6rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 300;
  margin-bottom: 1rem;
}

.section-subtitle {
  color: hsl(var(--muted-foreground));
  max-width: 600px;
  margin: 0 auto;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.product-card {
  position: relative;
  background-color: hsl(var(--card));
  border-radius: var(--radius);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.product-image-wrapper {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  background-color: hsl(var(--muted));
}

.product-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.product-card:hover .product-image-wrapper img {
  transform: scale(1.05);
}

.product-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.25rem 0.75rem;
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 2px;
}

.product-badge.sale {
  background-color: hsl(var(--destructive));
  color: hsl(var(--destructive-foreground));
}

.product-badge.new {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.product-quick-add {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%) translateY(100%);
  opacity: 0;
  transition: all 0.3s;
}

.product-card:hover .product-quick-add {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

.product-info {
  padding: 1.5rem;
}

.product-title {
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.product-title a {
  text-decoration: none;
  color: inherit;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.price-current {
  font-size: 1.25rem;
  font-weight: 600;
}

.price-original {
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
  text-decoration: line-through;
}

.price-discount {
  font-size: 0.75rem;
  color: hsl(var(--destructive));
  font-weight: 600;
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
```

## Step 2.10: How It Works Styles

```css
/* ============================================
   HOW IT WORKS
   ============================================ */

.how-it-works {
  padding: 6rem 2rem;
  background-color: hsl(var(--muted));
}

.how-it-works-grid {
  max-width: 1400px;
  margin: 0 auto;
}

.how-it-works-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  padding: 4rem 0;
}

.how-it-works-item:nth-child(even) {
  direction: rtl;
}

.how-it-works-item:nth-child(even) > * {
  direction: ltr;
}

.how-it-works-image {
  aspect-ratio: 4/3;
  border-radius: var(--radius);
  overflow: hidden;
}

.how-it-works-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.how-it-works-content {
  padding: 2rem;
}

.step-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border-radius: 50%;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.how-it-works-title {
  font-size: 1.75rem;
  font-weight: 400;
  margin-bottom: 1rem;
}

.how-it-works-description {
  color: hsl(var(--muted-foreground));
  line-height: 1.8;
}

@media (max-width: 1024px) {
  .how-it-works-item {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .how-it-works-item:nth-child(even) {
    direction: ltr;
  }
}
```

## Step 2.11: Trust Section Styles

```css
/* ============================================
   TRUST SECTION
   ============================================ */

.trust-section {
  padding: 6rem 2rem;
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.trust-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.trust-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  margin-bottom: 4rem;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 3rem;
  font-weight: 300;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.8;
}

.testimonial {
  max-width: 800px;
  margin: 0 auto;
}

.testimonial-quote {
  font-size: 1.5rem;
  font-weight: 300;
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.testimonial-author {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

@media (max-width: 768px) {
  .trust-stats {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .trust-stats {
    grid-template-columns: 1fr;
  }
}
```

## Step 2.12: Footer Styles

```css
/* ============================================
   FOOTER
   ============================================ */

.site-footer {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  padding: 4rem 2rem 2rem;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-brand {
  max-width: 300px;
}

.footer-logo {
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.footer-description {
  font-size: 0.875rem;
  opacity: 0.8;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  color: hsl(var(--primary-foreground));
  opacity: 0.8;
  transition: opacity 0.3s;
}

.social-links a:hover {
  opacity: 1;
}

.footer-column h4 {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 1.5rem;
  opacity: 0.6;
}

.footer-column ul {
  list-style: none;
}

.footer-column li {
  margin-bottom: 0.75rem;
}

.footer-column a {
  font-size: 0.875rem;
  color: hsl(var(--primary-foreground));
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.footer-column a:hover {
  opacity: 1;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid hsl(var(--primary-foreground) / 0.1);
}

.footer-copyright {
  font-size: 0.75rem;
  opacity: 0.6;
}

.footer-payments {
  display: flex;
  gap: 1rem;
}

.payment-icon {
  width: 40px;
  height: 25px;
  background-color: hsl(var(--primary-foreground) / 0.1);
  border-radius: 4px;
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
```

## Step 2.13: Newsletter Styles

```css
/* ============================================
   NEWSLETTER
   ============================================ */

.newsletter-section {
  padding: 4rem 2rem;
  background-color: hsl(var(--muted));
}

.newsletter-container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.newsletter-form {
  display: flex;
  gap: 0.5rem;
}

.newsletter-input {
  flex: 1;
  padding: 0.75rem 1rem;
  background-color: hsl(var(--background));
  border: 1px solid hsl(var(--border));
  color: hsl(var(--foreground));
  border-radius: var(--radius);
}

.newsletter-input::placeholder {
  color: hsl(var(--muted-foreground));
}

@media (max-width: 480px) {
  .newsletter-form {
    flex-direction: column;
  }
}
```

## Step 2.14: Cart Drawer Styles

```css
/* ============================================
   CART DRAWER
   ============================================ */

.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 420px;
  background-color: hsl(var(--background));
  z-index: 1100;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  box-shadow: var(--shadow-xl);
  display: flex;
  flex-direction: column;
}

.cart-drawer.open {
  transform: translateX(0);
}

.cart-overlay {
  position: fixed;
  inset: 0;
  background-color: hsl(var(--foreground) / 0.5);
  z-index: 1050;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
}

.cart-overlay.open {
  opacity: 1;
  visibility: visible;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid hsl(var(--border));
}

.cart-header h3 {
  font-size: 1.25rem;
  font-weight: 500;
}

.cart-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: hsl(var(--foreground));
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.cart-empty {
  text-align: center;
  padding: 3rem 1rem;
  color: hsl(var(--muted-foreground));
}

.cart-footer {
  padding: 1.5rem;
  border-top: 1px solid hsl(var(--border));
}
```

## Step 2.15: WooCommerce Overrides

```css
/* ============================================
   WOOCOMMERCE OVERRIDES
   ============================================ */

.woocommerce ul.products {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.woocommerce ul.products li.product {
  width: 100% !important;
  margin: 0 !important;
}

.woocommerce .products .star-rating {
  margin: 0.5rem 0;
}

.woocommerce a.button,
.woocommerce button.button,
.woocommerce input.button {
  background-color: hsl(var(--primary)) !important;
  color: hsl(var(--primary-foreground)) !important;
  border-radius: var(--radius) !important;
  font-size: 0.875rem !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  padding: 0.75rem 2rem !important;
}

.woocommerce a.button:hover,
.woocommerce button.button:hover {
  background-color: hsl(var(--primary) / 0.9) !important;
}

.woocommerce-message,
.woocommerce-info {
  border-top-color: hsl(var(--primary)) !important;
}

.woocommerce-message::before,
.woocommerce-info::before {
  color: hsl(var(--primary)) !important;
}

/* Product page overrides */
.woocommerce div.product div.images {
  width: 55% !important;
}

.woocommerce div.product div.summary {
  width: 40% !important;
}

.woocommerce div.product .woocommerce-tabs {
  margin-top: 3rem;
}
```

---

# PHASE 3: Theme Functions (functions.php)

Create `functions.php` in the theme root.

## Step 3.1: Opening Tag & Security Check

```php
<?php
/**
 * ezhomes Theme Functions
 * 
 * @package ezhomes
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
```

## Step 3.2: Theme Setup

```php
/**
 * Theme Setup
 */
function ezhomes_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', [
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption'
    ]);
    
    // WooCommerce support
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
    
    // Register menus
    register_nav_menus([
        'primary' => __('Primary Menu', 'ezhomes'),
        'footer'  => __('Footer Menu', 'ezhomes'),
    ]);
}
add_action('after_setup_theme', 'ezhomes_setup');
```

## Step 3.3: Enqueue Scripts & Styles

```php
/**
 * Enqueue Scripts & Styles
 */
function ezhomes_scripts() {
    // Main stylesheet
    wp_enqueue_style(
        'ezhomes-style',
        get_stylesheet_uri(),
        [],
        '1.0.0'
    );
    
    // Main JavaScript
    wp_enqueue_script(
        'ezhomes-main',
        get_template_directory_uri() . '/assets/js/main.js',
        [],
        '1.0.0',
        true
    );
    
    // Localize script for AJAX
    wp_localize_script('ezhomes-main', 'ezhomes_ajax', [
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('ezhomes_nonce'),
    ]);
}
add_action('wp_enqueue_scripts', 'ezhomes_scripts');
```

## Step 3.4: WooCommerce Configuration

```php
/**
 * WooCommerce Configuration
 */
function ezhomes_woocommerce_setup() {
    add_theme_support('woocommerce', [
        'thumbnail_image_width' => 600,
        'single_image_width'    => 800,
        'product_grid'          => [
            'default_rows'    => 3,
            'min_rows'        => 1,
            'default_columns' => 3,
            'min_columns'     => 1,
            'max_columns'     => 4,
        ],
    ]);
}
add_action('after_setup_theme', 'ezhomes_woocommerce_setup');

// Remove default WooCommerce wrappers
remove_action('woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10);
remove_action('woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10);

// Add custom wrappers
function ezhomes_woocommerce_wrapper_before() {
    echo '<main class="site-main woocommerce-main"><div class="container">';
}
add_action('woocommerce_before_main_content', 'ezhomes_woocommerce_wrapper_before');

function ezhomes_woocommerce_wrapper_after() {
    echo '</div></main>';
}
add_action('woocommerce_after_main_content', 'ezhomes_woocommerce_wrapper_after');
```

## Step 3.5: AJAX Cart Drawer

```php
/**
 * AJAX Cart Drawer
 */
function ezhomes_get_cart_contents() {
    check_ajax_referer('ezhomes_nonce', 'nonce');
    
    ob_start();
    woocommerce_mini_cart();
    $cart_html = ob_get_clean();
    
    wp_send_json_success([
        'cart_html'  => $cart_html,
        'cart_count' => WC()->cart->get_cart_contents_count(),
        'cart_total' => WC()->cart->get_cart_total(),
    ]);
}
add_action('wp_ajax_get_cart_contents', 'ezhomes_get_cart_contents');
add_action('wp_ajax_nopriv_get_cart_contents', 'ezhomes_get_cart_contents');
```

## Step 3.6: Custom Product Badges

```php
/**
 * Custom Product Badges
 */
function ezhomes_product_badge() {
    global $product;
    
    if ($product->is_on_sale()) {
        $regular = (float) $product->get_regular_price();
        $sale = (float) $product->get_sale_price();
        if ($regular > 0) {
            $percentage = round((($regular - $sale) / $regular) * 100);
            echo '<span class="product-badge sale">-' . $percentage . '%</span>';
        }
    } elseif ($product->is_featured()) {
        echo '<span class="product-badge featured">Best Seller</span>';
    } elseif (strtotime($product->get_date_created()) > strtotime('-30 days')) {
        echo '<span class="product-badge new">New</span>';
    }
}
add_action('woocommerce_before_shop_loop_item_title', 'ezhomes_product_badge', 5);
```

## Step 3.7: Trust Bar Shortcode

```php
/**
 * Trust Bar Shortcode
 * Usage: [trust_bar]
 */
function ezhomes_trust_bar_shortcode() {
    ob_start();
    ?>
    <div class="trust-bar">
        <div class="trust-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="1" y="3" width="15" height="13"/>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
            <span>Free AU Shipping</span>
        </div>
        <div class="trust-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>10-Min Assembly</span>
        </div>
        <div class="trust-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span>10-Year Warranty</span>
        </div>
        <div class="trust-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="23 4 23 10 17 10"/>
                <polyline points="1 20 1 14 7 14"/>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
            <span>30-Day Returns</span>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('trust_bar', 'ezhomes_trust_bar_shortcode');
```

## Step 3.8: Customizer Settings

```php
/**
 * Customizer Settings
 */
function ezhomes_customizer($wp_customize) {
    // Announcement Bar Section
    $wp_customize->add_section('ezhomes_announcement', [
        'title'    => __('Announcement Bar', 'ezhomes'),
        'priority' => 30,
    ]);
    
    // Announcement Text
    $wp_customize->add_setting('announcement_text', [
        'default'           => 'Free Shipping on Orders Over $999 | 30-Day Risk-Free Trial',
        'sanitize_callback' => 'sanitize_text_field',
    ]);
    
    $wp_customize->add_control('announcement_text', [
        'label'   => __('Announcement Text', 'ezhomes'),
        'section' => 'ezhomes_announcement',
        'type'    => 'text',
    ]);
    
    // Announcement Bar Toggle
    $wp_customize->add_setting('show_announcement', [
        'default'           => true,
        'sanitize_callback' => 'wp_validate_boolean',
    ]);
    
    $wp_customize->add_control('show_announcement', [
        'label'   => __('Show Announcement Bar', 'ezhomes'),
        'section' => 'ezhomes_announcement',
        'type'    => 'checkbox',
    ]);
}
add_action('customize_register', 'ezhomes_customizer');
```

---

# PHASE 4: Template Files

## Step 4.1: Create header.php

```php
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header">
    <?php if (get_theme_mod('show_announcement', true)) : ?>
    <!-- Announcement Bar -->
    <div class="announcement-bar">
        <?php echo esc_html(get_theme_mod('announcement_text', 'Free Shipping on Orders Over $999 | 30-Day Risk-Free Trial')); ?>
    </div>
    <?php endif; ?>
    
    <!-- Main Header -->
    <div class="header-main">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="site-logo">
            ezhomes
        </a>
        
        <nav class="main-nav" id="main-nav">
            <?php
            wp_nav_menu([
                'theme_location' => 'primary',
                'container'      => false,
                'items_wrap'     => '%3$s',
                'fallback_cb'    => false,
            ]);
            ?>
        </nav>
        
        <div class="header-actions">
            <button class="btn-ghost" aria-label="Search">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                </svg>
            </button>
            
            <button class="btn-ghost cart-toggle" aria-label="Cart" style="position: relative;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                <?php if (function_exists('WC') && WC()->cart->get_cart_contents_count() > 0) : ?>
                    <span class="cart-count"><?php echo esc_html(WC()->cart->get_cart_contents_count()); ?></span>
                <?php endif; ?>
            </button>
            
            <button class="btn-ghost mobile-menu-toggle" aria-label="Menu" aria-controls="main-nav">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
            </button>
        </div>
    </div>
</header>

<!-- Cart Drawer Overlay -->
<div class="cart-overlay" id="cart-overlay"></div>

<!-- Cart Drawer -->
<div class="cart-drawer" id="cart-drawer">
    <div class="cart-header">
        <h3>Your Cart</h3>
        <button class="cart-close" id="cart-close" aria-label="Close cart">&times;</button>
    </div>
    <div class="cart-items" id="cart-items">
        <?php if (function_exists('woocommerce_mini_cart')) : ?>
            <?php woocommerce_mini_cart(); ?>
        <?php else : ?>
            <div class="cart-empty">
                <p>Your cart is empty</p>
            </div>
        <?php endif; ?>
    </div>
    <div class="cart-footer">
        <?php if (function_exists('WC')) : ?>
            <a href="<?php echo esc_url(wc_get_checkout_url()); ?>" class="btn btn-primary btn-full">
                Checkout — <?php echo WC()->cart->get_cart_total(); ?>
            </a>
        <?php endif; ?>
    </div>
</div>
```

## Step 4.2: Create footer.php

```php
<footer class="site-footer">
    <div class="footer-container">
        <div class="footer-grid">
            <div class="footer-brand">
                <div class="footer-logo">ezhomes</div>
                <p class="footer-description">
                    Premium compression furniture delivered to your door. 
                    Unbox, unfold, unwind.
                </p>
                <div class="social-links">
                    <a href="#" aria-label="Facebook">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                        </svg>
                    </a>
                    <a href="#" aria-label="Instagram">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                        </svg>
                    </a>
                    <a href="#" aria-label="Pinterest">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.44l1.4-5.96s-.35-.71-.35-1.76c0-1.65.96-2.88 2.15-2.88 1.02 0 1.51.76 1.51 1.67 0 1.02-.65 2.54-.98 3.95-.28 1.17.6 2.12 1.75 2.12 2.1 0 3.72-2.22 3.72-5.42 0-2.83-2.04-4.82-4.95-4.82-3.37 0-5.35 2.53-5.35 5.14 0 1.02.39 2.11.88 2.7.1.12.11.22.08.34l-.33 1.34c-.05.22-.18.26-.4.16-1.5-.7-2.43-2.88-2.43-4.64 0-3.77 2.74-7.24 7.9-7.24 4.15 0 7.37 2.96 7.37 6.91 0 4.12-2.6 7.43-6.2 7.43-1.21 0-2.35-.63-2.74-1.37l-.75 2.84c-.27 1.04-1 2.35-1.49 3.15A12 12 0 1 0 12 0z"/>
                        </svg>
                    </a>
                </div>
            </div>
            
            <div class="footer-column">
                <h4>Shop</h4>
                <ul>
                    <li><a href="<?php echo esc_url(get_permalink(wc_get_page_id('shop'))); ?>">All Products</a></li>
                    <li><a href="#">Sofas</a></li>
                    <li><a href="#">Sofa Beds</a></li>
                    <li><a href="#">Accessories</a></li>
                </ul>
            </div>
            
            <div class="footer-column">
                <h4>Support</h4>
                <ul>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">Shipping Info</a></li>
                    <li><a href="#">Returns</a></li>
                    <li><a href="#">Warranty</a></li>
                    <li><a href="#">FAQs</a></li>
                </ul>
            </div>
            
            <div class="footer-column">
                <h4>Company</h4>
                <ul>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Reviews</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms of Service</a></li>
                </ul>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p class="footer-copyright">
                &copy; <?php echo date('Y'); ?> ezhomes. All rights reserved. ABN: 00 000 000 000
            </p>
            <div class="footer-payments">
                <span class="payment-icon" title="Visa"></span>
                <span class="payment-icon" title="Mastercard"></span>
                <span class="payment-icon" title="Afterpay"></span>
                <span class="payment-icon" title="Zip"></span>
                <span class="payment-icon" title="Apple Pay"></span>
            </div>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
```

## Step 4.3: Create index.php (Fallback Template)

```php
<?php
/**
 * Main template fallback
 *
 * @package ezhomes
 */

get_header();
?>

<main id="primary" class="site-main" style="padding-top: 120px;">
    <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
        <?php
        if (have_posts()) :
            while (have_posts()) :
                the_post();
                ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                    <header class="entry-header">
                        <?php the_title('<h1 class="entry-title">', '</h1>'); ?>
                    </header>
                    
                    <div class="entry-content">
                        <?php the_content(); ?>
                    </div>
                </article>
                <?php
            endwhile;
        else :
            ?>
            <p><?php esc_html_e('Nothing found.', 'ezhomes'); ?></p>
            <?php
        endif;
        ?>
    </div>
</main>

<?php
get_footer();
```

---

# PHASE 5: Homepage (front-page.php)

Create `front-page.php` in the theme root.

```php
<?php
/**
 * Homepage Template
 *
 * @package ezhomes
 */

get_header();
?>

<!-- Hero Section -->
<section class="hero">
    <div class="hero-background">
        <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/hero-sofa.jpg" 
             alt="Premium compression sofa in modern living room"
             loading="eager">
        <div class="hero-overlay"></div>
    </div>
    
    <div class="hero-content">
        <h1 class="hero-title">Furniture That Transforms Your Space</h1>
        <p class="hero-subtitle">
            Premium compression sofas delivered to your door. 
            Unbox, unfold, unwind — assembly takes just 10 minutes.
        </p>
        
        <div class="hero-actions">
            <a href="<?php echo esc_url(get_permalink(wc_get_page_id('shop'))); ?>" class="btn btn-primary">
                Shop Now
            </a>
            <a href="<?php echo esc_url(home_url('/how-it-works')); ?>" class="btn btn-outline">
                Watch Video
            </a>
        </div>
        
        <div class="hero-trust">
            <div class="trust-item">
                <span>★ 4.9</span>
                <span>2,500+ Reviews</span>
            </div>
            <div class="trust-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span>10-Year Warranty</span>
            </div>
            <div class="trust-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="23 4 23 10 17 10"/>
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                </svg>
                <span>30-Day Returns</span>
            </div>
            <div class="trust-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="1" y="3" width="15" height="13"/>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                    <circle cx="5.5" cy="18.5" r="2.5"/>
                    <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
                <span>Free AU Shipping</span>
            </div>
        </div>
    </div>
</section>

<!-- Featured Products -->
<section class="products-section">
    <div class="section-header">
        <h2 class="section-title">Our Collection</h2>
        <p class="section-subtitle">
            Compression-packed for easy delivery, premium comfort for years to come.
        </p>
    </div>
    
    <?php
    $args = [
        'post_type'      => 'product',
        'posts_per_page' => 6,
        'meta_key'       => 'total_sales',
        'orderby'        => 'meta_value_num',
        'order'          => 'DESC',
    ];
    $products = new WP_Query($args);
    
    if ($products->have_posts()) :
    ?>
    <div class="products-grid">
        <?php 
        while ($products->have_posts()) : 
            $products->the_post();
            global $product;
        ?>
        <div class="product-card">
            <div class="product-image-wrapper">
                <?php ezhomes_product_badge(); ?>
                <a href="<?php the_permalink(); ?>">
                    <?php woocommerce_template_loop_product_thumbnail(); ?>
                </a>
                <div class="product-quick-add">
                    <?php woocommerce_template_loop_add_to_cart(); ?>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">
                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                </h3>
                <div class="product-price">
                    <?php woocommerce_template_loop_price(); ?>
                </div>
            </div>
        </div>
        <?php 
        endwhile;
        wp_reset_postdata();
        ?>
    </div>
    <?php endif; ?>
    
    <div style="text-align: center; margin-top: 3rem;">
        <a href="<?php echo esc_url(get_permalink(wc_get_page_id('shop'))); ?>" class="btn btn-outline">
            View All Products
        </a>
    </div>
</section>

<!-- How It Works -->
<section class="how-it-works">
    <div class="section-header">
        <h2 class="section-title">How Compression Furniture Works</h2>
    </div>
    
    <div class="how-it-works-grid">
        <!-- Step 1 -->
        <div class="how-it-works-item">
            <div class="how-it-works-image">
                <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/compression-demo.jpg" 
                     alt="Vacuum compression technology" 
                     loading="lazy">
            </div>
            <div class="how-it-works-content">
                <span class="step-number">1</span>
                <h3 class="how-it-works-title">Compressed for Easy Delivery</h3>
                <p class="how-it-works-description">
                    Our sofas are vacuum-sealed and compressed to a fraction of their size, 
                    fitting through any door and making delivery a breeze.
                </p>
            </div>
        </div>
        
        <!-- Step 2 -->
        <div class="how-it-works-item">
            <div class="how-it-works-image">
                <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/assembly-guide.jpg" 
                     alt="Tool-free assembly" 
                     loading="lazy">
            </div>
            <div class="how-it-works-content">
                <span class="step-number">2</span>
                <h3 class="how-it-works-title">Tool-Free Assembly</h3>
                <p class="how-it-works-description">
                    No tools required. Simply unbox, remove packaging, and watch your 
                    sofa expand to full size. Assembly takes under 10 minutes.
                </p>
            </div>
        </div>
        
        <!-- Step 3 -->
        <div class="how-it-works-item">
            <div class="how-it-works-image">
                <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/hero-sofa.jpg" 
                     alt="Enjoy your new sofa" 
                     loading="lazy">
            </div>
            <div class="how-it-works-content">
                <span class="step-number">3</span>
                <h3 class="how-it-works-title">Enjoy Premium Comfort</h3>
                <p class="how-it-works-description">
                    High-density foam and premium fabrics ensure your sofa looks and 
                    feels luxurious for years. Backed by our 10-year frame warranty.
                </p>
            </div>
        </div>
    </div>
</section>

<!-- Trust Section -->
<section class="trust-section">
    <div class="trust-container">
        <div class="trust-stats">
            <div class="stat-item">
                <div class="stat-value">15,000+</div>
                <div class="stat-label">Happy Customers</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">4.9★</div>
                <div class="stat-label">Average Rating</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">10 Years</div>
                <div class="stat-label">Frame Warranty</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">2-3 Days</div>
                <div class="stat-label">Brisbane Metro</div>
            </div>
        </div>
        
        <div class="testimonial">
            <blockquote class="testimonial-quote">
                "I was skeptical about ordering a sofa online, but ezhomes exceeded 
                all expectations. The compression shipping is genius — it fit right 
                through my apartment door, and setup was incredibly easy!"
            </blockquote>
            <cite class="testimonial-author">— Sarah M., Brisbane</cite>
        </div>
    </div>
</section>

<!-- Newsletter -->
<section class="newsletter-section">
    <div class="newsletter-container">
        <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">Stay in the Loop</h2>
        <p style="margin-bottom: 1.5rem; color: hsl(var(--muted-foreground));">
            Get exclusive offers, new product alerts, and style inspiration.
        </p>
        <form class="newsletter-form" action="#" method="post">
            <input type="email" 
                   class="newsletter-input" 
                   placeholder="Enter your email" 
                   required>
            <button type="submit" class="btn btn-primary">Subscribe</button>
        </form>
    </div>
</section>

<?php
get_footer();
```

---

# PHASE 6: JavaScript (assets/js/main.js)

Create `main.js` in `assets/js/`.

```javascript
/**
 * ezhomes Theme JavaScript
 *
 * @package ezhomes
 */

(function() {
    'use strict';

    // =========================================
    // DOM ELEMENTS
    // =========================================
    
    const cartToggle = document.querySelector('.cart-toggle');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartClose = document.getElementById('cart-close');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const header = document.querySelector('.site-header');

    // =========================================
    // CART DRAWER
    // =========================================
    
    function openCart() {
        if (cartDrawer && cartOverlay) {
            cartDrawer.classList.add('open');
            cartOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeCart() {
        if (cartDrawer && cartOverlay) {
            cartDrawer.classList.remove('open');
            cartOverlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    if (cartToggle) {
        cartToggle.addEventListener('click', openCart);
    }

    if (cartClose) {
        cartClose.addEventListener('click', closeCart);
    }

    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }

    // Close cart with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCart();
        }
    });

    // =========================================
    // MOBILE MENU
    // =========================================
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('open');
            this.classList.toggle('active');
            
            // Toggle aria-expanded
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
        });
    }

    // =========================================
    // HEADER SCROLL EFFECT
    // =========================================
    
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (header) {
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        lastScroll = currentScroll;
    });

    // =========================================
    // AJAX ADD TO CART
    // =========================================
    
    document.addEventListener('click', function(e) {
        const addToCartBtn = e.target.classList.contains('ajax_add_to_cart') 
            ? e.target 
            : e.target.closest('.ajax_add_to_cart');
            
        if (addToCartBtn) {
            // After WooCommerce finishes adding to cart, update drawer
            setTimeout(updateCartDrawer, 1000);
        }
    });

    function updateCartDrawer() {
        if (typeof ezhomes_ajax === 'undefined') return;
        
        fetch(ezhomes_ajax.ajax_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                action: 'get_cart_contents',
                nonce: ezhomes_ajax.nonce,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Update cart items
                const cartItems = document.getElementById('cart-items');
                if (cartItems) {
                    cartItems.innerHTML = data.data.cart_html;
                }
                
                // Update cart count
                const cartCount = document.querySelector('.cart-count');
                if (cartCount) {
                    cartCount.textContent = data.data.cart_count;
                } else if (data.data.cart_count > 0) {
                    // Create cart count if it doesn't exist
                    const countSpan = document.createElement('span');
                    countSpan.className = 'cart-count';
                    countSpan.textContent = data.data.cart_count;
                    cartToggle.appendChild(countSpan);
                }
                
                // Open cart drawer to show new item
                openCart();
            }
        })
        .catch(error => {
            console.error('Error updating cart:', error);
        });
    }

    // =========================================
    // SMOOTH SCROLL
    // =========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // =========================================
    // LAZY LOAD IMAGES
    // =========================================
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    if (image.dataset.src) {
                        image.src = image.dataset.src;
                        image.removeAttribute('data-src');
                    }
                    observer.unobserve(image);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

})();
```

---

# PHASE 7: Activation & Testing

## Step 7.1: Create screenshot.png

Create a 1200×900 pixel screenshot of your theme design and save as `screenshot.png` in the theme root.

## Step 7.2: Activate Theme

1. Go to **WordPress Admin → Appearance → Themes**
2. Find **ezhomes** theme
3. Click **Activate**

## Step 7.3: Configure WooCommerce

1. Go to **WooCommerce → Settings**
2. Set **Currency** to Australian Dollar (AUD)
3. Configure **Shipping zones** for Australia
4. Add **Payment methods** (Stripe, PayPal, Afterpay)

## Step 7.4: Set Up Menus

1. Go to **Appearance → Menus**
2. Create **Primary Menu** with: Shop, Sofas, Sofa Beds, About, Contact
3. Assign to **Primary Menu** location
4. Create **Footer Menu** if needed

## Step 7.5: Configure Customizer

1. Go to **Appearance → Customize**
2. Set **Site Title** to "ezhomes"
3. Configure **Announcement Bar** text
4. Set **Homepage** to display static page (front-page.php)

## Step 7.6: Add Products

1. Go to **Products → Add New**
2. Add product title, description, price
3. Upload product images
4. Mark featured products as "Featured"
5. Set sale prices for discounts

## Step 7.7: Final Checklist

- [ ] Theme activates without errors
- [ ] Homepage displays correctly
- [ ] Products show in grid
- [ ] Cart drawer opens/closes
- [ ] Mobile menu works
- [ ] Checkout process works
- [ ] All images load correctly

---

# Option 2: Page Builder Alternative

If custom theme development is too complex, consider:

## Elementor Pro

1. Install **Hello Elementor** theme
2. Install **Elementor Pro** plugin
3. Create templates using the design specs above
4. Use **Theme Builder** for header/footer

## Gutenberg + Full Site Editing

1. Use a **block theme** (like Twenty Twenty-Four)
2. Customize using **Site Editor**
3. Create **Block Patterns** for reusable sections

---

# Required Plugins

| Plugin | Purpose |
|--------|---------|
| WooCommerce | E-commerce functionality |
| YITH WooCommerce Wishlist | Save products |
| WooCommerce Stripe Gateway | Stripe payments |
| Afterpay Gateway | BNPL option |
| MailChimp for WooCommerce | Email marketing |
| WP Super Cache | Performance |
| Yoast SEO | Search optimization |
| YITH WooCommerce Reviews | Enhanced reviews |

---

# Need Help?

If you need assistance:
1. Hire a WordPress developer on Upwork/Fiverr
2. Consider using Shopify for easier setup
3. Use a pre-built WooCommerce theme and customize

This guide provides all the code needed — a developer can implement it in 2-4 hours.
