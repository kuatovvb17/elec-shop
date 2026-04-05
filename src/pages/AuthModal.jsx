import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    identifier: '', // Email немесе телефон (Кіру үшін)
    email: '',      // Тек тіркелу үшін
    phone: '',      // Тек тіркелу үшін
    password: ''
  });
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  // Форманы тексеру (Validation)
  const validate = () => {
    let newErrors = {};
    if (isLoginView) {
      if (!formData.identifier) newErrors.identifier = "Email немесе телефон енгізіңіз";
    } else {
      if (!formData.name) newErrors.name = "Атыңызды жазыңыз";
      if (!formData.email.includes('@')) newErrors.email = "Қате email форматы";
      if (!formData.phone) newErrors.phone = "Телефон нөмірін жазыңыз";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Құпиясөз кем дегенде 6 символ болуы керек";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const endpoint = isLoginView ? '/api/login' : '/api/register';
    const payload = isLoginView 
      ? { identifier: formData.identifier, password: formData.password }
      : { 
          name: formData.name, 
          email: formData.email, 
          phone: formData.phone, 
          password: formData.password 
        };

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        if (isLoginView) {
          // 1. Мәліметтерді сақтау
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));

          // 2. Рөлді және Админ екенін тексеру
          const isAdminUser = data.user.role === 'admin' || data.user.email === 'admin@mail.ru';
          
          if (isAdminUser) {
            localStorage.setItem('isAdmin', 'true');
            alert("Қош келдіңіз, Админ!");
            onClose();
            navigate('/admin'); // Админ панельге жіберу
          } else {
            localStorage.setItem('isAdmin', 'false');
            alert(`Қош келдіңіз, ${data.user.name}!`);
            onClose();
            navigate('/'); // Басты бетке жіберу
          }
          
          // 3. Интерфейс күйін (Navbar т.б.) жаңарту үшін бетті қайта жүктеу
          window.location.reload(); 
        } else {
          alert("Тіркелу сәтті өтті! Енді жүйеге кіріңіз.");
          setIsLoginView(true); // Пайдаланушыны "Кіру" бетіне ауыстыру
        }
      } else {
        alert(data.error || "Қате орын алды");
      }
    } catch (err) {
      console.error("Сервермен байланыс қатесі:", err);
      alert("Сервер қосылып тұрғанына көз жеткізіңіз (localhost:5000)");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <h2>{isLoginView ? 'Кіру' : 'Тіркелу'}</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Тек тіркелу кезінде көрінетін "Аты" жолағы */}
          {!isLoginView && (
            <div className="input-group">
              <input 
                type="text" 
                placeholder="Аты" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
          )}

          <div className="input-group">
            <input 
              type="text" 
              placeholder={isLoginView ? "Email немесе телефон" : "Email"} 
              value={isLoginView ? formData.identifier : formData.email}
              onChange={(e) => setFormData({
                ...formData, 
                [isLoginView ? 'identifier' : 'email']: e.target.value
              })}
            />
            {(errors.identifier || errors.email) && (
              <span className="error-text">{errors.identifier || errors.email}</span>
            )}
          </div>

          {/* Тек тіркелу кезінде көрінетін "Телефон" жолағы */}
          {!isLoginView && (
            <div className="input-group">
              <input 
                type="text" 
                placeholder="Телефон нөмірі" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})} 
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>
          )}

          <div className="input-group">
            <input 
              type="password" 
              placeholder="Құпиясөз" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <button type="submit" className="login-submit-btn">
            {isLoginView ? 'Кіру' : 'Тіркелу'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLoginView ? "Есептік жазбаңыз жоқ па?" : "Есептік жазбаңыз бар ма?"}
            <button 
              type="button" 
              className="toggle-auth-btn" 
              onClick={() => {
                setIsLoginView(!isLoginView);
                setErrors({}); // Ауысқан кезде қателерді тазалау
              }}
            >
              {isLoginView ? 'Тіркелу' : 'Кіру'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;