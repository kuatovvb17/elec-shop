import React from 'react';
import { Heart } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product, onProductClick, toggleFavorite, favorites }) => {
  // 1. Таңдаулылар тізімінде бар ма екенін тексеру (Optional chaining қосылған)
  const isFavorite = favorites?.some((item) => item.id === product.id) || false;

  // 2. Бағаны форматтау (мысалы: 15 000 ₸)
  const formattedPrice = new Intl.NumberFormat('ru-RU').format(product.price);

  // 3. Жүрекше басылғанда карточканың ашылуын тоқтату
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Карточкаға өту оқиғасын (onClick) болдырмау
    toggleFavorite(product);
  };

  return (
    <div 
      className="product-card-lamoda" 
      onClick={() => onProductClick && onProductClick(product)}
    >
      {/* СУРЕТ БӨЛІМІ */}
      <div className="product-image-container">
        <img 
          src={product.image_url || product.image || 'https://via.placeholder.com/400x500?text=JanuyaDA'} 
          alt={product.name} 
          className="product-image"
        />
        
        {/* ЖҮРЕКШЕ БАТЫРМАСЫ */}
        <button 
          className={`wishlist-btn ${isFavorite ? 'active' : ''}`} 
          onClick={handleFavoriteClick}
          type="button"
          aria-label="Add to favorites"
        >
          <Heart 
            size={22} 
            strokeWidth={1.5}
            fill={isFavorite ? "#ff3b30" : "none"} 
            color={isFavorite ? "#ff3b30" : "#000"} 
          />
        </button>
      </div>

      {/* АҚПАРАТ БӨЛІМІ */}
      <div className="product-info-lamoda">
        <div className="product-price">
          {formattedPrice} <span className="currency">₸</span>
        </div>
        
        <div className="product-brand">{product.brand || 'JanuyaDA'}</div>
        <div className="product-name">{product.name}</div>
      </div>
    </div>
  );
};

export default ProductCard;