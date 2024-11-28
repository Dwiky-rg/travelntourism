import React from "react";
import image from "../assets/Gambarfaqs.png";
import { FaPlus } from "react-icons/fa";

function Faq() {
  return (
    <section
      className="relative min-h-screen flex flex-col lg:flex-row text-black px-8 py-2 overflow-hidden"
      id="faq"
    >
      {/* Left Section */}
      <div className="flex-1 basis-1/2 lg:px-24 lg:mt-36">
        <h2 className="text-3xl font-thin text-gray-800 mb-4">Actuals</h2>
        <h2 className="font-secondary1 text-7xl font-bold text-gray-800 mb-6">
          FAQs
        </h2>
        <div className="divide-y divide-gray-300 border-t border-b border-gray-300">
          <div className="py-2 flex justify-between items-center">
            <h3 className="font-normal text-lg text-gray-700">
              How do I place on orders?
            </h3>
            <FaPlus className="cursor-pointer" />
          </div>
          <div className="py-2 flex justify-between items-center">
            <h3 className="font-normal text-lg text-gray-700">
              What payment methods do you accept?
            </h3>
            <FaPlus className="cursor-pointer" />
          </div>
          <div className="py-2 flex justify-between items-center">
            <h3 className="font-normal text-lg text-gray-700">
              What is your cancellation policy?
            </h3>
            <FaPlus className="cursor-pointer" />
          </div>
          <div className="py-2 flex justify-between items-center">
            <h3 className="font-normal text-lg text-gray-700">
              How do I contact customer support?
            </h3>
            <FaPlus className="cursor-pointer" />
          </div>
          <div className="py-2 flex justify-between items-center">
            <h3 className="font-normal text-lg text-gray-700">
              What is your privacy policy?
            </h3>
            <FaPlus className="cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 basis-1/2 mt-8 lg:mt-24 lg:px-24">
        <img
          src={image}
          alt="FAQ Illustration"
          className="w-full max-w-xl mx-auto"
        />
      </div>

      <div className="absolute bottom-4 lg:bottom-12 left-0 right-0 text-center">
        {/* Teks Besar */}
        <h2 className="font-secondary1 text-4xl font-bold text-gray-800 mb-1">
          INDONESIANATURE
        </h2>
        {/* Paragraf Deskriptif */}
        <p className="text-gray-600 text-sm">
          Discover the world with <br /> INDONESIANATURE Your Ultimate <br />
          Travel Companiont!
        </p>
      </div>
    </section>
  );
}

export default Faq;
