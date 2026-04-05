import React, { useState, useEffect } from 'react';
import './Checkout.css';

const Checkout = ({ cartTotal = 42000 }) => {
    const [method, setMethod] = useState('pickup');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: 'Микрорайон Самал-2, 111', 
        date: '',
        time: '10:00 - 14:00',
        cardNumber: '',
        cvv: ''
    });

    useEffect(() => {
        if (method === 'pickup') {
            setFormData(prev => ({ ...prev, address: 'Микрорайон Самал-2, 111' }));
        } else {
            setFormData(prev => ({ ...prev, address: '' }));
        }
    }, [method]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = async () => {
       
        if (!formData.name || !formData.phone || !formData.cardNumber) {
            alert("Өтініш, барлық деректерді толтырыңыз!");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    method: method,
                    address: formData.address,
                    date: formData.date || null,
                    time: formData.time,
                    total: cartTotal,
                    cardNumber: formData.cardNumber
                })
            });

            const result = await response.json();

            if (response.ok) {
                alert(`✅ Төлем сәтті жасалды!\n${result.message}\nТапсырыс нөмірі: #${result.order.id}`);
                window.location.href = "/";
            } else {
                alert("Қате: " + (result.error || "Сервер деректі қабылдамады"));
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Сервермен байланыс үзілді! Терминалда 'node server.cjs' қосулы екенін тексеріңіз.");
        }
    };

    return (
        <div className="checkout-wrapper">
            <div className="checkout-card">
                <header className="checkout-header">
                    <h1>Рәсімдеу</h1>
                    <p className="subtitle">Тапсырысыңызды аяқтау үшін деректерді толтырыңыз</p>
                </header>

                <div className="tab-switcher">
                    <button 
                        className={method === 'pickup' ? 'tab active' : 'tab'} 
                        onClick={() => setMethod('pickup')}
                    >
                        Өздігінен алып кету
                    </button>
                    <button 
                        className={method === 'delivery' ? 'tab active' : 'tab'} 
                        onClick={() => setMethod('delivery')}
                    >
                        Жеткізу
                    </button>
                </div>

                <div className="checkout-body">
                    <div className="checkout-form">
                        <section className="form-section">
                            <h3>Жеткізу ақпараты</h3>
                            {method === 'pickup' ? (
                                <div className="pickup-info animate-fade">
                                    <span className="status-tag">Қолжетімді</span>
                                    <h4>JanuyaDA Орталығы</h4>
                                    <p>{formData.address}</p>
                                </div>
                            ) : (
                                <div className="delivery-fields animate-fade">
                                    <input 
                                        type="text" 
                                        name="address"
                                        placeholder="Толық мекенжай (Көше, үй, пәтер)" 
                                        className="modern-input" 
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                    <div className="input-group">
                                        <input type="date" name="date" className="modern-input" onChange={handleChange} />
                                        <select name="time" className="modern-input" value={formData.time} onChange={handleChange}>
                                            <option value="10:00 - 14:00">10:00 - 14:00</option>
                                            <option value="14:00 - 18:00">14:00 - 18:00</option>
                                            <option value="18:00 - 22:00">18:00 - 22:00</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                        </section>

                        <section className="form-section">
                            <h3>Байланыс деректері</h3>
                            <div className="input-group">
                                <input type="text" name="name" placeholder="Атыңыз" className="modern-input" onChange={handleChange} />
                                <input type="tel" name="phone" placeholder="+7 (777) 000-00-00" className="modern-input" onChange={handleChange} />
                            </div>
                            <input type="email" name="email" placeholder="Электронды пошта" className="modern-input" onChange={handleChange} />
                        </section>

                        <section className="form-section">
                            <h3>Төлем картасы</h3>
                            <div className="card-mockup">
                                <input 
                                    type="text" 
                                    name="cardNumber"
                                    maxLength="16" 
                                    placeholder="0000 0000 0000 0000" 
                                    className="card-number-input" 
                                    onChange={handleChange} 
                                />
                                <div className="card-row">
                                    <input type="text" placeholder="ММ/ЖЖ" className="card-small-input" />
                                    <input type="password" name="cvv" maxLength="3" placeholder="CVV" className="card-small-input" onChange={handleChange} />
                                </div>
                            </div>
                        </section>
                    </div>

                    <aside className="checkout-summary">
                        <div className="summary-box">
                            <div className="summary-row">
                                <span>Тауарлар құны</span>
                                <span>{cartTotal.toLocaleString()} ₸</span>
                            </div>
                            <div className="summary-row">
                                <span>Жеткізу</span>
                                <span className="free-text">Тегін</span>
                            </div>
                            <hr />
                            <div className="summary-total">
                                <span>Жиынтығы:</span>
                                <span>{cartTotal.toLocaleString()} ₸</span>
                            </div>
                            <button className="main-pay-btn" onClick={handlePayment}>
                                Төлемді растау
                            </button>
                            <p className="secure-text">🔒 Деректеріңіз қауіпсіз қорғалған</p>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Checkout;