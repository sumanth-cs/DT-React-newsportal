import React from "react";
import { Link } from "react-router-dom";
import { getTimeAgo } from "@/lib/utils"; 

const PostCard = ({ post }) => {
  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-200">
      {/* Image Section with Hover Effect */}
      <Link
        to={`/post/${post.slug}`}
        className="block relative h-64 w-full overflow-hidden"
      >
        <img
          src={post.image}
          alt="post cover"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>

      {/* Content Section */}
      <div className="p-5 flex flex-col gap-3">
        {/* Post Title */}
        <h2 className="text-xl font-bold text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors duration-300">
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </h2>

        {/* Post Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="uppercase tracking-wider">{post.category}</span>
          <span>{getTimeAgo(post.createdAt)}</span> {/* Add time ago */}
        </div>

        {/* Read Article Button */}
        <Link
          to={`/post/${post.slug}`}
          className="mt-4 inline-block w-full text-center px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
        >
          Read Article
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
