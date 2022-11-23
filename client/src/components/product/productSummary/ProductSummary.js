import React from 'react'
import "./ProductSummary.scss"
import {AiFillDollarCircle} from "react-icons/ai"
import {BiCategory} from "react-icons/bi"
import {BsCart4, BsCartX} from "react-icons/bs"

const earningIcon = <AiFillDollarCircle size={40} color="#fff" />
const productIcon = <BsCart4 size={40} color="#fff" />
const categoryItem = <BiCategory size={40} color="#fff" />
const outOfStockIcon = <BsCartX size={40} color="#fff" />

export default function ProductSummary() {
  return (
    <div>ProductSummary</div>
  )
}
