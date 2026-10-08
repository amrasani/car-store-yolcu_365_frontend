import React, { useEffect, useState } from "react";
import SectionTitle from "../section-title/SectionTitle";
import "./CarDealersStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllDealers } from "../../store/dealerSlice";
import CarDealerCard from "../About Us/CarDealerCard";
import { useSearchParams } from "react-router-dom";

const CarDealers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("الكل");
  const dispatch = useDispatch();
  
  const { data, isloading, error ,meta } = useSelector((state) => state.dealers);
//   const [currentPage, setCurrentPage] = useState(1);
const [searchParams ,setSearchParams] = useSearchParams();
const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = 3;

  useEffect(() => {
    dispatch(getAllDealers({ page: currentPage, pageSize }));
  }, [dispatch, data.length , currentPage]);
  const totalPage =meta ? meta.pagination.pageCount : 1;

  if (isloading) return <div className="text-center py-5">جاري تحميل المعارض...</div>;
  if (error) return <div className="alert alert-danger text-center">{error}</div>;

  return (
    <section className="my-5 text-body transition-all" style={{ direction: "rtl" }}>
      <div className="container" style={{ marginTop: "60px" }}>
        
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 pb-3 border-bottom">
          <SectionTitle title="المعارض المسجلة" />
          
          <div className="d-flex gap-3 mt-3 mt-md-0">
            <select className="form-select form-select-sm" style={{ width: "180px" }}>
              <option>رتب حسب: الأعلى تقييماً</option>
              <option>رتب حسب: الأكثر سيارات</option>
              <option>رتب حسب: المضاف حديثاً</option>
            </select>
          </div>
        </div>

        <div className="row g-4">
          
          
          <div className="col-lg-3 col-md-4">
            <div className="card p-3 shadow-sm border-0 sticky-top" style={{ top: "90px", zIndex: 10 }}>
              <h5 className="mb-3 font-weight-bold fs-6">🔍 تصفية النتائج</h5>
              
              <div className="mb-3">
                <label className="form-label small text-muted">اسم المعرض</label>
                <input 
                  type="text" 
                  className="form-control form-control-sm" 
                  placeholder="اكتب اسم المعرض هنا..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small text-muted">المدينة</label>
                <select 
                  className="form-select form-select-sm" 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="الكل">الكل</option>
                  <option value="غازي عنتاب">غازي عنتاب</option>
                  <option value="إسطنبول">إسطنبول</option>
                  <option value="أنقرة">أنقرة</option>
                  <option value="مرسين">مرسين</option>
                  <option value="بورصة">بورصة</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small text-muted d-block mb-2">نوع المعلن</label>
                <div className="form-check mb-1">
                  <input className="form-check-input" type="checkbox" id="type1" />
                  <label className="form-check-label small" htmlFor="type1">معرض معتمد (وكيل)</label>
                </div>
                <div className="form-check mb-1">
                  <input className="form-check-input" type="checkbox" id="type2" />
                  <label className="form-check-label small" htmlFor="type2">معرض سيارات مستعملة</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="type3" />
                  <label className="form-check-label small" htmlFor="type3">أفراد (معلنون عاديون)</label>
                </div>
              </div>

              <button className="btn btn-primary btn-sm w-100 mt-2">تطبيق الفلتر</button>
            </div>
          </div>

       
          <div className="col-lg-9 col-md-8">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
              {data && data.map((dealer) => (
                <CarDealerCard
                  key={dealer.id}
                  dealer={dealer}
                />
              ))}
            </div>

          </div>

        </div>
      </div>
         <div className="d-flex justify-content-center mt-5">
            {Array.from({ length: totalPage }).map((_, index) => (
                <button
                  key={index}
                  className={`btn ${currentPage === index + 1 ? "btn-primary" : "btn-outline-primary"} mx-1`}
                  onClick={() => setSearchParams({page: index + 1})}
                >
                  {index + 1}
                </button>
            ))}
         </div>
            
    </section>
  );
};

export default CarDealers;