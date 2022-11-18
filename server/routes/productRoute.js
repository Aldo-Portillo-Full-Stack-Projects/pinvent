const express = require("express");
const { createProduct, getProducts, getProduct, deleteProduct } = require("../controllers/productController");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {upload} = require('../utils/fileUpload')

router.post("/", protect, upload.single("image"), createProduct) //Change single to array to add multiple
router.get("/", protect, getProducts)
router.get("/:id", protect, getProduct)
router.delete("/:id", protect, deleteProduct)

module.exports = router