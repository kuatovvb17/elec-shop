import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiLocationOn } from "react-icons/ci";
import { TfiPackage } from "react-icons/tfi";
import { PiCreditCardLight } from "react-icons/pi";
import './TopBar.css';

const TopBar = () => {
  const [city, setCity] = useState('г. Астана');
  const cities = ['г. Алматы', 'г. Астана', 'г. Шымкент', 'г. Караганда', 'г. Актобе'];

  return (
    <div className="top-bar">
      <div className="top-bar-container">

        <div className="city-dropdown-wrapper">
          <div className="city-current">
            <CiLocationOn className="top-icon" />
            <span>{city}</span>
          </div>
          <ul className="city-list">
            {cities.map((item) => (
              <li key={item} onClick={() => setCity(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="top-bar-right">
          <Link to="/delivery-info" className="top-link">
            <TfiPackage className="top-icon" />
            <span>Киіп көру мүмкіндігімен жеткізу</span>
          </Link>
          <Link to="/payment-info" className="top-link">
            <PiCreditCardLight className="top-icon" />
            <span>Қалаған уақытта төлеңіз</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default TopBar;