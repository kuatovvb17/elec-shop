import React from 'react';
import { useNavigate } from 'react-router-dom'; // Жаңа импорт
import { User, Package, Settings, LogOut, X, ChevronRight } from 'lucide-react';
import './ProfileModal.css';

const ProfileModal = ({ isOpen, onClose, user, onLogout }) => {
  const navigate = useNavigate(); // Навигация функциясы

  if (!isOpen || !user) return null;

  // Бағыттау функциясы
  const handleNavigation = (path) => {
    navigate(path);
    onClose(); // Бетке өткенде модалды жабу
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="profile-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="profile-header">
          <div className="profile-avatar">
            {user.name ? user.name[0].toUpperCase() : 'B'}
          </div>
          <div className="profile-info-main">
            <h3>{user.name || 'Bexultan'}</h3>
            <p>{user.email || 'dosikloxshort@gmail.com'}</p>
          </div>
        </div>

        <div className="profile-menu">
          {/* Менің тапсырыстарым */}
          <div className="menu-item" onClick={() => handleNavigation('/orders')}>
            <div className="menu-item-left">
              <Package size={20} />
              <span>Менің тапсырыстарым</span>
            </div>
            <ChevronRight size={18} color="#ccc" />
          </div>

          {/* Баптаулар */}
          <div className="menu-item" onClick={() => handleNavigation('/settings')}>
            <div className="menu-item-left">
              <Settings size={20} />
              <span>Баптаулар</span>
            </div>
            <ChevronRight size={18} color="#ccc" />
          </div>
        </div>

        <div className="profile-footer">
          <button className="logout-action-btn" onClick={onLogout}>
            <LogOut size={18} />
            <span>Жүйеден шығу</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;