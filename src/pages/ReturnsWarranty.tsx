import Layout from '@/components/Layout';

export default function ReturnsWarranty() {
  return (
    <Layout>
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Return &amp; Refund Policy</h1>
        <div className="prose prose-neutral mx-auto">
          <p>
            At EzHomes, we take pride in the quality of our compression sofas. Due to the nature of
            vacuum-compressed furniture, all sales are considered final once the product has been
            opened and expanded.
          </p>

          <h2>Returns &amp; Exchanges</h2>
          <p>We only accept returns or exchanges under the following circumstances:</p>
          <ul>
            <li>The product arrives with a manufacturing or factory defect.</li>
            <li>The product is damaged due to a fault in production.</li>
          </ul>
          <p>
            To be eligible for a return or exchange, customers must notify us within 7 days of
            delivery and provide clear photos or videos showing the defect.
          </p>

          <h2>Non-Returnable Items</h2>
          <p>We do not accept returns, refunds, or exchanges for:</p>
          <ul>
            <li>Change of mind.</li>
            <li>Incorrect size or colour selection made by the customer.</li>
            <li>
              Products that have been opened, unboxed, or allowed to expand from their compressed
              packaging.
            </li>
            <li>Normal wear and tear, misuse, improper assembly, or accidental damage.</li>
          </ul>

          <h2>Inspection &amp; Resolution</h2>
          <p>All claims will be assessed by our team. If a manufacturing defect is confirmed, we may, at our discretion:</p>
          <ul>
            <li>Replace the defective product or affected part; or</li>
            <li>Provide a refund if a replacement is not available.</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            For return requests or warranty claims, please contact us with your order number and
            supporting photos/videos.
          </p>
        </div>
      </section>
    </Layout>
  );
}
