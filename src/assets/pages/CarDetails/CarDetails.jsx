import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../../api";
import "./CarDetailsStyle.css";
import headerImg from "../../images/section-header-img.avif";
import SpecItem from "../../../components/SpecItem";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import FeaturedCarCard from "../../../components/FeaturedCarCard/FeaturedCarCard";

const STRAPI_BASE_URL = "http://localhost:1337";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedCars, setRelatedCars] = useState([]);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get(`/cars/${id}?populate=*`);
        setCar(data.data || data);
      } catch (error) {
        console.error(error);
        setError("حدث خطأ أثناء تحميل تفاصيل السيارة");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchCarDetails();
  }, [id]);

  useEffect(() => {
    if (!car) return;
    const fetchRelatedCars = async () => {
      try {
        const category_id = car.category?.documentId || car.category?.id;
        if (!category_id) return;

        const { data } = await api.get(
          `/cars?filters[category][documentId][$eq]=${category_id}&filters[documentId][$ne]=${car.documentId}&populate=*`,
        );
        setRelatedCars(data.data || data);
      } catch (err) {
        console.error("خطأ في جلب السيارات المرتبطة:", err);
      }
    };

    fetchRelatedCars();
  }, [car]);

  if (isLoading)
    return (
      <div className="container mt-5 text-center py-5 text-body">
        ⏳ جاري تحميل تفاصيل السيارة...
      </div>
    );
  if (error)
    return (
      <div className="container mt-5 text-center text-danger py-5">{error}</div>
    );
  if (!car)
    return (
      <div className="container mt-5 text-center py-5 text-body">السيارة غير موجودة</div>
    );

  const mainImagePath =
    car.main_image?.formats?.large?.url ||
    car.main_image?.formats?.thumbnail?.url ||
    car.main_image?.url;
  const mainImageUrl = mainImagePath
    ? `${STRAPI_BASE_URL}${mainImagePath}`
    : "https://placehold.co/600x400?text=No+Image";

  return (
    // أضفنا كلاس text-body و bg-body على الحاوية الخارجية لضمان تماشي كل المحتوى
    <div className="bg-body text-body min-vh-100 transition-all">
      {/* البانر العلوي */}
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.16)), url(${headerImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "120px",
        }}
        className="details-hero d-flex align-items-center justify-content-center text-center text-white"
      >
        <div className="container" dir="rtl">
          <h4 className="fw-bold">{car.title || car.name}</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center">
              <li className="breadcrumb-item">
                <a href="/" className="text-white text-decoration-none">
                  الرئيسية
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="/cars" className="text-white text-decoration-none">
                  السيارات
                </a>
              </li>
              <li
                className="breadcrumb-item active text-danger"
                aria-current="page"
              >
                {car.title || car.name}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* تفاصيل السيارة الأساسية */}
      <div className="container my-5" dir="rtl">
        <div className="row g-4">
          <div className="col-md-6">
            <img
              src={mainImageUrl}
              alt={car.title || car.name}
              className="img-fluid rounded shadow-sm w-100"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />

            {/* المعرض المصغر */}
            <div className="d-flex my-3 gap-3 overflow-auto">
              {car.galary?.map((img, index) => (
                <img
                  width="80px"
                  height="60px"
                  style={{ objectFit: "cover", cursor: "pointer" }}
                  key={index}
                  src={`${STRAPI_BASE_URL}${img.url}`}
                  alt={`${car.title} ${index + 1}`}
                  className="rounded border border-secondary"
                />
              ))}
            </div>

            {/* الوصف الملحق */}
            <div className="mt-4">
              <h4 className="mb-3 text-danger border-bottom border-secondary pb-3">
                الوصف الملحق
              </h4>
              {car?.desc && car.desc.length > 0 ? (
                // أضفنا حاوية text-body-secondary ليكون الخط متناسق في المودين
                <div className="text-body-secondary">
                  <BlocksRenderer content={car.description} />
                </div>
              ) : (
                <p className="text-body-secondary small">
                  لا يوجد وصف مكتوب لهذه السيارة حالياً.
                </p>
              )}
            </div>
          </div>

          {/* لوحة المواصفات الفنية والسعر */}
          <div className="col-md-6 text-end">
            {/* استبدلنا text-dark بكلاس text-body */}
            <h5 className="fs-4 fw-bold mb-4 text-body">
              {car.title || car.name}
            </h5>

            {car.specs_list ? (
              <SpecItem specs={car.specs_list} />
            ) : (
              // تم تعديل الجدول بالكامل:
              // 1. إعطاء الحاوية الخارجية bg-body-secondary (لتصبح رمادي كاشف في الدارك ومطابقة في اللايت)
              // 2. استبدال كلاسات bg-light بـ bg-body أو bg-body-tertiary لتنسجم مع المود
              <div className="p-3 bg-body-secondary border border-secondary-subtle rounded mb-3">
                <div className="d-flex align-items-center justify-content-between p-3 mb-2 bg-body rounded shadow-sm">
                  <p className="mb-0 text-body-secondary">
                    <strong>سنة الصنع:</strong>
                  </p>
                  <p className="mb-0 fw-bold text-body">{car.year}</p>
                </div>
                <div className="d-flex align-items-center justify-content-between p-3 mb-2 bg-body rounded shadow-sm">
                  <p className="mb-0 text-body-secondary">
                    <strong>المسافة المقطوعة:</strong>
                  </p>
                  <p className="mb-0 fw-bold text-body">{car.mileage} KM</p>
                </div>
                <div className="d-flex align-items-center justify-content-between p-3 mb-2 bg-body rounded shadow-sm">
                  <p className="mb-0 text-body-secondary">
                    <strong>نوع الحركة:</strong>
                  </p>
                  <p className="mb-0 fw-bold text-body">{car.transmission || "Automatic"}</p>
                </div>
                <div className="d-flex align-items-center justify-content-between p-3 bg-body rounded shadow-sm">
                  <p className="mb-0 text-body-secondary">
                    <strong>نوع الوقود:</strong>
                  </p>
                  <p className="mb-0 fw-bold text-body">{car.fuel_type || "Gasoline"}</p>
                </div>
              </div>
            )}

            <div className="mt-4 d-flex flex-column align-items-start gap-2">
              <p className="pt-2 fs-4 fw-bold text-primary">
                السعر: {car.price?.toLocaleString()} ₺
              </p>
              {/* استبدلنا text-secondary بـ text-body-secondary */}
              <p className="fs-5 fw-bold text-body-secondary">
                الكمية المتوفرة: <span className="text-body">{car.count || 1}</span>
              </p>
              <p className="fs-5 fw-bold text-body-secondary">
                حالة الإتاحة: <span className="text-success">{car.mileage ? "متوفرة حالياً" : "غير متوفرة"}</span>
              </p>
            </div>

            <div className="mt-4">
              <button className="btn btn-danger w-100 py-3 fw-bold rounded-3 shadow-sm fs-5">
                تواصل معنا وعاين الآن
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* السيارات الموصى بها وذات الصلة */}
      {/* استبدلنا bg-light بـ bg-body-tertiary لتعطي تبايناً ذكياً أسفل الصفحة */}
      <div className="bg-body-tertiary border-top border-secondary-subtle py-5 mt-5">
        <div className="container" dir="rtl">
          {/* استبدلنا text-dark بـ text-body */}
          <h3 className="mb-4 fw-bold text-body">سيارات قد تعجبك أيضاً</h3>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
            {relatedCars && relatedCars.length > 0 ? (
              relatedCars.map((relatedCar) => (
                <div className="col" key={relatedCar.id}>
                  <FeaturedCarCard car={relatedCar} />
                </div>
              ))
            ) : (
              <p className="text-body-secondary small col-12">
                لا توجد سيارات مشابهة في هذا القسم حالياً.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;