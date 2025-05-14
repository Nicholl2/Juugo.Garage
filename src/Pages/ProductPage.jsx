import React, { useEffect } from 'react';
import './ProductPage.css';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Motoroil from '../assets/MotorXoil.png';
import aeroshield from'../assets/AeroShield.png';
import bantubles from'../assets/banTubbles.png';
import lampu from'../assets/LumoBright.png';
import rantai from'../assets/rantaimotor.jpg';
import gspontan from'../assets/gasspontan.jpg';
import airradiator from'../assets/airradiator.jpg';
import shockbreker from'../assets/ohlins shock.jpg';
import akimotor from'../assets/aki.jpg';

import logo from '../assets/logo.png'; // sesuaikan path jika perlu

const ProductPage = () => {
  useEffect(() => {
    document.title = 'Products | Juugo Garage';
  }, []);

  const products = [
    {
      name: "MotorX Oil",
      image: Motoroil,
      description: "Pelumas motor berkualitas tinggi.",
      price: 85000,
    },
    {
      name: "AeroShield",
      image: aeroshield,
      description: "Windshield mini untuk motor.",
      price: 125000,
    },
    {
      name: "LumoBright",
      image: lampu,
      description: "Lampu LED motor super terang.",
      price: 500000,
    },
    {
      name: "Ban Tubles",
      image: bantubles,
      description: "Ban tubeless untuk motor harian.",
      price: 320000,
    },
    {
      name: "Air Radiator",
      image: airradiator,
      description: "Coolant radiator Shell 1L.",
      price: 89000,
    },
    {
      name: "Rantai UFC MMA",
      image: rantai,
      description: "Rantai motor tahan lama.",
      price: 76000,
    },
    {
      name: "Aki Vario Karbu",
      image: akimotor,
      description: "Aki Yuasa YTZ8V untuk Vario Karbu.",
      price: 121000,
    },
    {
      name: "Sok Breker",
      image: shockbreker,
      description: "Shockbreaker KVB heavy duty.",
      price: 514000,
    },
    {
      name: "Gas Spontan",
      image: gspontan,
      description: "Gas spontan motor universal.",
      price: 120500,
    },
  ];

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
          {products.map((product, index) => (
            <div className="product-card" key={index}>
              <img src={product.image} alt={product.name} />
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p><strong>Rp {product.price.toLocaleString()}</strong></p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
