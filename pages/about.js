"use client";
import Image from "next/image";

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-green-700 text-white py-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <div className="flex items-center">
                        <Image
                            src="/images/Logo-firs.svg" // Replace with the correct FIRS logo path
                            width={80}
                            height={80}
                            alt="FIRS Logo"
                        />
                        <h1 className="ml-4 text-2xl font-bold">About FIRS-Konnect</h1>
                    </div>
                    <nav className="space-x-4">
                        <a href="/home" className="hover:text-yellow-400">Home</a>
                        <a href="/features" className="hover:text-yellow-400">Features</a>
                        <a href="/contact" className="hover:text-yellow-400">Contact Us</a>
                    </nav>
                </div>
            </header>

            {/* About Us Content */}
            <main className="container mx-auto px-4 py-12 text-gray-700">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-green-700 mb-4">Who We Are</h2>
                    <p className="text-lg leading-relaxed">
                        The Federal Inland Revenue Service (FIRS) is dedicated to driving sustainable economic development
                        by ensuring efficient tax administration in Nigeria. FIRS-Konnect is our innovative video conferencing
                        platform, developed to support seamless communication and collaboration among our staff, partners, and
                        stakeholders. With FIRS-Konnect, we’re bridging communication gaps, improving productivity, and
                        enhancing accessibility in a digital-first world.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-green-700 mb-4">Our Mission</h2>
                    <p className="text-lg leading-relaxed">
                        Our mission is to revolutionize public sector communication by integrating advanced technology. 
                        Through platforms like FIRS-Konnect, we aim to make virtual collaboration simple, effective, and secure, 
                        empowering our teams and external stakeholders to achieve their objectives seamlessly.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-green-700 mb-4">Key Activities</h2>
                    <ul className="list-disc list-inside text-lg space-y-2">
                        <li>Implementing efficient tax administration systems.</li>
                        <li>Developing cutting-edge tools like FIRS-Konnect for video conferencing and collaboration.</li>
                        <li>Enhancing stakeholder engagement through modern technology.</li>
                        <li>Facilitating training and virtual workshops using FIRS-Konnect.</li>
                        <li>Providing transparent and secure communication solutions.</li>
                    </ul>
                </section>

                <section className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-green-700 mb-4">Meet Our Chairman</h2>
                    <Image
                        src="/images/chairman.jpg" // Replace with the correct Chairman's image path
                        width={200}
                        height={200}
                        alt="Chairman of FIRS"
                        className="rounded-full mx-auto mb-4 shadow-lg"
                    />
                    <h3 className="text-xl font-bold text-gray-800">Dr. [Chairman’s Name]</h3>
                    <p className="text-gray-600 mt-2">
                        Under the visionary leadership of Dr. [Chairman’s Name], FIRS is advancing its mandate to
                        implement innovative solutions and improve operational excellence.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-green-700 mb-4">Our Vision</h2>
                    <p className="text-lg leading-relaxed">
                        To be a globally recognized tax administration service, powered by world-class tools
                        like FIRS-Konnect, enabling seamless interaction within the Nigerian economy and beyond.
                    </p>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-green-700 text-white py-6 text-center">
                <p>&copy; {new Date().getFullYear()} Federal Inland Revenue Service. All rights reserved.</p>
                <p>
                    Follow us on{" "}
                    <a href="#" className="text-yellow-400 underline">Facebook</a>,{" "}
                    <a href="#" className="text-yellow-400 underline">Twitter</a>, and{" "}
                    <a href="#" className="text-yellow-400 underline">LinkedIn</a>.
                </p>
            </footer>
        </div>
    );
};

export default AboutUs;
