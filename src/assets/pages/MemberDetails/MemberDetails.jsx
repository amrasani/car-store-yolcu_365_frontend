import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api";

const MemberDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const STRAPI_BASE_URL = "http://localhost:1337";

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const { data } = await api.get(`/members/${id}?populate=*`);
        setMember(data.data || data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMember();
  }, [id]);

  if (isLoading) return <div className="text-center mt-5 text-body">جاري التحميل...</div>;
  if (error) return <div className="text-center mt-5 text-danger">خطأ: {error.message}</div>;

  const themeColor = member?.Color || "#4caf50"; 

  return (
    <div style={{ marginTop: "70px", padding: "20px" }} className="container py-5 transition-all" dir="rtl">
    
      <button 
        className="btn mb-4 d-flex align-items-center gap-2 text-body-secondary p-0 fw-medium" 
        onClick={() => navigate(-1)}
        style={{ border: 'none', background: 'none' }}
      >
        <i className="bi bi-arrow-right"></i> العودة للفريق
      </button>

      <div className="row g-4 align-items-start">
        {/* كرت الصورة الافتراضي */}
        <div className="col-md-5 col-lg-4">
          {/* تم إعطاء الكرت كلاس bg-body-secondary ليحافظ على تباينه وألا يختفي في الخلفية الداكنة */}
          <div className="card border-0 shadow-sm overflow-hidden bg-body-secondary" style={{ borderRadius: '20px' }}>
             <div className="p-3 text-center">
                <span className="badge mb-3 px-3 py-2 text-white" style={{ backgroundColor: themeColor, borderRadius: '10px' }}>
                  {member?.Role || "موظف"}
                </span>
                <img
                  src={`${STRAPI_BASE_URL}${member?.image?.url || ""}`}
                  className="img-fluid rounded-4 shadow-sm"
                  style={{ 
                    width: "100%", 
                    height: "auto", 
                    objectFit: "cover",
                    border: `4px solid ${themeColor}30` 
                  }}
                  alt={member?.name}
                />
             </div>
          </div>
        </div>

        {/* حاوية تفاصيل الموظف */}
        <div className="col-md-7 col-lg-8">
          {/* - تم خفض كثافة اللون الخلفي الديناميكي المأخوذ من Strapi إلى (05) بدلاً من (10) ليكون ناعماً ومريحاً في المود الغامق والفاتح.
            - تم استخدام كلاس text-body لإجبار النصوص الداخلية على تتبع الثيم.
          */}
          <div 
            className="p-4 p-md-5 rounded-4 shadow-sm text-body" 
            style={{ 
              backgroundColor: `${themeColor}05`, 
              minHeight: '400px',
              width: "100%", // تحسين الاستجابة بدلاً من تثبيتها على 80%
              border: `1px solid ${themeColor}15`
            }}
          >
            {/* حذفنا الـ inline styles للألوان وثبتنا كلاسات التباين التلقائي */}
            <h1 className="fw-bold mb-2 text-body" style={{ fontSize: "30px" }}>
              {member?.name}
            </h1>
            
            <p className="fs-5 mb-4 text-body-secondary">
              <span className="fw-semibold text-body">المسمى الوظيفي:</span> {member?.DescriptionShort}
            </p>

            <div className="mb-5">
              <h5 className="fw-bold text-body mb-3" style={{ fontSize: "1.25rem" }}>
                عن الموظف:
              </h5>
              {/* text-body-secondary بديل مثالي لـ text-secondary في الدارك مود */}
              <p className="lh-lg text-body-secondary" style={{ fontSize: "1.05rem" }}>
                {member?.Description || "خبير في تقديم أفضل حلول السيارات لعملائنا."}
              </p>
            </div>

            {/* أزرار التواصل الاجتماعي */}
            <div className="d-flex flex-wrap gap-3 mt-4">
              <a href="#" className="btn px-4 py-2 d-flex align-items-center gap-2 border-0" 
                 style={{ backgroundColor: '#25D366', color: 'white', borderRadius: '10px' }}>
                <i className="bi bi-whatsapp"></i> واتساب
              </a>
              <a href="#" className="btn px-4 py-2 d-flex align-items-center gap-2 border-0" 
                 style={{ backgroundColor: '#1877F2', color: 'white', borderRadius: '10px' }}>
                <i className="bi bi-facebook"></i> فيسبوك
              </a>
              {/* زر تويتر: تم استخدام btn-light لتفتيحه في المود الغامق أو تركه كـ btn-dark حسب رغبتك، 
                  هنا يفضل استخدام كلاسات متجانسة */}
              <a href="#" className="btn btn-dark px-4 py-2 d-flex align-items-center gap-2" 
                 style={{ borderRadius: '10px' }}>
                <i className="bi bi-twitter-x"></i> تويتر
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;