import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const NewsBanner = ({ newsItems = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  // Auto-rotate news items
  useEffect(() => {
    if (newsItems.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % newsItems.length);
      }, 3000); // Change every 5 seconds

      return () => clearInterval(timerRef.current);
    }
  }, [newsItems.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % newsItems.length);
    resetTimer();
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + newsItems.length) % newsItems.length);
    resetTimer();
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsItems.length);
    }, 5000);
  };

  if (!newsItems.length) return null;

  return (
    <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden shadow-xl">
      {/* Banner Image with object-cover for proper fitting */}
      <div className="absolute inset-0 w-full h-full transition-opacity duration-1000">
        <img
          src={newsItems[currentIndex]?.image}
          alt={newsItems[currentIndex]?.title}
          className="w-full h-full object-contain object-center"
          onError={(e) => {
            // e.target.src = 'http://via.placeholder.com/1920x1080?text=Image+Not+Available';
            e.target.src =
              "https://euaa.europa.eu/sites/default/files/styles/width_600px/public/default_images/news-default-big.png?itok=NNXAZZTc";
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white max-w-6xl mx-auto">
        <h2 className="text-xl md:text-4xl font-bold mb-2 drop-shadow-lg">
          {newsItems[currentIndex]?.title}
        </h2>
        <p className="text-lg md:text-xl mb-4 line-clamp-2 drop-shadow-lg max-w-2xl">
          {newsItems[currentIndex]?.description}
        </p>
        <Button
          variant="outline"
          className="w-fit bg-transparent text-white border-white hover:bg-white hover:text-black transition duration-300"
          asChild
        >
          <Link to={`/post/${newsItems[currentIndex]?.slug}`}>Read More</Link>
        </Button>
      </div>

      {/* Navigation Arrows - Responsive */}
      {newsItems.length > 1 && (
        <>
          {/* Arrows for large screens (centered vertically) */}
          <div className="hidden md:flex justify-between items-center absolute inset-y-0 w-full px-4 z-20">
            <button
              onClick={goToPrev}
              className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur transition"
              aria-label="Previous news"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur transition"
              aria-label="Next news"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Arrows for small screens (bottom right) */}
          <div className="md:hidden absolute bottom-4 right-4 z-20 flex gap-2">
            <button
              onClick={goToPrev}
              className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur transition"
              aria-label="Previous news"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur transition"
              aria-label="Next news"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </>
      )}

      {/* Improved Indicator Dots */}
      {newsItems.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 flex gap-2">
          {newsItems.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                resetTimer();
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to news ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsBanner;
