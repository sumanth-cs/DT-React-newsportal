import BottomNavBar from "@/components/shared/BottomNavBar";
// import DashboardPosts from "@/components/shared/DashboardPosts";
import DashboardProfile from "@/components/shared/DashboardProfile";
import DashboardSidebar from "@/components/shared/DashboardSidebar";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CreatePost from "./CreatePost";
import DashboardPosts from "@/components/shared/DashboardPosts";
import CategoryManager from "@/components/shared/CategoryManager";
import NirvanKandEdit from "@/components/shared/NirvanKandEdit";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full">
      {/* Sidebar */}
      <div className="hidden md:block">
        <DashboardSidebar />
      </div>

      <BottomNavBar />

      <div className="w-full">
        {/* profile */}
        {tab === "profile" && <DashboardProfile />}

        {/* create post */}
        {tab === "create-post" && <CreatePost />}

        {/* news articles */}
        {tab === "posts" && <DashboardPosts />}

        {/* manage cateogories */}
        {tab === "manage-categories" && <CategoryManager />}

        {/* Nirvan Kand */}
        {tab === "nirvankand" && <NirvanKandEdit />}
      </div>
    </div>
  );
};

export default Dashboard;
