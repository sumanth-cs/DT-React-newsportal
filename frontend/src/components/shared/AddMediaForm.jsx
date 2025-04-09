// import { useState } from "react";
// import { useToast } from "@/hooks/use-toast";

// export default function AddMediaForm() {
//   const { toast } = useToast();

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     url: "",
//     type: "youtube",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("/api/multimedia", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) throw new Error("Failed to add media");

//       toast("Media added successfully!");
//       setFormData({
//         title: "",
//         description: "",
//         url: "",
//         type: "youtube",
//       });
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md space-y-6"
//     >
//       <h2 className="text-2xl font-semibold text-gray-800 text-center">
//         Add Media
//       </h2>

//       <div className="space-y-1">
//         <label className="block text-sm font-medium text-gray-700">Title</label>
//         <input
//           type="text"
//           value={formData.title}
//           onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//           required
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="space-y-1">
//         <label className="block text-sm font-medium text-gray-700">
//           Description
//         </label>
//         <textarea
//           value={formData.description}
//           onChange={(e) =>
//             setFormData({ ...formData, description: e.target.value })
//           }
//           rows={4}
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="space-y-1">
//         <label className="block text-sm font-medium text-gray-700">Type</label>
//         <select
//           value={formData.type}
//           onChange={(e) => setFormData({ ...formData, type: e.target.value })}
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="youtube">YouTube</option>
//           <option value="reel">Instagram Reel</option>
//         </select>
//       </div>

//       <div className="space-y-1">
//         <label className="block text-sm font-medium text-gray-700">URL</label>
//         <input
//           type="url"
//           value={formData.url}
//           onChange={(e) => setFormData({ ...formData, url: e.target.value })}
//           required
//           placeholder={
//             formData.type === "youtube"
//               ? "https://www.youtube.com/watch?v=..."
//               : "https://www.instagram.com/reel/..."
//           }
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
//       >
//         Add Media
//       </button>
//     </form>
//   );
// }

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AddMediaForm({ onMediaAdded }) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    type: "youtube",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/multimedia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add media");
      }

      const newMedia = await response.json();
      toast("Media added successfully!");

      setFormData({
        title: "",
        description: "",
        url: "",
        type: "youtube",
      });

      if (onMediaAdded) {
        onMediaAdded(newMedia);
      }
    } catch (err) {
      toast("Eror adding media");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Add Media
      </h2>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={4}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="youtube">YouTube</option>
          <option value="reel">Instagram Reel</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">URL</label>
        <input
          type="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          required
          placeholder={
            formData.type === "youtube"
              ? "https://www.youtube.com/watch?v=..."
              : "https://www.instagram.com/reel/..."
          }
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Add Media
      </button>
    </form>
  );
}
