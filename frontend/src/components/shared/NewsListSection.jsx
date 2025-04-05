import React, { useState, useEffect } from "react";
import NewsListCard from "./NewsListCard";
import { Skeleton } from '@/components/ui/skeleton';

// const NewsListSection = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch("/api/posts/?limit=10");
//         const data = await response.json();

//         if (!response.ok) {
//           throw new Error(data.message || "Failed to fetch posts");
//         }

//         setPosts(data.posts);
//       } catch (err) {
//         setError(err.message);
//         console.error("Error fetching posts:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   if (loading) return <div className="text-center py-8">Loading news...</div>;
//   if (error)
//     return <div className="text-center text-red-500 py-8">Error: {error}</div>;
//   if (!posts.length)
//     return <div className="text-center py-8">No news found</div>;

//   return (
//     <section className="my-16">
//       <div className="container mx-auto px-4">
//         <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">
//           Latest News
//         </h2>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {posts.map((post) => (
//             <NewsListCard key={post._id} post={post} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default NewsListSection;
const NewsListSection = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const res = await fetch('/api/posts');
          const data = await res.json();
          setPosts(data.posts || []);
        } catch (err) {
          console.error('Failed to fetch news list:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchPosts();
    }, []);
  
    return (
      <section className="container mx-auto px-4 my-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Latest Headlines</h2>
        {loading ? (
          <div className="grid md:grid-cols-2 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-start gap-4">
                <Skeleton className="w-28 h-20 rounded" />
                <div className="flex flex-col gap-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-1">
            {posts.map((post) => (
              <NewsListCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>
    );
  };
  
  export default NewsListSection;