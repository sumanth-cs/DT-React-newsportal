import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, TrendingUp, Video, Mail } from "lucide-react"; // Icons for sections
import PostCard from "@/components/shared/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch recent posts
        const res = await fetch("/api/post/getPosts?limit=6");
        const data = await res.json();
        if (res.ok) setPosts(data.posts);

        // Fetch trending posts
        const trendingRes = await fetch(
          "/api/post/getPosts?sort=views&limit=4"
        );
        const trendingData = await trendingRes.json();
        if (trendingRes.ok) setTrendingPosts(trendingData.posts);

        // Fetch featured posts
        const featuredRes = await fetch(
          "/api/post/getPosts?featured=true&limit=3"
        );
        const featuredData = await featuredRes.json();
        if (featuredRes.ok) setFeaturedPosts(featuredData.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-darkBrown">
      {/* Hero Section */}
      <div className="relative h-[30px] flex items-center justify-center bg-cover bg-center">
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="relative text-center text-white max-w-4xl p-4">
          <p  className="text-l font-bold ">
            Welcome to <span className="text-yellow-400">DharmTantra</span>
          </p>
        </div>
      </div>

      {/* Trending News Section */}
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

      {/* Featured Stories Section */}
      <section className="py-16 bg-sageGreen">
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
                    className="mt-4 inline-block text-blue-600 hover:underline"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <Clock className="w-8 h-8" /> Recent Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
          {/* <div className="mt-8 text-center">
            <Link to="/search">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full">
                View All Posts
              </Button>
            </Link>
          </div> */}
        </div>
      </section>

      {/* Multimedia Section */}
      <section className="py-16 bg-sageGreen">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <Video className="w-8 h-8" /> Multimedia
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Multimedia"
                className="w-full h-48"
                allowFullScreen
              ></iframe>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Video Title
                </h3>
                <p className="text-gray-600">
                  Watch this exciting video about the latest news.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Multimedia"
                className="w-full h-48"
                allowFullScreen
              ></iframe>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Video Title
                </h3>
                <p className="text-gray-600">
                  Watch this exciting video about the latest news.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Multimedia"
                className="w-full h-48"
                allowFullScreen
              ></iframe>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Video Title
                </h3>
                <p className="text-gray-600">
                  Watch this exciting video about the latest news.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
