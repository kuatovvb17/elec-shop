import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Компоненттер
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Беттер
import Home from './pages/Home';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import PaymentInfo from './pages/PaymentInfo';
import DeliveryInfo from './pages/DeliveryInfo';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import CategoryPage from './pages/CategoryPage';

import './App.css';

const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return isAdmin ? children : <Navigate to="/" />; 
};

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  
  // --- ІЗДЕУ (SEARCH) ҮШІН ЖАҢА КҮЙ ---
  const [searchQuery, setSearchQuery] = useState(""); 

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const [activeTab, setActiveTab] = useState('women');
  const [activeCategory, setActiveCategory] = useState('all');

  // --- ФУНКЦИЯЛАР ---
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const exist = prevItems.find((x) => x.id === product.id);
      if (exist) {
        return prevItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        );
      }
      return [...prevItems, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((x) => x.id !== id));
  };

  const updateQty = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    );
  };

  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const isExist = prev.find(item => item.id === product.id);
      if (isExist) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  return (
    <Router>
      <TopBar />
      <Navbar 
        cartCount={cartItems.reduce((acc, item) => acc + item.qty, 0)} 
        favoritesCount={favorites.length}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setActiveCategory={setActiveCategory}
        // --- ОСЫ ЖЕРДЕ setSearchQuery ФУНКЦИЯСЫН БЕРЕМІЗ ---
        setSearchQuery={setSearchQuery} 
      />

      <Routes>
        <Route path="/" element={
          <Home 
            addToCart={addToCart} 
            toggleFavorite={toggleFavorite}
            favorites={favorites} 
            activeTab={activeTab} 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory}
            // --- HOME БЕТІНЕ searchQuery-ді ЖІБЕРЕМІЗ ---
            searchQuery={searchQuery} 
          />
        } />

        <Route path="/cart" element={
          <Cart 
            cartItems={cartItems} 
            removeFromCart={removeFromCart} 
            updateQty={updateQty} 
            setTotalPrice={setTotalPrice}
          />
        } />

        <Route path="/favorites" element={
          <Favorites 
            favoriteItems={favorites} 
            toggleFavorite={toggleFavorite} 
            addToCart={addToCart}
          />
        } />

        <Route path="/checkout" element={<Checkout cartTotal={totalPrice} />} />

        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } 
        />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/my-orders" element={<Orders />} />
        <Route path="/delivery-info" element={<DeliveryInfo />} />
        <Route path="/payment-info" element={<PaymentInfo />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;