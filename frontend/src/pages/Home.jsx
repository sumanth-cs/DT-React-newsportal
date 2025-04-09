import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Clock, Video } from "lucide-react";
import PostCard from "@/components/shared/PostCard";
import NewsBanner from "@/components/shared/NewsBanner";
import HorizontalScroller from "@/components/shared/HorizontalScroller";
import { useUser } from "@/context/userContext";
import { FaFire } from "react-icons/fa";
import NewsListSection from "@/components/shared/NewsListSection";
import MultimediaSection from "@/components/shared/MultimediaSection";

const Home = () => {
  const { currentUser } = useUser();

  const [posts, setPosts] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [res, trendingRes, featuredRes] = await Promise.all([
          fetch("/api/posts/?limit=6"),
          fetch("/api/posts/?sort=views&limit=4"),
          fetch("/api/posts/?featured=true&limit=6"),
        ]);

        const [data, trendingData, featuredData] = await Promise.all([
          res.json(),
          trendingRes.json(),
          featuredRes.json(),
        ]);

        if (res.ok) setPosts(data.posts);
        if (trendingRes.ok) setTrendingPosts(trendingData.posts);
        if (featuredRes.ok) setFeaturedPosts(featuredData.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await fetch(`/api/posts/?userId=${currentUser._id}`);
        const data = await res.json();

        if (res.ok) {
          setUserPosts(Array.isArray(data) ? data : []);
          if (Array.isArray(data) && data.length < 9) setShowMore(false);
        }
      } catch (error) {
        console.log("Error fetching posts:", error);
        setUserPosts([]);
      }
    };

    if (currentUser?.isAdmin) {
      fetchUserPosts();
    }
  }, [currentUser?._id]);

  const handleShowMore = async () => {
    try {
      const startIndex = userPosts.length;
      const res = await fetch(
        `/api/posts/?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();

      if (res.ok && Array.isArray(data)) {
        setUserPosts((prev) => [...prev, ...data]);
        if (data.length < 1) setShowMore(false);
      }
    } catch (error) {
      console.log("Error loading more posts:", error);
    }
  };

  return (
    <div className="bg-darkBrown">
      {/* Hero Section */}
      <div className="relative h-[30px] flex items-center justify-center bg-cover bg-center">
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="relative text-center text-white max-w-4xl p-4">
          <p className="text-l font-bold ">
            Welcome to <span className="text-yellow-400">DharmTantra</span>
          </p>
        </div>
      </div>

      {/* News Banner */}
      <div className="flex items-center justify-center bg-cream">
        <NewsBanner newsItems={featuredPosts} />
      </div>

      {/* Trending News */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <TrendingUp className="w-8 h-8" /> Trending News
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Horizontal Scroller Pick for you */}
      <section className="py-6 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center align-middle gap-2">
            <FaFire className="w-8 h-8 flex align-center" /> Pick for You
          </h2>
          <HorizontalScroller />
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Featured Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-3">
                    {post.description}
                  </p>
                  <Link
                    to={`/post/${post.slug}`}
                    className="mt-4 inline-block text-amber-600 hover:underline"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <NewsListSection />
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <Clock className="w-8 h-8" /> Recent Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
          <div className="mt-8 text-center">
            {showMore && (
              <button
                onClick={handleShowMore}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full"
              >
                View More Posts
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Multimedia Section */}
      {/* <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <Video className="w-8 h-8" /> Multimedia
          </h2> */}

      {/* YouTube Videos */}
      {/* <div className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              YouTube Videos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title={`Video ${i + 1}`}
                    className="w-full h-48"
                    allowFullScreen
                  ></iframe>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                      Video Title
                    </h4>
                    <p className="text-gray-600">
                      Watch this exciting video about the latest news.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

      {/* Reels Section */}
      {/* <div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Reels</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center"
                >
                  <video
                    className="w-full h-72 object-cover"
                    controls
                    loop
                    muted
                  >
                    <source
                      src="https://www.w3schools.com/html/mov_bbb.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  <div className="p-4 text-center">
                    <h5 className="font-semibold text-gray-800">
                      Reel {i + 1}
                    </h5>
                    <p className="text-sm text-gray-500">
                      Short vertical content
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}
      {/* Multimedia Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <MultimediaSection />
        </div>
      </section>
    </div>
  );
};

export default Home;
