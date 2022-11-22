import axios from "axios"

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

//Create New Product

const createProduct = async (formData) => {
    const response = await axios.post(`${BACKEND_URL}/api/products`, formData)
    return response.data
}


//Get All Products

const getProducts = async (formData) => {
    const response = await axios.get(`${BACKEND_URL}/api/products`)
    return response.data
}

const productService = {
    createProduct,
    getProducts

}

export default productService