import React from "react";
import {
  FaSearch,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa"; // Import icons from React Icons
import { MdEmail } from "react-icons/md"; // Material Icons
import logo from "../../assets/logo.png"; // Import logo image
import { Link } from "react-router-dom";

const Header = () => {
  // Category list
  const categories = [
    { id: 1, name: "Sports", path: "/category/sports" },
    { id: 2, name: "Entertainment", path: "/category/entertainment" },
    { id: 3, name: "Politics", path: "/category/politics" },
    { id: 4, name: "Business", path: "/category/business" },
    { id: 5, name: "COVID-19", path: "/category/covid-19" },
    { id: 6, name: "Consumer", path: "/category/consumer" },
    { id: 7, name: "Tech News", path: "/category/tech-news" },
    { id: 8, name: "General", path: "/category/general" },
  ];

  return (
    <header>
      {/* First Header: Email and Social Icons */}
      <div className="bg-darkBrown py-2 hidden sm:block">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            {/* Email Section */}
            <div className="flex items-center gap-2 text-cream">
              <MdEmail className="w-5 h-5" />
              <p>
                email: <strong>thedharmtantra@gmail.com</strong>
              </p>
            </div>

            {/* Social Icons Section */}
            <div className="flex space-x-4">
              <Link
                target="_blank"
                to={"https://www.facebook.com/profile.php?id=100091958152381"}
                className="text-cream hover:text-[#3b5998] hover:rotate-12 hover:scale-110 transition-all duration-300 ease-in-out"
              >
                <FaFacebook className="w-5 h-5" />
              </Link>

              <Link
                target="_blank"
                to={"https://x.com/Dharmtantratv?t=9kMzqLeAC-67zMBhczaSeA&s=09"}
                className="text-cream hover:text-[#1da1f2] hover:rotate-12 hover:scale-110 transition-all duration-300 ease-in-out"
              >
                <FaTwitter className="w-5 h-5" />
              </Link>

              <Link
                target="_blank"
                to="https://www.instagram.com/dharmtantratv?igsh=bm4zNWxweXBvYjZs"
                className="text-cream hover:text-[#c32aa3] hover:rotate-12 hover:scale-110 transition-all duration-300 ease-in-out"
              >
                <FaInstagram className="w-5 h-5" />
              </Link>

              <Link
                target="_blank"
                to="#"
                className="text-cream hover:text-[#0077b5] hover:rotate-12 hover:scale-110 transition-all duration-300 ease-in-out"
              >
                <FaLinkedin className="w-5 h-5" />
              </Link>

              <Link
                target="_blank"
                to="https://youtube.com/@dharmtantra?si=SXpRJvHyQkDknK7I"
                className="text-cream hover:text-[#ff0000] hover:rotate-12 hover:scale-110 transition-all duration-300 ease-in-out"
              >
                <FaYoutube className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>


      {/* Second Header: Navigation Bar */}
      <div className="bg-darkYellow">
        <nav className="container mx-auto flex justify-between items-center py-2">
          {/* Logo */}
          <Link to={"/"} className="text-4xl font-bold">
            <img src={logo} alt="DharmTantra" className="w-25 h-25" />
          </Link>

          {/* Mobile Toggle Button */}
          <button className="block sm:hidden">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>

          {/* Navigation Links */}
          <div className="hidden sm:flex space-x-6 text-lg">
            <Link
              to="/"
              className=" text-black hover:-translate-y-1 hover:scale-105 transition-transform duration-300"
            >
              Home
            </Link>
            <Link
              to="/about"
              className=" text-black hover:-translate-y-1 hover:scale-105 transition-transform duration-300"
            >
              About
            </Link>
            <Link
              to="/contact"
              className=" text-black hover:-translate-y-1 hover:scale-105 transition-transform duration-300 "
            >
              Contact
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                to={category.path}
                className=" text-black hover:-translate-y-1 hover:scale-105 transition-transform duration-300"
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Search Icon */}
          <div className="hidden sm:block">
            <Link to="/search">
              <FaSearch className="text-black hover:text-black transition duration-300 w-5 h-5" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
