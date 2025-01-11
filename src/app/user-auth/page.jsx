"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";

SwiperCore.use([Autoplay, Pagination, Navigation]);

const page = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Block copy, cut, and context menu actions
    const preventActions = (e) => e.preventDefault();

    // Add listeners
    document.addEventListener("copy", preventActions);
    document.addEventListener("cut", preventActions);
    document.addEventListener("contextmenu", preventActions);
    document.addEventListener("dragstart", preventActions);

    // Clean up listeners
    return () => {
      document.removeEventListener("copy", preventActions);
      document.removeEventListener("cut", preventActions);
      document.removeEventListener("contextmenu", preventActions);
      document.removeEventListener("dragstart", preventActions);
    };
  }, []);

  useEffect(() => {
    localStorage.removeItem("hasShownWelcome");
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("google", {
        callbackUrl: "/",
      });
      toast.info("Logging in with Google to access NASENIKonnect...");
    } catch (error) {
      toast.error("Failed to login with Google, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#001f54] py-2 px-4 flex justify-between items-center shadow-lg md:px-8">
        <div className="flex items-center ml-4">
          <Image
            src="/images/logo.png"
            width={250}
            height={400}
            alt="NASENI Logo"
            className="rounded-md"
          />
          <span className="text-white text-lg md:text-xl font-bold ml-1">Konnect</span>
        </div>
        <div className="flex space-x-2">
          <Button
            className="bg-gradient-to-r from-[#0066cc] via-[#004080] to-[#00264d] text-white font-semibold py-1 px-3 md:py-2 md:px-4 rounded-full shadow-lg text-xs md:text-sm hover:scale-105 transform"
            onClick={handleLogin}
          >
            LOGIN
          </Button>
          <a
            href="https://naseni-chatbot.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-[#0066cc] via-[#004080] to-[#00264d] text-white font-semibold py-1 px-3 md:py-2 md:px-4 rounded-full shadow-lg text-xs md:text-sm hover:scale-105 transform"
          >
            CHATBOT
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          navigation
          loop
        >
          {["/images/slider3.jpg", "/images/slider2.jpg", "/images/slider3.jpg"].map((image, index) => (
            <SwiperSlide key={index}>
              <div
                className="h-screen flex items-center justify-center text-white text-center"
                style={{
                  backgroundImage: `url('${image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="bg-[#001f54] bg-opacity-70 p-8 rounded-lg shadow-xl mt-72">
                  <h1 className="text-5xl font-bold mb-4">NASENIKonnect</h1>
                  <p className="text-lg font-light">
                    Connecting Minds, Driving Innovation for National Progress
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* About Us Section */}
<section className="py-10 bg-gray-100 px-4 md:px-8">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
    <div className="space-y-4">
      <h3 className="text-xl md:text-2xl font-semibold text-[#001f54]">
        About NASENIKonnect
      </h3>
      <p className="text-gray-700">
        NASENIKonnect is an advanced platform designed to foster collaboration,
        communication, and innovation within NASENI. By leveraging state-of-the-art
        technology, the platform empowers teams to work efficiently, transforming ideas
        into impactful solutions for Nigeria's technological advancement.
      </p>
      <p className="text-gray-700">
        At its core is an intelligent chatbot and cutting-edge tools that streamline
        operations and improve user interaction, driving productivity and progress.
      </p>
    </div>
    <Image
      src="/images/slider4.jpg"
      alt="NASENI Collaboration"
      width={500}
      height={300}
      className="rounded-lg shadow-lg transform transition-transform duration-700 ease-in-out hover:scale-110 hover:rotate-2" // Added animation classes
    />
  </div>
</section>

{/* Chatbot and Login Section */}
<section className="py-10 bg-gray-100 px-4 md:px-8">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
    <div className="space-y-4">
      <h3 className="text-xl md:text-2xl font-semibold text-[#001f54]">
        Chatbot Interaction
      </h3>
      <p className="text-gray-700">
        Our interactive chatbot is a state-of-the-art feature designed to revolutionize
        the way you engage with NASENIKonnect. Whether you're a team member seeking quick
        answers, a project lead aiming to streamline processes, or a collaborator needing
        seamless support, this chatbot is your go-to solution.
      </p>
      <p className="text-gray-700">
        The NASENIKonnect chatbot simplifies your interactions, enhancing productivity on the platform
        by offering real-time assistance about NASENI's initiatives and innovative products.
      </p>
      <Button
        className="bg-gradient-to-r from-[#0066cc] via-[#004080] to-[#00264d] text-white font-semibold px-6 py-2 rounded-full hover:scale-105 transform mt-2"
        onClick={() =>
          window.open("https://naseni-chatbot.vercel.app", "_blank")
        }
      >
        Launch Chatbot
      </Button>
    </div>
    <Image
      src="/images/chatbot.jpg"
      alt="NASENI Chatbot Interaction"
      width={500}
      height={300}
      className="rounded-lg shadow-lg transform transition-transform duration-700 ease-in-out hover:scale-110 hover:rotate-2" // Added animation classes
    />
  </div>
</section>

      {/* Features Section */}
<section className="py-10">
  <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#001f54]">
    NASENIKonnect Features
  </h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto px-4">
    {[ 
      { title: "HD Video & Audio", text: "Seamless communication for project collaboration." },
      { title: "Knowledge Sharing", text: "Access a repository of NASENI's innovations." },
      { title: "Meeting Recording", text: "Archive discussions for reference and planning." },
      { title: "Innovative Chatbot", text: "Get instant responses for seamless engagement." },
      { title: "Secure Collaboration", text: "Ensure confidentiality with top-notch encryption." },
      { title: "Custom Solutions", text: "Adapt to the specific needs of NASENI projects." },
    ].map((feature, index) => (
      <div
        key={index}
        className="feature-card p-6 bg-white rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-[#f1f5f8]"
      >
        <h3 className="text-lg font-semibold text-[#001f54]">{feature.title}</h3>
        <p className="text-gray-600 mt-2">{feature.text}</p>
      </div>
    ))}
  </div>
</section>


      {/* Call to Action */}
      <section className="bg-[#001f54] py-10 text-center text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to Transform The You Communicate
        </h2>
        <Button
          className="bg-white text-[#001f54] font-semibold px-6 py-2 rounded-full hover:bg-gray-100 mt-4"
          onClick={handleLogin}
        >
          Get Started Now
        </Button>
      </section>

      {/* Footer */}
<footer className="py-6 bg-[#001f54] text-center text-white text-sm">
  <p>&copy; 2024 NASENI. All rights reserved.</p>
  <p>
    Developed & Designed by{" "}
    <a
      href="https://github.com/isahmusa"
      className="text-yellow-300 underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      Musa Danladi Isah
    </a>
  </p>
  {/* Social Media Links */}
  <div className="flex justify-center space-x-4 mt-4">
    <a
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white hover:text-gray-300 transition duration-300"
    >
      <i className="fab fa-facebook-f" aria-hidden="true"></i> Facebook
    </a>
    <a
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white hover:text-gray-300 transition duration-300"
    >
      <i className="fab fa-twitter" aria-hidden="true"></i> Twitter
    </a>
    <a
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white hover:text-gray-300 transition duration-300"
    >
      <i className="fab fa-instagram" aria-hidden="true"></i> Instagram
    </a>
    <a
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white hover:text-gray-300 transition duration-300"
    >
      <i className="fab fa-linkedin-in" aria-hidden="true"></i> LinkedIn
    </a>
    <a
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white hover:text-gray-300 transition duration-300"
    >
      <i className="fab fa-youtube" aria-hidden="true"></i> YouTube
    </a>
  </div>
</footer>

      {isLoading && <Loader />}
    </div>
  );
};

export default page;
