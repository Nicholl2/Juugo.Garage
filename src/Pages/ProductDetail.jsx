import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import './ProductDetail.css';

// Assets
import Motoroil from '../assets/MotorXoil.png';
import aeroshield from '../assets/AeroShield.png';
import lampu from '../assets/LumoBright.png';
import bantubles from '../assets/banTubbles.png';
import airradiator from '../assets/airradiator.jpg';
import rantai from '../assets/rantaimotor.jpg';
import akimotor from '../assets/aki.jpg';
import shockbreker from '../assets/ohlins shock.jpg';
import gspontan from '../assets/gasspontan.jpg';

const productData = {
  'MotorX Oil': {
    name: "MotorX Oil",
    image: Motoroil,
    description: "Pelumas motor berkualitas tinggi.",
    price: 85000,
    spesifikasi: [
      "Melindungi mesin dari gesekan berlebih.",
      "Cocok untuk motor matic dan bebek.",
      "Formulasi khusus perjalanan jauh."
    ]
  },
  'AeroShield': {
    name: "AeroShield",
    image: aeroshield,
    description: "Windshield mini untuk motor.",
    price: 125000,
    spesifikasi: ["Bahan kuat", "Tahan panas", "Ringan dipasang"]
  },
  'LumoBright': {
    name: "LumoBright",
    image: lampu,
    description: "Lampu LED motor super terang.",
    price: 500000,
    spesifikasi: ["LED 15 watt", "Anti air", "Daya tahan 2 tahun"]
  },
  'Ban Tubles': {
    name: "Ban Tubles",
    image: bantubles,
    description: "Ban tubeless untuk motor harian.",
    price: 320000,
    spesifikasi: ["Ukuran 70/90", "Grip kuat", "Tahan lama"]
  },
  'Air Radiator': {
    name: "Air Radiator",
    image: airradiator,
    description: "Coolant radiator Shell 1L.",
    price: 89000,
    spesifikasi: ["Isi 1 liter", "Melindungi dari karat", "Mendinginkan optimal"]
  },
  'Rantai UFC MMA': {
    name: "Rantai UFC MMA",
    image: rantai,
    description: "Rantai motor tahan lama.",
    price: 76000,
    spesifikasi: ["Baja kualitas tinggi", "Anti karat"]
  },
  'Aki Vario Karbu': {
    name: "Aki Vario Karbu",
    image: akimotor,
    description: "Aki Yuasa YTZ8V untuk Vario Karbu.",
    price: 121000,
    spesifikasi: ["12V", "Maintenance free"]
  },
  'Sok Breker': {
    name: "Sok Breker",
    image: shockbreker,
    description: "Shockbreaker KVB heavy duty.",
    price: 514000,
    spesifikasi: ["Tahan banting", "Cocok touring"]
  },
  'Gas Spontan': {
    name: "Gas Spontan",
    image: gspontan,
    description: "Gas spontan motor universal.",
    price: 120500,
    spesifikasi: ["Akselerasi cepat", "Cocok semua motor"]
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const product = productData[id];

  if (!product) {
    return (
      <div className="product-detail-page">
        <Navbar />
        <main className="product-not-found">Produk tidak ditemukan.</main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <Navbar />
      <main className="product-detail-content">
        <div className="product-detail-container">
          <img src={product.image} alt={product.name} className="product-detail-image" />
          <div className="product-detail-info">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <h3>Rp {product.price.toLocaleString()}</h3>
            <ul>
              {product.spesifikasi.map((item, index) => (
                <li key={index}>✅ {item}</li>
              ))}
            </ul>
            <div className="button-group">
              <button className="buy-now-btn">Buy Now</button>
              <button className="appointment-btn">Book Appointment</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
