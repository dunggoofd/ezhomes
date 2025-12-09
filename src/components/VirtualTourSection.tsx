import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CalendlyModal from '@/components/CalendlyModal';
import heroImage from '@/assets/hero-sofa.jpg';

const CALENDLY_URL = 'https://calendly.com/your-company/virtual-showroom'; // Updated to use CalendlyModal

export const VirtualTourSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-accent/6 to-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-sm font-semibold text-accent tracking-widest uppercase mb-4">Virtual Showroom</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Take a Live Virtual Tour</h2>
            <p className="text-muted-foreground mb-6 max-w-xl">Book a guided virtual showroom walkthrough with one of our specialists — see products in 3D, ask questions live, and get personalised recommendations. Available weekdays and weekends by appointment.</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <CalendlyModal url={CALENDLY_URL} triggerLabel="Schedule a Tour" />

              <Link to="/virtual-tour" className="self-start">
                <Button variant="outline" className="px-6 py-3" size="lg">
                  Explore Now
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-muted rounded-2xl aspect-video overflow-hidden flex items-center justify-center">
            <div className="w-full h-full relative">
              <img src={heroImage} alt="Virtual showroom preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-center justify-center">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center cursor-pointer">
                  <Play className="h-8 w-8 text-accent-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualTourSection;
