import React, { useState } from "react";
import { BiSolidMessageAltDetail } from "react-icons/bi";
import { AiOutlineLock } from "react-icons/ai";
import api from "../../api";

const CarNewsletter = () => {
  const [formData, setFormData] = useState({ firstName: "", email: "" });
  const [showNotification, setShowNotification] = useState(false); // تغيير الاسم ليشمل النجاح والخطأ
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(""); // 'success' أو 'danger'
  const [message, setMessage] = useState("");

  const STRAPI_API_URL = "/newsletters"; 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.email.trim()) {
      setMessage("يرجى ادخال البيانات بشكل صحيح");
      setType("error");
      setShowNotification(true);
      setTimeout(() => {
          setShowNotification(false);
        }, 2000);
        return;
    }

    setLoading(true);

    try {
      // إرسال الطلب إلى سترابي
      await api.post(STRAPI_API_URL, {
        data: {
          firstName: formData.firstName.trim(),
          email: formData.email.trim(),
        },
      });

      // في حال النجاح
      setMessage("شكراً لاشتراكك! تم تسجيل بريدك الإلكتروني بنجاح، انتظر عروضنا القادمة.");
      setType("success");
      setFormData({ firstName: "", email: "" }); // تفريغ الحقول
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 2000);

    } catch (error) {
      console.error("Strapi Error:", error.response?.data || error);
      
      // التعامل مع الأخطاء القادمة من السيرفر (مثل إيميل مكرر أو حقول خاطئة)
      const serverMessage = error.response?.data?.error?.message;
      if (serverMessage === "This attribute must be unique") {
        setMessage("هذا البريد الإلكتروني مشترك بالفعل!");
        setTimeout(() => {
        setShowNotification(false);
      }, 2000);
      } else {
        setMessage("مشكلة في الاتصال بالسيرفر، يرجى المحاولة لاحقاً.");
        setTimeout(() => {
        setShowNotification(false);
      }, 2000);
      }
      
      setType("danger");
      setShowNotification(true);
    } finally {
      setLoading(false); // تعديل جوهري: إيقاف التحميل دائماً سواء نجح الطلب أو فشل
    }
  };

  return (
    <section className="my-5 bg-body-secondary text-body transition-all" >
      <div className="container py-5" style={{ maxWidth: "800px" }}>
        <div
          className="position-relative z-1 bg-body border rounded shadow-sm p-4 text-center"
          style={{ maxWidth: "1000px", margin: "0 auto" }}
        >
          <div className="fs-1 mb-3">
            <BiSolidMessageAltDetail />
          </div>
          <h2 className="fw-bold mb-2">لا تفوّت سيارة أحلامك!</h2>
          <p className="text-muted mb-4" style={{ fontSize: "15px" }}>
            اشترك في نشرتنا البريدية لتكون أول من يعلم بأحدث السيارات الواصلة،
            العروض الحصرية، ونصائح الخبراء في سوق السيارات.
          </p>

          <form
            onSubmit={handleSubmit}
            className="row g-3 justify-content-center mb-4"
            noValidate
          >
            <div className="col-12 col-md-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="form-control form-control-lg bg-secondary text-white border-0 bg-opacity-25"
                placeholder="اسمك الأول"
                required
                disabled={loading}
              />
            </div>
            <div className="col-12 col-md-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control form-control-lg bg-secondary text-white border-0 bg-opacity-25"
                placeholder="بريدك الإلكتروني"
                required
                disabled={loading}
              />
            </div>
            <div className="col-12 col-md-4 d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary btn-lg fw-bold px-4"
                disabled={loading}
              >
                {loading ? "جاري الاشتراك..." : "اشترك الآن"}
              </button>
            </div>
          </form>

         
          {showNotification && (
            <div
              className={`alert alert-${type} border-0 py-3 mx-auto`}
              role="alert"
              style={{ maxWidth: "600px", transition: "all 0.3s ease" }}
            >
              <small>{type === "success" ? "🎉" : "⚠️"} {message}</small>
            </div>
          )}

          <p className="text-muted small mt-4 mb-0">
            <AiOutlineLock className="fs-3 text-bg-warning text-dark rounded rounded-circle p-1 m-2" />
            نحن نحترم خصوصيتك. يمكنك إلغاء الاشتراك في أي وقت بنقرة واحدة.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CarNewsletter;