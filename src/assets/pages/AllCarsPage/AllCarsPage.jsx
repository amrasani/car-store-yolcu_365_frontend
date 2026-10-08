import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCar } from "../../../store/allCarsSlice";
import FeaturedCarCard from "../../../components/FeaturedCarCard/FeaturedCarCard";
import { useSearchParams } from "react-router-dom";
useState
const AllCarsPage = () => {
  const dispatch = useDispatch();

  const { data, isloading, error ,meta } = useSelector((state) => state.allCars);
  // const [currentPage, setCurrentPage] = useState(1);
  const [searchParams , setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = 5;

  useEffect(() => {
    dispatch(getAllCar({ page: currentPage, pageSize }));
  }, [dispatch ,currentPage,data.length]);

  const totalPage = meta?.pagination?.pageCount || 1;

  if (isloading) {
    return (
      <div className="text-center py-5 fs-3 text-dark">
        ⏳ جاري تحميل جميع السيارات...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5 text-danger fs-3">
        ❌ حدث خطأ في تحميل البيانات: {error}
      </div>
    );
  }

  return (
    <div
    className="bg-body-tertiary text-body min-vh-100 transition-all"
      style={{
       padding: "20px",
        minHeight: "100vh",
      }}
    >
      <div className="bunner mt-5 mb-4 p-4 text-center bg-body border rounded shadow-sm">
        <h1 className="text-center text-body fw-bold">
          معرض جميع السيارات
        </h1>
      </div>

      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-3">
          {data && data.length > 0 ? (
            data.map((car) => (
              <div className="col" key={car.id}>
                <FeaturedCarCard car={car} />
              </div>
            ))
          ) : (
            <p className="text-center text-muted">
              لا توجد سيارات في قاعدة البيانات حالياً.
            </p>
          )}
        </div>
      </div>

      <div className="d-flex justify-content-center my-4">
          {
            [...Array(totalPage)].map((_, index) => (
              <button
                key={index}
                className={`btn mx-1 ${currentPage === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setSearchParams({page: index + 1})}
                
              >
                {index + 1}
              </button>
            ))
          }
      </div>
    </div>
  );
};

export default AllCarsPage;
