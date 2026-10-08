import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCar } from "../../store/allCarsSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "./FeaturedCarsStyle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import SectionTitle from "../section-title/SectionTitle";
import FeaturedCarCard from "../FeaturedCarCard/FeaturedCarCard";

const FeaturedCars = () => {
  const dispatch = useDispatch();

  const { data, isloading, error, meta } = useSelector(
    (state) => state.allCars,
  );
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllCar({ page: currentPage, pageSize }));
  }, [dispatch, currentPage, data.length]);

  if (isloading)
    return <div className="text-center py-5">جاري تحميل السيارات...</div>;
  if (error)
    return (
      <div className="text-center py-5 text-danger">
        حدث خطأ في تحميل البيانات
      </div>
    );
  const latwstCars = data?.slice(0, 5) || [];
  console.log(latwstCars); // تأكد من وجود البيانات قبل محاولة الوصول إليها
  return (
    <section
      className="bg-body-secondary py-5 text-body transition-all"
      style={{
        padding: "100px 20px",
      }}
    >
      <SectionTitle title="قائمة السيارات الشهيرة" />
      <div className="container">
        <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 g-4 gap-3">
          {latwstCars?.map((car) => (
            <FeaturedCarCard car={car} />
          ))}
          {/* </Swiper> */}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
