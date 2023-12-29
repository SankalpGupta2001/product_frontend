import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import "../App.css";


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(4); // Number of products per page


    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/app/products/');
            console.log(response);
            setProducts(response.data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = async (productId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');

        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/app/products/${productId}`);
                window.location.href = "/";
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const handleUpdate = (productId) => {
        window.location.href = `/update/${productId}`; // Redirect to the update route for the specified product ID
    };


    const navigateToNewUser = () => {
        window.location.href = `/create`;

    };
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Calculate the number of pages
    const totalPages = Math.ceil(products.length / productsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="table-container" >

            <div style={{
                flex: '0 0 48%',
                padding: '1rem',
                background: 'linear-gradient(145deg, #d4d4d4, #ffffff)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                textAlign: 'center',
                marginBottom: '5rem'
            }}>
                <h1 style={{
                    textAlign: 'center',
                    marginBottom: '2rem',
                    textShadow: '0 0 8px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.8), 0 0 18px rgba(255, 255, 255, 0.8), 0 0 24px #ffffff, 0 0 36px #ffffff, 0 0 48px #ffffff, 0 0 66px #ffffff, 0 0 90px #ffffff',
                    border: '1px solid #ccc',
                    padding: '1rem',
                    borderRadius: '20px',
                    width: '95%',
                    margin: 'auto',
                    background: 'linear-gradient(145deg, #d4d4d4, #ffffff)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                    color: '#000', 
                }}>
                    Welcome to Your Product Listing Dashboard
                </h1>
            </div>
            <div >
                <button
                    onClick={navigateToNewUser}
                    style={{
                        padding: '10px 20px',
                        borderRadius: '5px',
                        backgroundColor: "#28a745",
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                        marginLeft: '80px',
                    }}
                >
                    Add New Product
                </button>
            </div>

            <table style={{ borderCollapse: 'collapse', width: '90%', margin: 'auto', border: '1px solid #ddd', borderRadius: '5px' }}>
                <thead style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.description}</td>
                            <td className="action-cell">
                                <button  onClick={() => handleUpdate(product.id)}
                                style={{
                                    padding: '6px 12px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    backgroundColor: '#28a745',
                                    color: '#ffffff',
                                }}
                                >
                                    {/* <EditIcon sx={{ marginRight: '5px' }} /> Update */}
                                    Update
                                </button>
                                <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                                    {/* <DeleteIcon sx={{ marginRight: '5px' }} /> Delete */}
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index + 1} style={{ margin: '0 5px' }}>
                        <button onClick={() => paginate(index + 1)} style={{ padding: '8px 12px', background: currentPage === index + 1 ? '#f44336' : '#ddd', color: currentPage === index + 1 ? 'white' : 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>{index + 1}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
