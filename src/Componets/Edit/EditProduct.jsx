import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditProduct = () => {
    const [products, setProducts] = useState([]);

    // Fetch products on component mount
    useEffect(() => {
      const fetchProducts = async () => {
          try {
              const response = await axios.get('http://localhost:4000/allproducts');
              console.log("Products fetched", response.data); // Log fetched products
              setProducts(response.data);
          } catch (error) {
              console.error("Error fetching products:", error);
          }
      };
  
      fetchProducts();
  }, []);
  

    const updatePrice = async (id, newPrice) => {
        try {
            const response = await axios.put(`http://localhost:4000/updateproduct/${id}`, {
                new_price: newPrice
            });

            if (response.data.success) {
                setProducts(products.map(product => 
                    product._id === id ? {...product, new_price: newPrice} : product
                ));
                alert("Price updated successfully");
            }
        } catch (error) {
            console.error("Error updating price:", error);
            alert("Failed to update price");
        }
    };

    return (
        <div>
            <h2>Products</h2>
            {products.map(product => (
                <div key={product._id}>
                    <p>Name: {product.name}</p>
                    <p>Category: {product.category}</p>
                    <p>Price: 
                        <input
                            type="text"
                            defaultValue={product.new_price}
                            onBlur={(e) => updatePrice(product._id, e.target.value)}
                        />
                    </p>
                    <button onClick={() => updatePrice(product._id, document.getElementById(`price-${product._id}`).value)}>Update Price</button>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default EditProduct;
