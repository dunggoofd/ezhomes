import Layout from '@/components/Layout';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { ProductGrid } from '@/components/ProductGrid';
import FAQPreview from '@/components/FAQPreview';

const Index = () => {
  return (
    <Layout>
      <main>
        <Hero />
        <ProductGrid />
        <FAQPreview />
        <HowItWorks />
      </main>
    </Layout>
  );
};

export default Index;
