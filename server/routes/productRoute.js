const express = require("express");
const { createProduct } = require("../controllers/productController");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {upload} = require('../utils/fileUpload')

router.post('/', protect, upload.single("image"), createProduct) //Change single to array to add multiple

module.exports = router