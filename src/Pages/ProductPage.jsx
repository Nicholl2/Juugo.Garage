import React from 'react';
import { useEffect } from 'react';
import './ProductPage.css';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import logo from '../assets/logo.png'; // sesuaikan path jika perlu

const ProductPage = () => {
  useEffect(() => {
    document.title = 'Products | Juugo Garage';
  }, []);
  // Data produk kosong sementara
  const products = [];


  return (
    <div className="product-page">
      <Navbar />
      <main className="product-content">
        <div className="product-header">
          <div>
            <h2>Featured Products</h2>
            <p>Explore our top picks</p>
          </div>
          <img src={logo} alt="Logo" className="product-logo" />
        </div>

        <div className="product-grid">
          {products.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#999' }}>
              No products available. Please check back later.
            </p>
          ) : (
            products.map((product, index) => (
              <div className="product-card" key={index}>
                <img src={product.image} alt={product.name} />
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <p><strong>Rp {product.price.toLocaleString()}</strong></p>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
