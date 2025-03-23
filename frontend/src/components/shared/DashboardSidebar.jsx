import React from "react";
import { FaComments, FaSignOutAlt, FaUserAlt, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoIosCreate, IoIosDocument } from "react-icons/io";
import { MdDashboardCustomize } from "react-icons/md";
import { useUser } from "@/context/userContext";

const DashboardSidebar = () => {
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
    <aside className="h-screen w-64 bg-white/70 text-slate-800 flex flex-col items-left shadow-lg">
      {/* Logo/ Header */}
      <div className="p-4 flex items-center justify-center ">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {currentUser && currentUser.isAdmin && (
            <li>
              <Link
                to={"/dashboard?tab=dashboard"}
                className="flex align-bottom gap-3 p-2 hover:bg-amber-100 rounded"
              >
                <MdDashboardCustomize className="text-lg" />
                <span>Dashboard</span>
              </Link>
            </li>
          )}

          <li>
            <Link
              to={"/dashboard?tab=profile"}
              className="flex align-bottom gap-3 p-2 hover:bg-amber-100 rounded"
            >
              <FaUserAlt className="text-lg" />
              <span>Profile</span>
            </Link>
          </li>

          {currentUser && currentUser.isAdmin && (
            <li>
              <Link
                to={"/create-post"}
                className="flex align-bottom gap-3 p-2 hover:bg-amber-100 rounded"
              >
                <IoIosCreate className="text-lg" />
                <span>Create Post</span>
              </Link>
            </li>
          )}

          {currentUser && currentUser.isAdmin && (
            <li>
              <Link
                to={"/dashboard?tab=posts"}
                className="flex align-bottom gap-3 p-2 hover:bg-amber-100 rounded"
              >
                <IoIosDocument className="text-lg" />
                <span>Your articles</span>
              </Link>
            </li>
          )}
        </ul>

        <div className="p-4 border-t border-gray-700">
          <button
            className="flex align-bottom gap-3 w-full p-2 hover:bg-slate-300 rounded"
            onClick={handleSignout}
          >
            <FaSignOutAlt className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
