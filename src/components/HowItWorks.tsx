import compressionImage from '@/assets/compression-demo.jpg';
import assemblyImage from '@/assets/assembly-guide.jpg';
import heroImage from '@/assets/hero-sofa.jpg';

export const HowItWorks = () => {
  const features = [
    {
      title: "Sofa to Bed",
      image: heroImage,
      size: "large",
    },
    {
      title: "One-Pull Mechanism",
      image: compressionImage,
      size: "small",
    },
    {
      title: "Hidden Storage",
      image: assemblyImage,
      size: "small",
    },
    {
      title: "Easy Assembly",
      image: compressionImage,
      size: "small",
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12">
          {/* Text Content */}
          <div className="max-w-lg">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              From Sofa to Bed
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Designed to move with you. Lightweight modular pieces rearrange effortlessly—from sofa to lounge to full sleep setup—so your space adapts as easily as your day.
            </p>
            <a 
              href="/shop" 
              className="inline-flex items-center justify-center bg-accent text-accent-foreground px-8 py-4 text-sm font-semibold tracking-wide uppercase hover:bg-accent/90 transition-colors"
            >
              Shop Collection
            </a>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden bg-muted rounded-lg">
              <img
                src={heroImage}
                alt="Sofa transforming to bed"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Feature Grid - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Large Feature Card */}
          <div className="relative md:row-span-2 group overflow-hidden rounded-lg">
            <div className="aspect-[3/4] md:aspect-auto md:h-full">
              <img
                src={features[0].image}
                alt={features[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-xl font-semibold text-white">
                  {features[0].title}
                </h3>
              </div>
            </div>
          </div>

          {/* Small Feature Cards - Top Row */}
          {features.slice(1, 3).map((feature, index) => (
            <div 
              key={index}
              className="relative group overflow-hidden rounded-lg"
            >
              <div className="aspect-[4/3]">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-lg font-semibold text-white italic">
                    {feature.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}

          {/* Easy Assembly - Spans 2 columns */}
          <div className="relative group overflow-hidden rounded-lg lg:col-span-2">
            <div className="aspect-[8/3]">
              <img
                src={features[3].image}
                alt={features[3].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-lg font-semibold text-white italic">
                  {features[3].title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
