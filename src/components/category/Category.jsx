import React from "react";
import "./categoryStyle.css";
import { Link } from "react-router-dom";

const STRAPI_BASE_URL = "http://localhost:1337";

const Category = ({ car }) => {
  // 1. قراءة البيانات المباشرة النظيفة
  const title = car?.title;
  const description = car?.description;

  // 2. استخراج رابط الصورة القادم من جدول الـ category في Strapi بشكل صحيح
  const imageUrl = car?.image?.url
    ? `${STRAPI_BASE_URL}${car.image.url}`
    : "https://via.placeholder.com/150"; // صورة احتياطية في حال نسيان رفع صورة

  return (
    <div className="category-card-wrapper h-100">
      {/* رابط واحد فقط يغلف الكارت بأكمله لمنع تداخل أوسمة الـ HTML وتشويه التصميم */}
      <Link
        to={`/categories/${car?.documentId || car?.id}`}
        className="text-decoration-none d-block h-100"
      >
        <div className="position-relative card h-100 shadow-sm border-0 bg-body-secondary text-body text-center p-3 overflow-hidden">
          
          {/* دائرة الصورة الخاصة بالقسم (سيارات بيك أب، SUV، إلخ) */}
          <div
            className="category-image-wrapper mb-3 mx-auto shadow-sm bg-body-tertiary rounded-circle d-flex align-items-center justify-content-center overflow-hidden"
            style={{ width: "70px", height: "70px" }}
          >
            <img
              src={imageUrl}
              alt={title}
              className="w-100 h-100 object-fit-cover"
            />
          </div>

          <div className="card-body p-0">
            {/* عرض عنوان القسم الصافي من جدول التصنيفات */}
            <h5 className="card-title fw-bold text-body m-0">
              {title || "تصنيف غير مسمى"}
            </h5>

            {/* عرض الوصف تحت العنوان إذا كان موجوداً في الـ Strapi */}
            {description && (
              <p className="text-muted small m-0 mt-2">{description}</p>
            )}
          </div>

          {/* طبقة الـ Overlay الأنيقة التي تظهر عند تمرير الماوس (Hover) */}
          <div className="cat-overlay d-flex flex-column align-items-center justify-content-center">
            <p className="m-0 mb-2 fw-bold text-white">شاهد جميع {title}</p>
            {/* تم تحويله هنا إلى div عادي ليأخذ مظهر الزر فقط دون كسر روابط الصفحة */}
            <div className="btn btn-danger btn-sm px-3 rounded-pill">
              انقر للمشاهدة
            </div>
          </div>

        </div>
      </Link>
    </div>
  );
};

export default Category;