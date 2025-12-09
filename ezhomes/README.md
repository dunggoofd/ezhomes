# ezhomes WordPress Theme

A premium WooCommerce theme for compression furniture e-commerce.

## Requirements

- WordPress 6.0+
- WooCommerce 8.0+
- PHP 7.4+

## Installation

### Method 1: Upload via WordPress Admin

1. **Zip the theme folder**
   - Select all files inside the `ezhomes/` folder
   - Create a ZIP file named `ezhomes.zip`

2. **Upload to WordPress**
   - Go to **Appearance → Themes → Add New → Upload Theme**
   - Choose `ezhomes.zip` and click **Install Now**
   - Click **Activate**

### Method 2: FTP Upload

1. Upload the `ezhomes/` folder to `/wp-content/themes/`
2. Go to **Appearance → Themes**
3. Activate **ezhomes**

## Post-Installation Setup

### 1. Install Required Plugins

- **WooCommerce** (required)
- **YITH WooCommerce Wishlist** (optional)

### 2. Configure WooCommerce

1. Complete the WooCommerce setup wizard
2. Go to **WooCommerce → Settings → Products**
   - Set catalog image size: 600x600
   - Set single image size: 800x800

### 3. Set Up Menus

1. Go to **Appearance → Menus**
2. Create a menu and assign to **Primary Menu** location
3. Add pages: Shop, About, Contact, etc.

### 4. Configure Homepage

1. Go to **Settings → Reading**
2. Select **A static page**
3. Set Homepage to your front page

### 5. Customize Theme Options

1. Go to **Appearance → Customize**
2. Update:
   - Site Identity (logo, site title)
   - Announcement Bar text
   - Footer content

## Theme Structure

```
ezhomes/
├── assets/
│   └── js/
│       ├── main.js              # Cart drawer, mobile menu
│       ├── product-interactions.js  # Gallery, swatches
│       └── quick-add.js         # AJAX add to cart
├── woocommerce/
│   ├── archive-product.php      # Shop/collection page
│   └── single-product.php       # Product detail page
├── functions.php                # Theme functions
├── header.php                   # Site header
├── footer.php                   # Site footer
├── front-page.php               # Homepage template
├── index.php                    # Fallback template
└── style.css                    # Theme stylesheet
```

## Features

- ✅ Responsive design
- ✅ AJAX cart drawer
- ✅ Quick add to cart
- ✅ Product gallery with thumbnails
- ✅ Color/size swatches
- ✅ Trust badges & delivery ETA
- ✅ Afterpay/BNPL display
- ✅ Mobile-optimized navigation
- ✅ Sticky mobile CTA

## Customization

### Colors & Design Tokens

Edit CSS variables in `style.css`:

```css
:root {
  --ez-primary: #1a1a1a;
  --ez-accent: #b8860b;
  --ez-background: #fafafa;
  /* ... */
}
```

### Announcement Bar

Go to **Appearance → Customize → ezhomes Settings** to update the announcement text.

## Troubleshooting

### Images not displaying
- Regenerate thumbnails: Install **Regenerate Thumbnails** plugin

### Cart drawer not working
- Check browser console for JS errors
- Ensure WooCommerce AJAX is enabled

### Styles look broken
- Clear any caching plugins
- Check for CSS conflicts with other plugins

## Support

For issues, check the [WooCommerce documentation](https://woocommerce.com/documentation/) or the theme's GitHub repository.
