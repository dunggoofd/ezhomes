"use client";
import { useState } from "react";
import { Play, Calendar, Users, Gift, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/Layout";
import { toast } from "sonner";

const VirtualTour = () => {
	const [showBookingForm, setShowBookingForm] = useState(false);
	const [bookingData, setBookingData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		date: "",
		time: "",
		platform: "zoom",
		message: "",
	});

	const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setBookingData(prev => ({ ...prev, [name]: value }));
	};

	const handleBookingSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!bookingData.firstName || !bookingData.email || !bookingData.date || !bookingData.time) {
			toast.error("Please fill in all required fields");
			return;
		}
		// In production, send to backend
		console.log("Booking request:", bookingData);
		toast.success("Appointment booked! We'll confirm via email shortly.");
		setShowBookingForm(false);
		setBookingData({
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			date: "",
			time: "",
			platform: "zoom",
			message: "",
		});
	};

	return (
		<Layout>
			{/* Book a Tour Hero */}
			<section className="py-16 lg:py-24 bg-gradient-to-b from-red-50 to-background">
				<div className="container mx-auto px-4">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						{/* Left Content */}
						<div className="space-y-6">
							<h1 className="text-4xl lg:text-5xl font-bold">
								Book a <span className="text-red-600">Tour</span>
							</h1>
							<p className="text-lg text-muted-foreground">
								Book a 1-on-1 session with one of our <span className="font-semibold">furniture experts</span>, where you'll have the chance to learn more about our sofas and compression beds, receive a live demo, and ask any questions specific to your needs—all from the comfort of your home.
							</p>
							<p className="text-lg font-semibold text-gray-700">
								The best part? It's totally free.
							</p>
							<Button 
								size="lg" 
								className="bg-red-600 hover:bg-red-700"
								onClick={() => setShowBookingForm(!showBookingForm)}
							>
								<Calendar className="mr-2 h-5 w-5" />
								BOOK YOUR APPOINTMENT NOW
							</Button>
						</div>
						{/* Right Image Mock */}
						<div className="relative h-[500px] flex items-center justify-center">
							<div className="w-full max-w-sm space-y-4">
								<div className="bg-red-500 rounded-3xl p-4 shadow-2xl transform rotate-6">
									<div className="bg-red-600 rounded-2xl aspect-square flex items-center justify-center">
										<div className="text-center text-white">
											<div className="text-sm font-semibold mb-2">October 2025</div>
											<div className="text-4xl font-bold">14</div>
											<div className="text-sm">Wednesday</div>
										</div>
									</div>
									<div className="mt-4 space-y-2 text-white text-sm">
										<div className="flex justify-between">
											<span>3:00 PM</span>
											<span className="font-semibold">Virtual Tour</span>
										</div>
									</div>
								</div>
								<div className="bg-gray-700 rounded-3xl p-4 shadow-xl transform -rotate-6">
									<div className="bg-gray-800 rounded-2xl p-4 text-white text-center">
										<div className="text-sm font-semibold">3 PM</div>
										<div className="text-lg font-bold">Virtual Tour</div>
									</div>
									<div className="mt-3 flex gap-2 justify-center">
										<span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs">Cancel</span>
										<span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Details</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* How It Works */}
			<section className="py-16 lg:py-24">
				<div className="container mx-auto px-4">
					<h2 className="text-4xl font-bold text-center mb-16">How it works</h2>
					<div className="grid md:grid-cols-3 gap-8">
						{/* Step 1 */}
						<div className="text-center space-y-4">
							<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
								<Calendar className="h-8 w-8 text-red-600" />
							</div>
							<h3 className="text-xl font-semibold">Book An Appointment</h3>
							<p className="text-muted-foreground">
								Click the button below to book your virtual tour. Simply choose a time that works best for you to reserve your time slot with one of our specialists.
							</p>
						</div>
						{/* Step 2 */}
						<div className="text-center space-y-4">
							<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
								<Users className="h-8 w-8 text-red-600" />
							</div>
							<h3 className="text-xl font-semibold">Speak with a Specialist</h3>
							<p className="text-muted-foreground">
								You'll get to see our premium sofas and compression beds in real time and ask any questions you may have about our wide range of products.
							</p>
						</div>
						{/* Step 3 */}
						<div className="text-center space-y-4">
							<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
								<Gift className="h-8 w-8 text-red-600" />
							</div>
							<h3 className="text-xl font-semibold">Get Access to Exclusive Discounts</h3>
							<p className="text-muted-foreground">
								Like what you saw on the call? Let our experts take care of placing your order with the best available discounts.
							</p>
						</div>
					</div>
				</div>
			</section>
			{/* What to Expect */}
			<section className="py-16 lg:py-24 bg-muted/50">
				<div className="container mx-auto px-4">
					<h2 className="text-4xl font-bold mb-16">What to Expect</h2>
					{/* 1-on-1 Personalized Virtual Tour */}
					<div className="mb-16">
						<div className="grid lg:grid-cols-2 gap-8 items-center">
							<div className="bg-gray-700 rounded-3xl h-[400px] flex items-center justify-center overflow-hidden">
								<div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
									<div className="text-center text-white">
										<Play className="h-16 w-16 mx-auto mb-4" />
										<p className="text-lg">Virtual Tour Experience</p>
									</div>
								</div>
							</div>
							<div className="space-y-4">
								<h3 className="text-3xl font-bold">
									1-on-1<br />
									<span className="text-red-600">Personalized</span><br />
									Virtual Tour
								</h3>
								<p className="text-lg text-muted-foreground">
									Our product experts will be happy to show you around our full collection of premium sofas and compression beds. Explore the unique features, quality craftsmanship, and customization options available with our products.
								</p>
							</div>
						</div>
					</div>
					{/* Live Demo */}
					<div className="mb-16">
						<div className="grid lg:grid-cols-2 gap-8 items-center">
							<div className="order-2 lg:order-1 space-y-4">
								<h3 className="text-3xl font-bold">
									Live Demo of<br />
									<span className="text-red-600">Products</span>
								</h3>
								<p className="text-lg text-muted-foreground">
									Watch our sofas and compression beds transform in real time, and see all of the different configuration & color options available. Our specialists will guide you through the features that matter most to you—from fabric textures to comfort levels.
								</p>
							</div>
							<div className="order-1 lg:order-2 bg-amber-100 rounded-3xl h-[400px] flex items-center justify-center overflow-hidden">
								<div className="w-full h-full bg-gradient-to-br from-amber-50 to-amber-200 flex items-center justify-center">
									<div className="text-center text-amber-900">
										<Play className="h-16 w-16 mx-auto mb-4" />
										<p className="text-lg">Product Demo</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* Q&A Section */}
					<div className="mb-16">
						<div className="grid lg:grid-cols-2 gap-8 items-center">
							<div className="bg-gray-100 rounded-3xl h-[400px] flex items-center justify-center overflow-hidden">
								<div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
									<div className="text-center text-gray-800">
										<Phone className="h-16 w-16 mx-auto mb-4" />
										<p className="text-lg">Q&A Session</p>
									</div>
								</div>
							</div>
							<div className="space-y-4">
								<h3 className="text-3xl font-bold">
									Get Answers to<br />
									<span className="text-red-600">Your Questions</span><br />
									in Real Time
								</h3>
								<p className="text-lg text-muted-foreground">
									Ask any questions specific to your home & current needs, for the most personalised Q&A possible.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* Booking Section */}
			{showBookingForm && (
				<section className="py-16 lg:py-24 bg-red-50">
					<div className="container mx-auto px-4 max-w-2xl">
						<h2 className="text-3xl font-bold mb-8">Ready to Book Your Virtual Showroom Tour?</h2>
						<p className="text-muted-foreground mb-8">
							Although you won't have to leave your sofa, here are a few things to think about to prepare for your virtual visit:
						</p>
						<ul className="space-y-3 mb-8 text-muted-foreground">
							<li className="flex gap-3">
								<span className="font-bold text-red-600">1.</span>
								<span>Choose your preferred platform where you would like to do the virtual showroom visit - we can meet with you on all major video call platforms.</span>
							</li>
							<li className="flex gap-3">
								<span className="font-bold text-red-600">2.</span>
								<span>Our specialists are available Monday through Friday from 9:30 AM to 5:30 PM EST - please book a time that suits you best.</span>
							</li>
							<li className="flex gap-3">
								<span className="font-bold text-red-600">3.</span>
								<span>If you're after sizing advice for a particular room, be in that room while you're on the call so we can best assist you.</span>
							</li>
						</ul>
						<form onSubmit={handleBookingSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-sm border">
							<div className="grid md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<label className="text-sm font-medium">First Name *</label>
									<input
										type="text"
										name="firstName"
										value={bookingData.firstName}
										onChange={handleBookingChange}
										placeholder="John"
										className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
										required
									/>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium">Last Name</label>
									<input
										type="text"
										name="lastName"
										value={bookingData.lastName}
										onChange={handleBookingChange}
										placeholder="Doe"
										className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
									/>
								</div>
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium">Email *</label>
								<input
									type="email"
									name="email"
									value={bookingData.email}
									onChange={handleBookingChange}
									placeholder="ezhomesinfo@gmail.com"
									className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
									required
								/>
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium">Phone</label>
								<input
									type="tel"
									name="phone"
									value={bookingData.phone}
									onChange={handleBookingChange}
									placeholder="0412 345 678"
									className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
								/>
							</div>
							<div className="grid md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<label className="text-sm font-medium">Preferred Date *</label>
									<input
										type="date"
										name="date"
										value={bookingData.date}
										onChange={handleBookingChange}
										className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
										required
									/>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium">Preferred Time *</label>
									<input
										type="time"
										name="time"
										value={bookingData.time}
										onChange={handleBookingChange}
										className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
										required
									/>
								</div>
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium">Preferred Platform</label>
								<select
									name="platform"
									value={bookingData.platform}
									onChange={handleBookingChange}
									className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
								>
									<option value="zoom">Zoom</option>
									<option value="google-meet">Google Meet</option>
									<option value="teams">Microsoft Teams</option>
									<option value="whatsapp">WhatsApp</option>
									<option value="other">Other</option>
								</select>
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium">Additional Questions or Notes</label>
								<textarea
									name="message"
									value={bookingData.message}
									onChange={handleBookingChange}
									placeholder="Tell us about your space, furniture preferences, or any specific questions..."
									className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 min-h-[120px]"
								/>
							</div>
							<div className="flex gap-4">
								<Button 
									type="submit" 
									size="lg"
									className="bg-red-600 hover:bg-red-700"
								>
									<Calendar className="mr-2 h-5 w-5" />
									BOOK YOUR APPOINTMENT NOW
								</Button>
								<Button 
									type="button"
									variant="outline"
									size="lg"
									onClick={() => setShowBookingForm(false)}
								>
									Cancel
								</Button>
							</div>
						</form>
					</div>
				</section>
			)}
			{/* CTA Section */}
			{!showBookingForm && (
				<section className="py-16 lg:py-24 bg-gradient-to-r from-red-600 to-red-700 text-white">
					<div className="container mx-auto px-4 text-center">
						<h2 className="text-4xl font-bold mb-6">Ready to Book Your Virtual Showroom Tour?</h2>
						<p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
							Experience our premium sofas and compression beds up close with a personalized 1-on-1 consultation from our experts.
						</p>
						<Button 
							size="lg" 
							className="bg-white text-red-600 hover:bg-gray-100 font-semibold"
							onClick={() => setShowBookingForm(true)}
						>
							<Calendar className="mr-2 h-5 w-5" />
							BOOK YOUR APPOINTMENT NOW
						</Button>
					</div>
				</section>
			)}
		</Layout>
	);
};

export default VirtualTour;
