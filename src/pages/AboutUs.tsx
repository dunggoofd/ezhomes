import Layout from '@/components/Layout';

export default function AboutUs() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          EZ Homes is dedicated to providing modern, space-saving furniture designed for comfort, style, and convenience. Trusted in over 300,000 homes worldwide, our mission is to make premium living accessible to everyone. Learn more about our story, values, and commitment to quality.
        </p>
      </div>
    </Layout>
  );
}
