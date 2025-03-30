import Category from '../models/category.model.js';


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