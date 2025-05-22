import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HistoryPage.css';
import Navbar from '../components/Navbar/Navbar';

const HistoryPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/history', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const sampleOrders = [
    {
      id: 1234,
      date: '05/01/2025',
      status: 'Done',
      items: [
        { name: 'Oil Changes', price: 45000 },
        { name: 'MotoX Oil', price: 80000 }
      ]
    }
  ];

  const calculateTotal = items => items.reduce((sum, item) => sum + item.price, 0);

  if (loading) return <div className="loading">Loading history...</div>;

  return (
    <div className="history-page">
      <Navbar />
      
      <div className="history-container">
        <div className="history-header" style={{ textAlign: 'center' }}>
          <h1>Service History</h1>
          <p>Track your completed services</p>
          <button 
            className="create-order-btn"
            onClick={() => navigate('/services')}
          >
            Create New Order
          </button>
        </div>

        {selectedOrder ? (
          <div className="order-detail-view">
            <button 
              className="back-button"
              onClick={() => setSelectedOrder(null)}
            >
              ← Back to List
            </button>
            
            <div className="history-card">
              <div className="service-meta">
                <span className="order-id">Order #{selectedOrder.id}</span>
                <span className={`status ${selectedOrder.status.toLowerCase()}`}>
                  {selectedOrder.status}
                </span>
              </div>
              <div className="service-date">{selectedOrder.date}</div>
              
              <div className="divider"></div>
              
              <div className="service-items">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="service-meta">
                    <span className="service-name">• {item.name}</span>
                    <span className="price">Rp {item.price.toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>
              
              <div className="divider"></div>
              
              <div className="service-meta total-line">
                <span>Total</span>
                <span className="price">Rp {calculateTotal(selectedOrder.items).toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="history-list">
            {sampleOrders.map(order => (
              <div 
                key={order.id} 
                className="history-card"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="service-info">
                  <h3>Order #{order.id}</h3>
                  <div className="service-meta">
                    <span className="service-date">{order.date}</span>
                    <span className={`status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="history-footer">
        © 2025 Juugo.Garage. All Rights Reserved
      </footer>
    </div>
  );
};

export default HistoryPage;
