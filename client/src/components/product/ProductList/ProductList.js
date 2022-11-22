import React from 'react'
import "./ProductList.scss"
import { SpinnerImg } from '../../loader/Loader'
import {FaEdit, FaTrashAlt} from 'react-icons/fa'
import {AiOutlineEye} from 'react-icons/ai'

export default function ProductList({products, isLoading}) {

  const shortenText = (text, n) => {
    if(text.length > n){
      const shortText = text.substring(0, n).concat("...")
      return shortText
    }
    return text
  }
  const renderProducts = products.map((product, index) => {
    const {_id, name, category, price, quantity} = product
    return (
      <tr key={_id}>
        <td>{index + 1}</td>
        <td>{shortenText(name, 16)}</td>
        <td>{category}</td>
        <td>{'$'}{price}</td>
        <td>{quantity}</td>
        <td>{quantity * price}</td>
        <td className='icons'>
            <AiOutlineEye size={25} color={"purple"}/> 
            <FaEdit size={20} color={"green"}/> 
            <FaTrashAlt size={20} color={"red"}/>
        </td>
      </tr>
    )
  })

  return (
    <div className='product-list'>
      <hr />
      <div className='table'>
        <div className='--flex-between --flex-dir-column'>
          <span>
            <h3>Inventory Items</h3>
          </span>
          <span>
            <h3>Search products</h3>
          </span>
        </div>

        {isLoading && <SpinnerImg />}
        <div className='table'>
          {!isLoading && products.length === 0 ? (
            <p>No Products Found, Please Add A Product</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Num.</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {renderProducts}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
