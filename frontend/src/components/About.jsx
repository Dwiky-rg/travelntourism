import React from "react";
import image from "../assets/about.png";
import { FaPlaneDeparture } from "react-icons/fa";

function About() {
  return (
    <section
      className="relative min-h-screen flex flex-col lg:flex-row text-black px-8 py-2 overflow-hidden"
      id="about"
    >
      {/* Left Section */}
      <div className="flex-1 basis-1/2 lg:px-24 lg:mt-36">
        {/* Judul */}
        <h2 className="text-3xl font-thin text-gray-800 mb-4">
          We are The Best
        </h2>
        <h2 className="font-secondary1 text-7xl font-bold text-gray-800 mb-6">
          About Us
        </h2>

        {/* Paragraf */}
        <p className="text-gray-700 text-lg text-justify mb-6">
          Welcome to Indonesianature, a travel portal dedicated to exploring the
          natural beauty of Indonesia! We believe that the natural wonders of
          this country deserve to be enjoyed and understood by everyone. With
          towering mountains, exotic beaches, lush tropical forests, and a rich
          and diverse culture, Indonesia offers an extraordinary experience for
          every nature lover and adventurer.
        </p>

        {/* Tombol */}
        <a href="/flight">
          <button className="flex items-center px-6 py-3 bg-transparent border border-black font-semibold text-lg rounded-lg hover:scale-110 transition-transform duration-300">
            Book Flight
            <FaPlaneDeparture className="ml-2" />
          </button>
        </a>
      </div>

      {/* Right Section */}
      <div className="flex-1 basis-1/2 mt-8 lg:mt-40 lg:px-24">
        <img
          src={image}
          alt="FAQ Illustration"
          className="w-full max-w-lg mx-auto"
        />
      </div>

      {/* Text at Bottom */}
      <div className="absolute bottom-4 lg:bottom-12 left-0 right-0 flex justify-between lg:px-24 text-center">
        <div>
          <h2 className="font-secondary1 text-6xl font-bold text-gray-800 mb-2">
            10
          </h2>
          <p className="text-gray-600 text-lg">Years of Experience</p>
        </div>
        <div>
          <h2 className="font-secondary1 text-6xl font-bold text-gray-800 mb-2">
            5000
          </h2>
          <p className="text-gray-600 text-lg">Satisfied Clients</p>
        </div>
        <div>
          <h2 className="font-secondary1 text-6xl font-bold text-gray-800 mb-2">
            38
          </h2>
          <p className="text-gray-600 text-lg">Province Covered</p>
        </div>
      </div>
    </section>
  );
}

export default About;
