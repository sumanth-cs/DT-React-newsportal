// import React from "react";
// import { Link } from "react-router-dom";
// import { getTimeAgo } from "@/lib/utils"; 

// const PostCard = ({ post }) => {
//   return (
//     <div className="group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-200">
//       {/* Image Section with Hover Effect */}
//       <Link
//         to={`/post/${post.slug}`}
//         className="block relative h-64 w-full overflow-hidden"
//       >
//         <img
//           src={post.image}
//           alt="post cover"
//           className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//         />
//         {/* Gradient Overlay on Hover */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//       </Link>

//       {/* Content Section */}
//       <div className="p-5 flex flex-col gap-3">
//         {/* Post Title */}
//         <h2 className="text-xl font-bold text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors duration-300">
//           <Link to={`/post/${post.slug}`}>{post.title}</Link>
//         </h2>

//         {/* Post Metadata */}
//         <div className="flex items-center justify-between text-sm text-gray-500">
//           <span className="uppercase tracking-wider">{post.category}</span>
//           <span>{getTimeAgo(post.createdAt)}</span> {/* Add time ago */}
//         </div>

//         {/* Read Article Button */}
//         <Link
//           to={`/post/${post.slug}`}
//           className="mt-4 inline-block w-full text-center px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
//         >
//           Read Article
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PostCard;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getTimeAgo } from "@/lib/utils";
import { 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Mail, 
  Link as LinkIcon,
  X,
  MessageCircle // WhatsApp icon
} from "lucide-react";

const PostCard = ({ post }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: <MessageCircle className="w-5 h-5" />,
      action: () => {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(
            `${post.title} - ${window.location.origin}/post/${post.slug}`
          )}`,
          "_blank"
        );
      },
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      action: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            `${window.location.origin}/post/${post.slug}`
          )}`,
          "_blank"
        );
      },
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            post.title
          )}&url=${encodeURIComponent(
            `${window.location.origin}/post/${post.slug}`
          )}`,
          "_blank"
        );
      },
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      action: () => {
        window.open(
          `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
            `${window.location.origin}/post/${post.slug}`
          )}&title=${encodeURIComponent(post.title)}`,
          "_blank"
        );
      },
    },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      action: () => {
        window.open(
          `mailto:?subject=${encodeURIComponent(
            post.title
          )}&body=Check out this article: ${encodeURIComponent(
            `${window.location.origin}/post/${post.slug}`
          )}`,
          "_blank"
        );
      },
    },
    {
      name: "Copy Link",
      icon: <LinkIcon className="w-5 h-5" />,
      action: () => {
        navigator.clipboard.writeText(
          `${window.location.origin}/post/${post.slug}`
        );
        setShowShareOptions(false);
        alert("Link copied to clipboard!");
      },
    },
  ];

  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-200 relative">
      {/* Share Options Popover */}
      {showShareOptions && (
        <div className="absolute right-2 top-14 z-10 bg-white rounded-lg shadow-xl p-3 w-48">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-gray-800">Share via</h3>
            <button 
              onClick={() => setShowShareOptions(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={option.action}
                className="flex items-center w-full p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                <span className="mr-3">{option.icon}</span>
                {option.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Image Section */}
      <Link
        to={`/post/${post.slug}`}
        className="block relative h-64 w-full overflow-hidden"
      >
        <img
          src={post.image}
          alt="post cover"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full shadow-sm">
          <span className="text-sm font-medium text-gray-800 uppercase tracking-wider">
            {post.category}
          </span>
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-5 flex flex-col gap-3">
        {/* Post Title */}
        <h2 className="text-l font-bold text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors duration-300">
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </h2>

        {/* Post Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{getTimeAgo(post.createdAt)}</span>
          <button 
            onClick={() => setShowShareOptions(!showShareOptions)}
            className="p-2 text-gray-500 hover:text-blue-600 transition-colors relative"
            aria-label="Share options"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Read Article Button */}
        <Link
          to={`/post/${post.slug}`}
          className="mt-4 inline-block w-full text-center px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-[1.02]"
        >
          Read Article
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
