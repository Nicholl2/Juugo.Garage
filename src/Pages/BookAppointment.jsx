import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookAppointment.css';
import BookApp from '../assets/BookApp.png';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';

const BookAppointment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    licence: '',
    serviceType: null
  });
  const [userData, setUserData] = useState(null);
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');


  useEffect(() => {
    document.title = 'Juugo Garage | Book Appointment';
    
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }
    setUserData(user);

    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/services');
        if (!response.ok) throw new Error('Gagal memuat layanan');
        const data = await response.json();
        setServices(data);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      }
    };

    fetchServices();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const selectServiceType = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      serviceType: serviceId
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setIsSubmitting(true);

  if (!formData.full_name || !formData.phone || !formData.licence || !formData.serviceType) {
    setError('Harap isi semua field');
    setIsSubmitting(false);
    return;
  }

  if (!/^[0-9]{10,13}$/.test(formData.phone)) {
    setError('Nomor telepon harus 10-13 digit angka');
    setIsSubmitting(false);
    return;
  }

  try {
    const selectedService = services.find(s => s.id_services === formData.serviceType);
    if (!selectedService) {
      throw new Error('Service tidak valid');
    }

    const serviceDate = new Date();
    serviceDate.setDate(serviceDate.getDate() + 3);
    const formattedDate = serviceDate.toISOString().split('T')[0];

    const response = await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: JSON.stringify({
        id_users: userData.id_users,
        id_services: formData.serviceType,
        full_name: formData.full_name,
        phone: formData.phone,
        email: userData.email,
        licence: formData.licence,
        service_date: formattedDate,
        deskripsi: `Booking ${selectedService.nama_layanan}`
      })
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Gagal membuat booking');
    }

    // Tampilkan popup
    setSuccessMessage(`Booking berhasil!\nService: ${selectedService.nama_layanan}\nTanggal: ${formattedDate}`);
    setShowSuccessPopup(true);
    
    // Reset form
    setFormData({
      full_name: '',
      phone: '',
      licence: '',
      serviceType: null
    });
    
    // Hapus navigate dari sini, pindahkan ke handler tombol popup

  } catch (err) {
    console.error('Booking error:', err);
    setError(err.message || 'Terjadi kesalahan saat membuat booking');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    
    <div className="book-container">
      {showSuccessPopup && (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Booking Berhasil!</h3>
        <p>{successMessage}</p>
        <div className="popup-buttons">
          <button 
            className="popup-btn secondary"
            onClick={() => setShowSuccessPopup(false)}
          >
            Kembali
          </button>
          <button 
            className="popup-btn primary"
            onClick={() => {
              setShowSuccessPopup(false);
              navigate('/history');
            }}
          >
            Lihat Riwayat
          </button>
        </div>
      </div>
    </div>
)}

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
        
        {error && <div className="error-message">{error}</div>}
        
        <form className="appointment-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="full_name"
            placeholder="Enter your full name" 
            value={formData.full_name}
            onChange={handleChange}
            required
          />
          <input 
            type="tel" 
            name="phone"
            placeholder="Enter your phone number" 
            value={formData.phone}
            onChange={handleChange}
            required
            pattern="[0-9]{10,13}"
            title="Nomor telepon harus 10-13 digit angka"
          />
          <input 
            type="email" 
            name="email"
            placeholder="Email"
            value={userData?.email || ''}
            readOnly
            disabled
          />
          <input 
            type="text" 
            name="licence"
            placeholder="Enter your license number" 
            value={formData.licence}
            onChange={handleChange}
            required
          />
          
          <div className="service-selection">
            <h4>Select Service:</h4>
            <div className="service-options">
              {services.map(service => (
                <div 
                  key={service.id_services}
                  className={`service-card ${formData.serviceType === service.id_services ? 'selected' : ''}`}
                  onClick={() => selectServiceType(service.id_services)}
                >
                  <h5>{service.nama_layanan}</h5>
                  <p>{service.deskripsi}</p>
                  <div className="service-price">Rp {service.harga.toLocaleString('id-ID')}</div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className="submit-btn" 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Memproses...' : 'Confirm Appointment'}
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default BookAppointment;