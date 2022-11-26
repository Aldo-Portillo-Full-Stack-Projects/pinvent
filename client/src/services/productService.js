import axios from "axios"

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

//Create New Product

const createProduct = async (formData) => {
    const response = await axios.post(`${BACKEND_URL}/api/products`, formData)
    return response.data
}

//Delete Product

const deleteProduct = async (id) => {
    const response = await axios.delete(`${BACKEND_URL}/api/products/` + id)
    return response.data
}

//Get a Product

const getProduct = async (id) => {
    const response = await axios.get(`${BACKEND_URL}/api/products/` + id)
    return response.data
}



//Get All Products

const getProducts = async (formData) => {
    const response = await axios.get(`${BACKEND_URL}/api/products/`)
    return response.data
}

//Update Product

const updateProduct = async (id, formData) => {
    const response = await axios.patch(`${BACKEND_URL}/api/products/` + id, formData)
    return response.data
}
const productService = {
    createProduct,
    getProducts,
    deleteProduct,
    getProduct,
    updateProduct,
}

export default productService