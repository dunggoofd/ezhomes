# Fixing WooCommerce Order Creation Error

## Error: "Sorry, you are not allowed to create resources"

This error occurs because your WooCommerce API keys don't have write permissions.

## Steps to Fix:

1. **Go to WordPress Admin:**
   - Visit https://wp.ezhomes.co/wp-admin
   - Login with your credentials

2. **Navigate to WooCommerce API Settings:**
   - Go to **WooCommerce → Settings**
   - Click the **Advanced** tab
   - Click **REST API** sub-tab

3. **Find Your API Key:**
   - Look for the key starting with `ck_9c9fb9c1a37d7613...`
   - Click **Edit** (or the pencil icon)

4. **Update Permissions:**
   - Change **Permissions** from "Read" to **Read/Write**
   - Click **Update**

5. **Test the Fix:**
   - Go to https://ezhomes.co
   - Add a product to cart
   - Complete checkout
   - Order should be created successfully

## Alternative: Create New API Keys

If you can't find the existing key, create a new one:

1. Go to **WooCommerce → Settings → Advanced → REST API**
2. Click **Add Key**
3. Fill in:
   - **Description**: "ezhomes API"
   - **User**: Select your admin user
   - **Permissions**: **Read/Write** (important!)
4. Click **Generate API Key**
5. Copy the **Consumer Key** and **Consumer Secret**
6. Update environment variables in Vercel:
   - `WC_CONSUMER_KEY` = [new consumer key]
   - `WC_CONSUMER_SECRET` = [new consumer secret]
7. Redeploy in Vercel

## Cart Remove Button

The cart already has a "Remove" button next to each item. To use it:
1. Click the shopping cart icon in the header
2. Each item shows a "Remove" button on the right
3. Click "Remove" to delete the item from cart

---

**Note:** This is the most common issue with WooCommerce API integration. The fix takes less than 1 minute.
