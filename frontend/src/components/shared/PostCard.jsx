import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTimeAgo } from "@/lib/utils";
import { Share2, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
// import { SiGmail } from "react-icons/si";
import { FaLink } from "react-icons/fa";

const PostCard = ({ post }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareRef = useRef(null);
  const authorName = post?.authorName || "Admin";
  const authorPhoto = post?.authorPhoto;
  const authorInitial = authorName?.charAt(0)?.toUpperCase() || "A";

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="w-5 h-5" />,
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
      icon: <FaFacebook className="w-5 h-5" />,
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
      icon: <FaXTwitter className="w-5 h-5" />,
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
      icon: <FaLinkedin className="w-5 h-5" />,
      action: () => {
        window.open(
          `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
            `${window.location.origin}/post/${post.slug}`
          )}&title=${encodeURIComponent(post.title)}`,
          "_blank"
        );
      },
    },
    // {
    //   name: "Email",
    //   icon: <SiGmail className="w-5 h-5" />,
    //   action: () => {
    //     const emailUrl = `mailto:?subject=${encodeURIComponent(
    //       `Check out: ${post.title}`
    //     )}&body=${encodeURIComponent(
    //       `I found this interesting article and thought you might like it:\n\n` +
    //         `${post.title}\n\n` +
    //         `Read it here: ${window.location.origin}/post/${post.slug}\n\n` +
    //         `Enjoy!`
    //     )}`;
    //     window.location.href = emailUrl;
    //   },
    
    {
      name: "Copy Link",
      icon: <FaLink className="w-5 h-5" />,
      action: () => {
        navigator.clipboard.writeText(
          `${window.location.origin}/post/${post.slug}`
        );
        setShowShareOptions(false);
        alert("Link copied to clipboard!");
      },
    },
  ];

  // Close share options when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShowShareOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-200 relative">
      {/* Share Options Popover */}
      {showShareOptions && (
        <div
          ref={shareRef}
          className="absolute right-2 top-14 z-50 bg-white rounded-lg shadow-xl p-3 w-48"
        >
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
        <h2 className="text-xl font-bold text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors duration-300">
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </h2>

        {/* Post Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="text-xs text-gray-500">
            {getTimeAgo(post.createdAt)}
          </span>
          <button
            onClick={() => setShowShareOptions(!showShareOptions)}
            className="p-2 text-gray-500 hover:text-blue-600 transition-colors relative"
            aria-label="Share options"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Author Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {authorPhoto ? (
              <img
                src={authorPhoto}
                alt={authorName}
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-xs font-medium">{authorInitial}</span>
              </div>
            )}
            {/* <span className="text-xs text-gray-600">{authorName}</span> */}
          </div>
        </div>

        {/* Read Article Button */}
        <Link
          to={`/post/${post.slug}`}
          className="mt-2 inline-block w-full text-center px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-darkYellow hover:text-black transition-colors duration-300 transform hover:scale-[1.02]"
        >
          Read Article
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
