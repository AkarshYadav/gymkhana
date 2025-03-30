import Link from "next/link";
import Container from "@/components/shop/Container";

export default function AboutUs() {
    return (
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 relative">
            <Container>
                <div className="relative bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 lg:p-12 transform transition hover:scale-105">
                    {/* Accent Border */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-10 rounded-lg blur-lg"></div>

                    {/* Content */}
                    <div className="relative z-10 text-center">
                        <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-6">
                            About <span className="text-orange-500">Us</span>
                        </h2>
                        <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
                            At Gymkhana, we strive to inspire and nurture a community where students can explore, create, and thrive.
                            Our platform empowers individuals by facilitating impactful initiatives, enriching experiences, and fostering leadership opportunities.
                        </p>
                        <p className="text-base text-gray-500 dark:text-gray-400 mb-8">
                            Be part of a culture that values collaboration, creativity, and the spirit of innovation.
                        </p>
                        <Link href="/aboutus" className="inline-block px-6 py-3 text-lg font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-md shadow-md transition-all">
                            Learn More
                        </Link>
                    </div>
                </div>
            </Container>
            {/* Decorative Shapes */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500 rounded-full opacity-20 blur-lg -z-10"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-blue-400 rounded-full opacity-10 blur-lg -z-10"></div>
        </section>
    );
}
