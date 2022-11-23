import React from 'react'
import "./ProductSummary.scss"
import {AiFillDollarCircle} from "react-icons/ai"
import {BiCategory} from "react-icons/bi"
import {BsCart4, BsCartX} from "react-icons/bs"
import InfoBox from '../../infoBox/InfoBox'
import productService from '../../../services/productService'

const earningIcon = <AiFillDollarCircle size={40} color="#fff" />
const productIcon = <BsCart4 size={40} color="#fff" />
const categoryItem = <BiCategory size={40} color="#fff" />
const outOfStockIcon = <BsCartX size={40} color="#fff" />

export default function ProductSummary({products}) {
  return (
    <div className='product-summary'>
      <h3 className='--mt'>Inventory Stats</h3>
      <div className='info-summary'>
        <InfoBox icon={productIcon} title={"Total Products"} count={products.length} bgColor="card1"/>
        <InfoBox icon={earningIcon} title={"Total Store Value"} count={0} bgColor="card2"/>
        <InfoBox icon={outOfStockIcon} title={"Out of Stock"} count={0} bgColor="card3"/>
        <InfoBox icon={categoryItem} title={"All Categories"} count={1} bgColor="card4"/>
      </div>
    </div>
  )
}
