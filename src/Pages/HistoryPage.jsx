import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HistoryPage.css';
import Navbar from '../components/Navbar/Navbar';

const HistoryPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'History | Juugo.Garage';
    
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (!user || !user.id_users) {
          navigate('/login');
          return;
        }

        const response = await fetch(`http://localhost:5000/api/history?user_id=${user.id_users}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          setOrders(result.data || []);
        } else {
          setError(result.message || 'Failed to load history');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + parseInt(item.price), 0);
  };

  if (loading) {
    return (
      <div className="history-page">
        <Navbar />
        <div className="loading">Loading your service history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="history-page">
        <Navbar />
        <div className="error-message">
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="history-page">
      <Navbar />
      
      <div className="history-container">
        <div className="history-header">
          <h1>Service History</h1>
          <p>Your completed service appointments</p>
          <button 
            className="create-order-btn"
            onClick={() => navigate('/book')}
          >
            Book New Service
          </button>
        </div>

        {selectedOrder ? (
          <div className="order-detail-view">
            <button 
              className="back-button"
              onClick={() => setSelectedOrder(null)}
            >
              &larr; Back to List
            </button>
            
            <div className="history-card detailed-view">
              <div className="order-meta">
                <h3>Order #{selectedOrder.id}</h3>
                <span className={`status-badge ${selectedOrder.status.toLowerCase()}`}>
                  {selectedOrder.status}
                </span>
              </div>
              
              <p className="order-date">{selectedOrder.date}</p>
              
              <div className="customer-details">
                <h4>Customer Information</h4>
                <p><strong>Name:</strong> {selectedOrder.full_name}</p>
                <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                <p><strong>Vehicle License:</strong> {selectedOrder.licence}</p>
              </div>
              
              <div className="service-details">
                <h4>Service Performed</h4>
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="service-item">
                    <span>{item.name}</span>
                    <span>Rp {parseInt(item.price).toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>
              
              <div className="order-total">
                <strong>Total</strong>
                <strong>Rp {parseInt(calculateTotal(selectedOrder.items)).toLocaleString('id-ID')}</strong>
              </div>
            </div>
          </div>
        ) : (
          <div className="history-list">
            {orders.length === 0 ? (
              <div className="empty-state">
                <p>No service history found</p>
              </div>
            ) : (
              orders.map(order => (
                <div 
                  key={order.id} 
                  className="history-card list-item"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="order-meta">
                    <h4>Order #{order.id}</h4>
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="order-date">{order.date}</p>
                  <p className="service-preview">
                    {order.items[0].name} - Rp {parseInt(order.items[0].price).toLocaleString('id-ID')}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      
      <footer className="history-footer">
        © {new Date().getFullYear()} Juugo Garage. All rights reserved.
      </footer>
    </div>
  );
};

export default HistoryPage;
