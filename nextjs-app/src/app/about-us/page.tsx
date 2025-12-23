import Layout from '@/components/Layout';

export default function AboutUs() {
	return (
		<Layout>
			<section className="max-w-3xl mx-auto px-4 py-16">
				<h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">About Us</h1>
				<p className="text-lg text-muted-foreground mb-6 text-center">
					EZ Homes is dedicated to providing modern, space-saving furniture designed for comfort, style, and convenience. Trusted in over 300,000 homes worldwide, our mission is to make premium living accessible to everyone.
				</p>
				<div className="prose prose-neutral mx-auto">
					<p>
						Our story began with a simple idea: to help people make the most of their living spaces without sacrificing style or comfort. We believe that great design should be accessible, functional, and beautiful.
					</p>
					<p>
						Every product we offer is thoughtfully crafted, rigorously tested, and backed by our commitment to quality and customer satisfaction. Thank you for making us a part of your home.
					</p>
				</div>
			</section>
		</Layout>
	);
}
