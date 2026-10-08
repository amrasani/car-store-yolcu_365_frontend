import React from "react";
import Hero from "../../../components/global/Navbar/Hero/Hero";
import AboutUs from "../../../components/About Us/AboutUs";
import Categories from "../../../components/categories/Categories";
import FeaturedCars from "../../../components/FeaturedCars/FeaturedCars";
import MeetTheTeam from "../../../components/meetTheTeam/MeetTheTeam";
import AboutUsSlider from "../../../components/slider/AboutUsSlider";
import CarDealers from "../../../components/Car Dealers/CarDealers";
import NewsLatter from "../../../components/NewsLatter/NewsLatter";
import BlogSection from "../../../components/BlogSection/BlogSection";

const Home = () => {
  return (
    <div className="home mt-5 mb-4">
      <Hero />
      <Categories />
      <AboutUsSlider />
      <FeaturedCars />
      <CarDealers />
      <MeetTheTeam />
      <BlogSection />
      <NewsLatter />
    </div>
  );
};

export default Home;
