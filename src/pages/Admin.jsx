import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Edit, Save, X, RefreshCw } from 'lucide-react';
import './Admin.css';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [formData, setFormData] = useState({ 
    name: '', 
    price: '', 
    image_url: '', 
    category: 'Киім', 
    gender: 'women',
    description: '' 
  });

  // 1. Тауарларды алу
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Қате:", err);
    }
  };

  // 2. Өңдеу режиміне көшу
  const startEdit = (product) => {
    setIsEditing(true);
    setEditId(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      category: product.category,
      gender: product.gender,
      description: product.description || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Формаға автоматты түрде көтерілу
  };

  // 3. Өңдеуді тоқтату
  const cancelEdit = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ name: '', price: '', image_url: '', category: 'Киім', gender: 'women', description: '' });
  };

  // 4. Сақтау (Қосу немесе Жаңарту)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = isEditing 
      ? `http://localhost:5000/api/products/${editId}` 
      : 'http://localhost:5000/api/products';
    
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert(isEditing ? "Тауар жаңартылды!" : "Тауар қосылды!");
        cancelEdit();
        fetchProducts(); // Тізімді қайта жүктеу
      }
    } catch (err) {
      console.error("Қате:", err);
    }
  };

  // 5. Өшіру
  const handleDelete = async (id) => {
    if (window.confirm("Бұл тауарды өшіруге сенімдісіз бе?")) {
      try {
        await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
        setProducts(products.filter(p => p.id !== id));
      } catch (err) {
        console.error("Өшіру қатесі:", err);
      }
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Админ Панель</h1>
        <button onClick={fetchProducts} className="refresh-btn"><RefreshCw size={20} /></button>
      </div>

      {/* Форма: Қосу немесе Өңдеу */}
      <section className="admin-card">
        <h2>{isEditing ? 'Тауарды өңдеу' : 'Жаңа тауар қосу'}</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Тауар аты" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})} 
              required 
            />
            <input 
              type="number" 
              placeholder="Бағасы" 
              value={formData.price}
              onChange={e => setFormData({...formData, price: e.target.value})} 
              required 
            />
          </div>
          
          <input 
            type="text" 
            placeholder="Сурет сілтемесі (URL)" 
            value={formData.image_url}
            onChange={e => setFormData({...formData, image_url: e.target.value})} 
            required 
          />

          <div className="form-group">
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option value="Киім">Киім</option>
              <option value="Аяқ киім">Аяқ киім</option>
              <option value="Аксессуарлар">Аксессуарлар</option>
              <option value="Сұлулық">Сұлулық</option>
            </select>
            <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
              <option value="women">Әйелдер</option>
              <option value="men">Ерлер</option>
              <option value="kids">Балалар</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className={isEditing ? "save-btn" : "add-btn"}>
              {isEditing ? <><Save size={20} /> Сақтау</> : <><PlusCircle size={20} /> Қосу</>}
            </button>
            {isEditing && (
              <button type="button" className="cancel-btn" onClick={cancelEdit}>
                <X size={20} /> Бас тарту
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Тізім */}
      <section className="products-list">
        <h2>Барлық тауарлар ({products.length})</h2>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Сурет</th>
                <th>Аты</th>
                <th>Бағасы</th>
                <th>Санат</th>
                <th>Әрекеттер</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className={editId === product.id ? "editing-row" : ""}>
                  <td><img src={product.image_url} alt="" width="50" /></td>
                  <td>{product.name}</td>
                  <td>{Number(product.price).toLocaleString()} ₸</td>
                  <td>{product.category}</td>
                  <td className="actions">
                    <button className="edit-btn" onClick={() => startEdit(product)}>
                      <Edit size={18} />
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Admin;