import React from 'react';
import './FeaturedProducts.css';
import MotorXoil from '../../assets/MotorXoil.png';
import AeroShield from '../../assets/AeroShield.png';
import LumoBright from '../../assets/LumoBright.png';
import { useNavigate } from 'react-router-dom';



const products = [
  {
    name: 'MotorX Oil',
    description: 'High performance engine oil for all bikes.',
    image: MotorXoil,
  },
  {
    name: 'AeroShield',
    description: 'Wind protection with aerodynamic design.',
    image: AeroShield,
  },
  {
    name: 'LumoBright',
    description: 'LED headlight with extreme brightness.',
    image: LumoBright,
  },
];

const FeaturedProducts = ({ onClick }) => {
  const navigate = useNavigate();

  return (
    <section className="featured">
      <h2>Featured Products</h2>
      <div className="product-list">
  {products.map((item, index) => (
          <div className="product-card" key={index}>
            <img src={item.image} alt={item.name} className="product-image" />
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            <button onClick={onClick}>View</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
