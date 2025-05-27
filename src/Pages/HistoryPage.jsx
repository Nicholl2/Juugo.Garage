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
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);

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
      onClick={() => {
        setSelectedOrder(null);
        setIsEditing(false);
      }}
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
        <div className="form-group">
          <label>Name:</label>
          <input 
            type="text" 
            value={isEditing ? editData.full_name : selectedOrder.full_name}
            onChange={(e) => setEditData({
              ...editData,
              full_name: e.target.value
            })}
            disabled={!isEditing}
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input 
            type="text" 
            value={isEditing ? editData.phone : selectedOrder.phone}
            onChange={(e) => setEditData({
              ...editData,
              phone: e.target.value
            })}
            disabled={!isEditing}
          />
        </div>
        <div className="form-group">
          <label>Vehicle License:</label>
          <input 
            type="text" 
            value={isEditing ? editData.licence : selectedOrder.licence}
            onChange={(e) => setEditData({
              ...editData,
              licence: e.target.value
            })}
            disabled={!isEditing}
          />
        </div>
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

      {!isEditing ? (
        <button 
          className="edit-button"
          onClick={() => {
            setIsEditing(true);
            setEditData({
              full_name: selectedOrder.full_name,
              phone: selectedOrder.phone,
              email: selectedOrder.email,
              licence: selectedOrder.licence
            });
          }}
        >
          Edit Order
        </button>
      ) : (
        <div className="edit-actions">
          <button 
            className="cancel-button"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
          <button 
            className="update-button"
            onClick={async () => {
              try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:5000/api/orders/${selectedOrder.id}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify(editData)
                });

                const result = await response.json();

                if (result.success) {
                  alert('Order updated successfully!');
                  setSelectedOrder({
                    ...selectedOrder,
                    ...editData
                  });
                  setIsEditing(false);
                  navigate('/history'); // Redirect ke halaman booking
                } else {
                  throw new Error(result.message || 'Failed to update order');
                }
              } catch (error) {
                console.error('Update error:', error);
                alert(`Error updating order: ${error.message}`);
              }
            }}
          >
            Update Order
          </button>
        </div>
      )}
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

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './HistoryPage.css';
// import Navbar from '../components/Navbar/Navbar';

// const HistoryPage = () => {
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editData, setEditData] = useState(null);
//   const [shouldRefetch, setShouldRefetch] = useState(false); // ✅ trigger refetch

//   useEffect(() => {
//     document.title = 'History | Juugo.Garage';
    
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const user = JSON.parse(localStorage.getItem('user'));
        
//         if (!user || !user.id_users) {
//           navigate('/login');
//           return;
//         }

//         const response = await fetch(`http://localhost:5000/api/history?user_id=${user.id_users}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();

//         if (result.success) {
//           setOrders(result.data || []);
//         } else {
//           setError(result.message || 'Failed to load history');
//         }
//       } catch (error) {
//         console.error('Fetch error:', error);
//         setError(error.message || 'Failed to fetch orders');
//       } finally {
//         setLoading(false);
//         setShouldRefetch(false); // ✅ reset refetch trigger
//       }
//     };

//     fetchOrders();
//   }, [navigate, shouldRefetch]); // ✅ depend on shouldRefetch

//   const calculateTotal = (items) => {
//     return items.reduce((total, item) => total + parseInt(item.price), 0);
//   };

//   if (loading) {
//     return (
//       <div className="history-page">
//         <Navbar />
//         <div className="loading">Loading your service history...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="history-page">
//         <Navbar />
//         <div className="error-message">
//           <p>Error: {error}</p>
//           <button onClick={() => window.location.reload()}>Try Again</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="history-page">
//       <Navbar />
      
//       <div className="history-container">
//         <div className="history-header">
//           <h1>Service History</h1>
//           <p>Your completed service appointments</p>
//           <button 
//             className="create-order-btn"
//             onClick={() => navigate('/book')}
//           >
//             Book New Service
//           </button>
//         </div>

//         {selectedOrder ? (
//           <div className="order-detail-view">
//             <button 
//               className="back-button"
//               onClick={() => {
//                 setSelectedOrder(null);
//                 setIsEditing(false);
//               }}
//             >
//               &larr; Back to List
//             </button>
            
//             <div className="history-card detailed-view">
//               <div className="order-meta">
//                 <h3>Order #{selectedOrder.id}</h3>
//                 <span className={`status-badge ${selectedOrder.status.toLowerCase()}`}>
//                   {selectedOrder.status}
//                 </span>
//               </div>
              
//               <p className="order-date">{selectedOrder.date}</p>
              
//               <div className="customer-details">
//                 <h4>Customer Information</h4>
//                 <div className="form-group">
//                   <label>Name:</label>
//                   <input 
//                     type="text" 
//                     value={isEditing ? editData.full_name : selectedOrder.full_name}
//                     onChange={(e) => setEditData({
//                       ...editData,
//                       full_name: e.target.value
//                     })}
//                     disabled={!isEditing}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Phone:</label>
//                   <input 
//                     type="text" 
//                     value={isEditing ? editData.phone : selectedOrder.phone}
//                     onChange={(e) => setEditData({
//                       ...editData,
//                       phone: e.target.value
//                     })}
//                     disabled={!isEditing}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Vehicle License:</label>
//                   <input 
//                     type="text" 
//                     value={isEditing ? editData.licence : selectedOrder.licence}
//                     onChange={(e) => setEditData({
//                       ...editData,
//                       licence: e.target.value
//                     })}
//                     disabled={!isEditing}
//                   />
//                 </div>
//               </div>
              
//               <div className="service-details">
//                 <h4>Service Performed</h4>
//                 {selectedOrder.items.map((item, index) => (
//                   <div key={index} className="service-item">
//                     <span>{item.name}</span>
//                     <span>Rp {parseInt(item.price).toLocaleString('id-ID')}</span>
//                   </div>
//                 ))}
//               </div>
              
//               <div className="order-total">
//                 <strong>Total</strong>
//                 <strong>Rp {parseInt(calculateTotal(selectedOrder.items)).toLocaleString('id-ID')}</strong>
//               </div>

//               {!isEditing ? (
//                 <button 
//                   className="edit-button"
//                   onClick={() => {
//                     setIsEditing(true);
//                     setEditData({
//                       full_name: selectedOrder.full_name,
//                       phone: selectedOrder.phone,
//                       licence: selectedOrder.licence
//                     });
//                   }}
//                 >
//                   Edit Order
//                 </button>
//               ) : (
//                 <div className="edit-actions">
//                   <button 
//                     className="cancel-button"
//                     onClick={() => setIsEditing(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button 
//                     className="update-button"
//                     onClick={async () => {
//                       try {
//                         const token = localStorage.getItem('token');
//                         const response = await fetch(`http://localhost:5000/api/orders/${selectedOrder.id}`, {
//                           method: 'PUT',
//                           headers: {
//                             'Content-Type': 'application/json',
//                             'Authorization': `Bearer ${token}`
//                           },
//                           body: JSON.stringify(editData)
//                         });

//                         const result = await response.json();

//                         if (result.success) {
//                           alert('Order updated successfully!');
//                           setShouldRefetch(true); // ✅ trigger re-fetch
//                           setSelectedOrder(null);  // ✅ kembali ke list
//                           setIsEditing(false);
//                         } else {
//                           throw new Error(result.message || 'Failed to update order');
//                         }
//                       } catch (error) {
//                         console.error('Update error:', error);
//                         alert(`Error updating order: ${error.message}`);
//                       }
//                     }}
//                   >
//                     Update Order
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         ) : (
//           <div className="history-list">
//             {orders.length === 0 ? (
//               <div className="empty-state">
//                 <p>No service history found</p>
//               </div>
//             ) : (
//               orders.map(order => (
//                 <div 
//                   key={order.id} 
//                   className="history-card list-item"
//                   onClick={() => setSelectedOrder(order)}
//                 >
//                   <div className="order-meta">
//                     <h4>Order #{order.id}</h4>
//                     <span className={`status-badge ${order.status.toLowerCase()}`}>
//                       {order.status}
//                     </span>
//                   </div>
//                   <p className="order-date">{order.date}</p>
//                   <p className="service-preview">
//                     {order.items[0].name} - Rp {parseInt(order.items[0].price).toLocaleString('id-ID')}
//                   </p>
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>
      
//       <footer className="history-footer">
//         © {new Date().getFullYear()} Juugo Garage. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default HistoryPage;
