import React, { useEffect, useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (!user) {
    return <div className="container">Сіз жүйеге кірмегенсіз.</div>;
  }

  return (
    <div className="container profile-page">
      <h1>Менің профилім</h1>
      <div className="profile-card">
        <div className="avatar-big">
          {user.name ? user.name[0].toUpperCase() : 'U'}
        </div>
        <div className="user-details">
          <p><strong>Аты-жөні:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Рөлі:</strong> Пайдаланушы</p>
        </div>
      </div>
      
      <div className="order-history">
        <h3>Тапсырыстар тарихы</h3>
        <p className="empty-text">Сізде әзірге тапсырыстар жоқ.</p>
      </div>
    </div>
  );
};

export default Profile;