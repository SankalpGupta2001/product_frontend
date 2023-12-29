import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './screens/ProductScreen';
import CreateProductForm from './screens/CreateProduct';
import UpdateProductForm from './screens/UpdateProduct';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<ProductList />} />
          <Route exact path="/create" element={<CreateProductForm />} />
          <Route exact path="/update/:id" element={<UpdateProductForm />} />


          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
