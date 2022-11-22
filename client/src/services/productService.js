import axios from "axios"

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

//Create New Product

const createProduct = async (formData) => {
    const response = await axios.post(`${BACKEND_URL}/api/products`, formData)
    return response.data
}


const productService = {
    createProduct,

}

export default productService