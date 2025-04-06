import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

const NewsListCard = ({ post }) => {
  const { title, content, image, slug, createdAt } = post;
  return (
    <Link
      to={`/post/${slug}`}
      className="flex w-full items-start gap-4 border-b p-4 rounded-lg bg-white hover:bg-gray-50 transition-all group"
    >
      <img
        src={image}
        alt={title}
        className="w-32 md:w-42 h-32 object-cover flex-shrink-0 rounded"
      />
      <div className="flex flex-col gap-1">
        <h3 className="text-md font-semibold leading-snug text-black group-hover:underline">
          {title.length > 80 ? title.slice(0, 80) + "..." : title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {content.replace(/<[^>]+>/g, "").slice(0, 100)}...
        </p>
        <span className="text-xs text-gray-500">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </span>
      </div>
    </Link>
  );
};

export default NewsListCard;
