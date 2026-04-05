import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import PromoBanner from '../components/WomenPromo'; 
import OfficeBanner from '../components/WomenPromo2';
import CategoryIcons from '../components/CategoryIcons'; 
import ProductDetail from '../components/ProductDetail'; 
import MenDepartmentBanner from '../components/MenDepartmentBanner'; 
import './Home.css';

const Home = ({ addToCart, toggleFavorite, favorites, activeTab, activeCategory, setActiveCategory }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 1. Деректерді серверден жүктеу
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(err => console.error("Тауарларды жүктеу қатесі:", err));
  }, []);

  // 2. Фильтрация логикасы (Гендер + Категория)
  const filteredProducts = products.filter((product) => {
    const matchGender = product.gender === activeTab;
    const matchCategory = activeCategory === 'all' || product.category === activeCategory;
    return matchGender && matchCategory;
  });

  // 3. Тауарды басқанда толық мәліметті ашу
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="home-page-wrapper">
      
      {/* ЕГЕР ТАУАР ТАҢДАЛСА, ТОЛЫҚ БЕТТІ КӨРСЕТУ */}
      {selectedProduct ? (
        <ProductDetail 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          addToCart={addToCart}
          toggleFavorite={toggleFavorite} // Таңдаулыларға қосу мүмкіндігі
          favorites={favorites}           // Күйін тексеру үшін
        />
      ) : (
        <>
          {/* --- ӘЙЕЛДЕР БАННЕРЛЕРІ --- */}
          {activeTab === 'women' && (
            <>
              <PromoBanner />
              <CategoryIcons setActiveCategory={setActiveCategory} />
              <OfficeBanner />
            </>
          )}

          {/* --- ЕРЛЕР БАННЕРІ --- */}
          {activeTab === 'men' && (
            <MenDepartmentBanner />
          )}

          <div className="container product-section" style={{ background: '#ffffff', position: 'relative', zIndex: '10' }}>
            <h2 className="section-title">
              {activeTab === 'women' ? 'Әйелдерге арналған өнімдер' : activeTab === 'men' ? 'Ерлерге арналған өнімдер' : 'Балаларға арналған өнімдер'}
            </h2>
     
            <div className="products-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onProductClick={handleProductClick} 
                    toggleFavorite={toggleFavorite} // ЖАҢА: Таңдаулылар функциясы
                    favorites={favorites}           // ЖАҢА: Таңдаулылар тізімі
                  />
                ))
              ) : (
                <div className="no-products">
                  <h3>Кешіріңіз, бұл категорияда тауар табылмады.</h3>
                  <p>Басқа бөлімдерді қарап көріңіз.</p>
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