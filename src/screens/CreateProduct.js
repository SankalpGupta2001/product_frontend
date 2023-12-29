import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; 


const CreateProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/app/products', formData); // Replace with your endpoint
      console.log('Product added successfully');
      // Reset form fields after successful submission
      setFormData({ name: '', price: '', description: '' });
      window.location.href="/";
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <button onClick={() => { window.location.href = "/" }} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', marginRight: '10px' }}>Go Back</button>

    <div className="form-container">
      <h2>Add New Product</h2>

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
                                   
                                }}>Add Product</button>
      </form>
    </div>
    </div>

  );
};

const styles = {
    container: {
        maxWidth: '500px',
        margin: 'auto',
        padding: 20,
        border: '1px solid #ccc',
        borderRadius: 8,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
    },
    heading: {
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        display: 'block',
        marginBottom: 5,
        color: '#555',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: 10,
        fontSize: 16,
        marginBottom: 10,
        border: '1px solid #ccc',
        borderRadius: 5,
    },
    button: {
        display: 'block',
        width: '100%',
        padding: 10,
        fontSize: 16,
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#d32f2f',
    },
};


export default CreateProductForm;
