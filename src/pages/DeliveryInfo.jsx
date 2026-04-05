import React from 'react';
import './DeliveryInfo.css';

const DeliveryInfo = () => {
  return (
    <div className="delivery-page-container">
      {/* Басты баннер */}
      <div className="delivery-hero-banner">
        <div className="hero-image-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2070&auto=format&fit=crop" 
            alt="Delivery Banner" 
            className="hero-img-element"
          />
          <div className="hero-text-overlay">
            <h1>Киіп көру<br/>мүмкіндігімен жеткізу</h1>
          </div>
        </div>
      </div>

      {/* Ақпараттық карточкалар (Суреттерімен) */}
      <div className="delivery-grid">
        <div className="delivery-card">
          <div className="card-image">
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=500" alt="Selection" />
          </div>
          <h3>Кең таңдау</h3>
          <p>Бүкіл отбасы үшін киім мен аяқ киімнің үлкен таңдауы.</p>
        </div>

        <div className="delivery-card">
          <div className="card-image">
            <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop" alt="Fitting" />
          </div>
          <h3>Үйде киіп көріңіз</h3>
          <p>Үйіңіздің жайлылығына ыңғайлы орнату.</p>
        </div>

        <div className="delivery-card">
          <div className="card-image">
            <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=500" alt="Fast Delivery" />
          </div>
          <h3>Жылдам жеткізу</h3>
          <p>Қазақстанның барлық қалаларына қысқа мерзімде жеткізу.</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;