import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-main">
      <div className="footer-top-section">
        <div className="footer-subscribe-block">
          <h3>Жаңа шығарылымдар мен акцияларға жазылу үшін 10% жеңілдік</h3>
          <div className="subscribe-input-group">
            <input type="email" placeholder="Email" />
            <button type="button">Жазылу</button>
          </div>
          <p className="extra-info">Науқанның шарттары</p>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <h4>Көмек</h4>
            <ul>
              <li>Менің тапсырыстарым</li>
              <li>Жеткізу шарттары</li>
              <li>Қайту</li>
              <li> Қалай тапсырыс беруге болады</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Біз туралы</h4>
            <ul>
              <li>Қоғамдық ұсыныс</li>
              <li>Бос орындар</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Серіктестер үшін</h4>
            <ul>
              <li>Сатушы болыңыз</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom-section">
        <div className="payment-info">
          <img
            src="https://i.pinimg.com/1200x/3b/38/ef/3b38ef8f2bf7505815dbbe732d838ddc.jpg"
            alt="Visa"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
            alt="Mastercard"
          />
          <span>
            Басқа төлем әдістері қол жетімді</span>
        </div>

        <div className="footer-seo-tabs">
          <span>Әйелдерге</span>
          <span className="active-tab">Ерлерге</span>
          <span>Балаларға</span>
          <span>Компания туралы</span>
        </div>
      </div>

      <div className="footer-seo-container">
        <div className="footer-seo-content">
          <div className="seo-block">
            <h4>Үлкен таңдау</h4>
            <p>
              JanuyaDA интернет-дүкені - сәнді киім мен аяқ киім сатып алудың ең жақсы орны.
              Мұнда сіз талғампаз көйлектерден ресми іскерлік костюмдерге дейін таба аласыз.
            </p>
          </div>

          <div className="seo-block">
            <h4>Киіп көру мүмкіндігімен жеткізу</h4>
            <p>Каталогтан тапсырыс берілген өнімдерді төлемге дейін сынап көруге болады.
              Тапсырыстарды Алматы, Астана және Қазақстанға жеткіземіз.
            </p>
          </div>

          <div className="seo-block">
            <h4>Төлем және қайтару</h4>
            <p>
              Сатып алуды онлайн немесе қолма-қол ақшамен немесе жеткізу кезінде несие картасымен төлей аласыз.
              Сіз заттарды 14 күн ішінде қайтара аласыз.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;