import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

const sampleFaqs = [
  {
    q: 'How long does shipping take?',
    a: 'Brisbane metro orders typically arrive within 2-3 business days. Other metro areas 3-5 business days.',
  },
  {
    q: 'What is your return policy?',
    a: 'Due to the vacuum-compressed nature of our sofas, all sales are final once a product has been opened and expanded. We only accept returns or exchanges for items with a manufacturing or factory defect — notify us within 7 days of delivery with clear photos or videos of the issue.',
  },
  {
    q: 'Do you offer interest-free payments?',
    a: 'Yes, we offer Afterpay and Zip to split payments into interest-free instalments.',
  },
];

export const FAQPreview = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-sm font-semibold text-accent tracking-widest uppercase mb-2">Help Center</p>
          <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mt-3">Quick answers to common questions — see the full FAQ for more details.</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {sampleFaqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left py-4 font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-8">
            <Link to="/faq" className="btn-ghost px-8 py-3">View all FAQs</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQPreview;
