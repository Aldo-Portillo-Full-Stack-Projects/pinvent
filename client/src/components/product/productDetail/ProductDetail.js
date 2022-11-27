import React from 'react'
import "./ProductDetail.scss"
import {useRedirectLoggedOutUser} from '../../../hooks/useRedirectLoggedOutUser'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectIsLoggedIn } from '../../../redux/features/authSlice'
import { getProduct } from '../../../redux/features/productSlice' 
import Card from '../../card/Card'
import { SpinnerImg } from '../../loader/Loader'
import DOMPurify from 'dompurify'

//Filter through redux is not a good option because we have to refresh page since all states are lost 
export default function ProductDetail() {
  useRedirectLoggedOutUser("/login")

  const {id} = useParams()//Gets ID from params
  const dispatch = useDispatch()

  const isLoggedIn = useSelector(selectIsLoggedIn) //Checks if user is logged in 
  const { product, isLoading, isError, message} = useSelector((state) => state.product)

  const checkAvailability = (quantity) => {
    if(quantity > 0){
      return <span className='--color-success'>In Stock</span>
    }
    return <span className='--color-danger'>Out of Stock</span>
  }

  React.useEffect(() => {
    if(isLoggedIn) {
      dispatch(getProduct(id))
    }

    if(isError) {
      console.log(message);
    }
  },[isLoggedIn, isError, message, dispatch,id])

  return (
    <div className='product-detail'>
      <h3 className='--mt'>Product Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {product && (
          <div className='detail'>
            <Card cardClass="group">
              {product?.image ? (
                <img src={product.image.filePath} alt={product.image.fileName} />
              ): (
                <p>No image set</p>
              )}
            </Card>
            <h4>Product Availability: {checkAvailability(product.quantity)}</h4>
            <hr />
            <h4><span className='badge'>Name: </span> &nbsp; {product.name}</h4>
            <p><b>&rarr; SKU:</b> {product.sku}</p>
            <p><b>&rarr; Category:</b> {product.category}</p>
            <p><b>&rarr; Price:</b> {'$'}{product.price}</p>
            <p><b>&rarr; Quantity in Stock:</b> {product.quantity}</p>
            <p><b>&rarr; Total Stock Value:</b> {'$'}{product.price * product.quantity}</p>
            <hr />
            <div dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.description)
            }}></div>
            <hr />
            {/* <code className='--color-dark'>Created on: {product.createdAt.toLocaleString("en-US")}</code>
            <code className='--color-dark'>Previously Updated: {product.updatedAt.toLocaleString("en-US")}</code> */}
          </div>
        )}
      </Card>
    </div>
  )
}
