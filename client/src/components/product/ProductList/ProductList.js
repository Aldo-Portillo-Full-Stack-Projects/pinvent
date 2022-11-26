import React from 'react'
import "./ProductList.scss"
import { SpinnerImg } from '../../loader/Loader'
import {FaEdit, FaTrashAlt} from 'react-icons/fa'
import {AiOutlineEye} from 'react-icons/ai'
import Search from '../../search/Search'
import {useSelector, useDispatch} from 'react-redux'
import { FILTER_BY_SEARCH, selectFilteredProduct } from '../../../redux/features/filterSlice'
import ReactPaginate from 'react-paginate'
import {confirmAlert} from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deleteProduct, getProducts } from '../../../redux/features/productSlice'
import { Link } from 'react-router-dom'


export default function ProductList({products, isLoading}) {

  const [search, setSearch] = React.useState("")
  const filteredProducts = useSelector(selectFilteredProduct);
  const [currentItems, setCurrentItems] = React.useState([]);

  const dispatch = useDispatch()

  const shortenText = (text, n) => {
    if(text.length > n){
      const shortText = text.substring(0, n).concat("...")
      return shortText
    }
    return text
  }

  const delProduct = async (id) => {
    await dispatch( deleteProduct(id))
    await dispatch(getProducts())
  }
  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete Product',
      message: 'Are you sure to delete this item?.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => delProduct(id)
        },
        {
          label: 'Cancel',
        }
      ]
    });
  }

  const renderProducts = currentItems.map((product, index) => {
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
            <Link to={`/product-detail/${_id}`}><AiOutlineEye size={25} color={"purple"} /></Link>
            <FaEdit size={20} color={"green"}/> 
            <FaTrashAlt size={20} color={"red"} onClick={() => confirmDelete(_id)}/>
        </td>
      </tr>
    )
  })

  //Start Copy React-Paginate Docs w/ Modifications

  
  const [pageCount, setPageCount] = React.useState(0);
  const [itemOffset, setItemOffset] = React.useState(0);
  const itemsPerPage = 5 //Maybe make this 10

  React.useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredProducts.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage))
  }, [itemOffset, itemsPerPage, filteredProducts])
  
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
        <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< Prev"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName='page-num'
        previousLinkClassName='page-num'
        nextLinkClassName='page-num'
        activeLinkClassName='active'
      />
      </div>
    </div>
  )
}
