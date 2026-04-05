import React, { useState } from 'react';
import './ProductDetail.css';

const ProductDetail = ({ product, onClose, addToCart }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [color, setColor] = useState('Белый'); // Бастапқы түс

  if (!product) return null;

  return (
    <div className="lamoda-overlay" onClick={onClose}>
      <div className="lamoda-modal" onClick={(e) => e.stopPropagation()}>
        {/* Жабу батырмасы */}
        <button className="lamoda-close" onClick={onClose}>✕</button>
        
        <div className="lamoda-content">
          {/* СОЛ ЖАҚ: Сурет бөлімі */}
          <div className="lamoda-left">
            <img src={product.image_url} alt={product.name} />
          </div>

          {/* ОҢ ЖАҚ: Мәліметтер бөлімі */}
          <div className="lamoda-right">
            <div className="lamoda-header">
              <div className="lamoda-stars">
                ★★★★★ <span className="reviews-text">1522 отзыва</span>
              </div>
              <h2 className="lamoda-title">{product.brand || 'JanuyaDA'}</h2>
              <p className="lamoda-subtitle">{product.name}</p>
            </div>

            {/* Баға бөлімі - Тек негізгі баға қалды */}
            <div className="lamoda-price-row">
              <span className="price-new">{product.price.toLocaleString()} ₸</span>
            </div>

            <div className="lamoda-controls">
              {/* ТҮСТІ ТАНДАУ (SELECT) */}
              <div className="control-item">
                <label>Түсі:</label>
                <select 
                  className="lamoda-select" 
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  <option value="Белый">Ақ</option>
                  <option value="Черный">Қара</option>
                  <option value="Коричневый">Қоңыр</option>
                  <option value="Серый">Сұр</option>
                </select>
              </div>

              {/* ӨЛШЕМДЕРДІ ТАНДАУ */}
              <div className="control-item">
                <select 
                  className="lamoda-select"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="">Өлшем таңдаңыз</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="2XL">2XL</option>
                </select>
              </div>
            </div>

            {/* Түймелер бөлімі */}
            <div className="lamoda-buttons">
              <button 
                className="btn-black"
                onClick={() => addToCart({...product, size: selectedSize, color})}
              >
                Себетке қосу
              </button>
              <button className="btn-wish">♡</button>
            </div>

            {/* "О товаре" және "Размер в размер" бөлімдері толық алынып тасталды */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;