import React from "react";
import "./BlogCardStyle.css";
import { FaCalendarAlt } from "react-icons/fa";


const BlogCard = ({ article }) => {
  const STRAPI_BASE_URL = "http://localhost:1337";
  const blogImg = `${STRAPI_BASE_URL}${article?.cover?.url}`;

  const formattedDate = article?.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("ar-EG", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : article?.date || "تاريخ غير محدد";

  // دالة معالجة الألوان القادمة من Strapi للتأكد من سلامتها
  const getValidColor = (rawColor) => {
    if (!rawColor) return "#e63946"; // اللون الافتراضي في حال عدم وجود لون بقاعدة البيانات

    let cleanColor = rawColor;
    if (rawColor.includes("_")) {
      cleanColor = rawColor.split("_")[1];
    } else {
      cleanColor = rawColor.replace(/^[a-zA-Z]/, "");
    }

    return cleanColor.startsWith("#") ? cleanColor : `#${cleanColor}`;
  };

  
  const badgeColor = getValidColor(article?.category_article?.bg_color);

  return (
    <div
      className="card bg-body-secondary h-100 border-0 shadow-sm overflow-hidden text-end blog-card-custom"
      style={{ backgroundColor: "#1b2431", borderRadius: "16px" }} 
    >
      <div className="position-relative" style={{ height: "200px" }}>
        <img
          src={blogImg}
          className="w-100 h-100 object-fit-cover"
          alt={article?.title}
        />

       
        <span
          className="position-absolute top-0 m-3 badge px-3 py-2 rounded-pill"
          style={{
            right: "0",
            backgroundColor: badgeColor, 
            color: "#ffffff" 
          }}
        >
          {article?.category_article?.name}
        </span>
      </div>

      <div className="card-body d-flex flex-column justify-content-between p-4 text-white">
        <div>
          <h3 className="text-danger fw-bold mb-1 fs-4">{article?.id}</h3>

          <h5 className="fw-bold text-body mb-2 fs-6 lh-base">
            {article?.title}
          </h5>

          <p className="text-muted small lh-lg mb-0">{article?.excerpt}</p>
        </div>

        <div className="mt-3 pt-2 border-top border-secondary d-flex justify-content-between align-items-center text-muted small">
          <div>
            <FaCalendarAlt className="fs-6 mx-1" /> {formattedDate}
          </div>

          {article?.author_article && (
            <span className="fw-bold opacity-75">
              بقلم: {article.author_article.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;