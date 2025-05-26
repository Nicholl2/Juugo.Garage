import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import './Dashboard.css';
import MotorXOil from '../assets/MotorXoil.png';
import Logo from '../assets/logo.png';
import AeroShield from '../assets/AeroShield.png';
import LumoBright from '../assets/LumoBright.png';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Dashboard | Juugo.Garage';
  }, []);

  return (
    <div className="landing-page">
      <Navbar />

      {/* Hero Section (dikosongkan dari teks Juugo dan diganti dengan welcome content) */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="logo-container">
            <img src={Logo} alt="Juugo Logo" className="main-logo" />
          </div>
          <h2>Welcome to Juugo.Garage</h2>
          <p>Where excellence meets performance</p>
          <button 
            className="cta-button"
            onClick={() => navigate('/services')}
          >
            View Services
          </button>
        </div>
      </section>

            {/* Featured Products */}
      <section className="featured-section">
        <div className="section-header-with-button">
          <div className="header-text">
            <h2>Featured Products</h2>
            <p>Explore our top picks</p>
          </div>
          <button 
            className="view-all"
            onClick={() => navigate('/products')}
          >
            View All
          </button>
        </div>

        <div className="products-grid">
          <div className="product-card" onClick={() => navigate('/products')}>
            <img src={MotorXOil} alt="MotorX Oil" />
            <h3>MotorX Oil</h3>
            <p>500ml</p>
          </div>
          <div className="product-card" onClick={() => navigate('/products')}>
            <img src={AeroShield} alt="AeroShield" />
            <h3>AeroShield</h3>
            <p>Universal Fit</p>
          </div>
          <div className="product-card" onClick={() => navigate('/products')}>
            <img src={LumoBright} alt="LumoBright" />
            <h3>LumoBright</h3>
            <p>2 Pack</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="section-header-with-button">
          <div className="header-text">
            <h2>Our Services</h2>
            <p>Range of services tailored for you</p>
          </div>
          <button 
            className="view-all"
            onClick={() => navigate('/services')}
          >
            See All Services
          </button>
        </div>

        <div className="services-grid">
          <div className="service-card" onClick={() => navigate('/book')}>
            <h3>Oil Change</h3>
            <p>Regular Maintenance</p>
            <p className="price">Rp 150.000</p>
          </div>
          <div className="service-card" onClick={() => navigate('/book')}>
            <h3>Full Service</h3>
            <p>Safety Check</p>
            <p className="price">Rp 1.000.000</p>
          </div>
        </div>
      </section>

      {/* Book Appointment CTA */}
      <section className="book-section">
        <div className="book-content">
          <div className="book-text">
            <h2>Book Appointment</h2>
            <p>Schedule your service now</p>
          </div>
          <div className="book-button">
            <button 
              className="cta-button"
              onClick={() => navigate('/book')}
            >
              Click Here
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Juugo.Garage. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
