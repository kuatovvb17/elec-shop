import React from 'react';
import './WomenPromo2.css';

const WomenPromo2 = () => {
  return (
    <div className="container">
      <div className="wp2-grid">
        <div className="wp2-side">
          <div className="wp2-item">
            <img
              src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80"
              alt="Shoes Collection"
            />
            <div className="wp2-item-info">
              <h3>Аяқ киім мен сөмке</h3>
              <p>Осы маусымдағы трендтер</p>
            </div>
          </div>
          <div className="wp2-item">
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
              alt="Cosmetics"
            />
            <div className="wp2-item-info">
              <h3>Сұлулық және қамқорлық</h3>
              <p>Жаңа косметика</p>
            </div>
          </div>
        </div>

        <div className="wp2-main">
          <img
            src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80"
            alt="Denim Look"
          />
          <div className="wp2-overlay">
            <span className="wp2-tag">DENIM STYLE</span>
            <div className="wp2-content">
              <h2 className="wp2-title">идеал<br />деним</h2>
              <p className="wp2-subtitle">Өзіңіздің тамаша сәйкестікті табыңыз<br /><span>Джинсы таңдаңыз</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WomenPromo2;