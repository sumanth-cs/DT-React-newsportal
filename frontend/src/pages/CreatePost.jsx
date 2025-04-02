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
import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const quillRef = useRef(null);

  const { toast } = useToast();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  const [formData, setFormData] = useState({});

  const [createPostError, setCreatePostError] = useState(null);

  // Add state for categories
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categoriesError, setCategoriesError] = useState(null);

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
      console.log(error);

      toast("Image upload failed!");
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const username = currentUser?.username || "author";

    const updatedFormData = {
      ...formData,
      authorName: username,
    };

    console.log("Sending data:", updatedFormData);

    try {
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast("Something went wrong! Please try again.");
        setCreatePostError(data.message);

        return;
      }

      if (res.ok) {
        toast("Article Published Successfully!");
        setCreatePostError(null);

        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      toast("Something went wrong! Please try again.");
      setCreatePostError("Something went wrong! Please try again.");
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const res = await fetch("/api/categories");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch categories");
        }

        setCategories(data);
        setLoadingCategories(false);
      } catch (error) {
        setCategoriesError(error.message);
        setLoadingCategories(false);
        toast("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md my-10">
      <h1 className="text-center text-3xl my-3 font-semibold text-slate-700">
        Create a post
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <Input
            type="text"
            placeholder="Title"
            required
            id="title"
            className="w-full sm:w-3/4 h-10 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger className="w-full sm:w-1/4 h-20 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0">
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

        <div className="flex gap-4 items-center justify-between  p-3">
          <input
            type="file"
            accept="image/*"
            className="
                    block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:bg-transparent file:border file:border-gray-300
                    file:rounded-lg file:text-gray-700
                    hover:file:bg-gray-50
                    cursor-pointer
                  "
            onClick={() => console.log("File input clicked!")}
            onChange={(e) => {
              console.log("Selected File:", e.target.files[0]);
              setFile(e.target.files[0]);
            }}
          />

          <Button
            type="button"
            className="bg-slate-700"
            onClick={handleUploadImage}
          >
            {imageUploading ? "Uploading..." : "Upload Image"}
          </Button>
        </div>

        {imageUploadError && <p className="text-red-600">{imageUploadError}</p>}

        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full max-w-3xl rounded-lg object-contain max-h-[500px]"
          />
        )}

        <ReactQuill
          ref={quillRef}
          theme="snow"
          placeholder="Write something here..."
          className="h-72  mb-12 "
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />

        <Button
          type="submit"
          className="h-12 bg-green-600 font-semibold max-sm:mt-5 text-md "
        >
          Publish Your Article
        </Button>

        {createPostError && (
          <p className="text-red-600 mt-5">{createPostError}</p>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
