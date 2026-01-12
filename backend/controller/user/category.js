const Category = require("../../model/category"); 
const upload = require("../../middleware/multermiddleware")

// Add Category
exports.addCategory = [upload.single("photo"), async (req, res) => {
  try {
    const { categoryName } = req.body;

    if (!categoryName || !req.file) {
      return res.status(400).json({ message: "Category name and image are required" });
    }

    const newCategory = new Category({
      categoryName,
      photo: req.file.path,
    });

    await newCategory.save();
    res.status(201).json({message: "Category added successfully",data: newCategory});
  } catch (error) {
    res.status(500).json({message: "Error adding category",error: error.message});
  }
}];

// Get All Categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    if (categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }

    res.status(200).json({message: "Categories retrieved successfully",data: categories,});
  } catch (error) {
    res.status(500).json({  message: "Error retrieving categories",error: error.message});
  }
};

// Get Category by ID
// exports.getCategoryById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const category = await Category.findById(id);

//     if (!category) {
//       return res
//         .status(404)
//         .json({ message: "Category not found" });
//     }

//     res
//       .status(200)
//       .json({
//         message: "Category retrieved successfully",
//         data: category,
//       });
//   } catch (error) {
//     res
//       .status(500)
//       .json({
//         message: "Error retrieving category",
//         error: error.message,
//       });
//   }
// };

// Update Category
exports.updateCategory = [upload.single("photo"),async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;

    if (!categoryName && !req.file) {
      return res.status(400).json({ message: "At least one field is required to update" });
    }

    const newPhoto = req.file.path;
    const category = await Category.findByIdAndUpdate(
      id,
      { categoryName, newPhoto },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category updated successfully", data: category,});
  } catch (error) {
       res.status(500).json({ message: "Error updateing category", error: error.message});
    }
}]

// Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error: error.message});
  }
};
