import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductList from '../../components/product/ProductList/ProductList'
import ProductSummary from '../../components/product/productSummary/ProductSummary'
import { useRedirectLoggedOutUser } from '../../hooks/useRedirectLoggedOutUser'
import { selectIsLoggedIn } from '../../redux/features/authSlice'
import {getProducts} from '../../redux/features/productSlice'

export default function Dashboard() {
  useRedirectLoggedOutUser("/login")
  const dispatch = useDispatch()

  const isLoggedIn = useSelector(selectIsLoggedIn) //Checks if user is logged in 
  const { products, isLoading, isError, message} = useSelector((state) => state.product)

  React.useEffect(() => {
    if(isLoggedIn) {
      dispatch(getProducts())
    }

    console.log(products);

    if(isError) {
      console.log(message);
    }
  },[isLoggedIn, isError, message, dispatch, products])
  return (
    <div>
        <ProductSummary products={products}/>
        <ProductList products={products} isLoading={isLoading}/>
    </div>
  )
}
