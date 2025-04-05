import React from 'react';
import { Link } from 'react-router-dom';

const PostThumbnailCard = ({ post }) => {
  return (
    <Link
      to={`/post/${post.slug}`}
      className="block hover:scale-[1.03] hover:cursor-pointer transition-transform duration-300"
    >
      <div className="rounded-s overflow-hidden shadow-md bg-white w-[300px] md:w-[320px]">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-56 object-cover"
        />
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-blue-700">{post.title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default PostThumbnailCard;
