import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("Жүктелуде...");

  useEffect(() => {
    // Маңызды: Адрес бэкэндтегімен (5000 порт) сәйкес келуі тиіс
    fetch(`${API_URL}/api/orders`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Сервер қатесі: ${res.status}`); 
        }
        return res.json();
      })
      .then(data => {
        if (data.length === 0) {
          setStatus("Тапсырыстар табылмады (База бос)");
        } else {
          setOrders(data);
        }
      })
      .catch(err => {
        console.error("Фронтендтегі қате:", err);
        setStatus("Қате: " + err.message);
      });
  }, []);

  return (
    <div style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center' }}>Менің тапсырыстарым</h1>
      <hr />
      
      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2 style={{ color: status.includes("Қате") ? 'red' : '#666' }}>{status}</h2>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px', marginTop: '30px' }}>
          {orders.map(order => (
            <div key={order.id} style={{ 
              border: '1px solid #eee', 
              padding: '20px', 
              borderRadius: '12px',
              backgroundColor: '#fff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Тапсырыс №{order.id}</span>
                <span style={{ 
                  background: '#e0f7fa', color: '#006064', 
                  padding: '4px 10px', borderRadius: '20px', fontSize: '12px' 
                }}>
                  {order.status || 'paid'}
                </span>
              </div>
              <p><strong>Клиент:</strong> {order.user_name}</p>
              <p><strong>Мекен-жай:</strong> {order.address}</p>
              <p><strong>Уақыты:</strong> {new Date(order.created_at).toLocaleString()}</p>
              <h3 style={{ color: '#2ecc71', marginTop: '10px' }}>
                Жалпы сома: {order.total_amount} ₸
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;