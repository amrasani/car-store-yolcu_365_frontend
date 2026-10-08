import React, { useEffect } from "react";
import SectionTitle from "../section-title/SectionTitle";
import BlogCard from "../BlogCard/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllArticles } from "../../store/blogSlice";

// const articlesData = [
//   {
//     id: 1,
//     number: "01",
//     title: "5 أشياء يجب فحصها بدقة قبل شراء سيارة مستعملة",
//     excerpt: "تعرف على أهم النقاط الميكانيكية التي يجب عليك مراجعتها لتجنب الغش عند الشراء...",
//     date: "10 يونيو 2026",
//     category: "نصائح الشراء"
//   },
//   {
//     id: 2,
//     number: "02",
//     title: "السيارات الكهربائية ضد الهجين: أيهما أفضل لك؟",
//     excerpt: "نضع الفروقات الجوهرية في تكلفة التشغيل، الصيانة، ومدى البطارية في مقارنة عادلة...",
//     date: "05 يونيو 2026",
//     category: "مقارنات"
//   },
//   {
//     id: 3,
//     number: "03",
//     title: "أعراض تلف ناقل الحركة الأوتوماتيكي وكيف تتفاداها",
//     excerpt: "إذا لاحظت تأخراً في النقل، فهذه الإشارات تخبرك بضرورة التدخل السريع لحماية سيارتك...",
//     date: "28 مايو 2026",
//     category: "ميكانيكا وصيانة"
//   }
// ];

const BlogSection = () => {
  const dispatch = useDispatch();
  const { data, isloading, error } = useSelector((state) => state.blogs);
  useEffect(() => {
    dispatch(getAllArticles());
  }, [dispatch ,data.length]);
  if (isloading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  console.log(data);
  
  return (
    <section className="my-5 text-body py-5">
      <div className="container">
       
        <SectionTitle title={"نصائح الخبراء وأحدث المقالات"} />
        
        
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mt-4">
          
            {
              data.map((article) => (
                <div className="col" key={article.id}>
                  <BlogCard article={article} />
                </div>
              ))
            }
         
        </div>
      </div>
    </section>
  );
};

export default BlogSection;