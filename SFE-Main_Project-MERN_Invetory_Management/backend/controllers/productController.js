const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

const createProduct = asyncHandler(async (req, res) => {
  // return console.log(req.body);
  // Validation
  if (
    !req.body.name ||
    !req.body.category ||
    !req.body.quantity ||
    !req.body.price
  ) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Handle File Upload
  let fileData = {};
  if (req.file) {
    //upload image to cloudinary and receive its URL to put in
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "SFE-Main_Project-MERN_Inventory_Management",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded.");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Create Product
  const product = await Product.create({
    // Add the user that created the product
    user: req.user._id,
    name: req.body.name,
    sku: req.body.sku,
    category: req.body.category,
    quantity: req.body.quantity,
    price: req.body.price,
    description: req.body.description,
    image: fileData,
  });
  res.status(201).json(product);
});

// Get All Products
const getAllProducts = asyncHandler(async (req, res) => {
  const product = await Product.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(product);
});

// Get a Single Product
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json(`No product with id : ${id}`);
  }
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(product);
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // If product doesn't exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }
  // Match product with its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await product.deleteOne({ productId: product._id });
  //res.status(200).json(product);
  res.status(200).json({ message: "Product deleted successfully" });
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  // if product does not exist
  if (!product) {
    res.status(404);
    throw new Error(`No product with id : ${id}`);
    //return res.status(404).json(`No product with id : ${id}`);
  }

  // Match product with its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Handle File upload
  let fileData = {};
  if (req.file) {
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "SFE-Main_Project-MERN_Inventory_Management",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded.");
    }
    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // update product info
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      category: req.body.category,
      quantity: req.body.quantity,
      price: req.body.price,
      description: req.body.description || product.description,
      image: Object.keys(fileData).length === 0 ? product.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
