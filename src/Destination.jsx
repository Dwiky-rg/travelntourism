import React from "react";
import Logo from "../src/assets/Logo Hitam.png";
import { GoArrowUpRight } from "react-icons/go";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Card1 from "../src/assets/Labuan bajo.jpg";
import Card2 from "../src/assets/Bali.jpg";
import Card3 from "../src/assets/Raja Ampat.jpeg";
import Card4 from "../src/assets/Lombok.jpeg";

const scrollToHome = () => {
  const homeSection = document.getElementById("home");
  if (homeSection) {
    window.scrollTo({
      top: homeSection.offsetTop,
      behavior: "smooth",
    });
  }
};

// Data card untuk destinasi populer
const destinations = [
  { id: 1, image: Card1, title: "Labuan Bajo", description: "Labuan Bajo" },
  { id: 2, image: Card2, title: "Bali", description: "Bali" },
  { id: 3, image: Card3, title: "Raja Ampat", description: "Raja Ampat" },
  { id: 4, image: Card4, title: "Lombok", description: "Lombok" },
];

function Destination() {
  return (
    <section
      className="relative min-h-screen flex flex-col text-black px-8 py-2"
      id="destination"
    >
      <div
        className="absolute top-5 left-8 cursor-pointer"
        onClick={scrollToHome}
      >
        <img src={Logo} alt="Logo indonesianature" className="w-40 h-7" />
      </div>

      {/* Teks besar dan teks paragraf di bawah logo */}
      <div className="mt-16 md:mt-20 px-4 md:px-12">
        <h1 className="text-5xl md:text-7xl lg:leading-tight">
          Explore Our <br /> Popular Destination
        </h1>
        <p className="text-lg opacity-50">
          Find your next escape whether it's a cultural city break, a nature
          retreat, or an adventure-filled getaway.
        </p>
      </div>

      {/* Tombol ikon untuk navigasi kiri dan kanan di atas kanan konten utama */}
      <div className="flex justify-end items-center mt-6 lg:mt-2 space-x-2 pr-2 lg:pr-5">
        <button className="p-2 bg-[#FF994B] rounded-full text-white shadow-lg hover:bg-[#e98840]">
          <FaChevronLeft className="w-6 h-6" />
        </button>
        <button className="p-2 bg-[#FF994B] rounded-full text-white shadow-lg hover:bg-[#e98840]">
          <FaChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Konten utama dengan mapping untuk card */}
      <div className="mt-4 lg:mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 justify-center">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="relative w-80 h-[350px] lg:h-[400px] bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#FF994B] mx-auto"
          >
            {/* Gambar yang memenuhi seluruh card */}
            <img
              src={destination.image}
              alt={destination.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay untuk latar belakang teks dan tombol */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-5">
              {/* Teks deskripsi di atas tombol */}
              <h3 className="text-xl font-bold text-white mb-2">
                {destination.title}
              </h3>

              {/* Tombol dengan ikon di sebelah kanan */}
              <button className="w-full bg-white bg-opacity-30 backdrop-blur-lg text-white px-4 py-2 rounded-xl border-2 border-white flex items-center justify-between hover:bg-opacity-40">
                <span className="text-left">More Details</span>
                <GoArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Destination;
