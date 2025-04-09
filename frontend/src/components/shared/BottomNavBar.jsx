import { signOutSuccess } from "@/redux/user/userSlice";
import React from "react";
import { FaHome, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { IoIosCreate, IoIosDocument } from "react-icons/io";
import { Link } from "react-router-dom";
import { useUser } from "@/context/userContext";
import { GrArticle } from "react-icons/gr";
import { BiCategory } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { MdOutlinePermMedia } from "react-icons/md";
import { MdOutlinePostAdd } from "react-icons/md";

const BottomNavBar = () => {
  const { currentUser, signOut } = useUser();

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        signOut();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-200 border-t border-gray-300 p-2 flex justify-around">
      <Link
        to="/dashboard?tab=profile"
        className="flex flex-col items-center justify-center text-slate-800 text-center"
      >
        <FaUserAlt size={20} />
        <span className="text-xs">Profile</span>
      </Link>

      {currentUser && currentUser.isAdmin && (
        <Link
          to="/dashboard?tab=create-post"
          className="flex flex-col items-center justify-center text-slate-800 text-center"
        >
          <IoIosCreate size={20} />
          <span className="text-xs">Create Post</span>
        </Link>
      )}

      {currentUser && currentUser.isAdmin && (
        <Link
          to={"/dashboard?tab=posts"}
          className="flex flex-col items-center justify-center text-slate-800 text-center"
        >
          <GrArticle size={20} />
          <span className="text-xs">Your articles</span>
        </Link>
      )}
      {currentUser && currentUser.isAdmin && (
        <Link
          to={"/dashboard?tab=manage-categories"}
          className="flex flex-col items-center justify-center text-slate-800 text-center" 
        >
          <BiCategory size={20} />
          <span className="text-xs">Manage Categories</span>
        </Link>
      )}
      {currentUser && currentUser.isAdmin && (
        <Link
          to={"/dashboard?tab=nirvankand"}
          className="flex flex-col items-center justify-center text-slate-800 text-center"
        >
          <CiEdit size={20} />
          <span className="text-xs">Edit Nirvan Kand</span>
        </Link>
      )}
      {currentUser && currentUser.isAdmin && (
        <Link
          to={"/dashboard?tab=multimedia"}
          className="flex flex-col items-center justify-center text-slate-800 text-center"
        >
          <MdOutlinePermMedia size={20} />
          <span className="text-xs">Edit Multi-Media</span>
        </Link>
      )}

      <button
        className="flex flex-col items-center justify-center text-slate-800 text-center"
        onClick={handleSignout}
      >
        <FaSignOutAlt size={20} />
        <span className="text-xs">Logout</span>
      </button>
    </nav>
  );
};

export default BottomNavBar;
