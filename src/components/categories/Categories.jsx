import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../../store/carsSlice";
import SectionTitle from "../section-title/SectionTitle";
import Category from "../category/Category";
import { TbCarSuvFilled } from "react-icons/tb";
import { IoCarSportSharp } from "react-icons/io5";
import { FaCarSide, FaTruckPickup } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./categoriesStyle.css";

const Categories = () => {
  const dispatch = useDispatch();

  const { data, isloading, error } = useSelector((state) => state.carsSlice);
  console.log(data);
  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  if (isloading)
    return <div className="text-center py-5">جاري تحميل التصنيفات...</div>;
  if (error)
    return <div className="text-center py-5 text-danger">حدث خطأ: {error}</div>;

  return (
    <div
      className="bg-body-tertiary text-body transition-all"
      style={{
        padding: "20px 10px",
      }}
    >
      <SectionTitle title={"تصنيفات السيارات"} />
      <div className="container">
        <div className="row row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-1 g-4">
          {data?.map((item) => (
            <div key={item.id} className="col">
              <Category car={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
