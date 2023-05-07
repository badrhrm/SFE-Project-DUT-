const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");
const authentication = require("../middleware/authMiddleware");
const { upload } = require("../utils/fileUpload");

router.post("/", authentication, upload.single("image"), createProduct); //for multiple images use :upload.array("image")
router.get("/", authentication, getAllProducts);
router.get("/:id", authentication, getProduct);
router.delete("/:id", authentication, deleteProduct);
router.patch("/:id", authentication, upload.single("image"), updateProduct);

module.exports = router;
