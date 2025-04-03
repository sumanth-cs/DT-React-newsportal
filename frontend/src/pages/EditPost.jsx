// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useToast } from "@/hooks/use-toast";
// import { getFilePreview, uploadFile } from "@/lib/appwrite/uploadImage";
// import React, { useEffect, useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { useUser } from "@/context/userContext";
// import { useNavigate, useParams } from "react-router-dom";

// const EditPost = () => {
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const { postId } = useParams();

//   const { currentUser } = useUser();

//   const [file, setFile] = useState(null);
//   const [imageUploadError, setImageUploadError] = useState(null);
//   const [imageUploading, setImageUploading] = useState(false);

//   const [formData, setFormData] = useState({});
//   //   console.log(formData);

//   const [updatePostError, setUpdatePostError] = useState(null);

//   useEffect(() => {
//     try {
//       const fetchPost = async () => {
//         const res = await fetch(`/api/posts/?postId=${postId}`);

//         const data = await res.json();

//         if (!res.ok) {
//           //   console.log(data.message);
//           setUpdatePostError(data.message);

//           return;
//         }

//         if (res.ok) {
//           setUpdatePostError(null);
//           setFormData(data.posts[0]);
//         }
//       };

//       fetchPost();
//     } catch (error) {
//       //   console.log(error.message);
//     }
//   }, [postId]);

//   const handleUploadImage = async () => {
//     try {
//       if (!file) {
//         setImageUploadError("Please select an image!");
//         toast({ title: "Please select an image!" });
//         return;
//       }

//       setImageUploading(true);

//       setImageUploadError(null);

//       const uploadedFile = await uploadFile(file);
//       const postImageUrl = getFilePreview(uploadedFile.$id);

//       setFormData({ ...formData, image: postImageUrl });

//       toast({ title: "Image Uploaded Successfully!" });

//       if (postImageUrl) {
//         setImageUploading(false);
//       }
//     } catch (error) {
//       setImageUploadError("Image upload failed");
//       //   console.log(error);

//       toast({ title: "Image upload failed!" });
//       setImageUploading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // console.log(formData._id);

//     try {
//       const res = await fetch(
//         `/api/posts/updatepost/${postId}/${currentUser._id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(formData),
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         toast({ title: "Something went wrong! Please try again." });
//         setUpdatePostError(data.message);

//         return;
//       }

//       if (res.ok) {
//         toast({ title: "Article Published Successfully!" });
//         setUpdatePostError(null);

//         navigate(`/post/${data.slug}`);
//       }
//     } catch (error) {
//       toast({ title: "Something went wrong! Please try again." });
//       setUpdatePostError("Something went wrong! Please try again.");
//     }
//   };

//   return (
//     <div className="p-3 max-w-3xl mx-auto min-h-screen">
//       <h1 className="text-center text-3xl my-7 font-semibold text-slate-700">
//         Edit post
//       </h1>

//       <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//         <div className="flex flex-col gap-4 sm:flex-row justify-between">
//           <Input
//             type="text"
//             placeholder="Title"
//             required
//             id="title"
//             className="w-full sm:w-3/4 h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
//             onChange={(e) =>
//               setFormData({ ...formData, title: e.target.value })
//             }
//             value={formData.title}
//           />

//           <Select
//             onValueChange={(value) =>
//               setFormData({ ...formData, category: value })
//             }
//             value={formData.category}
//           >
//             <SelectTrigger className="w-full sm:w-1/4 h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0">
//               <SelectValue placeholder="Select a Category" />
//             </SelectTrigger>

//             <SelectContent>
//               <SelectGroup>
//                 <SelectLabel>Category</SelectLabel>
//                 <SelectItem value="Sports">Sports</SelectItem>
//                 <SelectItem value="Entertainment">Entertainment</SelectItem>
//                 <SelectItem value="Politics">Politics</SelectItem>
//                 <SelectItem value="Business">Business</SelectItem>
//                 <SelectItem value="COVID-19">COVID-19</SelectItem>
//                 <SelectItem value="Consumer">Consumer</SelectItem>
//                 <SelectItem value="Tech News">Tech News</SelectItem>
//                 <SelectItem value="General">General</SelectItem>
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="flex gap-4 items-center justify-between border-4 border-slate-600 border-dotted p-3">
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setFile(e.target.files[0])}
//           />

//           <Button
//             type="button"
//             className="bg-slate-700"
//             onClick={handleUploadImage}
//           >
//             {imageUploading ? "Uploading..." : "Upload Image"}
//           </Button>
//         </div>

//         {imageUploadError && <p className="text-red-600">{imageUploadError}</p>}

//         {formData.image && (
//           <img
//             src={formData.image}
//             alt="upload"
//             className="w-full h-72 object-cover"
//           />
//         )}

//         <ReactQuill
//           theme="snow"
//           placeholder="Write something here..."
//           className="h-72  mb-12"
//           required
//           onChange={(value) => {
//             setFormData({ ...formData, content: value });
//           }}
//           value={formData.content}
//         />

//         <Button
//           type="submit"
//           className="h-12 bg-green-600 font-semibold max-sm:mt-5 text-md"
//         >
//           Update Your Article
//         </Button>

//         {updatePostError && (
//           <p className="text-red-600 mt-5">{updatePostError}</p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default EditPost;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { getFilePreview, uploadFile } from "@/lib/appwrite/uploadImage";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useUser } from "@/context/userContext";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { postId } = useParams();
  const { currentUser } = useUser();

  const [file, setFile] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  });
  const [updatePostError, setUpdatePostError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Add state for categories like in CreatePost
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categoriesError, setCategoriesError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch post data
        const postResponse = await fetch(`/api/posts/getpost/${postId}`);
        const postData = await postResponse.json();
        
        if (!postResponse.ok) {
          throw new Error(postData.error || "Failed to fetch post");
        }

        // Fetch categories
        const categoriesResponse = await fetch("/api/categories");
        const categoriesData = await categoriesResponse.json();
        
        if (!categoriesResponse.ok) {
          throw new Error("Failed to fetch categories");
        }

        // Update state
        setFormData({
          title: postData.title,
          category: postData.category,
          content: postData.content,
          image: postData.image
        });
        setCategories(categoriesData);
        
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image!");
        toast("Please select an image!");
        return;
      }

      setImageUploading(true);
      setImageUploadError(null);

      const uploadedFile = await uploadFile(file);
      const postImageUrl = getFilePreview(uploadedFile.$id);

      setFormData({ ...formData, image: postImageUrl });
      toast("Image Uploaded Successfully!");

      if (postImageUrl) {
        setImageUploading(false);
      }
    } catch (error) {
      setImageUploadError("Image upload failed");
      console.error(error);
      toast("Image upload failed!");
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `/api/posts/updatepost/${postId}/${currentUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update post");
      }

      toast("Article Updated Successfully!");
      setUpdatePostError(null);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      toast("Something went wrong! Please try again.");
      setUpdatePostError(error.message);
    }
  };

  if (loading) return <div className="text-center py-8 min-h-screen">Loading post...</div>;
  if (updatePostError)
    return (
      <div className="text-red-500 text-center py-8">
        Error: {updatePostError}
      </div>
    );

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold text-slate-700">
        Edit post
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <Input
            type="text"
            placeholder="Title"
            required
            id="title"
            className="w-full sm:w-3/4 h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title || ""}
          />

          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
            value={formData.category || ""}
          >
            <SelectTrigger className="w-full sm:w-1/4 h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue
                placeholder={
                  loadingCategories
                    ? "Loading categories..."
                    : "Select a Category"
                }
              />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                {loadingCategories ? (
                  <SelectItem value="loading" disabled>
                    Loading categories...
                  </SelectItem>
                ) : categoriesError ? (
                  <SelectItem value="error" disabled>
                    Failed to load categories
                  </SelectItem>
                ) : (
                  categories.map((category) => (
                    <SelectItem key={category._id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4 items-center justify-between border-4 border-slate-600 border-dotted p-3">
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:bg-transparent file:border file:border-gray-300
                     file:rounded-lg file:text-gray-700
                     hover:file:bg-gray-50
                     cursor-pointer"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <Button
            type="button"
            className="bg-slate-700"
            onClick={handleUploadImage}
            disabled={imageUploading}
          >
            {imageUploading ? "Uploading..." : "Upload Image"}
          </Button>
        </div>

        {imageUploadError && <p className="text-red-600">{imageUploadError}</p>}

        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}

        <ReactQuill
          theme="snow"
          placeholder="Write something here..."
          className="h-72 mb-12"
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
          value={formData.content || ""}
        />

        <Button
          type="submit"
          className="h-12 bg-green-600 font-semibold max-sm:mt-5 text-md"
        >
          Update Your Article
        </Button>

        {updatePostError && (
          <p className="text-red-600 mt-5">{updatePostError}</p>
        )}
      </form>
    </div>
  );
};

export default EditPost;
