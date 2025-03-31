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
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import Button from "@/components/ui/button";
// import { signOutSuccess } from "@/redux/user/userSlice"

const Header = () => {
  // const dispatch = useDispatch()
  // const { currentUser } = useSelector((state) => state.user);

  // const handleSignout = async () => {
  //   try {
  //     const res = await fetch("/api/user/signout", {
  //       method: "POST",
  //     })

  //     const data = await res.json()

  //     if (!res.ok) {
  //       console.log(data.message)
  //     } else {
  //       dispatch(signOutSuccess())
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // Category list
  // const categories = [
  //   { id: 1, name: "Sports", path: "/category/sports" },
  //   { id: 2, name: "Entertainment", path: "/category/entertainment" },
  //   { id: 3, name: "Politics", path: "/category/politics" },
  //   { id: 4, name: "Business", path: "/category/business" },
  //   { id: 5, name: "COVID-19", path: "/category/covid-19" },
  //   { id: 6, name: "Consumer", path: "/category/consumer" },
  //   { id: 7, name: "Tech News", path: "/category/tech-news" },
  //   { id: 8, name: "General", path: "/category/general" },
  // ];

  const [categories, setCategories] = useState([]);
  const location = useLocation();

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
  return (
    <header>
      {/* First Header: Email and Social Icons */}
      <div className="bg-black/90 py-2 hidden sm:block">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            {/* Email Section */}
            <div className="flex items-center gap-2 text-cream">
              <MdEmail className="w-5 h-5" />
              <p>
                {/* email: <b>thedharmtantra@gmail.com</b> */}
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
      <div className="bg-darkYellow shadow-lg sticky top-0 z-50">
        <nav className="container mx-auto flex justify-between items-center py-2 ">
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
          {/* <div className="hidden sm:flex space-x-6 text-lg font-semibold">
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
          {/* <div className="hidden sm:block">
            <Link to="/search">
              <FaSearch className="text-black hover:text-black transition duration-300 w-5 h-5" />
            </Link>
          </div> */}

          <header className="bg-darkYellow ">
            <div className="container mx-auto px-4 py-3 hidden sm:flex space-x-6 text-lg font-semibold">
              <nav className="flex items-center space-x-6">
                {/* Static Links */}
                <Link to="/" className={`${isActive("/")} transition-transform hover:-translate-y-1 duration-300`}>
                  Home
                </Link>
                <Link
                  to="/about"
                  className={`${isActive("/about")} transition-transform hover:-translate-y-1 duration-300`}
                >
                  About
                </Link>

                {/* Dynamic Categories */}
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
                  className={`${isActive("/contact")} transition-transform hover:-translate-y-1 duration-300`}
                >
                  Contact Us
                </Link>
              </nav>
            </div>
          </header>

          {/* User Profile Dropdown */}
          {/* {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div>
                  <img
                    src={currentUser.profilePicture}
                    alt="user photo"
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-60">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-gray-400" />

                <DropdownMenuItem className="block font-semibold text-sm">
                  <div className="flex flex-col gap-1">
                    <span>@{currentUser.username}</span>
                    <span>@{currentUser.email}</span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem className="font-semibold mt-2">
                  <Link to="/dashboard?tab=profile">Profile</Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="font-semibold mt-2" onClick={handleSignout}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to={"/sign-in"}>
              <Button>Sign In</Button>
            </Link>
          )} */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
