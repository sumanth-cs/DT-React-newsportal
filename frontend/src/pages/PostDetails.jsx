// // import React, { useEffect, useState } from "react";
// // import { Link, useParams } from "react-router-dom";
// // import { Button } from "@/components/ui/button";
// // import { ArrowLeft } from "lucide-react";
// // import { getTimeAgo } from "@/lib/utils";

// // const PostDetails = () => {
// //   const { postSlug } = useParams();
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(false);
// //   const [post, setPost] = useState(null);

// //   useEffect(() => {
// //     const fetchPost = async () => {
// //       try {
// //         setLoading(true);
// //         const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
// //         const data = await res.json();

// //         if (!res.ok) {
// //           setError(true);
// //           setLoading(false);
// //           return;
// //         }

// //         if (res.ok) {
// //           setPost(data.posts[0]);
// //           setLoading(false);
// //           setError(false);
// //         }
// //       } catch (error) {
// //         setError(true);
// //         setLoading(false);
// //       }
// //     };

// //     fetchPost();
// //   }, [postSlug]);

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center min-h-screen">
// //         <div className="animate-pulse flex flex-col space-y-4 w-full max-w-5xl p-6">
// //           <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto"></div>
// //           <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
// //           <div className="h-64 bg-gray-200 rounded w-full"></div>
// //           <div className="h-4 bg-gray-200 rounded w-full"></div>
// //           <div className="h-4 bg-gray-200 rounded w-5/6"></div>
// //           <div className="h-4 bg-gray-200 rounded w-4/6"></div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="flex justify-center items-center min-h-screen">
// //         <p className="text-red-500 text-2xl">
// //           Failed to fetch post. Please try again later.
// //         </p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <main className="p-6 flex flex-col items-center min-h-screen bg-cream">
// //       {/* Back Button */}
// //       <div className="w-full max-w-5xl mb-6 ">
// //         <Link to="/">
// //           <Button variant="ghost" className="flex items-center gap-2 ">
// //             <ArrowLeft className="w-4 h-4" />
// //             Back to Home
// //           </Button>
// //         </Link>
// //       </div>

// //       {/* Post Title */}
// //       <h1 className="text-4xl font-bold text-center text-gray-800 mt-10 max-w-3xl">
// //         {post.title}
// //       </h1>

// //       {/* Category Button */}
// //       {/* <Link to={`/search?category=${post.category}`} className="mt-6">
// //         <Button
// //           variant="outline"
// //           className="border border-gray-400 bg-gray-300 hover:bg-gray-200 "
// //         >
// //           {post.category}
// //         </Button>
// //       </Link> */}

// //       {/* Post Image */}
// //       <img
// //         src={post.image}
// //         alt={post.title}
// //         className="mt-10 rounded-lg shadow-lg w-full max-w-5xl object-cover max-h-[500px]"
// //       />

// //       {/* Post Metadata */}
// //       <div className="flex justify-end items-center mt-6 w-full max-w-5xl text-sm text-gray-600">
// //         <span >{getTimeAgo(post.createdAt)}</span>
// //       </div>

// //       {/* Post Content */}
// //       <div
// //         className="mt-10 w-full max-w-5xl prose prose-lg prose-blue mb-10"
// //         dangerouslySetInnerHTML={{ __html: post.content }}
// //       ></div>
// //     </main>
// //   );
// // };

// // export default PostDetails;

// import React, { useEffect, useState, useRef } from "react";
// import { Link, useParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft, Share2, X } from "lucide-react";
// import { getTimeAgo } from "@/lib/utils";
// import {
//   FaWhatsapp,
//   FaFacebook,
//   FaLinkedin,
//   FaLink
// } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
// // import { SiGmail } from "react-icons/si";

// const PostDetails = () => {
//   const { postSlug } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [post, setPost] = useState(null);
//   const [showShareOptions, setShowShareOptions] = useState(false);
//   const shareRef = useRef(null);

//   const shareOptions = [
//       {
//         name: "WhatsApp",
//         icon: <FaWhatsapp className="w-5 h-5" />,
//         action: () => {
//           window.open(
//             `https://wa.me/?text=${encodeURIComponent(
//               `${post.title} - ${window.location.origin}/post/${post.slug}`
//             )}`,
//             "_blank"
//           );
//         },
//       },
//       {
//         name: "Facebook",
//         icon: <FaFacebook className="w-5 h-5" />,
//         action: () => {
//           window.open(
//             `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//               `${window.location.origin}/post/${post.slug}`
//             )}`,
//             "_blank"
//           );
//         },
//       },
//       {
//         name: "Twitter",
//         icon: <FaXTwitter className="w-5 h-5" />,
//         action: () => {
//           window.open(
//             `https://twitter.com/intent/tweet?text=${encodeURIComponent(
//               post.title
//             )}&url=${encodeURIComponent(
//               `${window.location.origin}/post/${post.slug}`
//             )}`,
//             "_blank"
//           );
//         },
//       },
//       {
//         name: "LinkedIn",
//         icon: <FaLinkedin className="w-5 h-5" />,
//         action: () => {
//           window.open(
//             `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
//               `${window.location.origin}/post/${post.slug}`
//             )}&title=${encodeURIComponent(post.title)}`,
//             "_blank"
//           );
//         },
//       },
//       // {
//       //   name: "Email",
//       //   icon: <SiGmail className="w-5 h-5" />,
//       //   action: () => {
//       //     const emailUrl = `mailto:?subject=${encodeURIComponent(
//       //       `Check out: ${post.title}`
//       //     )}&body=${encodeURIComponent(
//       //       `I found this interesting article and thought you might like it:\n\n` +
//       //         `${post.title}\n\n` +
//       //         `Read it here: ${window.location.origin}/post/${post.slug}\n\n` +
//       //         `Enjoy!`
//       //     )}`;
//       //     window.location.href = emailUrl;
//       //   },

//       {
//         name: "Copy Link",
//         icon: <FaLink className="w-5 h-5" />,
//         action: () => {
//           navigator.clipboard.writeText(
//             `${window.location.origin}/post/${post.slug}`
//           );
//           setShowShareOptions(false);
//           alert("Link copied to clipboard!");
//         },
//       },
//     ];

//     // Close share options when clicking outside
//     useEffect(() => {
//       const handleClickOutside = (event) => {
//         if (shareRef.current && !shareRef.current.contains(event.target)) {
//           setShowShareOptions(false);
//         }
//       };

//       document.addEventListener("mousedown", handleClickOutside);
//       return () => {
//         document.removeEventListener("mousedown", handleClickOutside);
//       };
//     }, []);

//     useEffect(() => {
//       const fetchPost = async () => {
//         try {
//           setLoading(true);
//           const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
//           const data = await res.json();

//           if (!res.ok) {
//             setError(true);
//             setLoading(false);
//             return;
//           }

//           if (res.ok) {
//             setPost(data.posts[0]);
//             setLoading(false);
//             setError(false);
//           }
//         } catch (error) {
//           setError(true);
//           setLoading(false);
//         }
//       };

//       fetchPost();
//     }, [postSlug]);

//     if (loading) {
//       return (
//         <div className="flex justify-center items-center min-h-screen">
//           <div className="animate-pulse flex flex-col space-y-4 w-full max-w-5xl p-6">
//             <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto"></div>
//             <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
//             <div className="h-64 bg-gray-200 rounded w-full"></div>
//             <div className="h-4 bg-gray-200 rounded w-full"></div>
//             <div className="h-4 bg-gray-200 rounded w-5/6"></div>
//             <div className="h-4 bg-gray-200 rounded w-4/6"></div>
//           </div>
//         </div>
//       );
//     }

//     if (error) {
//       return (
//         <div className="flex justify-center items-center min-h-screen">
//           <p className="text-red-500 text-2xl">
//             Failed to fetch post. Please try again later.
//           </p>
//         </div>
//       );
//     }

//     return (
//       <main className="p-6 flex flex-col items-center min-h-screen bg-cream ">
//         <div className="bg-white shadow-lg p-10 rounded-lg w-full max-w-5xl ">
//         {/* Back Button */}
//         <div className="w-full max-w-5xl mb-6">
//           <div className="flex justify-between items-center">
//             <Link to="/">
//               <Button variant="ghost" className="flex items-center gap-2">
//                 <ArrowLeft className="w-4 h-4" />
//                 Back to Home
//               </Button>
//             </Link>
//             <div className="relative" ref={shareRef}>
//               <Button
//                 variant="ghost"
//                 onClick={() => setShowShareOptions(!showShareOptions)}
//                 className="flex items-center gap-2"
//               >
//                 <Share2 className="w-4 h-4" />
//                 Share
//               </Button>
//               {showShareOptions && (
//                 <div className="absolute right-0 top-12 z-50 bg-white rounded-lg shadow-xl p-3 w-48 border">
//                   <div className="flex justify-between items-center mb-2">
//                     <h3 className="font-medium text-gray-800">Share via</h3>
//                     <X
//                       className="w-4 h-4 cursor-pointer"
//                       onClick={() => setShowShareOptions(false)}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     {shareOptions.map((option) => (
//                       <button
//                         key={option.name}
//                         onClick={option.action}
//                         className="flex items-center w-full p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
//                       >
//                         <span className="mr-3">{option.icon}</span>
//                         {option.name}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Author Section */}
//         {post?.authorName && (
//           <div className="w-full max-w-5xl flex items-center gap-3 mb-6">
//             <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
//               {post.authorPhoto ? (
//                 <img
//                   src={post.authorPhoto}
//                   alt={post.authorName}
//                   className="w-full h-full rounded-full object-cover"
//                 />
//               ) : (
//                 <span className="font-medium text-gray-600">
//                   {post.authorName[0]?.toUpperCase()}
//                 </span>
//               )}
//             </div>
//             <div>
//               <p className="font-medium text-gray-800">{post.authorName}</p>
//               <p className="text-sm text-gray-500">
//                 {getTimeAgo(post.createdAt)}
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Post Content */}
//         <article className="w-full max-w-5xl">
//           <h1 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">
//             {post.title}
//           </h1>

//           <img
//             src={post.image}
//             alt={post.title}
//             className="mt-10 mb-10 rounded-lg shadow-lg w-full max-w-5xl object-contain max-h-[500px]"
//           />

//           <div
//             className="prose prose-lg max-w-none mb-12"
//             style={{
//               fontFamily: "'Noto Sans', sans-serif",
//               lineHeight: 1.7
//             }}
//           >
//             <div dangerouslySetInnerHTML={{ __html: post.content }} />
//           </div>
//         </article>
//         </div>
//       </main>
//     );
//   };

//   export default PostDetails;

// import React, { useEffect, useState, useRef } from "react";
// import { Link, useParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft, Share2, X } from "lucide-react";
// import { getTimeAgo } from "@/lib/utils";
// import { FaWhatsapp, FaFacebook, FaLinkedin, FaLink } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";

// const PostDetails = () => {
//   const { postSlug } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [post, setPost] = useState(null);
//   const [showShareOptions, setShowShareOptions] = useState(false);
//   const shareRef = useRef(null);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`/api/posts/?slug=${postSlug}`);
//         const data = await res.json();

//         if (!res.ok) {
//           setError(true);
//           setLoading(false);
//           return;
//         }
//         setPost(data.posts[0]);
//         setLoading(false);
//         setError(false);
//       } catch (error) {
//         setError(true);
//         setLoading(false);
//       }
//     };
//     fetchPost();
//   }, [postSlug]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-gray-500 text-lg">Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-red-500 text-lg">
//           Failed to fetch post. Please try again.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <main className="p-4 md:p-6 flex flex-col items-center min-h-screen bg-gray-50">
//       <div className="bg-white shadow-lg p-6 md:p-10 rounded-lg w-full max-w-5xl">
//         {/* Back Button & Share */}
//         <div className="flex justify-between items-center mb-4 md:mb-6">
//           <Link to="/">
//             <Button
//               variant="ghost"
//               className="flex items-center gap-2 text-sm md:text-base"
//             >
//               <ArrowLeft className="w-4 h-4" /> Back
//             </Button>
//           </Link>
//           <div className="relative" ref={shareRef}>
//             <Button
//               variant="ghost"
//               onClick={() => setShowShareOptions(!showShareOptions)}
//               className="flex items-center gap-2 text-sm md:text-base"
//             >
//               <Share2 className="w-4 h-4" /> Share
//             </Button>
//             {showShareOptions && (
//               <div className="absolute right-0 top-12 z-50 bg-white rounded-lg shadow-xl p-3 w-40 border text-sm">
//                 {[
//                   {
//                     name: "WhatsApp",
//                     icon: <FaWhatsapp />,
//                     link: `https://wa.me/?text=${post.title}`,
//                   },
//                   {
//                     name: "Facebook",
//                     icon: <FaFacebook />,
//                     link: `https://www.facebook.com/sharer/sharer.php?u=${post.title}`,
//                   },
//                   {
//                     name: "Twitter",
//                     icon: <FaXTwitter />,
//                     link: `https://twitter.com/intent/tweet?text=${post.title}`,
//                   },
//                   {
//                     name: "LinkedIn",
//                     icon: <FaLinkedin />,
//                     link: `https://www.linkedin.com/shareArticle?url=${post.title}`,
//                   },
//                   {
//                     name: "Copy Link",
//                     icon: <FaLink />,
//                     action: () =>
//                       navigator.clipboard.writeText(window.location.href),
//                   },
//                 ].map((option) => (
//                   <button
//                     key={option.name}
//                     onClick={() =>
//                       option.action
//                         ? option.action()
//                         : window.open(option.link, "_blank")
//                     }
//                     className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded-md"
//                   >
//                     <span className="mr-3 text-lg">{option.icon}</span>
//                     {option.name}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Author */}
//         {post?.authorName && (
//           <div className="flex items-center gap-3 mb-4 text-sm md:text-base">
//             <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 flex items-center justify-center">
//               {post.authorPhoto ? (
//                 <img
//                   src={post.authorPhoto}
//                   alt={post.authorName}
//                   className="w-full h-full rounded-full object-cover"
//                 />
//               ) : (
//                 <span className="font-medium text-gray-600">
//                   {post.authorName[0]?.toUpperCase()}
//                 </span>
//               )}
//             </div>
//             <div>
//               <p className="font-medium text-gray-800">{post.authorName}</p>
//               <p className="text-xs md:text-sm text-gray-500">
//                 {getTimeAgo(post.createdAt)}
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Post Content */}
//         <article>
//           <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-8 leading-tight">
//             {post.title}
//           </h1>
//           <img
//             src={post.image}
//             alt={post.title}
//             // className="w-full max-h-80 object-contain rounded-lg shadow-lg mb-4 md:mb-8"
//             className="mt-10 mb-10 rounded-lg shadow-lg w-full max-w-5xl object-contain max-h-[500px] "
//           />
//           <div
//             className="prose prose-sm md:prose-lg max-w-none mb-6 md:mb-12"
//             style={{ lineHeight: 1.6 }}
//           >
//             <div dangerouslySetInnerHTML={{ __html: post.content }} />
//           </div>
//         </article>
//       </div>
//     </main>
//   );
// };

// export default PostDetails;

import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, X } from "lucide-react";
import { getTimeAgo } from "@/lib/utils";
import { FaWhatsapp, FaFacebook, FaLinkedin, FaLink } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const PostDetails = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareRef = useRef(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/posts/?slug=${postSlug}`);
        const data = await res.json();

        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        setPost(data.posts[0]);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">
          Failed to fetch post. Please try again.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen md:p-8 flex flex-col items-center bg-cream">
      <div className="bg-white rounded-lg w-full max-w-5xl mx-auto">
        {/* Back Button & Share */}
        <div className="flex justify-between items-center px-3 py-2">
          <Link to="/">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="sr-only md:not-sr-only">Back</span>
            </Button>
          </Link>
          <div className="relative" ref={shareRef}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="flex items-center gap-1"
            >
              <Share2 className="w-4 h-4" />
              <span className="sr-only md:not-sr-only">Share</span>
            </Button>
            {showShareOptions && (
              <div className="absolute right-0 top-10 z-50 bg-white rounded-lg shadow-xl p-2 w-36 border text-xs">
                {[
                  {
                    name: "WhatsApp",
                    icon: <FaWhatsapp />,
                    link: `https://wa.me/?text=${post.title}`,
                  },
                  {
                    name: "Facebook",
                    icon: <FaFacebook />,
                    link: `https://www.facebook.com/sharer/sharer.php?u=${post.title}`,
                  },
                  {
                    name: "Twitter",
                    icon: <FaXTwitter />,
                    link: `https://twitter.com/intent/tweet?text=${post.title}`,
                  },
                  {
                    name: "LinkedIn",
                    icon: <FaLinkedin />,
                    link: `https://www.linkedin.com/shareArticle?url=${post.title}`,
                  },
                  {
                    name: "Copy Link",
                    icon: <FaLink />,
                    action: () =>
                      navigator.clipboard.writeText(window.location.href),
                  },
                ].map((option) => (
                  <button
                    key={option.name}
                    onClick={() =>
                      option.action
                        ? option.action()
                        : window.open(option.link, "_blank")
                    }
                    className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded"
                  >
                    <span className="mr-2 text-base">{option.icon}</span>
                    {option.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Author */}
        {post?.authorName && (
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              {post.authorPhoto ? (
                <img
                  src={post.authorPhoto}
                  alt={post.authorName}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="font-medium text-gray-600 text-sm">
                  {post.authorName[0]?.toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <p className="font-medium text-gray-800 text-sm">
                {post.authorName}
              </p>
              <p className="text-xs text-gray-500">
                {getTimeAgo(post.createdAt)}
              </p>
            </div>
          </div>
        )}

        {/* Post Content */}
        <article className="p-4 ml-2 md:m-0">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3 leading-snug">
            {post.title}
          </h1>
          
          <img
            src={post.image}
            alt={post.title}
            // className="w-full h-auto rounded-lg -mx-1 my-3" // Full width on mobile
            className="mt-10 mb-10 rounded-lg shadow-lg w-full h-auto max-h-[500px] object-contain"
          />
          
          <div
            className="prose prose-sm max-w-none mb-4"
            style={{ lineHeight: 1.6 }}
          >
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </article>
      </div>
    </main>
  );
};

export default PostDetails;