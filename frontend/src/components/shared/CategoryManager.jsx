import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react"; // Import trash icon
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "@/components/ui/button";

const CategoryManager = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      toast("Failed to load categories");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        toast("Category added");
        setName("");
        fetchCategories();
      } else {
        toast(await res.text());
      }
    } catch (error) {
      toast("Failed to add category");
    }
  };

  const handleDelete = async (categoryId) => {
    if (!categoryToDelete || isDeleting) return;

    try {
      setIsDeleting(true);
      const res = await fetch(`/api/categories/${categoryToDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json(); // Always parse the response

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete category");
      }

      if (res.ok) {
        toast("Category deleted");
        fetchCategories();
      } else {
        toast("Failed to delete category");
      }
    } catch (error) {
      toast("Error deleting category");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-bold mb-4">Manage Categories</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category name"
          className="w-full p-2 border rounded-lg mb-4 hover:bg-gray-100"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Add Category
        </button>
      </form>

      <div>
        <h3 className="font-semibold mb-2">Existing Categories</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li
              key={cat._id}
              className="flex justify-between items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <span className="font-medium">{cat.name}</span>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCategoryToDelete(cat._id);
                    }}
                    disabled={isDeleting}
                    className="text-red-600 hover:text-red-800 hover:bg-red-100"
                    aria-label={`Delete ${cat.name}`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete the "{cat.name}" category.
                      {cat.slug && ` (Slug: ${cat.slug})`}
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 hover:bg-red-700"
                      onClick={handleDelete}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryManager;
