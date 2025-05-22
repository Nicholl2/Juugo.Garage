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

  useEffect(() => {
    document.title = 'Juugo Garage | Book Appointment';
    
    // Ambil data user dari localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }
    setUserData(user);

    // Load services dari backend
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/services');
        const data = await response.json();
        if (response.ok) {
          setServices(data);
        }
      } catch (err) {
        console.error('Gagal memuat layanan:', err);
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

  if (!formData.full_name || !formData.phone || !formData.licence || !formData.serviceType) {
    setError('Harap isi semua field');
    return;
  }

  try {
    const selectedService = services.find(s => s.id_services === formData.serviceType);
    if (!selectedService) {
      throw new Error('Service tidak valid');
    }

    // Format tanggal (misal: 3 hari dari sekarang)
    const serviceDate = new Date();
    serviceDate.setDate(serviceDate.getDate() + 3);
    const formattedDate = serviceDate.toISOString().split('T')[0];

    const response = await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
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

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Gagal membuat booking');
    }

    alert(`Booking berhasil! Order ID: ${data.data.order.insertId}`);
    navigate('/history');
    
  } catch (err) {
    console.error('Booking error:', err);
    setError(err.message || 'Gagal membuat booking');
  }
};
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');

  //   // Validasi form
  //   if (!formData.full_name || !formData.phone || !formData.licence || !formData.serviceType) {
  //     setError('Harap isi semua field dan pilih jenis servis');
  //     return;
  //   }

  //   try {
  //     const response = await fetch('http://localhost:5000/api/orders', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         id_users: userData.id_users,
  //         id_services: formData.serviceType,
  //         full_name: formData.full_name,
  //         phone: formData.phone,
  //         email: userData.email, // Email diambil dari data user
  //         licence: formData.licence
  //       })
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(data.message || 'Gagal membuat appointment');
  //     }

  //     alert('Appointment berhasil dibuat!');
  //     navigate('/'); // Redirect ke halaman utama

  //   } catch (err) {
  //     console.error('Error:', err);
  //     setError(err.message || 'Terjadi kesalahan saat membuat appointment');
  //   }
  // };

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
                  <div className="service-price">Rp {service.harga.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
          
          <button className="submit-btn" type="submit">
            Confirm Appointment
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default BookAppointment;
// import React from 'react';
// import { useEffect } from 'react';
// import './BookAppointment.css';
// import BookApp from '../assets/BookApp.png';
// import Footer from '../components/Footer/Footer';
// import Navbar from '../components/Navbar/Navbar';


// const BookAppointment = () => {
//   useEffect(() => {
//     document.title = 'Juugo Garage | Book Appointment';
//   }, []);
//   return (
//     <div className="book-container">
//         <Navbar/>
        
//         <section className="intro">
//         <div className="text">
//           <h2>Book Appointment</h2>
//           <p>Schedule your service appointment with Juugo Garage now!</p>
//         </div>
//         <img src={BookApp} alt="Book Appointment" />
//       </section>

//       <section className="form-section">
//         <div className="form-title">
//           <h3>Fill in your details</h3>
//           <p>Please provide your contact information below</p>
//         </div>
//         <form className="appointment-form">
//           <input type="text" placeholder="Enter your full name" />
//           <input type="tel" placeholder="Enter your phone number" />
//           <input type="email" placeholder="Enter your email address" />
//           <input type="text" placeholder="Enter your license number" />
//           <div className="service-type">
//             <button type="button">Ganti Oli</button>
//             <button type="button">Ganti Sparepart</button>
//             <button type="button">Full Service</button>
//           </div>
//           <button className="submit-btn" type="submit">Confirm Appointment</button>
//         </form>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default BookAppointment;
