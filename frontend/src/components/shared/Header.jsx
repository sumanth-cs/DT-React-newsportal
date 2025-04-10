import React, { useState, useEffect, useRef } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaBars,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { GiByzantinTemple } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import logo from "../../assets/logo1.png";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { currentUser, signOut } = useUser();
  const [categories, setCategories] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const email = "thedharmtantra@gmail.com";
  const navRef = useRef(null);

  const handleEmailClick = () => {
    window.open(`mailto:${email}`, "_blank");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const isActive = (path) => {
    return location.pathname === path
      ? "text-blue-600 font-medium"
      : "text-gray-700 hover:text-blue-500";
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollLeft = () => {
    if (navRef.current) {
      navRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (navRef.current) {
      navRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // useEffect(() => {
  //   if (mobileMenuOpen) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "";
  //   }
  // }, [mobileMenuOpen]);

  return (
    <header className="overflow-x-hidden sticky top-0 z-50">
      {/* First Header: Email and Social Icons */}
      <div className="bg-black/90 py-1 hidden sm:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div
              className="flex items-center gap-2 text-cream cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleEmailClick}
            >
              <MdEmail className="w-5 h-5" />
              <p
                className={`transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                {email}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link to={"/nirvankand"}>
                <GiByzantinTemple className="w-8 h-8 text-cream hover:text-amber-600 hover:scale-110 transition-all duration-300 ease-in-out" />
              </Link>
            </div>

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
      <div className="bg-darkYellow shadow-lg sticky top-0 z-50 w-full">
        <div className="container mx-auto px-4 h-full">
          <nav className="flex justify-between items-center h-18">
            {/* Logo */}
            <Link to={"/"} className="text-2xl font-bold shrink-0">
              <img
                src={logo}
                alt="DharmTantra"
                className="w-18 h-16 md:w-20 md:h-20"
              />
            </Link>

            {/* Desktop Navigation (≥768px) */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex space-x-6 text-lg font-semibold">
                <Link
                  to="/"
                  className={`${isActive(
                    "/"
                  )} transition-transform hover:-translate-y-1 duration-300`}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className={`${isActive(
                    "/about"
                  )} transition-transform hover:-translate-y-1 duration-300`}
                >
                  About
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category._id}
                    to={`/category/${category.slug}`}
                    className={`${isActive(
                      `/category/${category.slug}`
                    )} transition-transform hover:-translate-y-1 duration-300`}
                  >
                    {category.name}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  className={`${isActive(
                    "/contact"
                  )} transition-transform hover:-translate-y-1 duration-300`}
                >
                  Contact Us
                </Link>
              </div>

              {/* Desktop Profile Dropdown */}
              {currentUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="ml-4 cursor-pointer">
                      <img
                        src={currentUser.profilePicture}
                        alt="user photo"
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-60">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-400" />
                    <DropdownMenuItem className="block font-semibold text-sm">
                      <div className="flex flex-col gap-1">
                        <span>username: {currentUser.username}</span>
                        <span>email: {currentUser.email}</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="font-semibold mt-2">
                      <Link
                        to="/dashboard?tab=profile"
                        className="w-full h-full block p-2"
                      >
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="font-semibold mt-2 cursor-pointer"
                      onClick={signOut}
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to={"/sign-in"} className="ml-4">
                  <Button>Sign In</Button>
                </Link>
              )}
            </div>

            {/* Tablet Navigation (640px-767px) */}
            <div className="hidden sm:flex md:hidden items-center gap-4">
              {/* Navigation Scroller */}
              <div className="flex items-center">
                <button
                  onClick={scrollLeft}
                  className="text-gray-700 hover:text-blue-500 p-1 shrink-0"
                >
                  <FaChevronLeft />
                </button>

                <div
                  ref={navRef}
                  className="flex overflow-x-auto scrollbar-hide space-x-2 mx-1 py-2 max-w-[240px]"
                >
                  <Link
                    to="/"
                    className={`${isActive(
                      "/"
                    )} whitespace-nowrap px-3 py-1 rounded text-sm`}
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className={`${isActive(
                      "/about"
                    )} whitespace-nowrap px-3 py-1 rounded text-sm`}
                  >
                    About
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category._id}
                      to={`/category/${category.slug}`}
                      className={`${isActive(
                        `/category/${category.slug}`
                      )} whitespace-nowrap px-3 py-1 rounded text-sm`}
                    >
                      {category.name}
                    </Link>
                  ))}
                  <Link
                    to="/contact"
                    className={`${isActive(
                      "/contact"
                    )} whitespace-nowrap px-3 py-1 rounded text-sm`}
                  >
                    Contact
                  </Link>
                </div>

                <button
                  onClick={scrollRight}
                  className="text-gray-700 hover:text-blue-500 p-1 shrink-0"
                >
                  <FaChevronRight />
                </button>
              </div>

              {/* Tablet Profile Dropdown */}
              {currentUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="ml-2 cursor-pointer shrink-0">
                      <img
                        src={currentUser.profilePicture}
                        alt="user photo"
                        className="w-8 h-8 rounded-full"
                      />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-400" />
                    <DropdownMenuItem className="text-sm">
                      <div className="flex flex-col gap-1">
                        <span>username: {currentUser.username}</span>
                        <span>email: {currentUser.email}</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        to="/dashboard?tab=profile"
                        className="w-full h-full block p-2"
                      >
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={signOut}
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to={"/sign-in"} className="ml-2 shrink-0">
                  <Button size="sm">Sign In</Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button (<640px) */}
            <div className="sm:hidden flex items-center gap-3">
              {currentUser && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="cursor-pointer">
                      <img
                        src={currentUser.profilePicture}
                        alt="user photo"
                        className="w-8 h-8 rounded-full"
                      />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-400" />
                    <DropdownMenuItem className="text-sm">
                      <div className="flex flex-col gap-1">
                        <span>username: {currentUser.username}</span>
                        <span>email: {currentUser.email}</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        to="/dashboard?tab=profile"
                        className="w-full h-full block p-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }}
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <button
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-blue-500 focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <FaTimes className="w-6 h-6" />
                ) : (
                  <FaBars className="w-6 h-6" />
                )}
              </button>
            </div>
          </nav>

          {/* Mobile Menu (<640px) */}
          <div
            className={`sm:hidden ${
              mobileMenuOpen ? "max-h-screen" : "max-h-0"
            } overflow-hidden transition-all duration-300 ease-in-out`}
          >
            <div className="flex flex-col space-y-3 py-4 text-lg font-semibold overflow-y-auto max-h-[70vh]">
              <Link
                to="/"
                className={`${isActive("/")} py-2 px-4`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`${isActive("/about")} py-2 px-4`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              {categories.map((category) => (
                <Link
                  key={category._id}
                  to={`/category/${category.slug}`}
                  className={`${isActive(
                    `/category/${category.slug}`
                  )} py-2 px-4`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className={`${isActive("/contact")} py-2 px-4`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
              {!currentUser && (
                <Link
                  to="/sign-in"
                  className="py-2 px-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
