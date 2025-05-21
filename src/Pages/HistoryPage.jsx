import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HistoryPage.css';

const HistoryPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  // Sample data - replace with your actual data from API
  const historyData = [
    {
      id_riwayat: 1,
      id_users: 306,
      id_services: 1,
      service_date: '2025-02-28',
      deskripsi: 'Oil Change, Full Service',
      status: 'Done',
      details: [
        { name: 'Oil Change', price: 45000 },
        { name: 'MotoX Oil', price: 80000 }
      ]
    },
    // Add more history items as needed
  ];

  // Group by month
  const groupedHistory = historyData.reduce((acc, item) => {
    const date = new Date(item.service_date);
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(item);
    return acc;
  }, {});

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleBackClick = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="history-page">
      <nav className="history-nav">
        <div className="user-info">User 306</div>
        <div className="nav-links">
          <button onClick={() => navigate('/')}>Home</button>
          <button className="active">History</button>
          <button onClick={() => navigate('/services')}>Services</button>
          <button onClick={() => navigate('/products')}>Products</button>
          <button onClick={() => navigate('/contact')}>Contact</button>
        </div>
      </nav>

      <div className="history-container">
        <h1>History</h1>
        <p className="subtitle">{selectedOrder ? 'Order Details' : 'Track your services'}</p>

        {!selectedOrder ? (
          <>
            <button className="create-order-btn" onClick={() => navigate('/services')}>
              Create New Order
            </button>

            <div className="current-status">
              <h2>This Month</h2>
              <div className="order-card">
                <div className="order-header">
                  <span>Order #1234</span>
                  <span className="status in-progress">In Progress</span>
                </div>
                <div className="order-date">Today</div>
              </div>
            </div>

            {Object.entries(groupedHistory).map(([monthYear, orders]) => (
              <div key={monthYear} className="month-section">
                <h2>{monthYear}</h2>
                {orders.map((order) => (
                  <div 
                    key={order.id_riwayat} 
                    className="order-card"
                    onClick={() => handleOrderClick(order)}
                  >
                    <div className="order-header">
                      <span>Order #{order.id_riwayat}</span>
                      <span className={`status ${order.status.toLowerCase().replace(' ', '-')}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-date">
                      {new Date(order.service_date).toLocaleDateString('en-GB')}
                    </div>
                  </div>
                ))}
                <div className="month-dates">
                  {/* Display unique dates for the month */}
                  {[
                    ...new Set(
                      orders.map(o =>
                        new Date(o.service_date).toLocaleDateString('en-GB')
                      )
                    )
                  ].join('  ')}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="order-details">
            <button className="back-button" onClick={handleBackClick}>
              ← Back to History
            </button>
            
            <div className="detail-card">
              <div className="detail-header">
                <span>Order #{selectedOrder.id_riwayat}</span>
                <span className={`status ${selectedOrder.status.toLowerCase().replace(' ', '-')}`}>
                  {selectedOrder.status}
                </span>
              </div>
              <div className="detail-date">
                {new Date(selectedOrder.service_date).toLocaleDateString('en-GB')}
              </div>
              
              <div className="service-list">
                {selectedOrder.details.map((service, index) => (
                  <div key={index} className="service-item">
                    <span>* {service.name}</span>
                    <span>Rp {service.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              
              <div className="total-price">
                <span>Total</span>
                <span>Rp {selectedOrder.details.reduce((sum, item) => sum + item.price, 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="history-footer">
        © 2025 Juugo Garage. All Rights Reserved
      </footer>
    </div>
  );
};

export default HistoryPage;