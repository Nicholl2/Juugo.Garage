import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import ServicePage from './Pages/ServicePage';
import BookAppointment from './Pages/BookAppointment';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ProductPage from './Pages/ProductPage';
import ContactPage from './Pages/ContactPage';
import Settings from './Pages/Settings';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/settings" element={<Settings />} />
        

      </Routes>
    </Router>
  );
}

export default App;
