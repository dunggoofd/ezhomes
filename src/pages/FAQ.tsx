import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, MessageCircle, Phone, Mail } from "lucide-react";
import { useState } from "react";

const faqCategories = [
  {
    id: "shipping",
    name: "Shipping & Delivery",
    faqs: [
      {
        question: "How long does shipping take?",
        answer: "We offer fast Australia-wide shipping. Brisbane metro orders typically arrive within 2-3 business days. Other metro areas receive their orders within 3-5 business days, while regional areas may take 5-7 business days."
      },
      {
        question: "Is shipping free?",
        answer: "Yes! We offer FREE shipping on all orders over $999. For orders under $999, a flat rate of $49 applies for metro areas and $79 for regional areas."
      },
      {
        question: "Do you ship internationally?",
        answer: "Currently, we only ship within Australia. We're working on expanding our shipping to New Zealand soon. Sign up for our newsletter to be notified when international shipping becomes available."
      },
      {
        question: "Can I track my order?",
        answer: "Absolutely! Once your order ships, you'll receive an email with tracking information. You can also track your order by logging into your account on our website."
      },
    ]
  },
  {
    id: "products",
    name: "Products & Assembly",
    faqs: [
      {
        question: "How does compression furniture work?",
        answer: "Our furniture uses innovative vacuum compression technology. The furniture is compressed to 1/4 of its original size for easy shipping and handling. Once you open the package, it expands to full size within 24-48 hours."
      },
      {
        question: "How long does assembly take?",
        answer: "Most of our products require NO tools and can be assembled in under 10 minutes. We include step-by-step instructions with every order, and video tutorials are available on our website."
      },
      {
        question: "What materials are used?",
        answer: "We use premium materials including high-density foam for comfort and durability, corduroy and flannel fabric blends for a luxurious feel, and solid timber frames for structural integrity. All materials are tested to meet Australian safety standards."
      },
      {
        question: "How do I care for my furniture?",
        answer: "For everyday cleaning, vacuum regularly and spot clean with a damp cloth. For deeper cleaning, use a fabric-safe upholstery cleaner. Avoid direct sunlight to prevent fading. Our fabric is treated with a stain-resistant coating for easy maintenance."
      },
    ]
  },
  {
    id: "returns",
    name: "Returns & Warranty",
    faqs: [
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day risk-free trial. If you're not completely satisfied with your purchase, return it within 30 days for a full refund. The product must be in original condition and packaging."
      },
      {
        question: "How do I initiate a return?",
        answer: "Contact our customer service team via email at hello@ezhomes.co or call 1300 123 456. We'll arrange for pickup and process your refund within 5-7 business days of receiving the returned item."
      },
      {
        question: "What does the warranty cover?",
        answer: "Our 5-year warranty covers manufacturing defects, frame breakage, and foam deterioration under normal use. It does not cover damage from misuse, accidents, or normal wear and tear."
      },
      {
        question: "Can I exchange for a different colour?",
        answer: "Yes! Exchanges are free within the 30-day trial period. Contact us to arrange the exchange, and we'll send your new colour once we've received the original."
      },
    ]
  },
  {
    id: "payment",
    name: "Payment & Orders",
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept Visa, Mastercard, American Express, PayPal, Apple Pay, Google Pay, Afterpay, and Zip. All transactions are secured with 256-bit SSL encryption."
      },
      {
        question: "Can I pay in instalments?",
        answer: "Yes! We offer Buy Now Pay Later options through Afterpay and Zip. Split your purchase into 4 interest-free payments with Afterpay, or choose flexible payment plans with Zip."
      },
      {
        question: "Can I cancel my order?",
        answer: "Orders can be cancelled within 24 hours of placement for a full refund. After 24 hours, if your order hasn't shipped, we may still be able to cancel - please contact us immediately."
      },
      {
        question: "Do you offer discounts?",
        answer: "Yes! Sign up for our newsletter to receive exclusive discounts. We also run seasonal sales and offer bundle discounts when you purchase multiple items."
      },
    ]
  },
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("shipping");

  const filteredFaqs = searchQuery
    ? faqCategories.flatMap(cat => 
        cat.faqs.filter(faq => 
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        ).map(faq => ({ ...faq, category: cat.name }))
      )
    : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-12 lg:py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
              How can we help?
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Find answers to frequently asked questions about our products, shipping, and more.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {searchQuery && filteredFaqs ? (
              /* Search Results */
              <div className="max-w-3xl mx-auto">
                <h2 className="text-xl font-semibold mb-6">
                  {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''} for "{searchQuery}"
                </h2>
                {filteredFaqs.length > 0 ? (
                  <Accordion type="single" collapsible className="space-y-4">
                    {filteredFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-xl px-6">
                        <AccordionTrigger className="text-left hover:no-underline py-5">
                          <div>
                            <span className="text-xs text-accent font-medium">{faq.category}</span>
                            <p className="font-semibold mt-1">{faq.question}</p>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-5">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <p className="text-muted-foreground">No results found. Try a different search term or browse our categories below.</p>
                )}
                <button 
                  onClick={() => setSearchQuery("")}
                  className="mt-6 text-accent hover:underline"
                >
                  Clear search & browse all
                </button>
              </div>
            ) : (
              /* Category View */
              <div className="grid lg:grid-cols-4 gap-8">
                {/* Category Tabs - Desktop */}
                <div className="hidden lg:block">
                  <div className="sticky top-24 space-y-2">
                    {faqCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                          activeCategory === cat.id 
                            ? 'bg-accent text-accent-foreground' 
                            : 'hover:bg-muted'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Tabs - Mobile */}
                <div className="lg:hidden flex gap-2 overflow-x-auto pb-4">
                  {faqCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeCategory === cat.id 
                          ? 'bg-accent text-accent-foreground' 
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                {/* FAQ List */}
                <div className="lg:col-span-3">
                  {faqCategories.filter(cat => cat.id === activeCategory).map((category) => (
                    <div key={category.id}>
                      <h2 className="text-2xl font-bold mb-6">{category.name}</h2>
                      <Accordion type="single" collapsible className="space-y-4">
                        {category.faqs.map((faq, index) => (
                          <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-xl px-6">
                            <AccordionTrigger className="text-left hover:no-underline py-5 font-semibold">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Still Need Help? */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-2">Still have questions?</h2>
              <p className="text-muted-foreground">Our friendly team is here to help</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <a 
                href="mailto:hello@ezhomes.co"
                className="bg-background p-6 rounded-xl text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="font-semibold mb-1">Email Us</h3>
                <p className="text-sm text-muted-foreground">hello@ezhomes.co</p>
              </a>
              
              <a 
                href="tel:1300123456"
                className="bg-background p-6 rounded-xl text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="font-semibold mb-1">Call Us</h3>
                <p className="text-sm text-muted-foreground">1300 123 456</p>
              </a>
              
              <button 
                className="bg-background p-6 rounded-xl text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="font-semibold mb-1">Live Chat</h3>
                <p className="text-sm text-muted-foreground">Mon-Fri 9am-5pm AEST</p>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
