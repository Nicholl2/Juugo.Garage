import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import ServiceSection from '../components/ServiceSection/ServiceSection';
import Footer from '../components/Footer/Footer';
import './ServicePage.css'; // optional styling
import { useNavigate } from 'react-router-dom';

const ServicePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate ('/book');
  };

  return (
    <>
      <Navbar />
      <ServiceSection />

      {/* Book Appointment Section */}
      <section className="book-appointment">
        <h2>Book Appointment</h2>
        <p>Schedule your service now</p>
        <button className="book-button" onClick={handleClick}>Click Here</button>
      </section>

      <Footer />
    </>
  );
};

export default ServicePage;
