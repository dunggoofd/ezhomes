import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronLeft, Check, Loader2, AlertCircle, CreditCard, Smartphone, Landmark, MapPin } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Layout from "@/components/Layout";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { createPaymentIntent, confirmPayment } from "@/services/paymentService";
import { createOrder, type WCOrderData } from "@/services/woocommerce";
import { toast } from "sonner";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder"
);

const CheckoutContent = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [completedOrderId, setCompletedOrderId] = useState<number | null>(null);
  const [paymentError, setPaymentError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "apple_pay" | "google_pay" | "bank_transfer" | "paypal">("card");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
    country: "Australia",
    deliveryMethod: "shipping" as "shipping" | "pickup",
    pickupLocation: "sydney" as "sydney" | "melbourne",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculations
  const tax = subtotal * 0.1; // 10% GST
  const shipping = formData.deliveryMethod === "pickup" ? 0 : (subtotal > 0 ? (subtotal > 500 ? 0 : 15) : 0); // Free shipping over $500 or pickup
  const total = subtotal + tax + shipping;

  // Initialize payment intent when component mounts
  useEffect(() => {
    if (items.length > 0 && !clientSecret) {
      createPaymentIntent(Math.round(total * 100), `Order for ${formData.firstName || "Customer"}`).then(
        (response) => {
          if (response.success && response.clientSecret) {
            setClientSecret(response.clientSecret);
          } else {
            setPaymentError(response.error || "Failed to initialize payment");
          }
        }
      );
    }
  }, [items.length, total, formData.firstName, clientSecret]);

  // Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Basic contact info (always required)
    if (!formData.firstName.trim()) newErrors.firstName = "First name required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name required";
    if (!formData.email.trim()) {
      newErrors.email = "Email required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone required";
    } else if (!/^[\d\s()+-]+$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    // Address validation (only for shipping)
    if (formData.deliveryMethod === "shipping") {
      if (!formData.address.trim()) newErrors.address = "Address required";
      if (!formData.city.trim()) newErrors.city = "City required";
      if (!formData.state.trim()) newErrors.state = "State required";
      if (!formData.postcode.trim()) newErrors.postcode = "Postcode required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  // Handle checkout
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError("");

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      // Determine payment method based on delivery and payment selection
      let wcPaymentMethod = "woopayments";
      let wcPaymentTitle = "Card Payment";

      if (formData.deliveryMethod === "pickup") {
        wcPaymentMethod = "cod";
        wcPaymentTitle = "Pay on Pickup";
      } else if (paymentMethod === "bank_transfer") {
        wcPaymentMethod = "bacs";
        wcPaymentTitle = "Direct Bank Transfer";
      } else if (paymentMethod === "paypal") {
        wcPaymentMethod = "paypal";
        wcPaymentTitle = "PayPal";
      }
  // Payment method selection UI (add PayPal option)
  // Place this in your form where payment methods are selected
  // Example:
  // <div style={{ marginBottom: '1rem' }}>
  //   <label style={{ marginRight: '1rem' }}>
  //     <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} /> Card
  //   </label>
  //   <label style={{ marginRight: '1rem' }}>
  //     <input type="radio" name="paymentMethod" value="paypal" checked={paymentMethod === "paypal"} onChange={() => setPaymentMethod("paypal")} /> PayPal
  //   </label>
  //   <label style={{ marginRight: '1rem' }}>
  //     <input type="radio" name="paymentMethod" value="bank_transfer" checked={paymentMethod === "bank_transfer"} onChange={() => setPaymentMethod("bank_transfer")} /> Bank Transfer
  //   </label>
  // </div>

      // Prepare WooCommerce order data
      const orderData: WCOrderData = {
        payment_method: wcPaymentMethod,
        payment_method_title: wcPaymentTitle,
        set_paid: false, // Will be set to true after payment confirmation
        billing: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.deliveryMethod === "pickup" ? 
            "U14, 157 North Road Woodridge" : 
            formData.address,
          city: formData.deliveryMethod === "pickup" ? 
            "Brisbane" : 
            formData.city,
          state: formData.deliveryMethod === "pickup" ? 
            "Queensland" : 
            formData.state,
          postcode: formData.deliveryMethod === "pickup" ? 
            "4114" : 
            formData.postcode,
          country: formData.country,
          email: formData.email,
          phone: formData.phone,
        },
        shipping: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.deliveryMethod === "pickup" ? 
            "U14, 157 North Road Woodridge" : 
            formData.address,
          city: formData.deliveryMethod === "pickup" ? 
            "Brisbane" : 
            formData.city,
          state: formData.deliveryMethod === "pickup" ? 
            "Queensland" : 
            formData.state,
          postcode: formData.deliveryMethod === "pickup" ? 
            "4114" : 
            formData.postcode,
          country: formData.country,
        },
        line_items: items.map(item => ({
          product_id: Number(item.id),
          quantity: item.quantity,
        })),
      };

      // Add shipping line if applicable
      if (formData.deliveryMethod === "shipping" && shipping > 0) {
        orderData.shipping_lines = [{
          method_id: "flat_rate",
          method_title: "Standard Shipping",
          total: shipping.toFixed(2),
        }];
      }

      // Add order note for pickup location
      if (formData.deliveryMethod === "pickup") {
        orderData.customer_note = "Pickup Location: U14, 157 North Road Woodridge, Brisbane, Queensland, Australia 4114";
      }
      
      // Add note for bank transfer
      if (paymentMethod === "bank_transfer") {
        orderData.customer_note = (orderData.customer_note || "") + "\nPayment Method: Direct Bank Transfer";
      }

      // Create order in WooCommerce
      const order = await createOrder(orderData);

      if (!order) {
        throw new Error("Failed to create order. Please try again or contact support.");
      }

      // Improved logging and ID extraction
      console.log("WooCommerce order created:", order);
      let orderId = undefined;
      if (order && order.id) {
        orderId = order.id;
        console.log("Order ID:", orderId);
      } else if (Array.isArray(order) && order[0] && order[0].id) {
        orderId = order[0].id;
        console.log("Order ID (array):", orderId);
      } else {
        console.warn("Order response did not contain an ID:", order);
      }

      if (!orderId) {
        throw new Error("Order was created but no order ID was returned. Check API response.");
      }

      // For pickup orders, order is complete (pay on pickup)
      if (formData.deliveryMethod === "pickup") {
        setCompletedOrderId(orderId);
        setOrderComplete(true);
        clearCart();
        toast.success(`Order #${orderId} placed successfully!`);
        setLoading(false);
        return;
      }

      // For bank transfer, show instructions
      if (paymentMethod === "bank_transfer") {
        setCompletedOrderId(orderId);
        setOrderComplete(true);
        clearCart();
        toast.success(`Order #${orderId} created! Please complete bank transfer.`);
        setLoading(false);
        return;
      }

      // For card payments, continue with Stripe (to be implemented with real Stripe keys)
      toast.success("Order created! Card payment coming soon...");
      setCompletedOrderId(orderId);
      setOrderComplete(true);
      clearCart();
      setLoading(false);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Order creation failed";
      setPaymentError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
      
      // Log error for debugging
      console.error("Checkout error:", error);
    }
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Add some products before checking out</p>
          <Link to="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  if (orderComplete) {
    const isPickup = formData.deliveryMethod === "pickup";
    const isBankTransfer = paymentMethod === "bank_transfer";
    const isPayPal = paymentMethod === "paypal";

    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Success Header */}
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <Check className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={3} />
                </div>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">Order Confirmed!</h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                  {isPickup
                    ? "Your order is ready for pickup"
                    : isPayPal
                      ? "Your order was placed with PayPal. Please complete your payment in your PayPal account."
                      : isBankTransfer
                        ? "Your order was placed. Please complete your bank transfer."
                        : "Thank you for your order"}
                </p>
              </div>
            </div>

            {/* Order Summary Card */}
            <div className="bg-card border border-border rounded-xl shadow-sm p-6 md:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pb-4 border-b">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                  <p className="font-semibold text-2xl">#{completedOrderId}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                  <p className="text-3xl font-bold text-primary">{formatPrice(total)}</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Email</p>
                  <p className="font-medium">{formData.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Phone</p>
                  <p className="font-medium">{formData.phone}</p>
                </div>
              </div>

              {/* Pickup Location - Enhanced */}
              {isPickup && (
                <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl overflow-hidden">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-blue-900">Pickup Location</h3>
                        <p className="text-sm text-blue-700">Ready within 5-7 business days</p>
                      </div>
                    </div>
                    
                    <div className="bg-white/80 rounded-lg p-4 space-y-2">
                      <p className="font-semibold text-blue-900">EZ Homes Warehouse</p>
                      <p className="text-blue-800">U14, 157 North Road Woodridge</p>
                      <p className="text-blue-800">Brisbane, Queensland 4114</p>
                      <p className="text-blue-800">Australia</p>
                      
                      <div className="pt-3 mt-3 border-t border-blue-200">
                        <p className="text-sm font-medium text-blue-900 mb-2">Opening Hours:</p>
                        <p className="text-sm text-blue-700">Monday - Friday: 9:00 AM - 5:00 PM</p>
                        <p className="text-sm text-blue-700">Saturday: 10:00 AM - 3:00 PM</p>
                        <p className="text-sm text-blue-700">Sunday: Closed</p>
                      </div>
                    </div>

                    {/* Map */}
                    <div className="rounded-lg overflow-hidden border-2 border-white shadow-md">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.573247299273!2d153.11089!3d-27.62818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b915078b4c3b8c9%3A0x8c9c9c9c9c9c9c9c!2s157%20North%20Rd%2C%20Woodridge%20QLD%204114!5e0!3m2!1sen!2sau!4v1234567890"
                        width="100%"
                        height="200"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full"
                      ></iframe>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href="https://www.google.com/maps/dir//157+North+Rd+Woodridge+QLD+4114"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button variant="outline" className="w-full bg-white hover:bg-blue-50 border-blue-300 text-blue-700">
                          <MapPin className="w-4 h-4 mr-2" />
                          Get Directions
                        </Button>
                      </a>
                      <a
                        href="tel:+61433267319"
                        className="flex-1"
                      >
                        <Button variant="outline" className="w-full bg-white hover:bg-blue-50 border-blue-300 text-blue-700">
                          <Smartphone className="w-4 h-4 mr-2" />
                          Call Us
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Bank Transfer Info */}
              {isBankTransfer && !isPickup && (
                <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                      <Landmark className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-amber-900">Bank Transfer Details</h3>
                      <p className="text-sm text-amber-700">Complete payment to process your order</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/80 rounded-lg p-4 space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-amber-700 font-medium">Bank Name:</p>
                        <p className="text-amber-900">Bank of Queensland (BOQ)</p>
                      </div>
                      <div>
                        <p className="text-amber-700 font-medium">Account Name:</p>
                        <p className="text-amber-900">Star Chef Equipment PTY LTD</p>
                      </div>
                      <div>
                        <p className="text-amber-700 font-medium">BSB:</p>
                        <p className="text-amber-900">124-005</p>
                      </div>
                      <div>
                        <p className="text-amber-700 font-medium">Account Number:</p>
                        <p className="text-amber-900">22646239</p>
                      </div>
                    </div>
                    <div className="pt-3 mt-3 border-t border-amber-200">
                      <p className="text-amber-700 font-medium">Reference:</p>
                      <p className="text-lg font-bold text-amber-900">Order #{completedOrderId}</p>
                    </div>
                  </div>
                  
                  <div className="bg-amber-100 rounded-lg p-3">
                    <p className="text-sm text-amber-800">
                      <strong>Important:</strong> Please include your order number in the transfer reference. 
                      Your order will be processed once payment is received.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Confirmation Message & Actions */}
            <div className="text-center space-y-6">
              <div className="bg-muted/30 border rounded-lg p-6">
                <p className="text-muted-foreground mb-1">
                  📧 A confirmation email has been sent to
                </p>
                <p className="font-semibold text-lg">{formData.email}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  onClick={() => navigate("/shop")} 
                  size="lg"
                  className="min-w-[200px]"
                >
                  Continue Shopping
                </Button>
                <Button 
                  onClick={() => navigate("/")}
                  variant="outline"
                  size="lg"
                  className="min-w-[200px]"
                >
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ChevronLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main form */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            {paymentError && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{paymentError}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleCheckout} className="space-y-8">
              {/* Delivery Method */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Delivery Method</h2>
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Shipping */}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, deliveryMethod: "shipping" }))}
                    className={`p-4 border-2 rounded-lg transition-all text-left ${
                      formData.deliveryMethod === "shipping"
                        ? "border-red-600 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <p className="font-semibold mb-1">Ship to Address</p>
                    <p className="text-sm text-muted-foreground">
                      {subtotal > 500 ? "Free shipping" : "Shipping from $15"}
                    </p>
                  </button>

                  {/* Pickup */}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, deliveryMethod: "pickup" }))}
                    className={`p-4 border-2 rounded-lg transition-all text-left ${
                      formData.deliveryMethod === "pickup"
                        ? "border-red-600 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <p className="font-semibold mb-1 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Pick Up In Store
                    </p>
                    <p className="text-sm text-muted-foreground">Free pickup</p>
                  </button>
                </div>

                {/* Pickup Location Selection */}
                {formData.deliveryMethod === "pickup" && (
                  <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <label className="text-sm font-medium">Pickup Location</label>
                    <div className="p-3 bg-white rounded-md border">
                      <p className="font-medium text-sm">U14, 157 North Road Woodridge</p>
                      <p className="text-sm text-muted-foreground">Brisbane, Queensland, Australia 4114</p>
                    </div>
                    <p className="text-xs text-blue-700">
                      📅 Pickup available within 5-7 business days after order confirmation
                    </p>
                  </div>
                )}
              </div>

              {/* Contact Information for Pickup */}
              {formData.deliveryMethod === "pickup" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Contact Information</h2>
                  <Separator />
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name *</label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name *</label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email *</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ezhomesinfo@gmail.com"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone *</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0412 345 678"
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                  </div>
                </div>
              )}

              {/* Shipping Information */}
              {formData.deliveryMethod === "shipping" && (
                <>
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Shipping Information</h2>
                    <Separator />
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name *</label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name *</label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email *</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ezhomesinfo@gmail.com"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone *</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0412 345 678"
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Address *</label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Main Street"
                      className={errors.address ? "border-red-500" : ""}
                    />
                    {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">City *</label>
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Sydney"
                        className={errors.city ? "border-red-500" : ""}
                      />
                      {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">State *</label>
                      <Input
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="NSW"
                        className={errors.state ? "border-red-500" : ""}
                      />
                      {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Postcode *</label>
                      <Input
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleChange}
                        placeholder="2000"
                        className={errors.postcode ? "border-red-500" : ""}
                      />
                      {errors.postcode && <p className="text-sm text-red-500">{errors.postcode}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option>Australia</option>
                      <option>New Zealand</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </>
              )}

              {/* Payment Information - Only show for shipping orders */}
              {formData.deliveryMethod === "shipping" && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Payment Method</h2>
                <Separator />

                {/* Payment Method Selection */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {/* Credit Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 border-2 rounded-lg transition-all flex flex-col items-center gap-2 ${
                      paymentMethod === "card"
                        ? "border-red-600 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <CreditCard className="h-5 w-5" />
                    <span className="text-xs font-medium text-center">Credit Card</span>
                  </button>

                  {/* Apple Pay */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("apple_pay")}
                    className={`p-4 border-2 rounded-lg transition-all flex flex-col items-center gap-2 ${
                      paymentMethod === "apple_pay"
                        ? "border-red-600 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Smartphone className="h-5 w-5" />
                    <span className="text-xs font-medium text-center">Apple Pay</span>
                  </button>

                  {/* Google Pay */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("google_pay")}
                    className={`p-4 border-2 rounded-lg transition-all flex flex-col items-center gap-2 ${
                      paymentMethod === "google_pay"
                        ? "border-red-600 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Smartphone className="h-5 w-5" />
                    <span className="text-xs font-medium text-center">Google Pay</span>
                  </button>

                  {/* Bank Transfer */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bank_transfer")}
                    className={`p-4 border-2 rounded-lg transition-all flex flex-col items-center gap-2 ${
                      paymentMethod === "bank_transfer"
                        ? "border-red-600 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Landmark className="h-5 w-5" />
                    <span className="text-xs font-medium text-center">Bank Transfer</span>
                  </button>
                </div>

                {/* Credit Card */}
                {paymentMethod === "card" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Card Details *</label>
                    <div className="p-4 border rounded-md bg-muted/20">
                      <CardElement
                        options={{
                          style: {
                            base: {
                              fontSize: "16px",
                              color: "#424250",
                              "::placeholder": {
                                color: "#aab7c4",
                              },
                            },
                            invalid: {
                              color: "#fa755a",
                              iconColor: "#fa755a",
                            },
                          },
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your card information is secure and encrypted. We use Stripe for secure payment processing.
                    </p>
                  </div>
                )}

                {/* Apple Pay Info */}
                {paymentMethod === "apple_pay" && (
                  <div className="p-4 border rounded-md bg-blue-50 space-y-3">
                    <p className="text-sm font-medium">Apple Pay</p>
                    <p className="text-sm text-muted-foreground">
                      Fast and secure payments using your Apple Wallet. You'll be prompted to complete the payment on your device.
                    </p>
                  </div>
                )}

                {/* Google Pay Info */}
                {paymentMethod === "google_pay" && (
                  <div className="p-4 border rounded-md bg-blue-50 space-y-3">
                    <p className="text-sm font-medium">Google Pay</p>
                    <p className="text-sm text-muted-foreground">
                      Fast and secure payments using your Google Wallet. You'll be prompted to complete the payment on your device.
                    </p>
                  </div>
                )}

                {/* Bank Transfer */}
                {paymentMethod === "bank_transfer" && (
                  <div className="p-4 border rounded-md bg-amber-50 space-y-3">
                    <p className="text-sm font-medium">Bank Transfer</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      After placing your order, you'll receive bank transfer details via email. Your order will be confirmed once payment is received.
                    </p>
                    <div className="bg-white p-3 rounded border border-amber-200 space-y-2">
                      <div className="text-xs">
                        <p className="font-semibold">Bank Details</p>
                        <p className="text-muted-foreground">Account Name: Star Chef Equipment PTY LTD</p>
                        <p className="text-muted-foreground">BSB: 124-005</p>
                        <p className="text-muted-foreground">Account Number: 22646239</p>
                        <p className="text-muted-foreground">Reference: Your Order ID</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              )}

              {/* Pickup Notice */}
              {formData.deliveryMethod === "pickup" && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-2">
                  <p className="font-semibold text-blue-900">Payment at Pickup</p>
                  <p className="text-sm text-blue-800">
                    You'll complete payment when you pick up your order at our showroom. We accept all major payment methods in-store.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={loading || (formData.deliveryMethod === "shipping" && !stripe)}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Place Order (${formatPrice(total)})`
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-muted p-6 rounded-lg space-y-4">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <Separator />

              {/* Cart Items */}
              <div className="space-y-4 max-h-64 overflow-auto">
                {items.map(item => (
                  <div key={`${item.id}-${item.variant}-${item.size}`} className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.title}</p>
                        {item.variant && <p className="text-xs text-muted-foreground">{item.variant}</p>}
                        {item.size && <p className="text-xs text-muted-foreground">{item.size}</p>}
                      </div>
                      <p className="text-sm font-semibold shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (10%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {formData.deliveryMethod === "pickup" 
                      ? "FREE" 
                      : shipping === 0 
                      ? "FREE" 
                      : formatPrice(shipping)}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              {subtotal > 500 && formData.deliveryMethod === "shipping" && (
                <div className="bg-green-50 border border-green-200 rounded p-2 text-xs text-green-800">
                  ✓ Free shipping on orders over $500
                </div>
              )}

              {formData.deliveryMethod === "pickup" && (
                <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs space-y-1">
                  <p className="font-semibold text-blue-900">📍 Pickup Details</p>
                  <p className="text-blue-800">
                    U14, 157 North Road Woodridge, Brisbane, Queensland 4114
                  </p>
                  <p className="text-blue-700">Ready within 5-7 business days</p>
                </div>
              )}

              <Button variant="outline" className="w-full" asChild>
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutContent />
    </Elements>
  );
};

export default Checkout;
