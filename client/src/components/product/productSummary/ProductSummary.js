import React from 'react'
import "./ProductSummary.scss"
import {AiFillDollarCircle} from "react-icons/ai"
import {BiCategory} from "react-icons/bi"
import {BsCart4, BsCartX} from "react-icons/bs"
import InfoBox from '../../infoBox/InfoBox'
import productService from '../../../services/productService'
import { useDispatch, useSelector } from 'react-redux'
import { CALC_CATEGORY, CALC_OUTOFSTOCK, CALC_STORE_VALUE, selectCategory, selectOutOfStock, selectTotalStoreValue } from '../../../redux/features/productSlice'


const earningIcon = <AiFillDollarCircle size={40} color="#fff" />
const productIcon = <BsCart4 size={40} color="#fff" />
const categoryItem = <BiCategory size={40} color="#fff" />
const outOfStockIcon = <BsCartX size={40} color="#fff" />

const formatNumbers = (x) => {
  return x.toString().split( /(?=(?:\d{3})+(?:\.|$))/g ).join( "," );
}
export default function ProductSummary({products}) {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue)
  const outOfStock = useSelector(selectOutOfStock)
  const category = useSelector(selectCategory)

  React.useEffect(() => {
    dispatch(CALC_STORE_VALUE(products))
    dispatch(CALC_OUTOFSTOCK(products))
    dispatch(CALC_CATEGORY(products))
  },[dispatch, products])


  return (
    <div className='product-summary'>
      <h3 className='--mt'>Inventory Stats</h3>
      <div className='info-summary'>
        <InfoBox icon={productIcon} title={"Total Products"} count={products.length} bgColor="card1"/>
        <InfoBox icon={earningIcon} title={"Total Store Value"} count={`$ ${formatNumbers(totalStoreValue.toFixed(2))}`} bgColor="card2"/>
        <InfoBox icon={outOfStockIcon} title={"Out of Stock"} count={outOfStock} bgColor="card3"/>
        <InfoBox icon={categoryItem} title={"All Categories"} count={category.length} bgColor="card4"/>
      </div>
    </div>
  )
}
