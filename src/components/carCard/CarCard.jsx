import React from "react";

const CarCard = ({ car }) => {
  console.log(car);
  const STRAPI_BASE_URL = "http://localhost:1337";
  const imageUrl = `${STRAPI_BASE_URL}${car.main_image.url}`;
  const fuelMap = {
    Gasoline: "بنزين",
    Diesel: "ديزل",
    Electric: "كهرباء",
    Hybrid: "هايبرد",
  };

  return (
    <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
      <div className="position-relative">
        <img
          src={imageUrl}
          className="card-img-top"
          alt={car?.title}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <span className="badge bg-danger position-absolute top-0 end-0 m-3">
          {car?.year}
        </span>
      </div>

      <div className="card-body text-end">
        <h5 className="card-title fw-bold">{car?.title}</h5>

        <div className="d-flex justify-content-between dir-rtl my-3 text-muted small">
          <span>
            <i className="bi bi-speedometer2"></i> {car?.mileage} كم
          </span>
          <span>
            <i className="bi bi-fuel-pump"></i>{" "}
            {fuelMap[car?.fuel_type] || car?.fuel_type}
          </span>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="text-danger fw-bold fs-5">
            {car?.price?.toLocaleString()} $
          </span>
          <button className="btn btn-outline-dark btn-sm rounded-pill px-3">
            التفاصيل
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default CarCard;
