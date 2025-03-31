import Category from '../models/category.model.js';
import Post from '../models/post.model.js';


// Function to create a new category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = name.toLowerCase().replace(/ /g, '-');

    const category = new Category({ name, slug });
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: 'Category already exists' });
  }
};

// Function to get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Function to delete a category
// DELETE /api/categories/:id
// export const deleteCategory = async (req, res) => {
//   try {
//     const category = await Category.findById(req.params.id);

//     if (!category) {
//       return res.status(404).json({ message: 'Category not found' });
//     }

//     // Check if any posts are using this category
//     const postsWithCategory = await Post.countDocuments({ category: category.name });
//     if (postsWithCategory > 0) {
//       return res.status(400).json({
//         message: `Cannot delete - ${postsWithCategory} posts are using this category`
//       });
//     }

//     await category.remove();
//     res.json({ message: 'Category removed' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// }

export const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ 
      message: 'Failed to delete category',
      error: error.message 
    });
  }
}