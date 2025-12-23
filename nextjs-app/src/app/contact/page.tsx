import Layout from '@/components/Layout';

export default function Contact() {
	return (
		<Layout>
			<section className="max-w-3xl mx-auto px-4 py-16">
				<h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Contact</h1>
				<p className="text-lg text-muted-foreground mb-6 text-center">
					Have a question or need support? Reach out to us at <a href="mailto:ezhomesinfo@gmail.com" className="text-primary underline">ezhomesinfo@gmail.com</a> or call <a href="tel:+61433267318" className="text-primary underline">+61 433 267 318</a>.
				</p>
				<div className="prose prose-neutral mx-auto text-center">
					<p>
						Or use the form below and our team will get back to you as soon as possible.
					</p>
				</div>
				{/* You can add a contact form here if needed */}
			</section>
		</Layout>
	);
}
