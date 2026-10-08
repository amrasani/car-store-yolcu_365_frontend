import React, { useContext, useState } from "react";
import { FaGasPump, FaCalendarAlt, FaRegClock, FaSearch, FaRegHeart, FaHeart } from "react-icons/fa";
import { TbSteeringWheel } from "react-icons/tb";
import "./FeaturedCarCardStyle.css";
import { Link } from "react-router-dom";
import { QuickViewContext } from "../../context/QuickViewContext";

const STRAPI_BASE_URL = "http://localhost:1337";

const FeaturedCarCard = ({ car }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { openQuickView } = useContext(QuickViewContext);

  if (!car) return null;

  const fuelMap = {
    Gasoline: "بنزين",
    Diesel: "ديزل",
    Electric: "كهرباء",
    Hybrid: "هايبرد",
  };

  let finalImageUrl =
    car?.main_image?.formats?.thumbnail?.url ||
    car?.main_image?.formats?.medium?.url ||
    car?.main_image?.formats?.small?.url ||
    car?.main_image?.url ||
    "";

  return (
    <div
      className="blog-card-custom bg-body border text-end" 
      dir="rtl"
      style={{ 
        width: "250px", 
        minHeight: "450px",
        backgroundColor: "#1b2431",
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        padding: "0px",
      }}
    > 
      <div 
        className="car-img-container-fixed" 
        style={{ 
          position: "relative", 
          width: "100%", 
          height: "180px", 
          
        }}
      >
        <img
          src={`${STRAPI_BASE_URL}${finalImageUrl}`}
          alt={car.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            margin: "0px",
            padding: "0px"
          }}
        />
        
        
        <div className="back-img"></div>
        
        
        <div className="car-icons">
          <FaSearch
            size={20}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openQuickView(car);
            }}
          />

          {isFavorite ? (
            <FaHeart
              size={20}
              color="#e63946"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsFavorite(false);
              }}
            />
          ) : (
            <FaRegHeart
              size={20}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsFavorite(true);
              }}
            />
          )}
        </div>
        
        
        <button className="back-btn btn btn-danger btn-sm px-3 rounded-pill shadow">
          إضافة للسلة
        </button>
      </div>

     
      <Link
        to={`/featured-cars/${car.documentId}`}
        className="text-decoration-none d-flex flex-column justify-content-between p-3 text-white"
        style={{ flex: 1 }}
      >
        <div>
          <h6 className="fw-bold mb-1 text-danger text-truncate">
            {car.title}
          </h6>
          <p className="text-muted small mb-3">{car.type || "سيارة مميزة"}</p>
          
          <div className="row row-cols-2 g-2 mb-3 border-top border-secondary pt-2">
            <div className="col d-flex align-items-center gap-2 justify-content-start">
              <FaRegClock className="text-danger small" />
              <span className="small text-muted text-truncate">
                {car.km || car.mileage || "0"} KM
              </span>
            </div>
            <div className="col d-flex align-items-center gap-2 justify-content-start">
              <FaGasPump className="text-danger small" />
              <span className="small text-muted text-truncate">
                {fuelMap[car.fuel] || car.fuel || "بنزين"}
              </span>
            </div>
            <div className="col d-flex align-items-center gap-2 justify-content-start">
              <TbSteeringWheel className="text-danger small" />
              <span className="small text-muted text-truncate">{car.transmission || "أوتوماتيك"}</span>
            </div>
            <div className="col d-flex align-items-center gap-2 justify-content-start">
              <FaCalendarAlt className="text-danger small" />
              <span className="small text-muted text-truncate">{car.year}</span>
            </div>
          </div>
        </div>

       
        <div className="d-flex align-items-center justify-content-between pt-2 border-top border-secondary mt-auto">
          <div className="fw-bold text-primary fs-5">
            {car.price} <small className="text-primary" style={{ fontSize: "14px" }}>₺</small>
          </div>
          
          <button className="btn btn-danger btn-sm px-3 rounded-pill shadow-sm fw-bold">
            تفاصيل إضافية
          </button>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedCarCard;