import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe (use your publishable key)
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder'
);

export type PaymentIntentResponse = {
  clientSecret: string;
  id: string;
  amount: number;
};

export type CreatePaymentResponse = {
  success: boolean;
  clientSecret?: string;
  error?: string;
};

export type PaymentStatus = 'succeeded' | 'processing' | 'requires_action' | 'failed';

export const getStripe = () => stripePromise;

/**
 * Create a payment intent on the backend
 * In production, call your backend API
 */
export const createPaymentIntent = async (
  amount: number,
  description: string
): Promise<CreatePaymentResponse> => {
  try {
    // For demo: simulate API call
    // In production, replace with:
    // const response = await fetch('/api/create-payment-intent', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ amount, description }),
    // });
    // const data = await response.json();
    // return data;

    // Simulated response - replace with real API
    const paymentIntentId = `pi_test_${Math.random().toString(36).substr(2, 9)}`;
    const secret = Math.random().toString(36).substr(2, 32);
    const clientSecret = `${paymentIntentId}_secret_${secret}`;
    console.log('[DEMO] Created payment intent:', { clientSecret, amount, description });

    return {
      success: true,
      clientSecret,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create payment intent',
    };
  }
};

/**
 * Confirm payment with Stripe
 * Called after user fills card details
 */
export const confirmPayment = async (
  stripe: any,
  elements: any,
  clientSecret: string,
  billingDetails: {
    name: string;
    email: string;
    phone: string;
    address: {
      line1: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
  }
) => {
  if (!stripe || !elements) {
    throw new Error('Stripe not initialized');
  }

  const cardElement = elements.getElement('card');

  const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardElement,
      billing_details: billingDetails,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return paymentIntent;
};

/**
 * Process refund (admin only)
 */
export const processRefund = async (paymentIntentId: string, amount?: number) => {
  try {
    // Call your backend refund endpoint
    // const response = await fetch('/api/refund', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ paymentIntentId, amount }),
    // });
    // return await response.json();

    console.log('[DEMO] Refund processed:', { paymentIntentId, amount });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Refund failed',
    };
  }
};

/**
 * Get payment status
 */
export const getPaymentStatus = (paymentIntent: any): PaymentStatus => {
  if (!paymentIntent) return 'failed';

  const status = paymentIntent.status;
  if (status === 'succeeded') return 'succeeded';
  if (status === 'processing') return 'processing';
  if (status === 'requires_action') return 'requires_action';
  return 'failed';
};
