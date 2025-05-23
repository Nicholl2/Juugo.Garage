import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import './ProductDetail.css';
import Motoroil from '../assets/MotorXoil.png';
import AeroShield from '../assets/AeroShield.png';
import LumoBright from '../assets/LumoBright.png';
import BanTubbles from '../assets/banTubbles.png';
import AirRadiator from '../assets/airradiator.jpg';
import RantaiMotor from '../assets/rantaimotor.jpg';
import GasSpontan from '../assets/gasspontan.jpg';
import ShockBreker from '../assets/ohlins shock.jpg';
import AkiMotor from '../assets/aki.jpg';

// Product Data (consider moving to a separate file)
const importImage = (imageName) => {
  try {
    return require(`../assets/${imageName}`).default;
  } catch (err) {
    console.error(`Gambar tidak ditemukan: ${imageName}`);
    return require('../assets/rantaimotor.jpg').default; // Fallback image
  }
};

// Import all images
const productData = {
  'MotorX Oil': {
    name: "MotorX Oil",
    image: Motoroil,
    description: "Pelumas motor berkualitas tinggi.",
    price: 85000,
    specifications: [
      "Melindungi mesin dari gesekan berlebih.",
      "Cocok untuk motor matic dan bebek.",
      "Formulasi khusus perjalanan jauh."
    ]
  },
  'AeroShield': {
    name: "AeroShield",
    image: AeroShield,
    description: "Windshield mini untuk motor.",
    price: 125000,
    specifications: ["Bahan kuat", "Tahan panas", "Ringan dipasang"]
  },
  'LumoBright': {
    name: "LumoBright",
    image: LumoBright,
    description: "Lampu LED motor super terang.",
    price: 500000,
    specifications: [
      "Daya tahan tinggi",
      "Hemat energi",
      "Mudah dipasang"
    ]
  },
  'Ban Tubles': {
    name: "Ban Tubles",
    image: BanTubbles,
    description: "Ban tubeless untuk motor harian.",
    price: 320000,
    specifications: [
      "Tahan lama",
      "Mudah dipasang",
      "Desain sporty"
    ]
  },
  'Air Radiator': {
    name: "Air Radiator",
    image: AirRadiator,
    description: "Coolant radiator Shell 1L.",
    price: 89000,
    specifications: [
      "Mencegah overheating",
      "Meningkatkan performa mesin",
      "Cocok untuk semua jenis motor"
    ]
  },
  'Rantai UFC MMA': {
    name: "Rantai UFC MMA",
    image: RantaiMotor,
    description: "Rantai motor tahan lama.",
    price: 76000,
    specifications: [
      "Tahan lama",
      "Mudah dipasang",
      "Desain sporty"
    ]
  },
  'Aki Vario Karbu': {
    name: "Aki Vario Karbu",
    image: AkiMotor,
    description: "Aki Yuasa YTZ8V untuk Vario Karbu.",
    price: 121000,
    specifications: [
      "Daya tahan tinggi",
      "Mudah dipasang",
      "Desain sporty"
    ]
  },
  'Sok Breker': {
    name: "Sok Breker",
    image: ShockBreker,
    description: "Shockbreaker KVB heavy duty.",
    price: 514000,
    specifications: [
      "Daya tahan tinggi",
      "Mudah dipasang",
      "Desain sporty"
    ]
  },
  'Gas Spontan': {
    name: "Gas Spontan",
    image: GasSpontan,
    description: "Gas spontan motor universal.",
    price: 120500,
    specifications: [
      "Daya tahan tinggi",
      "Mudah dipasang",
      "Desain sporty"
    ]
  },
  // ... (other products with their respective imported images)
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productData[id];

  const handleBuyNow = () => {
    navigate('/book'); // Ganti dengan path yang sesuai untuk BookAppointment.jsx
  };

  const handleBatalkan = () => {
    navigate('/products'); // Atau path lain jika berbeda
  };

  if (!product) {
    return (
      <div className="product-detail">
        <Navbar />
        <main className="product-detail__main">
          <div className="product-not-found">Produk tidak ditemukan.</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="product-detail">
      <Navbar />
      <main className="product-detail__main">
        <h2 className="product-detail__header">Product Details</h2>
        <div className="product-detail__container">
          <div className="product-detail__image-wrapper">
            <div className="product-detail__image-container">
              <img 
                src={product.image} 
                alt={product.name} 
                className="product-detail__image"
                onError={(e) => {
                  e.target.src = AeroShield;
                  e.target.className = "product-detail__image product-detail__image--error";
                }}
              />
            </div>
          </div>
          
          <div className="product-detail__info">
            <h1 className="product-detail__title">{product.name}</h1>
            <p className="product-detail__description">{product.description}</p>
            <p className="product-detail__price">
              Rp {product.price.toLocaleString('id-ID')}
            </p>
            
            <div className="product-detail__specs">
              <h2 className="specs-title">Spesifikasi:</h2>
              <ul className="specs-list">
                {product.specifications.map((item, index) => (
                  <li key={index} className="specs-item">
                    <span className="specs-icon">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="product-detail__actions">
              <button className="btn btn--primary" onClick={handleBuyNow}>
                Beli Sekarang
              </button>
              <button className="btn btn--secondary" onClick={handleBatalkan}>
                Batalkan
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;