import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PostThumbnailCard from "./PostThumbnailCard";

const HorizontalScroller = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollerRef = useRef(null);
  const autoScrollRef = useRef(null);

  // Fetch random news posts
  useEffect(() => {
    const fetchRandomPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/posts/?limit=10");
        const data = await response.json();

        // const response = await fetch("/api/posts/?limit=10");
        // const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch posts");
        }

        // Shuffle the posts for random placement
        const shuffledPosts = [...data.posts].sort(() => 0.5 - Math.random());
        setPosts(shuffledPosts);
        // setPosts(data.posts);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomPosts();
  }, []);

  // Auto-scroll every 3 seconds
  useEffect(() => {
    if (posts.length > 1) {
      autoScrollRef.current = setInterval(() => {
        if (scrollerRef.current) {
          const { scrollLeft, clientWidth, scrollWidth } = scrollerRef.current;
          const maxScroll = scrollWidth - clientWidth;
          const nextScroll = scrollLeft + clientWidth * 0.8;

          scrollerRef.current.scrollTo({
            left: nextScroll > maxScroll ? 0 : nextScroll,
            behavior: "smooth",
          });
        }
      }, 3000);

      return () => clearInterval(autoScrollRef.current);
    }
  }, [posts]);

  const scrollLeft = () => {
    if (scrollerRef.current) {
      clearInterval(autoScrollRef.current);
      scrollerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
      // Restart auto-scroll after manual interaction
      autoScrollRef.current = setInterval(() => {
        if (scrollerRef.current) {
          const { scrollLeft, clientWidth, scrollWidth } = scrollerRef.current;
          const maxScroll = scrollWidth - clientWidth;
          const nextScroll = scrollLeft + clientWidth * 0.8;

          scrollerRef.current.scrollTo({
            left: nextScroll > maxScroll ? 0 : nextScroll,
            behavior: "smooth",
          });
        }
      }, 3000);
    }
  };

  const scrollRight = () => {
    if (scrollerRef.current) {
      clearInterval(autoScrollRef.current);
      scrollerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
      // Restart auto-scroll after manual interaction
      autoScrollRef.current = setInterval(() => {
        if (scrollerRef.current) {
          const { scrollLeft, clientWidth, scrollWidth } = scrollerRef.current;
          const maxScroll = scrollWidth - clientWidth;
          const nextScroll = scrollLeft + clientWidth * 0.8;

          scrollerRef.current.scrollTo({
            left: nextScroll > maxScroll ? 0 : nextScroll,
            behavior: "smooth",
          });
        }
      }, 3000);
    }
  };

  if (loading)
    return <div className="py-8 text-center">Loading picks for you...</div>;
  if (error)
    return <div className="py-8 text-center text-red-500">Error: {error}</div>;
  if (!posts.length)
    return <div className="py-8 text-center">No recommendations found</div>;

  return (
    <section className="relative my-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-end mb-6">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollLeft}
              className="rounded-full shadow-lg bg-darkYellow backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 " />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollRight}
              className="rounded-full shadow-lg bg-darkYellow backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-6 snap-x snap-mandatory"
          style={{ scrollBehavior: "smooth" }}
        >
          {posts.map((post) => (
            <div
              key={post._id}
              className="flex-shrink-0 w-[300px] sm:w-[350px] snap-start"
            >
              <PostThumbnailCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalScroller;
