import React from "react";
import BackgroundImage from "../assets/Experience.jpg";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    profileImg: "https://via.placeholder.com/50",
    reviewText:
      "Pantai Kuta adalah surga bagi pecinta pantai! Matahari terbenamnya indah, dan suasananya lebih tenang di pagi hari.",
  },
  {
    id: 2,
    name: "Jane Smith",
    profileImg: "https://via.placeholder.com/50",
    reviewText:
      "Borobudur wajib dikunjungi. Arsitektur dan sejarahnya luar biasa, terutama saat matahari terbit. Jangan lupa pakai pakaian nyaman karena ada banyak tangga.",
  },
  {
    id: 3,
    name: "Mike Johnson",
    profileImg: "https://via.placeholder.com/50",
    reviewText:
      "Pemandangan dari Gunung Bromo luar biasa! Trekking menantang tapi sepadan, apalagi saat matahari terbit. Pastikan memakai jaket, karena dingin di pagi hari.",
  },
  {
    id: 4,
    name: "Emily Brown",
    profileImg: "https://via.placeholder.com/50",
    reviewText:
      "Labuan Bajo benar-benar unik. Snorkeling di Komodo luar biasa, dan Pantai Pink memukau. Island-hopping juga menyenangkan.",
  },
  {
    id: 5,
    name: "Chris Wilson",
    profileImg: "https://via.placeholder.com/50",
    reviewText:
      "Raja Ampat adalah impian pecinta alam. Snorkeling dan diving sangat direkomendasikan. Meskipun biayanya mahal, keindahannya sepadan.",
  },
  {
    id: 6,
    name: "Anna Lee",
    profileImg: "https://via.placeholder.com/50",
    reviewText:
      "Danau Toba luar biasa. Udara segar dan danau luasnya menenangkan. Pulau Samosir juga indah, cocok untuk bersantai.",
  },
];

function Experience() {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center flex flex-col items-center text-white px-8 py-2 overflow-hidden"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
      id="experience"
    >
      {/* Text Section */}
      <div className="mt-20 items-center px-4 md:px-12 text-center">
        <h1 className="text-5xl font-primary text-black font-thin md:text-7xl lg:leading-tight lg:tracking-[15px]">
          Our Customers{" "}
          <span className="font-secondary font-normal text-[#00B7FF]">
            Experience
          </span>
        </h1>
        <p className="text-lg text-black opacity-50">
          Hear from Our Happy Travelers: Real Stories, Real Adventures
        </p>
      </div>

      {/* Review Cards */}
      <div className="mt-10 grid gap-14 grid-cols-1 md:grid-cols-3 px-4 md:px-12">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white text-black p-6 rounded-lg shadow-2xl flex flex-col justify-between md:w-[380px] h-56 overflow-hidden"
          >
            {/* Review Text */}
            <p className="text-sm opacity-75 mb-4 text-justify italic">
              "{review.reviewText}"
            </p>

            {/* Profile Section */}
            <div className="flex items-center mt-auto">
              <img
                src={review.profileImg}
                alt={`${review.name}'s profile`}
                className="w-12 h-12 rounded-full mr-4 object-cover"
                style={{ minWidth: "3rem", minHeight: "3rem" }}
              />
              <h3 className="text-lg font-semibold">{review.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;
