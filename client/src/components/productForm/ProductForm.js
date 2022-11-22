import React from 'react'
//import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./ProductForm.scss"
import Card from '../../components/card/Card'

export default function ProductForm({passProps, handleImageChange, product, productImage, imagePreview, description, setDescription, handleInputChange, saveProduct}) {

  return (
    <div className='add-product'>
        <Card cardClass={"card"}>
            <form onSubmit={saveProduct}>
                <Card cardClass={"group"}>
                    <label>Product Image</label>
                    <code className='--color-dark'>Supported formats: jpg, jpeg, png</code>
                    <input type="file" name="image" onChange={(e) => handleImageChange(e)} />
                    {imagePreview != null ? (
                        <div className='image-preview'>
                            <img src={imagePreview} alt="product" />
                        </div>
                    ): (<p>No image set for this product</p>)}
                </Card>
            </form>
        </Card>
    </div>
  )
}
