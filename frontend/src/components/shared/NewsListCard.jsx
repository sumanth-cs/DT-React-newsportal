import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

// const NewsListCard = ({ post }) => {
//   return (
//     <Link
//       to={`/post/${post.slug}`}
//       className="flex flex-col sm:flex-row items-start gap-4 bg-white shadow-sm rounded-xl p-4 hover:bg-gray-50 transition"
//     >
//       <img
//         src={post.image}
//         alt={post.title}
//         className="w-full sm:w-40 h-32 object-cover rounded-md"
//       />
//       <div className="flex-1">
//         <h3 className="text-lg font-semibold text-black mb-1 line-clamp-2 hover:text-underline">
//           {post.title}
//         </h3>
//         <p className="text-sm text-gray-600 line-clamp-3 mb-2">
//           <div dangerouslySetInnerHTML={{ __html: post.content }}/>
//         </p>
//         <span className="text-xs text-gray-400">
//           {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
//         </span>
//       </div>
//     </Link>
//   );
// };
const NewsListCard = ({ post }) => {
  const { title, content, image, slug, createdAt } = post;
  return (
    <Link
      to={`/posts/${slug}`}
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
