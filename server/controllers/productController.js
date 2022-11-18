const asyncHandler = require("express-async-handler")
const Product = require("../models/productModel")
const { fileSizeFormatter } = require("../utils/fileUpload")
const cloudinary = require("cloudinary").v2

const createProduct = asyncHandler(async (req, res) => {
    const {name, sku, category, quantity, price, description} = req.body

    //validation
    if (!name || !category || !quantity || !price || !description){
        res.status(400)
        throw new Error("Please fill in all fields")
    }

    //Image upload
    let fileData = {}

    if(req.file) {
        //Save image to cloudinary
        let uploadedFile;
        try{
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {folder: "Pinvent App", resource_type: "image"})
        } catch(err){
            res.status(500)
            throw new Error("image could not be uploaded")
        }
        
        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),
        }
    }

    //Create Product
    const product = await Product.create({
        userId: req.user.id, //Might change to user in model
        name,
        sku,
        category,
        quantity,
        price,
        description,
        image: fileData,
    })

    res.status(201).json(product)
})

//Get all products
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({user: req.user.id}).sort("-createdAt") //get products from one user with newest at top
    res.status(200).json(products)
})
module.exports = {
    createProduct,
    getProducts
}