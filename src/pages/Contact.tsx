import Layout from '@/components/Layout';

export default function Contact() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">Contact</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-4">
          Have a question or need support? Reach out to us at <a href="mailto:ezhomesinfo@gmail.com" className="text-primary underline">ezhomesinfo@gmail.com</a> or call <a href="tel:+61433267318" className="text-primary underline">+61 433 267 318</a>.
        </p>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Or use the form below and our team will get back to you as soon as possible.
        </p>
        {/* You can add a contact form here if needed */}
      </div>
    </Layout>
  );
}
