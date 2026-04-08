import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { API_URL } from '../config';
import './CategoryPage.css';

const categoryMap = {
  "Киім": ["Киім", "Одежда", "Балалар киімі"],
  "Аяқ киім": ["Аяқ киім", "Обувь", "Балалар аяқ киімі"],
  "Аксессуарлар": ["Аксессуарлар", "Аксессуар"],
  "Ойыншықтар": ["Ойыншықтар"],
  "Мектеп": ["Мектеп"],
  "Зергерлік бұйымдар": ["Зергерлік бұйымдар"],
  "Сұлулық": ["Сұлулық", "Гигиена"],
  "Спорт": ["Спорт"]
};

const CategoryPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryName = queryParams.get('type') || "";

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        const dbCategories = categoryMap[categoryName] || [categoryName];

        const filteredByCategory = data.filter(p =>
          p.category && dbCategories.some(cat =>
            cat.toLowerCase().trim() === p.category.toString().toLowerCase().trim()
          )
        );

        setAllProducts(filteredByCategory);
        setDisplayProducts(filteredByCategory);
        setLoading(false);
      })
      .catch(err => {
        console.error("Дерек алу қатесі:", err);
        setLoading(false);
      });
  }, [categoryName]);

  const handleApplyFilter = () => {
    const min = minPrice === '' ? 0 : Number(minPrice);
    const max = maxPrice === '' ? Infinity : Number(maxPrice);

    const filteredByPrice = allProducts.filter(p => {
      const cleanPrice = Number(p.price.toString().replace(/[^0-9.-]+/g, ""));
      return cleanPrice >= min && cleanPrice <= max;
    });

    setDisplayProducts(filteredByPrice);
  };

  const handleReset = () => {
    setMinPrice('');
    setMaxPrice('');
    setDisplayProducts(allProducts);
  };

  if (loading) return <div className="loader">Жүктелуде...</div>;

  return (
    <div className="category-page">
      <div className="container">
        <header className="category-header-box">
          <h1>{categoryName}</h1>
          <p className="product-count">Табылды: <b>{displayProducts.length}</b> тауар</p>
        </header>

        <div className="filter-sticky-bar">
          <div className="price-inputs-row">
            <span className="filter-label">Бағасы:</span>
            <div className="input-group">
              <input
                type="number"
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <span className="dash">—</span>
              <input
                type="number"
                placeholder="max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
              <span className="currency">₸</span>
            </div>
          </div>
          <div className="filter-btns">
            <button className="btn-apply" onClick={handleApplyFilter}>Қолдану</button>
            <button className="btn-reset" onClick={handleReset}>Тазалау</button>
          </div>
        </div>

        <div className="products-grid">
          {displayProducts.length > 0 ? (
            displayProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-img-wrapper">
                  <img src={product.image_url} alt={product.name} />
                </div>
                <div className="product-info">
                  <span className="product-cat-tag">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p className="price-tag">{Number(product.price).toLocaleString()} ₸</p>
                  <button className="add-to-cart-btn">Себетке қосу</button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <h3>Тауар табылмады</h3>
              <p>Басқа баға аралығын таңдап көріңіз</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;