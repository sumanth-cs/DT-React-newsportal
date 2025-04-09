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
import AddMediaForm from "@/components/shared/AddMediaForm";

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
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:block h-full">
        <DashboardSidebar />
      </div>

      <BottomNavBar />

      <div className="flex-1 overflow-y-auto p-6 ">
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

        {/* Multi Media */}
        {tab === "multimedia" && <AddMediaForm />}
      </div>
    </div>
  );
};

export default Dashboard;
