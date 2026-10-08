import React from "react";
import DealerLogo from "../../assets/images/CarDealers1.jpg";
import CoverPlaceholder from "../../assets/images/bgDealer.jpg";
import { Link } from "react-router-dom";
import { FaCarSide } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdCheck } from "react-icons/md";
import { FaStar } from "react-icons/fa";

const CarDealerCard = ({ dealer }) => {
  const STRAPI_BASE_URL = "http://localhost:1337";

  const coverUrl = dealer?.cover?.url
    ? `${STRAPI_BASE_URL}${dealer.cover.url}`
    : CoverPlaceholder;

  const logoUrl = dealer?.logo?.url
    ? `${STRAPI_BASE_URL}${dealer.logo.url}`
    : DealerLogo;

  return (
    <div className="col">
      <Link
        to={`/dealers/${dealer?.documentId}`}
        className="text-decoration-none"
      >
        <div className="card  bg-body-secondary h-100 shadow-sm border-0 overflow-hidden text-center dealer-hover-card">
          <div
            style={{
              height: "90px",
              backgroundColor: "#1e293b",
              position: "relative",
            }}
          >
            <img
              src={coverUrl}
              className="w-100 h-100 object-fit-cover opacity-70"
              alt="Cover"
            />
          </div>

          <div style={{ marginTop: "-40px", position: "relative", zIndex: 2 }}>
            <img
              src={logoUrl}
              alt={dealer?.name || "Dealer Logo"}
              className="rounded-circle border border-3 border-white bg-white shadow-sm"
              style={{ width: "80px", height: "80px", objectFit: "contain" }}
            />
          </div>

          <div className="card-body d-flex flex-column justify-content-between p-3 text-dark">
            <div>
              <h5 className="card-title fs-6 fw-bold mb-1 d-flex align-items-center justify-content-center gap-1 text-dark">
                {dealer?.name || "معرض غير مسمى"}
                {dealer?.verified && (
                  <span
                    className="text-primary small"
                    title="حساب موثق"
                    style={{ fontSize: "16px" }}
                  >
                    <MdCheck className="fs-3 mx-lg-1" />
                  </span>
                )}
              </h5>

              <div className="text-warning small mb-3">
                {"⭐".repeat(Math.round(dealer?.rating || 0))}
                <span className="text-muted small ms-1">
                  ({dealer?.rating || "0.0"})
                </span>
              </div>

              <p className="card-text text-muted mb-2 small">
                <IoLocationSharp className="fs-3 mx-lg-1" />
                {dealer?.city || "غير محدد"}، {dealer?.region || ""}
              </p>
              <p className="card-text text-danger small fw-bold">
                <FaCarSide className="fs-3 mx-lg-3" />
                {dealer?.carsCount || 0} سيارة متاحة للبيع
              </p>
            </div>

            <div className="mt-3">
              <div className="btn btn-outline-primary btn-sm w-100 rounded-pill text-center">
                زيارة المعرض
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CarDealerCard;
