import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; // Import your CSS file for styling
import { useParams } from 'react-router-dom';

const UpdateProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
  });

  const { id } = useParams();

  useEffect(() => {
    // Fetch product details by ID and populate the form
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/app/products/${id}`); // Replace with your endpoint
        const res = response.data; // Assuming the API returns product details
        const product=res.product;
        console.log(product);
        setFormData({
          name: product.name,
          price: product.price,
          description: product.description,
        });
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/app/products/${id}`, formData); // Replace with your endpoint
      console.log('Product updated successfully');
      window.location.href="/";

    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <button onClick={() => { window.location.href = "/" }} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', marginRight: '10px' }}>Go Back</button>

    <div className="form-container">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" style={{
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    backgroundColor: "#28a745",
                                    color: '#fff',
                                    border: 'none',
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                  
                                }}>Update Product</button>
      </form>
    </div>
    </div>

  );
};

export default UpdateProductForm;
