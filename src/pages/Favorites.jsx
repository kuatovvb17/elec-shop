import React from 'react';
import ProductCard from '../components/ProductCard';
// Home.css немесе ортақ тор стильдерін қолдану үшін
import './Home.css'; 

const Favorites = ({ favoriteItems, toggleFavorite, onProductClick }) => {
  return (
    <div className="container" style={{ paddingTop: '40px', minHeight: '80vh' }}>
      <h1 style={{ marginBottom: '30px', fontSize: '24px', fontWeight: 'bold' }}>
        Таңдаулы тауарлар
      </h1>
      
      {favoriteItems.length === 0 ? (
        /* Тізім бос болған кездегі көрініс */
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <p style={{ color: '#888', fontSize: '18px' }}>Тізім әзірге бос...</p>
          <p style={{ color: '#aaa', fontSize: '14px', marginTop: '10px' }}>
            Ұнаған тауарларыңызды жүрекшені басу арқылы осында сақтай аласыз.
          </p>
        </div>
      ) : (
        /* Тауарлар торы (grid) */
        <div className="products-grid">
          {favoriteItems.map((item) => (
            <ProductCard 
              key={item.id} 
              product={item} 
              toggleFavorite={toggleFavorite} 
              favorites={favoriteItems} // Жүрекшенің күйін (isFavorite) анықтау үшін
              onProductClick={onProductClick} // Тауарды басқанда ашылуы үшін
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;