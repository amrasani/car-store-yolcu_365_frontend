import React, { useEffect } from "react";
import CarCard from "../../../components/carCard/CarCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCar } from "../../../store/allCarsSlice";
import FeaturedCarCard from "../../../components/FeaturedCarCard/FeaturedCarCard";
const CarsPage = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const { data, isloading, error } = useSelector((state) => state.allCars);
  console.log(data);
  useEffect(() => {
    dispatch(getAllCar());
  }, [dispatch]);

  // 1. الفلترة الآمنة والمطورة بالكامل
  // الفلترة في حال كان الـ category عبارة عن كائن (Object) مباشر وليس مصفوفة
  const filteredCars = data
    ? data.filter((car) => {
        // نقرأ الـ documentId الخاص بالقسم المربوط بالسيارة مباشرة
        const carCategoryDocId = car.category?.documentId;

        // المقارنة الآمنة والمباشرة بين النصوص بدون الحاجة لدوال فحص المصفوفات
        return String(carCategoryDocId).trim() === String(id).trim();
      })
    : [];

  console.log("السيارات المفلترة النهائية بنجاح:", filteredCars);

  if (isloading)
    return <div className="container mt-5">جاري جلب السيارات...</div>;
  if (error)
    return <div className="container mt-5 text-danger">خطأ: {error}</div>;

  return (
    <div
      className="bg-body-tertiary text-body min-vh-100 transition-all"
      style={{
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <div className="bunner mt-5 mb-4 p-4 text-center bg-body border rounded shadow-sm">
        <h2 className="text-center text-body fw-bold">معرض السيارات</h2>
      </div>
      <div className="container">

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredCars.map((car) => (
          <div className="col" key={car.id}>
            <FeaturedCarCard car={car} />
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default CarsPage;
