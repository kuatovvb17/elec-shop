import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ShoppingBag, Search, Heart, Settings } from 'lucide-react'; 
import AuthModal from '../pages/AuthModal'; 
import ProfileModal from '../pages/ProfileModal'; 
import './Navbar.css';

const Navbar = ({ cartCount, favoritesCount = 0, activeTab, setActiveTab, setActiveCategory, setSearchQuery }) => {
  const navigate = useNavigate();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const categories = {
    women: ["Киім", "Аяқ киім", "Аксессуарлар", "Сұлулық", "Гигиена", "Зергерлік бұйымдар", "Спорт", "Үй және тұрмыс", "Электроника", "Сыйлықтар"],
    men: ["Одежда", "Обувь", "Аксессуар", "Костюмдар", "Күртеше", "Іш киім", "Гигиена", "Спорт", "Құрал-жабдықтар", "Хобби"],
    kids: ["Балалар киімі", "Балалар аяқ киімі", "Ойыншықтар", "Сәбилерге", "Балалар гигиенасы", "Мектеп", "Спорт"]
  };

  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem('user');
      const adminStatus = localStorage.getItem('isAdmin') === 'true';
      
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setIsAdmin(adminStatus);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setActiveCategory('all');
  };

  const handleLogout = () => {
    if (window.confirm("Жүйеден шығуды растайсыз ба?")) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isAdmin');
      setUser(null);
      setIsAdmin(false);
      setIsProfileOpen(false);
      navigate('/'); 
      window.location.reload(); 
    }
  };

  return (
    <nav className="navbar-lamoda">
      <div className="main-header">
        <div className="container header-layout">
          {/* --- 1. Гендерлік табтар --- */}
          <div className="gender-tabs">
            {['women', 'men', 'kids'].map((tab) => (
              <span 
                key={tab}
                className={activeTab === tab ? 'active' : ''} 
                onClick={() => handleTabChange(tab)}
              >
                {tab === 'women' ? 'Әйелдерге' : tab === 'men' ? 'Ерлерге' : 'Балаларға'}
              </span>
            ))}
          </div>

          {/* --- 2. Логотип --- */}
          <Link to="/" className="brand-logo" onClick={() => setActiveCategory('all')}>
            <span className="dark-j">Januya</span><span className="light-da">DA</span>
          </Link>

          {/* --- 3. Навигациялық иконкалар --- */}
          <div className="user-nav">
            <div className="nav-icons-group">
              
              {isAdmin && (
                <Link to="/admin" className="nav-item-icon admin-special">
                  <Settings size={26} strokeWidth={1.5} color="#000" />
                  <span>Админ</span>
                </Link>
              )}

              <Link to="/favorites" className="nav-item-icon" style={{ textDecoration: 'none' }}>
                <div className="bag-icon-wrapper">
                  <Heart size={26} strokeWidth={1.5} />
                  {favoritesCount > 0 && (
                    <span className="cart-badge favorite-badge">{favoritesCount}</span>
                  )}
                </div>
                <span>Таңдаулылар</span>
              </Link>

              {user ? (
                <div className="nav-item-icon" onClick={() => setIsProfileOpen(true)}>
                  <User size={26} strokeWidth={1.5} />
                  <span>{user.name || 'Профиль'}</span>
                </div>
              ) : (
                <div className="nav-item-icon" onClick={() => setIsAuthOpen(true)}>
                  <User size={26} strokeWidth={1.5} />
                  <span>Кіру</span>
                </div>
              )}
              
              <Link to="/cart" className="nav-item-icon" style={{ textDecoration: 'none' }}>
                <div className="bag-icon-wrapper">
                  <ShoppingBag size={26} strokeWidth={1.5} />
                  {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </div>
                <span>Себет</span>
              </Link>

            </div>
          </div>
        </div>
      </div>

      {/* --- 4. Төменгі бөлім: Категориялар мен Поиск --- */}
      <div className="bottom-header">
        <div className="container search-layout">
          <ul className="cat-menu">
            {categories[activeTab].map((cat, i) => (
              <li key={i} onClick={() => setActiveCategory(cat)}>
                {cat}
              </li>
            ))}
          </ul>
          
          <div className="lamoda-search-container">
            <input 
              type="text" 
              className="lamoda-search-input" 
              placeholder="Іздеу..." 
              onChange={(e) => setSearchQuery(e.target.value)} // Live Search логикасы
            />
            <button className="lamoda-search-button">
              <Search size={20} color="white" />
            </button>
          </div>
        </div>
      </div>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      
      {user && (
        <ProfileModal 
          isOpen={isProfileOpen} 
          onClose={() => setIsProfileOpen(false)} 
          user={user} 
          onLogout={handleLogout} 
          isAdmin={isAdmin}
        />
      )}
    </nav>
  );
};

export default Navbar;