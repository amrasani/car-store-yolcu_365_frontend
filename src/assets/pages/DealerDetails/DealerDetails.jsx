import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDealerDetails } from '../../../store/dealerSlice'
import { useParams } from 'react-router-dom'
import FeaturedCarCard from '../../../components/FeaturedCarCard/FeaturedCarCard'


const DealerDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { dealer,isloading, cars,error } = useSelector((state) => state.dealers);

  useEffect(() => {
    dispatch(getDealerDetails(id));
  }, [dispatch, id]);
console.log(cars);
  return (
    <div style={{ marginTop: "70px", padding: "20px", textDirection: "rtl" }} className="bg-body-tertiary text-body min-vh-100 transition-all">
      <button 
        className="btn mb-4 d-flex align-items-center gap-2 text-body-secondary p-0 fw-medium" 
        onClick={() => navigate(-1)}
        style={{ border: 'none', background: 'none' }}
      >
        <i className="bi bi-arrow-right"></i> العودة للمعارض
      </button>
      <div className="bunner mt-5 mb-4 p-4 text-center bg-body border rounded shadow-sm">
        <h1 className="text-center text-body fw-bold">
          تفاصيل المعرض: {dealer?.name || "اسم الوكيل غير متوفر"} 
        </h1>
      </div>

      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-3">
          {cars && cars.length > 0 ? (
            cars.map((car) => (
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
    </div>
  )
}

export default DealerDetails