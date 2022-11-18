const asyncHandler = require("express-async-handler")

const createProduct = asyncHandler(async (req, res) => {
    res.send("Create Product")
})

module.exports = {
    createProduct,
}