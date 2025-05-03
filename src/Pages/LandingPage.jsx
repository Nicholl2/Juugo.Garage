import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import HeroSection from '../components/HeroSection/HeroSection';
import MechanicCard from '../components/MechanicCard/MechanicCard';
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts';
import Reviews from '../components/Reviews/Reviews';
import Loader from '../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 1000); 
  };
  

  return (
    <>
      <Navbar />
      {loading && <Loader />}
      {!loading && (
        <>
          <HeroSection onClick={handleClick} />
          <MechanicCard onClick={handleClick} />
          <FeaturedProducts onClick={handleClick} />
          <Reviews />
          <footer style={{ textAlign: 'center', padding: '1rem' }}>
            <p>© 2025 Juugo.Garage. All Rights Reserved</p>
          </footer>
        </>
      )}
    </>
  );
};

export default LandingPage;
