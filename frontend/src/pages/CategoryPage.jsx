// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import PostCard from '../components/PostCard';

// const CategoryPage = () => {
//   const { slug } = useParams();
//   const [posts, setPosts] = useState([]);
//   const [category, setCategory] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch category details
//         const catRes = await fetch(`/api/categories/slug/${slug}`);
//         const catData = await catRes.json();
//         setCategory(catData);

//         // Fetch posts for this category
//         const postsRes = await fetch(`/api/posts?category=${slug}`);
//         const postsData = await postsRes.json();
//         setPosts(postsData);
//       } catch (error) {
//         console.error('Failed to fetch data');
//       }
//     };

//     fetchData();
//   }, [slug]);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">
//         {category?.name || 'Category'} Posts
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {posts.map((post) => (
//           <PostCard key={post._id} post={post} />
//         ))}
//       </div>

//       {posts.length === 0 && (
//         <p className="text-gray-500">No posts found in this category.</p>
//       )}
//     </div>
//   );
// };

// export default CategoryPage;

// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// import { useToast } from "@/hooks/use-toast";
// import PostCard from "@/components/shared/PostCard";

// const CategoryPage = () => {
//   const { slug } = useParams();
//   const [posts, setPosts] = useState([]);
//   const [category, setCategory] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { toast } = useToast();

//   useEffect(() => {
//     console.log("Fetching data for slug:", slug); // Debug 1
//     const fetchData = async () => {
//       console.log("Starting fetch..."); // Debug 2
//       try {
//         setLoading(true);

//         const [catRes, postsRes] = await Promise.all([
//           fetch(`/api/categories/slug/${slug}`),
//           fetch(`/api/posts?category=${slug}`),
//         ]);

//         if (!catRes.ok || !postsRes.ok) {
//           throw new Error(
//             !catRes.ok ? "Category not found" : "Failed to load posts"
//           );
//         }

//         const [catData, postsData] = await Promise.all([
//           catRes.json(),
//           postsRes.json(),
//         ]);

//         setCategory(catData);
//         setPosts(postsData.posts || postsData || []);
//         console.log("Received data:", { catData, postsData }); // Debug 3
//       } catch (error) {
//         console.error("Fetch error:", error);
//         console.error("Full error:", error); // Debug 4
//         toast.error(error.message);
//         setPosts([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [slug]); // Removed toast from dependencies

//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="animate-pulse space-y-4">
//           <div className="h-8 bg-gray-200 rounded w-1/3"></div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[...Array(3)].map((_, i) => (
//               <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
//       <h1 className="text-3xl font-bold mb-6">
//         {category?.name || "Category"} Posts
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {posts.map((post) => (
//           <PostCard key={post._id} post={post} />
//         ))}
//       </div>

//       {posts.length === 0 && (
//         <p className="text-gray-500">No posts found in this category.</p>
//       )}
//     </div>
//   );
// };

// export default CategoryPage;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import PostCard from "@/components/shared/PostCard";

const CategoryPage = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    console.log('Fetching data for slug:', slug);

    const fetchData = async () => {
      console.log('Starting fetch...');
      try {
        setLoading(true);

        const [catRes, postsRes] = await Promise.all([
          fetch(`/api/categories/slug/${slug}`),
          fetch(`/api/posts?category=${slug}`),
        ]);

        if (!catRes.ok || !postsRes.ok) {
          throw new Error(
            !catRes.ok ? "Category not found" : "Failed to load posts"
          );
        }

        const [catData, postsData] = await Promise.all([
          catRes.json(),
          postsRes.json(),
        ]);

        console.log('Category Response:', catData);
        console.log('Posts Response:', postsData);

        setCategory(catData);
        setPosts(Array.isArray(postsData) ? postsData : postsData.posts || []);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error(error.message);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-6">
        {category?.name || "Category"} Posts
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-gray-500">No posts found in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
