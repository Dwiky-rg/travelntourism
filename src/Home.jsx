import React from "react";
import { FaSearch } from "react-icons/fa"; // Import ikon search
import Batik from "../src/assets/Batik.png";

const Home = () => {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center text-white px-10 lg:px-20">
      {/* Teks Salam */}
      <h1 className="text-2xl lg:text-4xl font-bold mt-16 lg:mt-28 text-center">
        Hi, Where Do You Want To Go On Holiday?
      </h1>

      {/* Form Pencarian */}
      <div className="relative w-full max-w-4xl mt-3 lg:mt-7">
        <input
          type="text"
          placeholder="Where are you going today?"
          className="w-full py-3 pl-12 pr-4 rounded-lg bg-white text-black focus:outline-none"
        />
        <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-black text-lg" />
      </div>

      <div>
        <img
          src={Batik}
          alt="Logo indonesianature"
          className="mt-3 lg:mt-7 w-56 h-12"
        />
      </div>

      {/* Teks Eksplorasi di sebelah kiri */}
      <div className="w-full lg:w-auto lg:absolute lg:left-36 lg:top-1/2 text-left mt-12">
        <h2 className="text-5xl lg:text-7xl tracking-[0.25em] font-thin">
          Explore <br /> Indonesia <br /> with Us
        </h2>
      </div>

      {/* Teks kecil di bagian bawah, seperti footer */}
      <p className="absolute bottom-0 w-full text-sm text-white text-center px-8">
        Experience limitiess travel possibilities with IndonesiaNature
        Innovative Flight booking platform Start journey today!
      </p>
    </section>
  );
};

export default Home;
