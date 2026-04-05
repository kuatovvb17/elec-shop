import React, { useState } from 'react';
import { User, Bell, Lock, Globe, Moon, ShieldCheck, ChevronRight, Camera } from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="settings-page">
      <div className="settings-container">
        <header className="settings-header">
          <h1>Баптаулар</h1>
          <p>Профиль мен аккаунтты өзіңізге ыңғайлы етіп реттеңіз</p>
        </header>

        <div className="settings-grid">
          {/* Сол жақ: Профильді тез өңдеу */}
          <aside className="settings-sidebar">
            <div className="profile-card-static">
              <div className="avatar-wrapper">
                <div className="main-avatar">B</div>
                <button className="edit-avatar-btn"><Camera size={16} /></button>
              </div>
              <h3>Bexultan</h3>
              <p>dosikloxshort@gmail.com</p>
            </div>
            
            <nav className="settings-nav">
              <button className="nav-item active"><User size={18}/> Жеке мәліметтер</button>
              <button className="nav-item"><Lock size={18}/> Қауіпсіздік</button>
              <button className="nav-item"><Bell size={18}/> Хабарландырулар</button>
            </nav>
          </aside>

          {/* Оң жақ: Негізгі баптаулар */}
          <main className="settings-content">
            <section className="settings-section">
              <h2>Аккаунт баптаулары</h2>
              
              <div className="setting-control">
                <div className="control-info">
                  <Globe size={20} />
                  <div>
                    <span>Тіл (Language)</span>
                    <p>Қазақ тілі</p>
                  </div>
                </div>
                <ChevronRight size={20} className="arrow-icon" />
              </div>

              <div className="setting-control">
                <div className="control-info">
                  <Moon size={20} />
                  <div>
                    <span>Түнгі режим</span>
                    <p>Интерфейс түсін өзгерту</p>
                  </div>
                </div>
                <label className="switch">
                  <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="setting-control">
                <div className="control-info">
                  <ShieldCheck size={20} />
                  <div>
                    <span>Екі сатылы тексеру</span>
                    <p>Аккаунтты қорғауды күшейту</p>
                  </div>
                </div>
                <button className="btn-outline">Қосу</button>
              </div>
            </section>

            <div className="settings-actions">
              <button className="save-btn">Өзгерістерді сақтау</button>
              <button className="delete-btn">Аккаунтты өшіру</button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Settings;