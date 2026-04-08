import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Edit, Save, X, RefreshCw, Package, ClipboardList } from 'lucide-react';
import { API_URL } from '../config';
import './Admin.css';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
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

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Тауарларды алу қатесі:", err);
    }
  };

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ name: '', price: '', image_url: '', category: 'Киім', gender: 'women', description: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing ? `${API_URL}/api/products/${editId}` : `${API_URL}/api/products`;
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
        fetchProducts();
      }
    } catch (err) {
      console.error("Сақтау қатесі:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Бұл тауарды өшіруге сенімдісіз бе?")) {
      try {
        await fetch(`${API_URL}/api/products/${id}`, { method: 'DELETE' });
        setProducts(products.filter(p => p.id !== id));
      } catch (err) {
        console.error("Өшіру қатесі:", err);
      }
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Тапсырыстарды алу қатесі:", err);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        alert("Статус өзгертілді!");
        fetchOrders();
      }
    } catch (err) {
      console.error("Статусты жаңарту қатесі:", err);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1><Package size={28} /> Админ Панель</h1>
        <button onClick={() => { fetchProducts(); fetchOrders(); }} className="refresh-btn">
          <RefreshCw size={20} /> Жаңарту
        </button>
      </div>

      <section className="admin-card">
        <h2>{isEditing ? 'Тауарды өңдеу' : 'Жаңа тауар қосу'}</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Тауар аты"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Бағасы"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>
          <input
            type="text"
            placeholder="Сурет сілтемесі (URL)"
            value={formData.image_url}
            onChange={e => setFormData({ ...formData, image_url: e.target.value })}
            required
          />
          <div className="form-group">
            <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
              <option value="Киім">Киім</option>
              <option value="Аяқ киім">Аяқ киім</option>
              <option value="Аксессуарлар">Аксессуарлар</option>
              <option value="Сұлулық">Сұлулық</option>
            </select>
            <select value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })}>
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

      <section className="admin-card orders-section">
        <h2><ClipboardList size={22} /> Тапсырыстарды басқару</h2>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Клиент</th>
                <th>Статус</th>
                <th>Өзгерту</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.user_name}</td>
                  <td>
                    <span className={`badge ${order.status}`}>
                      {order.status === 'paid' ? 'Төленді' :
                        order.status === 'shipping' ? 'Жолда' : 'Жеткізілді'}
                    </span>
                  </td>
                  <td>
                    <select
                      className="status-select"
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      value={order.status}
                    >
                      <option value="paid">Төленді</option>
                      <option value="shipping">Жолда</option>
                      <option value="delivered">Жеткізілді</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

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
                  <td><img src={product.image_url} alt="" width="50" style={{ borderRadius: '4px' }} /></td>
                  <td>{product.name}</td>
                  <td>{Number(product.price).toLocaleString()} ₸</td>
                  <td>{product.category}</td>
                  <td className="actions">
                    <button className="edit-btn" onClick={() => startEdit(product)}><Edit size={18} /></button>
                    <button className="delete-btn" onClick={() => handleDelete(product.id)}><Trash2 size={18} /></button>
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