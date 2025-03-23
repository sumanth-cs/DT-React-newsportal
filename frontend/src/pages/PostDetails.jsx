import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react"; 
import { getTimeAgo } from "@/lib/utils"; 

const PostDetails = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();

        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }

        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse flex flex-col space-y-4 w-full max-w-4xl p-6">
          <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
          <div className="h-64 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-2xl">
          Failed to fetch post. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <main className="p-6 flex flex-col items-center min-h-screen bg-cream">
      {/* Back Button */}
      <div className="w-full max-w-4xl mb-6 ">
        <Link to="/">
          <Button variant="ghost" className="flex items-center gap-2 ">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Post Title */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mt-10 max-w-3xl">
        {post.title}
      </h1>

      {/* Category Button */}
      {/* <Link to={`/search?category=${post.category}`} className="mt-6">
        <Button
          variant="outline"
          className="border border-gray-400 bg-gray-300 hover:bg-gray-200 "
        >
          {post.category}
        </Button>
      </Link> */}

      {/* Post Image */}
      <img
        src={post.image}
        alt={post.title}
        className="mt-10 rounded-lg shadow-lg w-full max-w-4xl object-cover max-h-[500px]"
      />

      {/* Post Metadata */}
      <div className="flex justify-end items-center mt-6 w-full max-w-4xl text-sm text-gray-600">
        <span >{getTimeAgo(post.createdAt)}</span> 
      </div>

      {/* Post Content */}
      <div
        className="mt-10 w-full max-w-4xl prose prose-lg prose-blue mb-10"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
    </main>
  );
};

export default PostDetails;
