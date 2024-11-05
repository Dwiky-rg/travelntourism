import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const destinations = [
  { id: 1, image: Card1, title: "Labuan Bajo", description: "Labuan Bajo" },
  { id: 2, image: Card2, title: "Bali", description: "Bali" },
  { id: 3, image: Card3, title: "Raja Ampat", description: "Raja Ampat" },
  { id: 4, image: Card4, title: "Lombok", description: "Lombok" },
  { id: 5, image: Card4, title: "Lombok", description: "Lombok" },
  { id: 6, image: Card4, title: "Lombok", description: "Lombok" },
  { id: 7, image: Card4, title: "Lombok", description: "Lombok" },
];

function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="absolute top-[-15px] lg:top-[-40px] right-3 lg:right-8 p-2 bg-[#FF994B] rounded-full text-white shadow-lg hover:bg-[#e98840]"
      onClick={onClick}
    >
      <FaChevronRight />
    </button>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="absolute top-[-15px] lg:top-[-40px]  right-14 lg:right-20 p-2 bg-[#FF994B] rounded-full text-white shadow-lg hover:bg-[#e98840]"
      onClick={onClick}
    >
      <FaChevronLeft />
    </button>
  );
}

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
      <div className="mt-20 px-4 md:px-12">
        <h1 className="text-5xl md:text-7xl lg:leading-tight">
          Explore Our <br /> Popular Destination
        </h1>
        <p className="text-lg opacity-50">
          Find your next escape whether it's a cultural city break, a nature
          retreat, or an adventure-filled getaway.
        </p>
      </div>

      <Slider {...settings} className="mt-8">
        {destinations.map((destination) => (
          <div key={destination.id} className="flex justify-center px-2">
            {" "}
            {/* Adjusted padding */}
            <div className="relative w-full max-w-[350px] h-[320px] lg:h-[400px] bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#FF994B] mt-6">
              {" "}
              {/* Using max-width */}
              <img
                src={destination.image}
                alt={destination.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-5">
                <h3 className="text-xl font-bold text-white mb-2">
                  {destination.title}
                </h3>
                <button className="w-full bg-white bg-opacity-30 backdrop-blur-lg text-white px-4 py-2 rounded-xl border-2 border-white flex items-center justify-between hover:bg-opacity-40">
                  <span className="text-left">More Details</span>
                  <GoArrowUpRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default Destination;
