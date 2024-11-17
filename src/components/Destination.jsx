import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoArrowUpRight } from "react-icons/go";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaMapMarkerAlt,
  FaPlaneDeparture,
} from "react-icons/fa";

import Card1 from "../assets/Borobudur.jpg";
import Card2 from "../assets/prambanan.jpg";
import Card3 from "../assets/Bromo.jpg";
import Card4 from "../assets/Danau Toba.jpg";
import Card5 from "../assets/Bali.jpg";
import Card6 from "../assets/Labuan bajo.jpeg";
import Card7 from "../assets/Pulau Komodo.jpg";
import Card8 from "../assets/Raja Ampat.jpeg";
import Card9 from "../assets/pulau derawan.jpg";
import Card10 from "../assets/Wakatobi.jpg";

const settings = {
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
  {
    id: 1,
    image: Card1,
    title: "Candi Borobudur",
    description:
      "Candi Borobudur, yang terletak di Magelang, Jawa Tengah, Indonesia, adalah candi Buddha terbesar dan salah satu situs warisan dunia UNESCO. Dibangun pada abad ke-9 oleh dinasti Syailendra, candi ini terdiri dari sembilan tingkat dengan lebih dari 2.600 relief yang menggambarkan ajaran Buddha. Candi Borobudur tidak hanya dikenal karena arsitekturnya yang megah, tetapi juga sebagai tempat ziarah spiritual.",
    location: "Jawa Tengah",
  },
  {
    id: 2,
    image: Card2,
    title: "Candi Prambanan",
    description:
      "Candi Prambanan, yang terletak di Yogyakarta, Indonesia, adalah kompleks candi Hindu terbesar di Indonesia dan salah satu situs warisan dunia UNESCO. Dibangun pada abad ke-9 oleh Raja Rakai Pikatan, candi ini didedikasikan untuk Trimurti, yaitu Dewa Brahma, Wisnu, dan Siwa. Keindahan arsitektur dan relief-reliefnya yang menggambarkan kisah epik Ramayana menjadikannya destinasi budaya yang penting, serta menjadi simbol kejayaan kerajaan Mataram Kuno.",
    location: "Yogyakarta",
  },
  {
    id: 3,
    image: Card3,
    title: "Bromo",
    description:
      "Gunung Bromo, yang terletak di Jawa Timur, Indonesia, adalah salah satu gunung berapi paling terkenal di dunia. Terletak di dalam Taman Nasional Bromo Tengger Semeru, gunung ini memiliki kawah aktif yang mengeluarkan asap dan uap. Gunung Bromo dianggap suci oleh suku Tengger yang tinggal di sekitarnya. Selain keindahan alamnya, Bromo juga menjadi destinasi wisata populer, dengan pemandangan matahari terbit yang memukau dan trek petualangan di sekitarnya.",
    location: "Jawa Timur",
  },
  {
    id: 4,
    image: Card4,
    title: "Danau Toba",
    description:
      "Danau Toba, yang terletak di Sumatera Utara, Indonesia, adalah danau vulkanik terbesar di dunia, terbentuk akibat letusan supervulkan sekitar 74.000 tahun lalu. Dikelilingi pegunungan hijau, danau ini menawarkan pemandangan alam yang memukau. Di tengahnya terdapat Pulau Samosir, yang kaya akan budaya Batak. Danau Toba menjadi destinasi wisata utama, menggabungkan keindahan alam dan sejarah geologis yang luar biasa, serta budaya lokal yang kental.",
    location: "Sumatera Utara",
  },
  {
    id: 5,
    image: Card5,
    title: "Bali",
    description:
      "Bali adalah pulau tropis di Indonesia yang dikenal dengan keindahan alam, budaya, dan pantainya. Sejak abad ke-10, Bali telah menjadi pusat seni dan budaya Hindu di Indonesia. Selain wisata pantai yang populer seperti Kuta dan Nusa Dua, Bali juga terkenal dengan pura-pura bersejarah seperti Pura Tanah Lot dan Pura Besakih, serta keindahan alam di Ubud.",
    location: "Bali",
  },
  {
    id: 6,
    image: Card6,
    title: "Labuan Bajo",
    description:
      "Labuan Bajo, yang terletak di ujung barat Pulau Flores, Nusa Tenggara Timur, Indonesia, adalah pintu gerbang menuju Taman Nasional Komodo. Kota kecil ini terkenal dengan keindahan alamnya, termasuk pantai-pantai yang eksotis, pulau-pulau tropis, dan kehidupan laut yang kaya. Selain sebagai titik akses untuk melihat komodo, Labuan Bajo juga populer untuk aktivitas menyelam, trekking, dan wisata alam lainnya, menjadikannya tujuan wisata yang semakin digemari di Indonesia.",
    location: "Nusa Tenggara Timur",
  },
  {
    id: 7,
    image: Card7,
    title: "Pulau Komodo",
    description:
      "Pulau Komodo terletak di Nusa Tenggara Timur, Indonesia, dan terkenal sebagai rumah bagi komodo, reptil terbesar di dunia. Pulau ini menjadi bagian dari Taman Nasional Komodo yang didirikan pada tahun 1980 untuk melindungi komodo dan habitatnya. Selain itu, pulau ini memiliki pemandangan alam yang memukau dan merupakan situs warisan dunia UNESCO.",
    location: "Nusa Tenggara Timur",
  },
  {
    id: 8,
    image: Card8,
    title: "Raja Ampat",
    description:
      "Raja Ampat terletak di Papua Barat, Indonesia, dan dikenal dengan keanekaragaman hayati lautnya yang luar biasa. Kepulauan ini merupakan bagian dari segitiga terumbu karang dunia dan memiliki sejarah sebagai kawasan yang kaya akan budaya asli Papua. Raja Ampat juga dikenal sebagai situs penyelaman terbaik dunia, menawarkan pemandangan alam yang spektakuler dan kehidupan laut yang melimpah.",
    location: "Papua Barat",
  },
  {
    id: 9,
    image: Card9,
    title: "Pulau Derawan",
    description:
      "Pulau Derawan, yang terletak di Kalimantan Timur, Indonesia, adalah destinasi wisata tropis yang terkenal dengan keindahan alam bawah lautnya. Pulau ini dikelilingi oleh terumbu karang yang kaya akan keanekaragaman hayati, menjadikannya tempat yang populer untuk menyelam dan snorkeling. Derawan juga memiliki pantai-pantai indah, dan merupakan rumah bagi berbagai spesies langka, seperti penyu hijau dan dugong. Keindahan alamnya yang mempesona serta kedamaian pulau menjadikannya tempat ideal untuk liburan.",
    location: "Kalimantan Timur",
  },
  {
    id: 10,
    image: Card10,
    title: "Wakatobi",
    description:
      "Wakatobi, yang terletak di Sulawesi Tenggara, Indonesia, adalah salah satu destinasi penyelaman terbaik di dunia. Nama Wakatobi berasal dari gabungan empat pulau utama: Wangi-Wangi, Kaledupa, Tomia, dan Binongko. Dikenal dengan terumbu karangnya yang luar biasa, Wakatobi menawarkan keanekaragaman hayati laut yang memukau dan perairan yang jernih. Sebagai bagian dari Segitiga Terumbu Karang, Wakatobi menjadi surga bagi para penyelam dan pecinta alam bawah laut.",
    location: "Sulawesi Tenggara",
  },
];

function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="absolute top-[-25px] lg:top-[-40px] right-3 lg:right-8 p-2 bg-[#FF994B] rounded-full text-white shadow-lg hover:bg-[#e98840]"
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
      className="absolute top-[-25px] lg:top-[-40px] right-14 lg:right-20 p-2 bg-[#FF994B] rounded-full text-white shadow-lg hover:bg-[#e98840]"
      onClick={onClick}
    >
      <FaChevronLeft />
    </button>
  );
}

function Modal({ destination, onClose }) {
  const navigate = useNavigate();

  const handleBookFlight = () => {
    navigate("/flight");
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ease-in-out"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 lg:p-6 rounded-lg w-4/5 lg:w-2/4 flex flex-col md:flex-row relative transform transition-transform duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 lg:top-3 right-3 text-[#FF994B] hover:text-[#e98840]"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        {/* Bagian Gambar */}
        <img
          src={destination.image}
          alt={destination.title}
          className="w-full md:w-[300px] h-[200px] lg:h-[400px] object-cover rounded-lg mb-4 md:mb-0 border-2 border-[#FF994B]"
        />

        {/* Bagian Deskripsi */}
        <div className="md:ml-6 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-normal mb-1">{destination.title}</h2>
            <div className="flex items-center text-gray-600 mb-1 lg:mb-4">
              <FaMapMarkerAlt className="mr-2 text-[#FF994B]" />
              <span>{destination.location}</span>
            </div>
            <p className="text-gray-700 text-justify lg:px-3">
              {destination.description}
            </p>
          </div>

          <button
            onClick={handleBookFlight}
            className="mt-4 bg-[#FF994B] text-white py-2 px-4 rounded-lg hover:bg-[#e98840] flex items-center justify-center w-[200px] mx-auto"
          >
            Book Flight
            <FaPlaneDeparture className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Destination() {
  const [selectedDestination, setSelectedDestination] = useState(null);

  return (
    <section
      className="relative min-h-screen flex flex-col text-black px-8 py-2"
      id="destination"
    >
      <div className="mt-20 px-4 md:px-12">
        <h1 className="text-5xl font-primary font-normal md:text-7xl md:leading-tight">
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
            <div className="relative w-[300px] h-[350px] lg:h-[400px] bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#FF994B] m-4 mx-auto">
              <img
                src={destination.image}
                alt={destination.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-5">
                <h3 className="text-xl font-bold text-white mb-2">
                  {destination.title}
                </h3>
                <button
                  onClick={() => setSelectedDestination(destination)}
                  className="w-full bg-white bg-opacity-30 backdrop-blur-lg text-white px-4 py-2 rounded-xl border-2 border-white flex items-center justify-between hover:bg-opacity-40"
                >
                  <span className="text-left">More Details</span>
                  <GoArrowUpRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {selectedDestination && (
        <Modal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
        />
      )}
    </section>
  );
}

export default Destination;
