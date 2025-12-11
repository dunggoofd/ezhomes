# Customer Flow Checklist for ezhomes.co

## ✅ Pre-Launch Checklist

### 1. Homepage (https://ezhomes.co)
- [ ] Products load and display correctly
- [ ] Images load properly
- [ ] Prices show correctly ($899, was $1199)
- [ ] "Shop All Furniture" button works
- [ ] Mobile responsive (test on phone)
- [ ] Banner shows: "Enjoy 35% OFF for a limited time"

### 2. Shop Page (https://ezhomes.co/shop)
- [ ] All products display
- [ ] Filter by "Sofas" works
- [ ] Filter by "Compression Bed" works
- [ ] Filter by "All Products" works
- [ ] Product images load
- [ ] Clicking a product goes to product detail page

### 3. Product Detail Page (e.g., https://ezhomes.co/product/1)
- [ ] Hero image displays and is sticky on scroll
- [ ] Product title and price show correctly
- [ ] Color variant swatches are clickable
- [ ] Clicking color swatch changes the main image
- [ ] "Add to Cart" button works
- [ ] Item appears in cart (check cart icon count)
- [ ] Product specifications accordion works
- [ ] "What's Included" section displays

### 4. Cart Functionality
- [ ] Cart icon shows item count
- [ ] Clicking cart icon opens cart
- [ ] Can increase/decrease quantity
- [ ] Can remove items
- [ ] Total price calculates correctly
- [ ] "Proceed to Checkout" button works

### 5. Checkout Page - Pickup Option
- [ ] All form fields are present:
  - First Name, Last Name
  - Email, Phone
  - Country dropdown
- [ ] Delivery method options:
  - Pickup (Free)
  - Delivery ($50 - Brisbane Metro)
- [ ] Select "Pickup" option
- [ ] Fill in contact details only (no address required for pickup)
- [ ] Click "Place Order"
- [ ] Success message appears
- [ ] Redirects to shop after 4 seconds
- [ ] Cart clears after order

### 6. Checkout Page - Shipping Option
- [ ] Select "Delivery ($50 - Brisbane Metro)"
- [ ] Address fields appear and are required:
  - Street Address
  - City
  - State/Province
  - Postcode
- [ ] Payment method options appear:
  - Credit/Debit Card (default)
  - Bank Transfer
- [ ] With Card Payment:
  - Click "Proceed to Payment"
  - Redirects to WordPress payment page
  - Can complete payment on wp.ezhomes.co
- [ ] With Bank Transfer:
  - Select "Direct Bank Transfer"
  - Click "Place Order"
  - Redirects to WordPress order page with bank details

### 7. Order Verification (WordPress Admin)
- [ ] Go to https://wp.ezhomes.co/wp-admin
- [ ] Navigate to WooCommerce → Orders
- [ ] Test orders appear in the list
- [ ] Order contains correct:
  - Customer name and email
  - Product(s) ordered
  - Delivery method (Pickup or Shipping)
  - Total amount
  - Payment method

### 8. Email Notifications (if configured)
- [ ] Customer receives order confirmation email
- [ ] Email contains order details
- [ ] Email has correct branding

### 9. Mobile Experience
Test on mobile device or browser dev tools (375px width):
- [ ] Homepage looks good
- [ ] Products are easy to tap
- [ ] Product detail page is readable
- [ ] Add to cart button is easy to tap
- [ ] Checkout form is easy to fill
- [ ] Cart works on mobile
- [ ] Sticky mobile CTA appears on product page

### 10. Performance & Security
- [ ] Website loads in < 3 seconds
- [ ] HTTPS is enabled (green lock in browser)
- [ ] No console errors (F12 → Console tab)
- [ ] Images load quickly
- [ ] No broken links

---

## 🐛 Known Issues to Monitor

1. **SSL Certificate on wp.ezhomes.co**
   - Currently using HTTP for API calls
   - Fix: Install valid SSL certificate on WordPress subdomain
   - Then switch API back to HTTPS

2. **Environment Variables**
   - If products don't load, verify Vercel environment variables:
     - `WC_CONSUMER_KEY` = `ck_9c9fb9c1a37d7613ef7585fc978dbbe1f85bc49f`
     - `WC_CONSUMER_SECRET` = `cs_47c29e8f1e3c9ed90543aae77a3b977ac546cc04`

3. **Email Delivery**
   - WordPress might not send emails by default
   - Install "WP Mail SMTP" plugin if emails aren't working

---

## 🔧 Quick Fixes

### If products don't load:
1. Open browser console (F12)
2. Look for error messages
3. Verify Vercel environment variables are set
4. Check if WordPress is accessible at http://wp.ezhomes.co

### If checkout fails:
1. Check WordPress admin for the order
2. Verify payment methods are enabled in WooCommerce
3. Test with different browser/incognito mode

### If images don't load:
1. Check if image URLs start with `wp.ezhomes.co`
2. Verify images exist in WordPress Media Library
3. Check browser console for 404 errors

---

## 📞 Customer Support Checklist

### What to tell customers:

**Pickup Location:**
- U14, 157 North Road Woodridge, Brisbane, Queensland, Australia 4114

**Delivery:**
- $50 flat rate for Brisbane Metro
- Delivery time: 3-5 business days

**Payment Methods:**
- Credit/Debit Card (Visa, Mastercard)
- Apple Pay / Google Pay (via WooPayments)
- Direct Bank Transfer (BACS)
- Cash on Pickup

**Returns & Refunds:**
- [Add your policy here]

**Contact:**
- Email: [Add your email]
- Phone: [Add your phone]

---

## 🎯 Success Criteria

The website is ready when:
- ✅ Products load on homepage and shop page
- ✅ Customers can add items to cart
- ✅ Checkout process completes successfully
- ✅ Orders appear in WordPress admin
- ✅ No console errors on any page
- ✅ Mobile experience is smooth
- ✅ SSL is enabled and working

---

**Last Updated:** December 11, 2025
**Deployment:** Vercel (ezhomes.co)
**Backend:** WordPress + WooCommerce (wp.ezhomes.co)
