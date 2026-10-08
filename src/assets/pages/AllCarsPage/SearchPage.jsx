import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import FeaturedCarCard from "../../../components/FeaturedCarCard/FeaturedCarCard";
import { getAllCar } from "../../../store/allCarsSlice";

const SearchPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCar());
  }, [dispatch]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase().trim() || "";
  const { data, isloading, error } = useSelector((state) => state.allCars);
  const filteredCars = useMemo(() => {
    return data
      ? data.filter((car) => {
          const carName = car.title?.toLowerCase() || "";
          return carName.includes(query);
        })
      : [];
  }, [data, query]);
  console.log(filteredCars);
  return (
    <>
      <div className="bunner mb-5 p-4 text-center bg-white rounded shadow-sm">
        <h2 className="text-center text-dark fw-bold mb-5">
          نتائج البحث عن: "{query}"
        </h2>
      </div>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {filteredCars && filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <div className="col" key={car.id}>
                <FeaturedCarCard car={car} />
              </div>
            ))
          ) : (
            <p className="text-center text-muted">
              لا توجد سيارات تطابق معايير البحث.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
