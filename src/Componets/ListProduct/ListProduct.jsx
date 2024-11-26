import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

import { useNavigate } from 'react-router-dom';

  

const ListProduct = () => {

  const navigate = useNavigate();

  const[allproducts,setAllProducts] = useState([]);
  const fetchInfo = async () =>{
    await fetch('http://localhost:4000/allproducts')
    .then((res)=>res.json())
    .then((data)=>{setAllProducts(data)});
  }

  useEffect(()=>{
    fetchInfo();
  },[])

  const remove_product = async (id) =>{
    await fetch('http://localhost:4000/removeproduct',{
      method : 'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();

  }

  return (
    <div className='list-product'>

      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Tag</p>
        <p>Old price</p>
        <p>New price</p>
        <p>Category</p>
        <p>Remove</p>
        <p>Edit</p>
      </div>
      <div className="listproduct-allproduct">
        <hr/>
        {allproducts.map((product,index)=>{
            
          return <><div key ={index} className="listproduct-format-main listproduct-format">
              <img src={product.image} alt="" className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>{product.tag}</p>
              <p>Rs {product.old_price}</p>
              <p>Rs {product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={()=>{remove_product(product.id)}} src={cross_icon} alt="" className="listproduct-remove-icon" />
              <button onClick={() => navigate(`/editproduct/${product.id}`)}>EDIT</button>
          </div>
          <hr/></>

        })}

      </div>
    </div>
  )
}

export default ListProduct
