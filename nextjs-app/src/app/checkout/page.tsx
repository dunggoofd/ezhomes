"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder"
);

const CheckoutContent = () => {
	const router = useRouter();
	const { items, subtotal, clearCart } = useCart();
	const stripe = useStripe();
	const elements = useElements();
	const [loading, setLoading] = useState(false);
	const [orderComplete, setOrderComplete] = useState(false);
	const [completedOrderId, setCompletedOrderId] = useState<number | null>(null);
	const [paymentError, setPaymentError] = useState("");
	const [clientSecret, setClientSecret] = useState("");
	const [paymentMethod, setPaymentMethod] = useState<"card" | "apple_pay" | "google_pay" | "bank_transfer">("card");
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

	// ...existing code from Checkout.tsx, replacing useNavigate and Link with useRouter and next/link...

	// (Full code from your Checkout.tsx goes here, with navigation and Link updated for Next.js)

	// For navigation, replace navigate("/shop") with router.push("/shop")
	// For navigation, replace navigate("/") with router.push("/")
	// For <Link to="/shop">, use <Link href="/shop">
	// For <Link to="/">, use <Link href="/">

	// ...rest of the code remains the same...
};

const Checkout = () => {
	return (
		<Elements stripe={stripePromise}>
			<CheckoutContent />
		</Elements>
	);
};

export default Checkout;
