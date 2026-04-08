import React from 'react';
import './WomenPromo.css';

const PromoBanner = () => {
  return (
    <div className="container">
      <div className="promo-grid">
        <div className="promo-main">
          <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80" alt="Trend" />
          <div className="promo-overlay">
            <span className="promo-tag">ТРЕНД</span>
            <h2 className="promo-title">терең<br />көк</h2>
            <p className="promo-subtitle">Сіздің стильдік нұсқаулық<br /><span>Жақын арада танысыңыз</span></p>
          </div>
        </div>

        <div className="promo-side">
          <div className="promo-item">
            <img src="https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=500&q=80" alt="Shoes" />
            <div className="promo-item-info">
              <h3>Биік өкшелі етік</h3>
              <p>және етік</p>
            </div>
          </div>
          <div className="promo-item">
            <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=500&q=80" alt="Care" />
            <div className="promo-item-info">
              <h3>60% дейін жеңілдіктер</h3>
              <p>Жылтыр және күтім</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;