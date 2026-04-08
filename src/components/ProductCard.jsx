import React from 'react';
import { Heart } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product, onProductClick, toggleFavorite, favorites }) => {
  const isFavorite = favorites?.some((item) => item.id === product.id) || false;

  const formattedPrice = new Intl.NumberFormat('ru-RU').format(product.price);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(product);
  };

  return (
    <div
      className="product-card-lamoda"
      onClick={() => onProductClick && onProductClick(product)}
    >
      <div className="product-image-container">
        <img
          src={product.image_url || product.image || 'https://via.placeholder.com/400x500?text=JanuyaDA'}
          alt={product.name}
          className="product-image"
        />

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