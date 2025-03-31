import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';

const CategoryPage = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch category details
        const catRes = await fetch(`/api/categories/slug/${slug}`);
        const catData = await catRes.json();
        setCategory(catData);
        
        // Fetch posts for this category
        const postsRes = await fetch(`/api/posts?category=${slug}`);
        const postsData = await postsRes.json();
        setPosts(postsData);
      } catch (error) {
        console.error('Failed to fetch data');
      }
    };
    
    fetchData();
  }, [slug]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {category?.name || 'Category'} Posts
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