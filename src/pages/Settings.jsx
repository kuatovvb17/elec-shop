import React, { useState, useEffect } from 'react';
import { User, Bell, Moon, Camera, Save, Mail, Edit3 } from 'lucide-react';
import './Settings.css';

const Settings = () => {
  // LocalStorage-тан деректерді алу немесе дефолт мәндер
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {
    name: 'Bexultan',
    email: 'dosikloxshort@gmail.com'
  });
  
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' немесе 'notifications'

  // Түнгі режим логикасы
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(user));
    alert("Өзгерістер сәтті сақталды!");
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <header className="settings-header">
          <h1>Баптаулар</h1>
          <p>Профиль мен аккаунтты өзіңізге ыңғайлы етіп реттеңіз</p>
        </header>

        <div className="settings-grid">
          {/* Sidebar */}
          <aside className="settings-sidebar">
            <div className="profile-card-static">
              <div className="avatar-wrapper">
                <div className="main-avatar">{user.name.charAt(0).toUpperCase()}</div>
              </div>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
            
            <nav className="settings-nav">
              <button 
                className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <User size={18}/> Жеке мәліметтер
              </button>
              <button 
                className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell size={18}/> Хабарландырулар
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="settings-content">
            {activeTab === 'profile' ? (
              <section className="settings-section">
                <h2>Аккаунт баптаулары</h2>
                
                {/* Никнейм өзгерту */}
                <div className="setting-control-input">
                  <label><Edit3 size={16} /> Никнейм</label>
                  <input 
                    type="text" 
                    value={user.name} 
                    onChange={(e) => setUser({...user, name: e.target.value})}
                    placeholder="Атыңызды жазыңыз"
                  />
                </div>

                {/* Email өзгерту */}
                <div className="setting-control-input">
                  <label><Mail size={16} /> Электрондық пошта</label>
                  <input 
                    type="email" 
                    value={user.email} 
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder="Email жазыңыз"
                  />
                </div>

                {/* Түнгі режим */}
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

                <div className="settings-actions">
                  <button className="save-btn" onClick={handleSave}><Save size={18} /> Сақтау</button>
                  <button className="delete-btn">Аккаунтты өшіру</button>
                </div>
              </section>
            ) : (
              <section className="settings-section">
                <h2>Хабарландырулар</h2>
                <div className="empty-state">
                  <Bell size={48} />
                  <p>Әзірге хабарландырулар жоқ</p>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Settings;