import React from 'react';
import { useNavigate } from 'react-router-dom'; // Жаңа импорт
import './CategoryIcons.css';

// --- СУРЕТТЕРДІ ИМПОРТТАУ ---
import verhnyayaOdezhda from '../assets/categoriesimg/верхняя одежда.jpg';
import krossovki from '../assets/categoriesimg/кроссовки и кеды.jpg';
import sizePlus from '../assets/categoriesimg/size plus.jpg';
import dzhinsy from '../assets/categoriesimg/джинсы.jpg';
import bryuki from '../assets/categoriesimg/брюки.jpg';
import sumki from '../assets/categoriesimg/сумки.jpg';
import aksessuary from '../assets/categoriesimg/аксессуары.jpg';
import platya from '../assets/categoriesimg/платья и сарафаны.jpg';
import svitery from '../assets/categoriesimg/svitery.jpg';
import tufli from '../assets/categoriesimg/туфли.jpg';
import nosik from '../assets/categoriesimg/носик.jpg'; 
import botinki from '../assets/categoriesimg/ботинки.jpg';

const CategoryIcons = () => {
  const navigate = useNavigate(); // Навигация функциясы

  const categories = [
    { name: "Сыртқы киім", img: verhnyayaOdezhda, slug: "outerwear" },
    { name: "Кроссовкалар және кеды", img: krossovki, slug: "sneakers" },
    { name: "Кең пішімді киімдер", img: sizePlus, slug: "plus-size" },
    { name: "Джинсы", img: dzhinsy, slug: "jeans" },
    { name: "Шалбар", img: bryuki, slug: "pants" },
    { name: "Сөмке", img: sumki, slug: "bags" },
    { name: "Аксессуарлар", img: aksessuary, slug: "accessories" },
    { name: "Көйлектер мен сарафандар", img: platya, slug: "dresses" },
    { name: "Свитерлер мен Жемпірлер", img: svitery, slug: "sweaters" },
    { name: "Туфли", img: tufli, slug: "shoes" },
    { name: "Іш киім", img: nosik, slug: "lingerie" },
    { name: "Етік", img: botinki, slug: "boots" },
  ];

  return (
    <div className="container">
      <div className="category-icons-header">
        <h2>Санаттар <span>&gt;</span></h2>
      </div>
      <div className="category-icons-grid">
        {categories.map((cat, index) => (
          <div 
            key={index} 
            className="category-icon-item"
            onClick={() => navigate(`/category?type=${cat.name}`)} // Басқанда өту
            style={{ cursor: 'pointer' }} // Қолдың иконкасы шығу үшін
          >
            <span className="cat-name">{cat.name}</span>
            <img src={cat.img} alt={cat.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryIcons;