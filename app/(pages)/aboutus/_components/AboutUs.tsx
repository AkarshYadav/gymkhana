
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import Container from "@/components/shop/Container";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
};

const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const AboutUs = () => {
    return (
        <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-20 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-blue-500 dark:bg-blue-700 opacity-5 pattern-dots"></div>

                <Container>
                    <motion.div
                        className="flex flex-col items-center text-center mb-16"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                    >
                        <motion.h1
                            className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-orange-500 dark:from-blue-400 dark:to-orange-400 mb-6"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7 }}
                        >
                            Our Story & Mission
                        </motion.h1>
                        <motion.div
                            className="w-20 h-1 bg-orange-500 mb-8"
                            initial={{ width: 0 }}
                            animate={{ width: 80 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        ></motion.div>
                        <motion.p
                            className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl"
                            variants={fadeIn}
                        >
                            Empowering students through innovation, leadership, and community since our inception.
                        </motion.p>
                    </motion.div>
                </Container>
            </section>

            {/* Director's Message */}
            <section className="py-16 relative">
                <Container>
                    <motion.div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerChildren}
                    >
                        <motion.div
                            className="relative"
                            variants={fadeIn}
                        >
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-orange-500 rounded-xl opacity-20 blur-xl"></div>
                            <div className="relative w-80 mx-auto rounded-xl bg-white dark:bg-gray-800 p-2 shadow-xl"> {/* Adjust width as needed */}
                                <Image
                                    src="/direct.png"
                                    alt="Director of IIIT Vadodara"
                                    width={320} // Set a fixed width
                                    height={320} // Set a fixed height
                                    className="rounded-lg w-full h-auto transform transition hover:scale-105 duration-500"
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={fadeIn}>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                                Message from the <span className="text-orange-500">Director</span>
                            </h2>
                            <div className="space-y-4 text-gray-600 dark:text-gray-300">
                                <p>
                                    "At IIIT Vadodara, we believe in nurturing not just academic excellence, but the holistic development of our students. Gymkhana plays an invaluable role in this vision by creating platforms for students to discover their talents, develop leadership skills, and build lasting connections.
                                </p>
                                <p>
                                    The vibrant ecosystem of clubs, committees, and events under Gymkhana exemplifies our commitment to fostering innovation, creativity, and teamwork. I am immensely proud of the student community that has transformed Gymkhana into a thriving hub of extra-curricular excellence."
                                </p>
                                <p className="font-semibold text-gray-800 dark:text-gray-200 mt-4">
                                    — Prof. Director Name, Director, IIIT Vadodara
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </Container>
            </section>

            {/* What We Do Tabs */}
            <section className="py-16 bg-blue-50 dark:bg-gray-900">
                <Container>
                    <motion.div
                        className="text-center mb-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                    >
                        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                            What <span className="text-orange-500">Gymkhana</span> Does
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Serving as the cornerstone of student activities and extra-curricular excellence
                        </p>
                    </motion.div>

                    <Tabs defaultValue="activities" className="w-full max-w-4xl mx-auto">
                        <TabsList className="grid w-full grid-cols-4 mb-8">
                            <TabsTrigger value="activities">Activities</TabsTrigger>
                            <TabsTrigger value="clubs">Clubs</TabsTrigger>
                            <TabsTrigger value="events">Events</TabsTrigger>
                            <TabsTrigger value="merch">Merchandise</TabsTrigger>
                        </TabsList>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerChildren}
                        >
                            <TabsContent value="activities" className="mt-0">
                                <motion.div variants={fadeIn}>
                                    <Card>
                                        <CardContent className="p-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-4">
                                                    <CardTitle className="text-2xl text-blue-600 dark:text-blue-400">
                                                        Extra-Curricular Excellence
                                                    </CardTitle>
                                                    <CardDescription className="text-base text-gray-600 dark:text-gray-300">
                                                        Gymkhana coordinates and oversees all extra-curricular activities at IIIT Vadodara, ensuring students have access to a diverse range of opportunities beyond academics.
                                                    </CardDescription>
                                                </div>
                                                <div className="space-y-4">
                                                    <CardTitle className="text-2xl text-blue-600 dark:text-blue-400">
                                                        Student Development
                                                    </CardTitle>
                                                    <CardDescription className="text-base text-gray-600 dark:text-gray-300">
                                                        Through workshops, competitions, and collaborative projects, we foster leadership, teamwork, and professional skills that complement classroom learning.
                                                    </CardDescription>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </TabsContent>

                            <TabsContent value="clubs" className="mt-0">
                                <motion.div variants={fadeIn}>
                                    <Card>
                                        <CardContent className="p-6">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg">
                                                    <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">Technical Clubs</h3>
                                                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                                        <li>• Coding Club</li>
                                                        <li>• Robotics Club</li>
                                                        <li>• AI/ML Club</li>
                                                        <li>• Cybersecurity Club</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-orange-50 dark:bg-gray-800 p-4 rounded-lg">
                                                    <h3 className="text-xl font-semibold text-orange-500 mb-2">Cultural Clubs</h3>
                                                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                                        <li>• Music Club</li>
                                                        <li>• Dance Club</li>
                                                        <li>• Drama Club</li>
                                                        <li>• Fine Arts Club</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-green-50 dark:bg-gray-800 p-4 rounded-lg">
                                                    <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">Other Clubs</h3>
                                                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                                        <li>• Sports Club</li>
                                                        <li>• Photography Club</li>
                                                        <li>• Literary Club</li>
                                                        <li>• Social Service Club</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </TabsContent>

                            <TabsContent value="events" className="mt-0">
                                <motion.div variants={fadeIn}>
                                    <Card>
                                        <CardContent className="p-6">
                                            <Accordion type="single" collapsible className="w-full">
                                                <AccordionItem value="item-1">
                                                    <AccordionTrigger className="text-lg font-medium">
                                                        Annual Technical Festival
                                                    </AccordionTrigger>
                                                    <AccordionContent className="text-gray-600 dark:text-gray-300">
                                                        Our flagship technical extravaganza featuring hackathons, coding competitions, tech talks, and workshops from industry experts.
                                                    </AccordionContent>
                                                </AccordionItem>
                                                <AccordionItem value="item-2">
                                                    <AccordionTrigger className="text-lg font-medium">
                                                        Cultural Festival
                                                    </AccordionTrigger>
                                                    <AccordionContent className="text-gray-600 dark:text-gray-300">
                                                        A celebration of art, music, dance, and creativity where students showcase their talents and compete in various cultural competitions.
                                                    </AccordionContent>
                                                </AccordionItem>
                                                <AccordionItem value="item-3">
                                                    <AccordionTrigger className="text-lg font-medium">
                                                        Sports Tournament
                                                    </AccordionTrigger>
                                                    <AccordionContent className="text-gray-600 dark:text-gray-300">
                                                        Inter-college sports competitions fostering sportsmanship, teamwork, and physical wellness among students.
                                                    </AccordionContent>
                                                </AccordionItem>
                                                <AccordionItem value="item-4">
                                                    <AccordionTrigger className="text-lg font-medium">
                                                        Workshops & Seminars
                                                    </AccordionTrigger>
                                                    <AccordionContent className="text-gray-600 dark:text-gray-300">
                                                        Regular skill-building sessions on emerging technologies, professional development, and personal growth.
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </TabsContent>

                            <TabsContent value="merch" className="mt-0">
                                <motion.div variants={fadeIn}>
                                    <Card>
                                        <CardContent className="p-6">
                                            <div className="text-center space-y-6">
                                                <div>
                                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                                                        Gymkhana Merchandise Store
                                                    </h3>
                                                    <p className="text-gray-600 dark:text-gray-300">
                                                        Our e-commerce platform offers exclusive merchandise related to IIIT Vadodara, club-specific items, and event memorabilia.
                                                    </p>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                                                        <div className="h-24 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded mb-3">
                                                            <span className="text-3xl">👕</span>
                                                        </div>
                                                        <p className="font-medium">College T-shirts</p>
                                                    </div>
                                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                                                        <div className="h-24 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded mb-3">
                                                            <span className="text-3xl">🧢</span>
                                                        </div>
                                                        <p className="font-medium">Club Merchandise</p>
                                                    </div>
                                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                                                        <div className="h-24 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded mb-3">
                                                            <span className="text-3xl">🏆</span>
                                                        </div>
                                                        <p className="font-medium">Event Souvenirs</p>
                                                    </div>
                                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                                                        <div className="h-24 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded mb-3">
                                                            <span className="text-3xl">📓</span>
                                                        </div>
                                                        <p className="font-medium">Branded Stationery</p>
                                                    </div>
                                                </div>

                                                <Link href="/shop" className="inline-block px-6 py-3 mt-6 text-white bg-orange-500 hover:bg-orange-600 rounded-md font-medium transition-all">
                                                    Visit Shop
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </TabsContent>
                        </motion.div>
                    </Tabs>
                </Container>
            </section>

            {/* Our Impact */}
            <section className="py-16">
                <Container>
                    <motion.div
                        className="text-center mb-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                    >
                        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                            Our <span className="text-orange-500">Impact</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Transforming student life through meaningful initiatives and experiences
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerChildren}
                    >
                        <motion.div
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                            variants={fadeIn}
                        >
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 mb-4 mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-2">10+</h3>
                            <p className="text-center text-gray-600 dark:text-gray-300">Active Student Clubs</p>
                        </motion.div>

                        <motion.div
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                            variants={fadeIn}
                        >
                            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-300 mb-4 mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-2">20+</h3>
                            <p className="text-center text-gray-600 dark:text-gray-300">Events Annually</p>
                        </motion.div>

                        <motion.div
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                            variants={fadeIn}
                        >
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 dark:text-green-300 mb-4 mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-2">90%</h3>
                            <p className="text-center text-gray-600 dark:text-gray-300">Student Participation</p>
                        </motion.div>


                    </motion.div>
                </Container>
            </section>

            {/* Join Us */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-orange-500 text-white">
                <Container>
                    <motion.div
                        className="text-center max-w-3xl mx-auto"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                    >
                        <h2 className="text-4xl font-bold mb-6">Join the Gymkhana Family</h2>
                        <p className="text-xl mb-8">
                            Whether you're passionate about technology, arts, sports, or community service, there's a place for you in our vibrant ecosystem.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/committees" className="px-6 py-3 bg-white text-blue-600 hover:bg-gray-100 font-medium rounded-md transition-colors">
                                Explore Clubs
                            </Link>
                            <Link href="/events" className="px-6 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 font-medium rounded-md transition-colors">
                                Upcoming Events
                            </Link>
                        </div>
                    </motion.div>
                </Container>
            </section>
        </div>
    );
}

export default AboutUs;