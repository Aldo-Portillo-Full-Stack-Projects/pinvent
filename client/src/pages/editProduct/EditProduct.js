import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/loader/Loader';
import ProductForm from '../../components/product/productForm/ProductForm';
import { getProduct, getProducts, selectIsLoading, selectProduct, updateProduct } from '../../redux/features/productSlice';

export default function EditProduct() {
    const {id} = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isLoading = useSelector(selectIsLoading)
    const productEdit = useSelector(selectProduct)

    const [product, setProduct] = React.useState(productEdit)
    const [productImage, setProductImage] = React.useState("")
    const [imagePreview, setImagePreview] = React.useState(null)
    const [description, setDescription] = React.useState("")

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value})
    }
    
    const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]))
    }

    React.useEffect(() => {
        dispatch(getProduct(id))
    },[dispatch, id])

    React.useEffect(() => {
        setProduct(productEdit)
        setImagePreview(
            productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
        )
        setDescription(
            productEdit && productEdit.description ? productEdit.description : ""
        )
    },[productEdit])

    const saveProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData() //This is done because the image will not be done before the new form data is created so we append as we go
        formData.append("name", product.name);
        formData.append("category", product?.category)
        formData.append("quantity", Number(product?.quantity))
        formData.append("price", product?.price)
        formData.append("description", description)
        if(productImage){
            formData.append("image", productImage)
        }
        

        await dispatch(updateProduct({id, formData}))

        await dispatch(getProducts())
        navigate("/dashboard")


    }
  return (
    <div>
        {isLoading && <Loader />}
        <h3 className='--mt'>Edit Product</h3>
        <ProductForm product={product} productImage={productImage} imagePreview={imagePreview} description={description} setDescription={setDescription} handleInputChange={handleInputChange} handleImageChange={handleImageChange} saveProduct={saveProduct}/>
    </div>
  )
}
