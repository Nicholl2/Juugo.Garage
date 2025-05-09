import React from 'react';
import { useEffect } from 'react';
import './BookAppointment.css';
import BookApp from '../assets/BookApp.png';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';


const BookAppointment = () => {
  useEffect(() => {
    document.title = 'Juugo Garage | Book Appointment';
  }, []);
  return (
    <div className="book-container">
        <Navbar/>
        
        <section className="intro">
        <div className="text">
          <h2>Book Appointment</h2>
          <p>Schedule your service appointment with Juugo Garage now!</p>
        </div>
        <img src={BookApp} alt="Book Appointment" />
      </section>

      <section className="form-section">
        <div className="form-title">
          <h3>Fill in your details</h3>
          <p>Please provide your contact information below</p>
        </div>
        <form className="appointment-form">
          <input type="text" placeholder="Enter your full name" />
          <input type="tel" placeholder="Enter your phone number" />
          <input type="email" placeholder="Enter your email address" />
          <input type="text" placeholder="Enter your license number" />
          <div className="service-type">
            <button type="button">Ganti Oli</button>
            <button type="button">Ganti Sparepart</button>
            <button type="button">Full Service</button>
          </div>
          <button className="submit-btn" type="submit">Confirm Appointment</button>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default BookAppointment;
