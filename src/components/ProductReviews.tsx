import { useState } from "react";
import { Star, Search, CheckCircle2, ThumbsUp, ThumbsDown, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Review {
  id: string;
  author: string;
  verified: boolean;
  rating: number;
  title: string;
  content: string;
  date: string;
  productName: string;
  productImage: string;
  recommends: boolean;
  helpfulUp: number;
  helpfulDown: number;
  images?: string[];
}

interface ProductReviewsProps {
  product?: {
    id: string;
    title: string;
    name?: string;
    images?: string[];
  };
}

const mockReviews: Review[] = [
  {
    id: "1",
    author: "Helen T.",
    verified: true,
    rating: 5,
    title: "Better In Person",
    content: "I absolutely love my sofa! The compression packaging was genius - fit right through my narrow hallway. Assembly took less than 10 minutes. The velvet fabric is so soft and the color is exactly as shown. Extremely well packaged and the quality exceeded my expectations.",
    date: "2 days ago",
    productName: "Oslo Compression Sofa",
    productImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop",
    recommends: true,
    helpfulUp: 0,
    helpfulDown: 0,
  },
  {
    id: "2",
    author: "Jackie S.",
    verified: true,
    rating: 5,
    title: "5 Star Quality",
    content: "Solid, substantial, beautiful...all those words and more apply. The sofa expanded perfectly after unpacking and looks amazing in my living room.",
    date: "1 week ago",
    productName: "Oslo Compression Sofa",
    productImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop",
    recommends: true,
    helpfulUp: 0,
    helpfulDown: 0,
  },
  {
    id: "3",
    author: "Kevin M.",
    verified: true,
    rating: 3,
    title: "Good But Minor Issues",
    content: "Like that it is compact for delivery and easy to assemble. Had a small crease from packaging but it flattened out after a few days.",
    date: "1 week ago",
    productName: "Oslo Compression Sofa",
    productImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop",
    recommends: true,
    helpfulUp: 1,
    helpfulDown: 1,
  },
  {
    id: "4",
    author: "Judith L.",
    verified: true,
    rating: 5,
    title: "Great Sofa!",
    content: "I'm beyond happy with my new sofa. It's compact for my small apartment but accommodating for guests. The compression technology is amazing - it arrived in a box I could carry myself! Best furniture purchase I have ever made. It fits in with my mid century house/decor perfectly.",
    date: "2 weeks ago",
    productName: "Oslo Compression Sofa",
    productImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop",
    recommends: true,
    helpfulUp: 5,
    helpfulDown: 2,
    images: ["https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=200&h=200&fit=crop"],
  },
];

const ratingBreakdown = {
  average: 4.7,
  total: 1687,
  distribution: [
    { stars: 5, count: 1400 },
    { stars: 4, count: 207 },
    { stars: 3, count: 67 },
    { stars: 2, count: 10 },
    { stars: 1, count: 3 },
  ],
};

export const ProductReviews = ({ product }: ProductReviewsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("recent");

  // Only show reviews for this product (by name/title)
  const filteredReviews = mockReviews
    .filter((review) => {
      // Match by product name/title if product is provided
      if (product && review.productName && product.title) {
        if (
          review.productName.toLowerCase() !== product.title.toLowerCase() &&
          review.productName.toLowerCase() !== product.name?.toLowerCase()
        ) {
          return false;
        }
      }
      if (selectedRating && review.rating !== selectedRating) return false;
      if (
        searchQuery &&
        !review.content.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !review.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "helpful") return b.helpfulUp - a.helpfulUp;
      return 0; // Default: most recent (already in order)
    });

  const maxCount = Math.max(...ratingBreakdown.distribution.map((d) => d.count));

  return (
    <section className="border-t border-border mt-12 pt-12">
      {/* Header */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-10">
        Hear from real customers
      </h2>

      {/* Rating Summary */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Average Rating */}
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-foreground">{ratingBreakdown.average}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(ratingBreakdown.average)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-muted-foreground">
            Based on {ratingBreakdown.total.toLocaleString()} reviews
          </span>
        </div>
      </div>

      {/* Rating Distribution Bars */}
      <div className="space-y-2 mb-8 max-w-md">
        {ratingBreakdown.distribution.map((item) => (
          <button
            key={item.stars}
            onClick={() => setSelectedRating(selectedRating === item.stars ? null : item.stars)}
            className={`flex items-center gap-3 w-full group transition-opacity ${
              selectedRating && selectedRating !== item.stars ? "opacity-40" : ""
            }`}
          >
            <span className="text-sm w-4 text-foreground">{item.stars}</span>
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 rounded-full transition-all"
                style={{ width: `${(item.count / maxCount) * 100}%` }}
              />
            </div>
            <span className="text-sm text-muted-foreground w-12 text-right">
              {item.count >= 1000 ? `${(item.count / 1000).toFixed(1)}k` : item.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search Reviews"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button variant="default" className="gap-2">
          <Pencil className="w-4 h-4" />
          Write a Review
        </Button>
      </div>

      {/* Rating Filter Pills */}
      <div className="mb-6">
        <p className="text-sm font-medium text-foreground mb-3">Rating</p>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-sm transition-colors ${
                selectedRating === rating
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-muted-foreground"
              }`}
            >
              {[...Array(rating)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Count & Sort */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-muted-foreground">
          {filteredReviews.length === mockReviews.length
            ? `${ratingBreakdown.total.toLocaleString()} reviews`
            : `${filteredReviews.length} reviews`}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Sort</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="helpful">Most Helpful</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Review Cards */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="border border-border rounded-xl p-5 md:p-6"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Reviewer Info */}
              <div className="md:w-48 shrink-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-foreground">{review.author}</span>
                  {review.verified && (
                    <CheckCircle2 className="w-4 h-4 text-primary fill-primary/20" />
                  )}
                </div>
                {review.verified && (
                  <span className="text-xs text-muted-foreground font-medium">Verified Buyer</span>
                )}
                <div className="mt-3 flex items-center gap-3">
                  <img
                    src={review.productImage}
                    alt={review.productName}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-xs text-muted-foreground">Reviewing</p>
                    <p className="text-sm font-medium text-foreground">{review.productName}</p>
                  </div>
                </div>
                {review.recommends && (
                  <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>I recommend this product</span>
                  </div>
                )}
              </div>

              {/* Review Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">{review.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {review.content}
                </p>

                {/* Review Images: show review images if present, else fallback to product images */}
                {(review.images && review.images.length > 0
                  ? review.images
                  : product?.images && product.images.length > 0
                  ? product.images.slice(0, 1)
                  : [])
                  .length > 0 && (
                  <div className="flex gap-2 mb-4">
                    {(review.images && review.images.length > 0
                      ? review.images
                      : product?.images && product.images.length > 0
                      ? product.images.slice(0, 1)
                      : []
                    ).map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Review image ${idx + 1}`}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    ))}
                  </div>
                )}

                {/* Helpful Votes */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Was this helpful?</span>
                  <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{review.helpfulUp}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                    <ThumbsDown className="w-4 h-4" />
                    <span>{review.helpfulDown}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <Button variant="outline" size="lg">
          Load More Reviews
        </Button>
      </div>
    </section>
  );
};
