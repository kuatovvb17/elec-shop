import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ImageOff } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cartItems, removeFromCart, updateQty, setTotalPrice }) => {
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + (Number(item.price) * item.qty), 0);

  const discount = totalPrice > 50000 ? totalPrice * 0.1 : 0;
  const finalAmount = totalPrice - discount;

  const handleProceed = () => {
    setTotalPrice(finalAmount);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-container">
        <ShoppingBag size={80} strokeWidth={1} color="#ccc" />
        <h2>Себетіңіз бос</h2>
        <p>Өзіңізге ұнайтын тауарды тауып, оны себетке қосыңыз.</p>
        <button className="go-shopping-btn" onClick={() => navigate('/')}>
          Тауарларға көшу
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <header className="cart-header">
          <h1>Себет <span>({totalItems} өнім)</span></h1>
        </header>

        <div className="cart-content">
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-card">

                <div className="item-image">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/120x160?text=No+Image'; }}
                    />
                  ) : (
                    <div className="no-image-placeholder">
                      <ImageOff size={32} color="#888" />
                      <span>Сурет жоқ</span>
                    </div>
                  )}
                </div>

                <div className="item-details">
                  <div className="item-info-top">
                    <div>
                      <h3>{item.brand || 'JanuyaDA'}</h3>
                      <p>{item.name}</p>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="item-actions-bottom">
                    <div className="quantity-controls">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} disabled={item.qty <= 1}>
                        <Minus size={16} />
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)}>
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="item-price">
                      {(Number(item.price) * item.qty).toLocaleString()} ₸
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button className="back-btn" onClick={() => navigate('/')}>
              <ArrowLeft size={18} /> Сатып алуды жалғастыру
            </button>
          </div>

          <aside className="cart-summary">
            <div className="summary-card">
              <h3>Тапсырыс сомасы</h3>
              <div className="summary-row">
                <span>{totalItems} өнім</span>
                <span>{totalPrice.toLocaleString()} ₸</span>
              </div>

              {discount > 0 && (
                <div className="summary-row text-red">
                  <span>Жеңілдік (10%)</span>
                  <span>-{discount.toLocaleString()} ₸</span>
                </div>
              )}

              <div className="summary-row">
                <span>Жеткізу</span>
                <span>Тегін</span>
              </div>
              <div className="summary-total">
                <span>Барлығы</span>
                <span>{finalAmount.toLocaleString()} ₸</span>
              </div>

              <Link to="/checkout" onClick={handleProceed}>
                <button className="checkout-btn">
                  ЕСЕПКЕ АЛУДЫ ЖАЛҒАСТЫРЫҢЫЗ
                </button>
              </Link>

              <div className="promo-section">
                <input type="text" placeholder="Промокод" />
                <button>Қолдану</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;