import React from 'react';
import './MenDepartmentBanner.css';

const MenDepartmentBanner = () => {
  return (
    <div className="men-department-section">
      <div className="large-banner">
        <div className="banner-top-group">
          <h1>ЕРЛЕРГЕ АРНАЛҒАН</h1>
          <div className="central-gold-box">
            <p className="central-title">ЖАҢА ТОПТАМА 2026</p>
          </div>
        </div>

       

        <div className="banner-text-bottom">
          <p className="bottom-subtitle">КЛАССИКАДАН СПОРТҚА ДЕЙІН</p>
          <p className="bottom-quote">Өзіңе тән стильді тап.</p>
          <div className="banner-navigation">
            <button className="nav-arrow">←</button>
            <span className="nav-index">2 / 4</span>
            <button className="nav-arrow">→</button>
          </div>
        </div>
        <span className="januyada-logo">JanuyaDA</span>
      </div>

      <div className="small-banners-column">
        <div className="small-banner">
          <img src="https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600" alt="Shoes" />
          <div className="small-banner-text">
            <h3>МЫРЗАЛАР АЯҚ КИІМІ</h3>
            <p>Сапа мен стильдің үндестігі</p>
          </div>
        </div>
        <div className="small-banner">
          <img src="https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600" alt="Backpack" />
          <div className="small-banner-text">
            <h3>ТЕХНОЛОГИЯЛЫҚ РЮКЗАКТАР</h3>
            <p>Жайлылық пен функциялық</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenDepartmentBanner;