// import React, { useState, useEffect, useRef } from 'react';
// import { Button } from '@/components/ui/button';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const NewsBanner = ({ newsItems = [] }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const timerRef = useRef(null);
//   const transitionRef = useRef(null);

//   // Auto-rotate news items
//   useEffect(() => {
//     if (newsItems.length > 1) {
//       timerRef.current = setInterval(() => {
//         setCurrentIndex(prev => (prev + 1) % newsItems.length);
//       }, 3000); // Change every 3 seconds

//       return () => clearInterval(timerRef.current);
//     }
//   }, [newsItems.length]);

//   const goToNext = () => {
//     setCurrentIndex(prev => (prev + 1) % newsItems.length);
//     resetTimer();
//   };

//   const goToPrev = () => {
//     setCurrentIndex(prev => (prev - 1 + newsItems.length) % newsItems.length);
//     resetTimer();
//   };

//   const resetTimer = () => {
//     clearInterval(timerRef.current);
//     timerRef.current = setInterval(() => {
//       setCurrentIndex(prev => (prev + 1) % newsItems.length);
//     }, 5000);
//   };

//   if (!newsItems.length) return null;

//   return (
//     <div className="relative w-full max-w-full h-[500px] overflow-hidden shadow-xl flex items-center justify-center ">
//       {/* Banner Image */}
//       <div
//         className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
//         style={{
//           backgroundImage: `url(${newsItems[currentIndex]?.image})`,
//           opacity: 1
//         }}
//       >
//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
//       </div>

//       {/* Content */}
//       <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
//         <h2 className="text-3xl font-bold mb-2 drop-shadow-lg">
//           {newsItems[currentIndex]?.title}
//         </h2>
//         <p className="text-lg mb-4 line-clamp-2 drop-shadow-lg">
//           {newsItems[currentIndex]?.description}
//         </p>
//         <Button
//           variant="outline"
//           className="w-fit bg-transparent text-white border-white hover:bg-blue hover:text-blue-500 transition duration-300"
//           asChild
//         >
//           <Link to={`/post/${newsItems[currentIndex]?.slug}`}>
//             Read More
//           </Link>
//         </Button>
//       </div>

//       {/* Navigation Arrows */}
//       {newsItems.length > 1 && (
//         <>
//           <button
//             onClick={goToPrev}
//             className="absolute left-4 top-1/2 z-20 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition"
//             aria-label="Previous news"
//           >
//             <ChevronLeft className="w-6 h-6 text-white" />
//           </button>
//           <button
//             onClick={goToNext}
//             className="absolute right-4 top-1/2 z-20 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition"
//             aria-label="Next news"
//           >
//             <ChevronRight className="w-6 h-6 text-white" />
//           </button>
//         </>
//       )}

//       {/* Indicator Dots */}
//       {newsItems.length > 1 && (
//         <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 flex gap-2">
//           {newsItems.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => {
//                 setCurrentIndex(index);
//                 resetTimer();
//               }}
//               className={`w-3 h-3 rounded-full transition ${currentIndex === index ? 'bg-white w-6' : 'bg-white/50'}`}
//               aria-label={`Go to news ${index + 1}`}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NewsBanner;

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
    <div className="relative w-full h-[500px] overflow-hidden shadow-xl">
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
        <h2 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
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

      {/* Navigation Arrows */}
      {newsItems.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition backdrop-blur-sm"
            aria-label="Previous news"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition backdrop-blur-sm"
            aria-label="Next news"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
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
