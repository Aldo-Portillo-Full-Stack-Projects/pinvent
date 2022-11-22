import React from 'react'
import ProductForm from '../../components/productForm/ProductForm'
import {useDispatch, useSelector} from 'react-redux'
import {createProduct, selectIsLoading} from "../../redux/features/productSlice"
import {useNavigate} from 'react-router-dom'
import Loader from '../../components/loader/Loader'

const initialState = {
    name: "",
    category: "",
    quantity: "",
    price: "",

}
export default function AddProduct() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [product, setProduct] = React.useState(initialState)
    const [productImage, setProductImage] = React.useState("")
    const [imagePreview, setImagePreview] = React.useState(null)
    const [description, setDescription] = React.useState("")

    const isLoading = useSelector(selectIsLoading) //Gets isLoading State from redux/features/productSlice

    const {name, category, quantity, price} = product

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value})
    }
    
    const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]))
    }

    const generateSKU = (category) => {
        const letter = category.slice(0,3).toUpperCase();
        const number = Date.now()
        const sku = letter + "-" + number
        return sku
    }

    const saveProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData() //This is done because the image will not be done before the new form data is created so we append as we go
        formData.append("name", name)
        formData.append("sku", generateSKU(category));
        formData.append("category", category)
        formData.append("quantity", Number(quantity))
        formData.append("price", price)
        formData.append("description", description)
        formData.append("image", productImage)

        await dispatch(createProduct(formData))
        navigate("/dashboard")


    }
  return (
    <div>
        {isLoading && <Loader />}
        <h3 className='--mt'>Add New Product</h3>
        <ProductForm product={product} productImage={productImage} imagePreview={imagePreview} description={description} setDescription={setDescription} handleInputChange={handleInputChange} handleImageChange={handleImageChange} saveProduct={saveProduct}/>
    </div>
  )
}
