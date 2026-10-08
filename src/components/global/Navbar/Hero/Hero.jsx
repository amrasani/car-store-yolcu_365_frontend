import React from "react";
import "./HeroStyle.css";
import herobglight from "../../../../assets/images/header1.jpg";
import herobgdark from "../../../../assets/images/header bg-ligth.jpg";
import { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";

const Hero = () => {
  const { theme } = useContext(ThemeContext);
  const herobg = theme === "light" ? herobglight : herobgdark;
  return (
    <div className="hero" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.14), rgba(0, 0, 0, 0.33)) , url(${herobg})` ,backgroundSize:"cover", backgroundPosition:"center"}}>
      <div className="container">
        <div className="text-hero p-5 ">
          <div className="text text-center d-flex flex-column align-items-center justify-content-center gap-4 text-white fs-6">
            <h1>يولجو360 بوابتك إلى عالم السيارات</h1>
            <p className="description">
              بخبرتنا الواسعة في سوق السيارات الجديدة والمستعملة نوفر لكم باقة
              مميزة من الخيارات المناسبة بأفضل الأسعار.
            </p>
          </div>

          <div className="buttons d-flex gap-3">
            <button className="btn btn-light">تواصل معنا</button>
            <button className="btn btn-primary">تصفح السيارات</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
