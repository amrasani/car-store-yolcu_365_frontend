import React from "react";
import "./aboutUsStyle.css";
import aboutUsImg from "../../assets/images/About-Us.avif";
import SectionTitle from "../section-title/SectionTitle";

const AboutUs = () => {
  return (
    <div className="about-us d-flex align-items-center justify-content-center py-5 shadow-sm">
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-5">
        <div className="about-us-content d-flex flex-column col-12 col-md-6 text-center text-md-start ">
          <SectionTitle title={"من نحن؟"} />
          
          <h2 className="mb-4">مرحبا بكم في يولجو360 لتجارة السيارات</h2>
          <p className="about-us-description">
            ما دام الأمر متعلقاً بالسيارات فستجد طلبك حتماً في امتكار، حيث نضع
            خبرتنا العميقة في سوق السيارات بين أيديكم.
          </p>
          <div className="about-us-btn d-flex justify-content-center justify-content-md-start">
            <button className="btn btn-danger">من نحن</button>
          </div>
        </div>
        <div className="about-us-image d-flex flex-column rounded-4 overflow-hidden col-12 col-md-6">
          <div>
            <img src={aboutUsImg} width="100%" alt="About Us" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
