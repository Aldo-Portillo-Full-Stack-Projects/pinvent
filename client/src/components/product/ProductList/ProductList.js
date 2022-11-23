import React from 'react'
import "./ProductList.scss"
import { SpinnerImg } from '../../loader/Loader'
import {FaEdit, FaTrashAlt} from 'react-icons/fa'
import {AiOutlineEye} from 'react-icons/ai'
import Search from '../../search/Search'
import {useSelector, useDispatch} from 'react-redux'
import { FILTER_BY_SEARCH, selectFilteredProduct } from '../../../redux/features/filterSlice'


export default function ProductList({products, isLoading}) {

  const [search, setSearch] = React.useState("")
  const filteredProducts = useSelector(selectFilteredProduct);

  const dispatch = useDispatch()

  const shortenText = (text, n) => {
    if(text.length > n){
      const shortText = text.substring(0, n).concat("...")
      return shortText
    }
    return text
  }
  const renderProducts = filteredProducts.map((product, index) => {
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

  //Start Copy React-Paginate Docs w/ Modifications

  const [currentItems, setCurrentItems] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(0);
  const [itemOffset, setItemOffset] = React.useState(0);
  const itemsPerPage = 1 //Maybe make this 10

  React.useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredProducts.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage))
  }, [itemOffset, itemsPerPage])
  
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  }
  //End Copy React-Paginate Docs

  React.useEffect(() => {
    dispatch(FILTER_BY_SEARCH({products, search}))
  }, [products, search, dispatch])
  return (
    <div className='product-list'>
      <hr />
      <div className='table'>
        <div className='--flex-between --flex-dir-column'>
          <span>
            <h3>Inventory Items</h3>
          </span>
          <span>
            <Search value={search} onChange={(e) => setSearch(e.target.value)}/>
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
