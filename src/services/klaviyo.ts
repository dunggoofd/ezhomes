// Klaviyo API integration service

const KLAVIYO_PUBLIC_KEY = import.meta.env.VITE_KLAVIYO_PUBLIC_API_KEY || '';
const KLAVIYO_LIST_ID = import.meta.env.VITE_KLAVIYO_LIST_ID || '';

export interface SubscribeData {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  source?: string;
}

export async function subscribeToNewsletter(data: SubscribeData): Promise<{ success: boolean; message: string }> {
  if (!KLAVIYO_PUBLIC_KEY || !KLAVIYO_LIST_ID) {
    console.error('Klaviyo credentials not configured');
    return {
      success: false,
      message: 'Newsletter service not configured. Please contact support.'
    };
  }

  try {
    const response = await fetch('https://a.klaviyo.com/api/v2/list/' + KLAVIYO_LIST_ID + '/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: KLAVIYO_PUBLIC_KEY,
        profiles: [
          {
            email: data.email,
            $first_name: data.firstName,
            $last_name: data.lastName,
            $phone_number: data.phone,
            $source: data.source || 'Website Footer'
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Klaviyo subscription failed:', errorData);
      throw new Error('Failed to subscribe');
    }

    return {
      success: true,
      message: 'Successfully subscribed! Check your email for your 10% off code.'
    };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return {
      success: false,
      message: 'Unable to subscribe. Please try again later.'
    };
  }
}

// Alternative: Use Klaviyo's client-side identify method
export function identifyKlaviyoUser(email: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any)._learnq) {
    (window as any)._learnq.push(['identify', {
      '$email': email,
      ...properties
    }]);
  }
}

// Track custom event in Klaviyo
export function trackKlaviyoEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any)._learnq) {
    (window as any)._learnq.push(['track', eventName, properties]);
  }
}
