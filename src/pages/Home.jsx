import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import PromoBanner from '../components/WomenPromo'; 
import OfficeBanner from '../components/WomenPromo2';
import CategoryIcons from '../components/CategoryIcons'; 
import ProductDetail from '../components/ProductDetail'; 
import MenDepartmentBanner from '../components/MenDepartmentBanner'; 
import { API_URL } from '../config';
import './Home.css';

// 1. Аргументтерге searchQuery қостық
const Home = ({ addToCart, toggleFavorite, favorites, activeTab, activeCategory, setActiveCategory, searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

useEffect(() => {
  // СІЛТЕМЕГЕ /api/ ҚОСУДЫ ҰМЫТПА:
  fetch(`${API_URL}/api/products`) 
    .then((res) => res.json())
    .then((data) => setProducts(data))
    .catch(err => console.error("Қате:", err));
}, []);

  // 2. ФИЛЬТРАЦИЯ ЛОГИКАСЫ (Гендер + Категория + Іздеу)
  const filteredProducts = products.filter((product) => {
    const matchGender = product.gender === activeTab;
    const matchCategory = activeCategory === 'all' || product.category === activeCategory;
    
    // Іздеу сөзіне сәйкестігін тексеру (Аты немесе Категориясы бойынша)
    const searchTerm = searchQuery ? searchQuery.toLowerCase() : "";
    const matchSearch = 
      product.name.toLowerCase().includes(searchTerm) || 
      (product.description && product.description.toLowerCase().includes(searchTerm));

    return matchGender && matchCategory && matchSearch;
  });

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="home-page-wrapper">
      
      {selectedProduct ? (
        <ProductDetail 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          addToCart={addToCart}
          toggleFavorite={toggleFavorite}
          favorites={favorites}
        />
      ) : (
        <>
          {/* Іздеу кезінде баннерлерді жасыру (ыңғайлы болу үшін) */}
          {!searchQuery && (
            <>
              {activeTab === 'women' && (
                <>
                  <PromoBanner />
                  <CategoryIcons setActiveCategory={setActiveCategory} />
                  <OfficeBanner />
                </>
              )}

              {activeTab === 'men' && (
                <MenDepartmentBanner />
              )}
            </>
          )}

          <div className="container product-section" style={{ background: '#ffffff', position: 'relative', zIndex: '10' }}>
            <h2 className="section-title">
              {searchQuery 
                ? `"${searchQuery}" бойынша іздеу нәтижелері` 
                : (activeTab === 'women' ? 'Әйелдерге арналған өнімдер' : activeTab === 'men' ? 'Ерлерге арналған өнімдер' : 'Балаларға арналған өнімдер')
              }
            </h2>
     
            <div className="products-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onProductClick={handleProductClick} 
                    toggleFavorite={toggleFavorite}
                    favorites={favorites}
                  />
                ))
              ) : (
                <div className="no-products">
                  <h3>Кешіріңіз, ештеңе табылмады.</h3>
                  <p>Басқа сөздермен іздеп немесе категорияны өзгертіп көріңіз.</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Home;