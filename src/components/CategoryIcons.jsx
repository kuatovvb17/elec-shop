import React from 'react';
import './CategoryIcons.css';

// --- СУРЕТТЕРДІ ИМПОРТТАУ ---
// Бірінші қатар (алдыңғылар)
import verhnyayaOdezhda from '../assets/categoriesimg/верхняя одежда.jpg';
import krossovki from '../assets/categoriesimg/кроссовки и кеды.jpg';
import sizePlus from '../assets/categoriesimg/size plus.jpg';
import dzhinsy from '../assets/categoriesimg/джинсы.jpg';
import bryuki from '../assets/categoriesimg/брюки.jpg';
import sumki from '../assets/categoriesimg/сумки.jpg';

// Екінші қатар (жаңадан қосылғандар)
import aksessuary from '../assets/categoriesimg/аксессуары.jpg';
import platya from '../assets/categoriesimg/платья и сарафаны.jpg';
import svitery from '../assets/categoriesimg/svitery.jpg';
import tufli from '../assets/categoriesimg/туфли.jpg';
import nosik from '../assets/categoriesimg/носик.jpg'; // Тізімдегі 'нижнее белье' орнына
import botinki from '../assets/categoriesimg/ботинки.jpg';

const CategoryIcons = () => {
  // Категориялар массиві (12 дана)
  const categories = [
    { name: "Сыртқы киім", img: verhnyayaOdezhda },
    { name: "Кроссовкалар және кеды", img: krossovki },
    { name: "Кең пішімді киімдер", img: sizePlus },
    { name: "Джинсы", img: dzhinsy },
    { name: "Шалбар", img: bryuki },
    { name: "Сөмке", img: sumki },
    { name: "Аксессуарлар", img: aksessuary },
    { name: "Көйлектер мен сарафандар", img: platya },
    { name: "Свитерлер мен Жемпірлер", img: svitery },
    { name: "Туфли", img: tufli },
    { name: "Іш киім", img: nosik },
    { name: "Етік", img: botinki },
  ];

  return (
    <div className="container">
      <div className="category-icons-header">
        <h2>Санаттар <span>&gt;</span></h2>
      </div>
      <div className="category-icons-grid">
        {categories.map((cat, index) => (
          <div key={index} className="category-icon-item">
            <span className="cat-name">{cat.name}</span>
            <img src={cat.img} alt={cat.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryIcons;