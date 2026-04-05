import React from 'react';
import './PaymentInfo.css';

const PaymentInfo = () => {
  return (
    <div className="payment-page-container">
      {/* Секция баннера */}
      <div className="payment-hero-banner">
        <div className="hero-image-wrapper">
          {/* Используем надежную ссылку для фона */}
          <img 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" 
            alt="Fashion Banner" 
            className="hero-img-element"
            onError={(e) => { e.target.src = "https://via.placeholder.com/1200x400?text=Lamoda+Style"; }} // Заглушка на случай ошибки
          />
          <div className="hero-text-overlay">
            <h1>Қалаған кезде<br/>Төлеңіз!*</h1>
          </div>
        </div>
      </div>

      {/* Сетка с информацией */}
      <div className="payment-info-flex-grid">
        <div className="payment-info-item">
          <div className="icon-circle">📱</div>
          <h3>онлайн төлем</h3>
          <p>Веб-сайтта және қолданбада</p>
        </div>

        <div className="payment-info-item">
          <div className="icon-circle">🛍️</div>
          <h3>тапсырысты алғаннан кейін</h3>
          <p>Сіз заттарды сынап көріп, өзіңізге ұнайтын нәрсені ғана сатып ала аласыз.</p>
        </div>

        <div className="payment-info-item">
          <div className="icon-circle">💳</div>
          <h3>банк картасымен немесе қолма-қол ақшамен</h3>
          <p>Барлық JanuyaDA-Express қалаларына жеткізу және қабылдау пункттеріне тапсырыс беру</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;