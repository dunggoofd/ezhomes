import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Star, ThumbsUp, Check, Filter } from "lucide-react";
import { useState } from "react";

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    location: "Brisbane, QLD",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    product: "Corduroy & Flannel Sofa Cream",
    title: "Absolutely love it!",
    content: "This sofa exceeded all my expectations. The quality is amazing for the price, and assembly took less than 10 minutes. My whole family loves it!",
    helpful: 24,
    images: [],
  },
  {
    id: 2,
    name: "Michael T.",
    location: "Sydney, NSW",
    rating: 5,
    date: "1 month ago",
    verified: true,
    product: "Corduroy & Flannel Sofa Space Grey",
    title: "Perfect for small apartments",
    content: "Living in a small apartment, I needed furniture that was easy to move and didn't take up too much space. This sofa is perfect. The compression technology meant it fit through my narrow doorway easily.",
    helpful: 18,
    images: [],
  },
  {
    id: 3,
    name: "Emma L.",
    location: "Melbourne, VIC",
    rating: 5,
    date: "1 month ago",
    verified: true,
    product: "Compression Bed Beige",
    title: "Game changer for guest room",
    content: "I bought this for my guest room and it's been a game changer. Comfortable, stylish, and our guests always comment on how well they slept. The transformation from sofa to bed is seamless.",
    helpful: 31,
    images: [],
  },
  {
    id: 4,
    name: "James K.",
    location: "Perth, WA",
    rating: 4,
    date: "2 months ago",
    verified: true,
    product: "Corduroy & Flannel Sofa Ocean Blue",
    title: "Great quality, minor delay",
    content: "The sofa itself is fantastic - great quality and very comfortable. Delivery took a bit longer than expected, but customer service kept me informed throughout. Would definitely recommend.",
    helpful: 12,
    images: [],
  },
  {
    id: 5,
    name: "Lisa R.",
    location: "Adelaide, SA",
    rating: 5,
    date: "3 weeks ago",
    verified: true,
    product: "Corduroy & Flannel Sofa Cream",
    title: "Best purchase this year",
    content: "I spent months looking for the perfect sofa and I'm so glad I found ezhomes. The cream colour is beautiful, the fabric is soft yet durable, and my cat hasn't been able to scratch it!",
    helpful: 27,
    images: [],
  },
];

const Reviews = () => {
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const averageRating = 4.9;
  const totalReviews = 2847;
  const ratingBreakdown = [
    { stars: 5, count: 2456, percentage: 86 },
    { stars: 4, count: 312, percentage: 11 },
    { stars: 3, count: 56, percentage: 2 },
    { stars: 2, count: 18, percentage: 0.6 },
    { stars: 1, count: 5, percentage: 0.2 },
  ];

  const filteredReviews = filterRating 
    ? reviews.filter(r => r.rating === filterRating)
    : reviews;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-12 lg:py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
              Customer Reviews
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what our customers are saying about their ezhomes furniture
            </p>
          </div>
        </section>

        {/* Rating Summary */}
        <section className="py-12 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Overall Rating */}
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                  <span className="text-6xl font-bold text-primary">{averageRating}</span>
                  <div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mt-1">Based on {totalReviews.toLocaleString()} reviews</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start mt-6">
                  <span className="px-3 py-1.5 bg-accent/20 text-accent-foreground rounded-full text-sm font-medium">
                    ✓ Verified Reviews
                  </span>
                  <span className="px-3 py-1.5 bg-muted rounded-full text-sm font-medium">
                    🏆 Trusted Brand
                  </span>
                  <span className="px-3 py-1.5 bg-muted rounded-full text-sm font-medium">
                    🇦🇺 Australian Company
                  </span>
                </div>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-3">
                {ratingBreakdown.map((item) => (
                  <button
                    key={item.stars}
                    onClick={() => setFilterRating(filterRating === item.stars ? null : item.stars)}
                    className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                      filterRating === item.stars ? 'bg-accent/20' : 'hover:bg-muted'
                    }`}
                  >
                    <span className="w-12 text-sm font-medium">{item.stars} stars</span>
                    <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="w-16 text-sm text-muted-foreground text-right">
                      {item.count.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Reviews List */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">
                {filterRating ? `${filterRating}-Star Reviews` : 'All Reviews'}
              </h2>
              {filterRating && (
                <button 
                  onClick={() => setFilterRating(null)}
                  className="text-sm text-accent hover:underline"
                >
                  Clear filter
                </button>
              )}
            </div>

            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <div key={review.id} className="bg-background border border-border rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{review.name}</span>
                        {review.verified && (
                          <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            <Check className="h-3 w-3" /> Verified
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{review.location} • {review.date}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < review.rating ? 'fill-accent text-accent' : 'text-muted'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2">
                    Reviewed: <span className="font-medium text-foreground">{review.product}</span>
                  </p>
                  
                  <h3 className="font-semibold mb-2">{review.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{review.content}</p>
                  
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <ThumbsUp className="h-4 w-4" />
                      Helpful ({review.helpful})
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-10">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Load More Reviews
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Reviews;
