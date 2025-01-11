import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const slides = [
  {
    image: "/images/slider4.jpg", // Replace with the actual public URL
    title: "Empowering Innovations",
    description:
      "Host meetings with NASENIKonnect to explore innovative solutions for national development.",
  },
  {
    image: "/images/slider2.jpg", // Replace with the actual public URL
    title: "Advanced Research Facilities",
    description:
      "Collaborate with NASENI researchers to access cutting-edge technologies and advancements.",
  },
  {
    image: "/images/data.jpg", // Replace with the actual public URL
    title: "Confidential and Secure",
    description:
      "All meetings are securely encrypted to ensure the privacy of sensitive research discussions.",
  },
  {
    image: "/images/slider3.jpg", // Replace with the actual public URL
    title: "Seamless Collaboration",
    description:
      "Streamline communication for engineering projects and innovative development initiatives.",
  },
  {
    image: "/images/slider4.jpg", // Replace with the actual public URL
    title: "Sustainable Solutions",
    description:
      "Engage with NASENI teams to develop sustainable energy and manufacturing solutions.",
  },
];

const MeetingFeature = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % slides.length;
    setCurrentSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    setCurrentSlide(prevIndex);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative transition-all duration-500 ease-in-out">
        <Image
          src={slides[currentSlide].image}
          alt="naseni_meeting_feature"
          width={300}
          height={250}
          className="rounded-xl w-80 h-80 md:w-[350px] md:h-[350px] shadow-lg border-4 border-gradient-to-r from-green-500 via-blue-500 to-teal-500"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 -left-12 transform -translate-y-1/2 -translate-x-full transition-transform duration-300 hover:scale-125"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-8 w-8 text-green-600" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 -right-12 transform -translate-y-1/2 translate-x-full transition-transform duration-300 hover:scale-125"
          onClick={nextSlide}
        >
          <ChevronRight className="h-8 w-8 text-green-600" />
        </Button>
      </div>
      <h2 className="text-3xl font-bold mt-6 mb-3 text-gray-900 dark:text-white text-center">
        {slides[currentSlide].title}
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-lg">
        {slides[currentSlide].description}
      </p>
      <div className="flex justify-center space-x-3 mt-6">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentSlide ? "bg-green-600 scale-110" : "bg-gray-300"
            }`}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default MeetingFeature;
