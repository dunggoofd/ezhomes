import { Star, Quote } from 'lucide-react';

export const TrustSection = () => {
  const testimonials = [
    {
      name: "Sarah M.",
      location: "Brisbane, QLD",
      rating: 5,
      text: "The quality exceeded my expectations. Assembly took exactly 8 minutes and it looks like a designer piece worth 3x the price.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    {
      name: "James K.",
      location: "Melbourne, VIC", 
      rating: 5,
      text: "Perfect for our apartment. Fits through the narrow hallway easily. My friends can't believe it came in a box.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    {
      name: "Emma T.",
      location: "Sydney, NSW",
      rating: 5,
      text: "Game changer for renters! Moving day was a breeze. The sofa looks incredible in our new place.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-accent fill-accent" />
            ))}
          </div>
          <p className="text-sm font-semibold text-accent tracking-widest uppercase mb-4">
            4.9 OUT OF 5 STARS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Loved by 300,000+ Homes
          </h2>
          <p className="text-xl text-muted-foreground">
            See why customers are transforming their spaces with ezhomes.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-background p-8 relative group hover:shadow-lg transition-shadow duration-300"
            >
              <Quote className="h-10 w-10 text-accent/20 absolute top-6 right-6" />
              
              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-foreground text-lg leading-relaxed mb-8">
                "{testimonial.text}"
              </p>

              {/* Reviewer Info */}
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-primary">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-b border-border">
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">300K+</div>
            <div className="text-muted-foreground">Happy Homes</div>
          </div>
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">4.9★</div>
            <div className="text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">10 Min</div>
            <div className="text-muted-foreground">Avg Assembly</div>
          </div>
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">10 Year</div>
            <div className="text-muted-foreground">Warranty</div>
          </div>
        </div>
      </div>
    </section>
  );
};
