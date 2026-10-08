import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { getSlider } from "../../store/slider/sliderSlice";
import { Link } from "react-router-dom";
import SectionTitle from "../section-title/SectionTitle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./AboutUsSliderStyle.css";

const AboutUsSlider = () => {
  const dispatch = useDispatch();
  const { data, isloading, error } = useSelector((state) => state.slider);
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    dispatch(getSlider());
  }, [dispatch]);
  console.log(data);
  return (
    <div className="bg-body-secondary slider-wrapper d-flex">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        {data.map((slide) => {
          const bgImg =
            theme === "light" ? slide.bg_light?.url : slide.bg_dark?.url;
            const aboutUsImg = slide.AboutUs_img?.url;
          return (
            <SwiperSlide key={slide.id}>
              <div
                className="slide-content d-flex align-items-center justify-content-center py-5"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.18), rgba(0, 0, 0, 0.38)) , url(http://localhost:1337${bgImg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  minHeight: "100%"
                }}
              >
                <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-5">
                  <div className="about-us-content d-flex flex-column col-12 col-md-6 text-center text-md-start ">
                    <SectionTitle title={slide.title} />
                    <h4>{slide.subtitle}</h4>
                    <p className="about-us-description">{slide.description}</p>
                    <div className="about-us-btn d-flex justify-content-center justify-content-md-start gap-3">
                      <Link to={slide.btnLink1} className="btn btn-danger">
                        {slide.btnText1}
                      </Link>
                      <Link to={slide.btnLink2} className="btn btn-outline-danger">
                        {slide.btnText2}
                      </Link>
                    </div>
                  </div>
                  <div className="about-us-image d-flex flex-column rounded-4 overflow-hidden col-12 col-md-6">
                    <div>
                      <img src={`http://localhost:1337${aboutUsImg}`} width="100%" alt="About Us" />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default AboutUsSlider;
