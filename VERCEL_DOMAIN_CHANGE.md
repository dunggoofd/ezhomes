# Vercel Domain Configuration Guide

## Current Status
- ✅ React app deployed at: **https://ezhomes.vercel.app/**
- ✅ WordPress at: **https://ezhomes.co**
- 🔄 **Next**: Configure custom domain

---

## Goal: Final Setup

```
ezhomes.co → React App (Vercel)
www.ezhomes.co → React App (Vercel)
wp.ezhomes.co → WordPress Admin/Backend
```

---

## Step-by-Step Instructions

### **STEP 1: Add Domains in Vercel** ✅ (Do This First)

1. Go to **Vercel Dashboard**: https://vercel.com/dashboard
2. Click your **ezhomes** project
3. Go to **Settings** tab → **Domains** (left sidebar)
4. Add these domains:
   - Type: `ezhomes.co` → Click **Add**
   - Type: `www.ezhomes.co` → Click **Add**
5. Vercel will show DNS records to configure

---

### **STEP 2: Get DNS Records from Vercel**

After adding domains, Vercel will provide records like:

**For ezhomes.co:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: Auto
```

**For www.ezhomes.co:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: Auto
```

---

### **STEP 3: Configure DNS at Your Domain Registrar**

Go to where you bought **ezhomes.co** (GoDaddy, Namecheap, Cloudflare, etc.):

#### **A. Create WordPress Subdomain First**

**Add this record:**
```
Type: A (or CNAME if you have a server hostname)
Name: wp
Value: [Your current WordPress server IP]
TTL: 3600 (1 hour)
```

*Note: If you don't know your WordPress server IP, you can find it by:*
- Running: `ping ezhomes.co` in terminal
- Or check with your hosting provider
- Or use: https://www.whatsmydns.net/#A/ezhomes.co

#### **B. Point Root Domain to Vercel**

**Update/Add these records:**

1. **Root domain (ezhomes.co):**
```
Type: A
Name: @ (or leave blank)
Value: 76.76.21.21 (use IP from Vercel)
TTL: 3600
```

2. **WWW subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com (from Vercel)
TTL: 3600
```

**⚠️ Important:** Delete any existing A records for `@` that point to your old server

---

### **STEP 4: Update WordPress URLs**

Once DNS propagates, update WordPress settings:

1. Log into WordPress admin at **https://ezhomes.co/wp-admin** (before DNS changes)
2. Go to **Settings** → **General**
3. Update:
   - **WordPress Address (URL)**: `https://wp.ezhomes.co`
   - **Site Address (URL)**: `https://wp.ezhomes.co`
4. Click **Save Changes**

**Alternative Method (via database):**
If you get locked out, update directly in database:
```sql
UPDATE wp_options SET option_value = 'https://wp.ezhomes.co' WHERE option_name = 'siteurl';
UPDATE wp_options SET option_value = 'https://wp.ezhomes.co' WHERE option_name = 'home';
```

---

### **STEP 5: Wait for DNS Propagation**

- **Time**: 5 minutes to 48 hours (usually 15-30 minutes)
- **Check status**: https://www.whatsmydns.net/

Test each domain:
- `ezhomes.co` → Should show React app
- `www.ezhomes.co` → Should redirect to ezhomes.co
- `wp.ezhomes.co` → Should show WordPress

---

### **STEP 6: Verify Everything Works**

#### **Test React App:**
- Visit: https://ezhomes.co
- Check: Homepage loads with products
- Check: Shop page works
- Check: Product pages load

#### **Test WordPress:**
- Visit: https://wp.ezhomes.co/wp-admin
- Login to admin panel
- Check: WooCommerce products visible
- Check: Can manage products

#### **Test API Connection:**
- Visit: https://ezhomes.co
- Open browser console (F12)
- Check Network tab for API calls to `wp.ezhomes.co`
- Verify products load from WordPress API

---

## Files Already Updated

✅ **src/services/woocommerce.ts**
- Changed API URL from `https://ezhomes.co/wp-json/wc/v3`
- To: `https://wp.ezhomes.co/wp-json/wc/v3`

**This change is ready but NOT yet committed/deployed.**

---

## When to Deploy API Change

**Deploy AFTER DNS is configured:**

```bash
cd "/Users/dungluong/Downloads/star-sofa-studio-main 2"
git add src/services/woocommerce.ts
git commit -m "Update API endpoint to wp.ezhomes.co subdomain"
git push origin main
```

Vercel will auto-deploy in 2 minutes.

---

## Troubleshooting

### **Problem: ezhomes.co still shows WordPress**
- **Solution**: DNS hasn't propagated yet. Wait 15-30 minutes.
- **Check**: https://www.whatsmydns.net/#A/ezhomes.co

### **Problem: wp.ezhomes.co not loading**
- **Solution**: Check DNS record for `wp` subdomain is correct
- **Solution**: Make sure A record points to correct server IP

### **Problem: React app loads but no products**
- **Solution**: WordPress URLs not updated yet
- **Solution**: API endpoint change not deployed
- **Solution**: Check browser console for CORS errors

### **Problem: Mixed content warnings (HTTP/HTTPS)**
- **Solution**: Make sure WordPress is using HTTPS
- **Solution**: Add SSL certificate to wp.ezhomes.co

### **Problem: Can't access wp-admin after DNS change**
- **Solution**: Use IP address directly: `http://[server-ip]/wp-admin`
- **Solution**: Update wp-config.php with temporary URLs
- **Solution**: Contact hosting provider

---

## Summary Checklist

- [ ] Add `ezhomes.co` and `www.ezhomes.co` in Vercel
- [ ] Get DNS records from Vercel (A record and CNAME)
- [ ] Add `wp` subdomain DNS record (A or CNAME to current server)
- [ ] Update root domain DNS (A record to Vercel)
- [ ] Update www DNS (CNAME to Vercel)
- [ ] Wait for DNS propagation (15-30 mins)
- [ ] Update WordPress Site URL and Home URL to `wp.ezhomes.co`
- [ ] Deploy React app with updated API endpoint
- [ ] Test ezhomes.co loads React app
- [ ] Test wp.ezhomes.co loads WordPress
- [ ] Test products load on React app from WordPress API

---

## Need Help?

**Current Status of Changes:**
- ✅ React app deployed on Vercel
- ✅ API endpoint updated in code (not yet committed)
- ⏳ Waiting for DNS configuration

**Contact Information:**
- Vercel Support: https://vercel.com/support
- Your WordPress hosting provider for server IP/DNS help

---

## Architecture Diagram

```
┌─────────────────────────────────────┐
│         CUSTOMER VISITS             │
│         ezhomes.co                  │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│     Vercel CDN (Global)             │
│     React App                       │
│     - Beautiful UI                  │
│     - Fast loading                  │
│     - Product pages                 │
└──────────────┬──────────────────────┘
               │
               │ API Requests
               │ GET /wp-json/wc/v3/products
               │
               ▼
┌─────────────────────────────────────┐
│     wp.ezhomes.co                   │
│     WordPress + WooCommerce         │
│     - Product database              │
│     - Admin panel (you only)        │
│     - REST API                      │
│     - Order processing              │
└─────────────────────────────────────┘
```

---

**Last Updated**: December 10, 2025  
**React App**: https://ezhomes.vercel.app/ (working)  
**Target Domain**: ezhomes.co (pending DNS)
