// // import { useEffect, useState } from 'react';

// // export default function MultimediaSection() {
// //   const [media, setMedia] = useState([]);

// //   useEffect(() => {
// //     const fetchMultimedia = async () => {
// //       try {
// //         const response = await fetch('/api/multimedia');
// //         if (!response.ok) {
// //           throw new Error('Network response was not ok');
// //         }
// //         const data = await response.json();
// //         setMedia(data);
// //       } catch (error) {
// //         console.error('Error fetching multimedia:', error);
// //       }
// //     };

// //     fetchMultimedia();
// //   }, []);

// //   return (
// //     <div className="multimedia-grid">
// //       {media.map(item => (
// //         <div key={item._id} className="media-card">
// //           <h3>{item.title}</h3>
// //           <p>{item.description}</p>
// //           <a href={item.url} target="_blank" rel="noopener noreferrer">
// //             {item.type === 'youtube' ? (
// //               <img
// //                 src={`https://img.youtube.com/vi/${getYoutubeId(item.url)}/hqdefault.jpg`}
// //                 alt={item.title}
// //               />
// //             ) : (
// //               <div className="reel-placeholder">
// //                 <span>Instagram Reel</span>
// //               </div>
// //             )}
// //           </a>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// // function getYoutubeId(url) {
// //   const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
// //   const match = url.match(regExp);
// //   return (match && match[2].length === 11) ? match[2] : null;
// // }

// import { useEffect, useState } from 'react';
// import { Video } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';

// export default function MultimediaSection() {
//   const [media, setMedia] = useState([]);
//   const { toast } = useToast();

//   useEffect(() => {
//     const fetchMultimedia = async () => {
//       try {
//         const response = await fetch('/api/multimedia');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setMedia(data);
//       } catch (error) {
//         console.error('Error fetching multimedia:', error);
//         toast({
//           title: 'Error',
//           description: 'Failed to load multimedia content',
//           variant: 'destructive'
//         });
//       }
//     };

//     fetchMultimedia();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`/api/multimedia/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });

//       if (!response.ok) throw new Error('Failed to delete media');

//       setMedia(media.filter(item => item._id !== id));
//       toast({
//         title: 'Success',
//         description: 'Media deleted successfully'
//       });
//     } catch (error) {
//       console.error('Error deleting media:', error);
//       toast({
//         title: 'Error',
//         description: 'Failed to delete media',
//         variant: 'destructive'
//       });
//     }
//   };

//   return (
//     <section className="py-16 bg-cream">
//       <div className="max-w-7xl mx-auto px-4">
//         <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
//           <Video className="w-8 h-8" /> Multimedia
//         </h2>

//         {/* YouTube Videos */}
//         <div className="mb-16">
//           <h3 className="text-2xl font-semibold text-gray-700 mb-4">
//             YouTube Videos
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {media.filter(item => item.type === 'youtube').map(item => (
//               <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
//                 <div className="aspect-w-16 aspect-h-9">
//                   <iframe
//                     src={`https://www.youtube.com/embed/${getYoutubeId(item.url)}`}
//                     title={item.title}
//                     className="w-full h-64"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                   ></iframe>
//                 </div>
//                 <div className="p-6">
//                   <h4 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h4>
//                   <p className="text-gray-600 mb-4">{item.description}</p>
//                   <button
//                     onClick={() => handleDelete(item._id)}
//                     className="text-red-600 hover:text-red-800 text-sm font-medium"
//                   >
//                     Delete Video
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Reels Section */}
//         <div>
//           <h3 className="text-2xl font-semibold text-gray-700 mb-4">Reels</h3>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//             {media.filter(item => item.type === 'reel').map(item => (
//               <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
//                 <div className="aspect-w-9 aspect-h-16">
//                   <iframe
//                     src={`https://www.instagram.com/reel/${getInstagramId(item.url)}/embed`}
//                     title={item.title}
//                     className="w-full h-72"
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                   ></iframe>
//                 </div>
//                 <div className="p-4">
//                   <h5 className="font-semibold text-gray-800">{item.title}</h5>
//                   <p className="text-sm text-gray-500 mb-2 line-clamp-2">{item.description}</p>
//                   <button
//                     onClick={() => handleDelete(item._id)}
//                     className="text-red-600 hover:text-red-800 text-xs font-medium"
//                   >
//                     Delete Reel
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function getYoutubeId(url) {
//   const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
//   const match = url.match(regExp);
//   return (match && match[2].length === 11) ? match[2] : null;
// }

// function getInstagramId(url) {
//   const regExp = /\/reel\/([^\/\?]+)/;
//   const match = url.match(regExp);
//   return match ? match[1] : null;
// }

import { useEffect, useState } from "react";
import { Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/userContext"; // Import your user context

export default function MultimediaSection() {
  const [media, setMedia] = useState([]);
  const { toast } = useToast();
  const { currentUser } = useUser(); // Get current user from context

  useEffect(() => {
    const fetchMultimedia = async () => {
      try {
        const response = await fetch("/api/multimedia");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setMedia(data);
      } catch (error) {
        console.error("Error fetching multimedia:", error);
        toast("Failed to load multimedia content");
      }
    };

    fetchMultimedia();
  }, []);

  const handleDelete = async (id) => {
    if (!currentUser?.isAdmin) {
      toast("Only admins can delete media");
      return;
    }

    try {
      const response = await fetch(`/api/multimedia/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete media");

      setMedia(media.filter((item) => item._id !== id));
      toast("Media deleted successfully");
    } catch (error) {
      console.error("Error deleting media:", error);
      toast("Error deleting media:");
    }
  };

  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
          <Video className="w-8 h-8" /> Multimedia
        </h2>

        {/* YouTube Videos */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            YouTube Videos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {media
              .filter((item) => item.type === "youtube")
              .map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src={`https://www.youtube.com/embed/${getYoutubeId(
                        item.url
                      )}`}
                      title={item.title}
                      className="w-full h-64"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    {currentUser?.isAdmin && (
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Delete Video
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Reels Section */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Reels</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {media
              .filter((item) => item.type === "reel")
              .map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="aspect-w-9 aspect-h-16">
                    <iframe
                      src={`https://www.instagram.com/reel/${getInstagramId(
                        item.url
                      )}/embed`}
                      title={item.title}
                      className="w-full h-72"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-4">
                    <h5 className="font-semibold text-gray-800">
                      {item.title}
                    </h5>
                    <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                      {item.description}
                    </p>
                    {currentUser?.isAdmin && (
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 hover:text-red-800 text-xs font-medium"
                      >
                        Delete Reel
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function getYoutubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

function getInstagramId(url) {
  const regExp = /\/reel\/([^\/\?]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}
