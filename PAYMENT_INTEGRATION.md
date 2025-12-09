# Backend API Integration Guide

## Overview

The ezhomes store frontend requires the following backend endpoints to complete the checkout flow.

## Environment Setup

1. Create a `.env.local` file in the project root:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY
VITE_API_BASE_URL=http://localhost:3001
```

2. Get your Stripe API keys from https://dashboard.stripe.com/apikeys

## Required Backend Endpoints

### 1. Create Payment Intent

**Endpoint:** `POST /api/create-payment-intent`

**Request Body:**
```json
{
  "amount": 89900,
  "description": "Order for John Doe",
  "currency": "AUD"
}
```

**Response:**
```json
{
  "success": true,
  "clientSecret": "pi_test_123abc_secret_xyz",
  "id": "pi_test_123abc",
  "amount": 89900
}
```

**Implementation (Node.js/Express example):**
```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/create-payment-intent', async (req, res) => {
  const { amount, description, currency = 'AUD' } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // in cents
      currency: currency.toLowerCase(),
      description,
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
      amount: paymentIntent.amount,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
```

### 2. Confirm Payment

**Endpoint:** `POST /api/confirm-payment`

**Request Body:**
```json
{
  "paymentIntentId": "pi_test_123abc",
  "paymentMethodId": "pm_test_xyz"
}
```

**Response:**
```json
{
  "success": true,
  "paymentIntentId": "pi_test_123abc",
  "status": "succeeded",
  "amount": 89900
}
```

### 3. Create Order

**Endpoint:** `POST /api/orders`

**Request Body:**
```json
{
  "paymentIntentId": "pi_test_123abc",
  "customer": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "0412 345 678",
    "address": "123 Main Street",
    "city": "Sydney",
    "state": "NSW",
    "postcode": "2000",
    "country": "Australia"
  },
  "items": [
    {
      "id": "1",
      "title": "Corduroy & Flannel Sofa Cream",
      "quantity": 1,
      "price": 89900,
      "variant": "Cream",
      "size": "180cm"
    }
  ],
  "totals": {
    "subtotal": 89900,
    "tax": 8990,
    "shipping": 0,
    "total": 98890
  }
}
```

**Response:**
```json
{
  "success": true,
  "orderId": "ORD-2025-001234",
  "paymentIntentId": "pi_test_123abc",
  "status": "confirmed",
  "createdAt": "2025-12-09T12:00:00Z"
}
```

**Implementation (Node.js/Express example):**
```javascript
app.post('/api/orders', async (req, res) => {
  const { paymentIntentId, customer, items, totals } = req.body;

  try {
    // Verify payment intent status
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ 
        success: false, 
        error: 'Payment not confirmed' 
      });
    }

    // Create order in your database
    const order = await Order.create({
      orderId: `ORD-${Date.now()}`,
      paymentIntentId,
      customer,
      items,
      totals,
      status: 'confirmed',
    });

    // Send confirmation email
    await sendConfirmationEmail(customer.email, order);

    res.json({
      success: true,
      orderId: order.orderId,
      paymentIntentId: paymentIntent.id,
      status: 'confirmed',
      createdAt: order.createdAt,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
```

### 4. Process Refund

**Endpoint:** `POST /api/refund`

**Request Body:**
```json
{
  "paymentIntentId": "pi_test_123abc",
  "amount": 89900,
  "reason": "customer_request"
}
```

**Response:**
```json
{
  "success": true,
  "refundId": "re_test_xyz",
  "amount": 89900,
  "status": "succeeded"
}
```

**Implementation:**
```javascript
app.post('/api/refund', async (req, res) => {
  const { paymentIntentId, amount } = req.body;

  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount, // optional - full refund if omitted
    });

    res.json({
      success: true,
      refundId: refund.id,
      amount: refund.amount,
      status: refund.status,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
```

### 5. Get Order Status

**Endpoint:** `GET /api/orders/:orderId`

**Response:**
```json
{
  "success": true,
  "orderId": "ORD-2025-001234",
  "status": "confirmed",
  "items": [...],
  "totals": {...},
  "createdAt": "2025-12-09T12:00:00Z",
  "updatedAt": "2025-12-09T12:00:00Z"
}
```

## Email Notifications

### Order Confirmation Email

Triggered when order is created. Should include:
- Order ID
- Customer details
- Itemized list
- Shipping address
- Total amount
- Tracking information (if available)

**Template Example:**
```html
<h1>Order Confirmed</h1>
<p>Thank you for your purchase!</p>
<p>Order ID: ORD-2025-001234</p>
<p>Total: $988.90 AUD</p>
<p>Your order will be dispatched shortly.</p>
```

### Payment Receipt Email

Triggered when payment is confirmed. Should include:
- Payment reference
- Amount charged
- Payment method (masked card)
- Invoice/receipt

## Error Handling

All endpoints should return consistent error responses:

```json
{
  "success": false,
  "error": "Clear error message",
  "code": "ERROR_CODE"
}
```

Common error codes:
- `INVALID_AMOUNT`: Amount not valid
- `PAYMENT_DECLINED`: Card declined
- `PAYMENT_FAILED`: General payment failure
- `VALIDATION_ERROR`: Input validation failed
- `ORDER_NOT_FOUND`: Order doesn't exist

## Security Considerations

1. **Server-side validation**: Always validate order totals server-side
2. **API authentication**: Use API keys or JWT tokens
3. **HTTPS only**: All endpoints must use HTTPS
4. **Rate limiting**: Implement rate limiting on payment endpoints
5. **PCI compliance**: Never log full card details
6. **CORS**: Configure CORS appropriately

## Testing

Use Stripe test card numbers:

- **Success:** 4242 4242 4242 4242
- **Decline:** 4000 0000 0000 0002
- **3D Secure:** 4000 0025 0000 3155

## Webhook Handling (Optional)

For production, set up Stripe webhooks to listen for:
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `charge.refunded`

This ensures order status is updated even if the frontend request fails.

## Deployment Checklist

- [ ] Set production Stripe keys in env
- [ ] Enable HTTPS
- [ ] Set up email service for notifications
- [ ] Configure database backups
- [ ] Set up monitoring/logging
- [ ] Test refund process
- [ ] Load test payment endpoints
- [ ] Document SLA for order fulfillment
