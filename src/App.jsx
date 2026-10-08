import AboutAs from "./assets/pages/AboutAs/AboutAs";
import CarDetails from "./assets/pages/CarDetails/CarDetails";
import MemberDetails from "./assets/pages/MemberDetails/MemberDetails";
import CarsPage from "./assets/pages/CarsPage/CarsPage";
import Contact from "./assets/pages/Contact/Contact";
import Home from "./assets/pages/HomePage/Home";
import SellCar from "./assets/pages/SellCar/SellCar";
import Services from "./assets/pages/Services/Services";
import ToneOfVoice from "./assets/pages/ToneOfVoice/ToneOfVoice";
import Navbar from "./components/global/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllCarsPage from "./assets/pages/AllCarsPage/AllCarsPage";
import SearchPage from "./assets/pages/AllCarsPage/SearchPage";
import QuickViewModdal from "./components/QuickView/QuickViewModdal";
import DealerDetails from "./assets/pages/DealerDetails/DealerDetails";
import AdminLayout from "./assets/pages/admin/AdminLayout";
import Dashboard from "./assets/pages/admin/Dashboard";
import Categories from "./assets/pages/admin/categories/Categories";
import AllCar from "./assets/pages/admin/allCar/AllCar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <QuickViewModdal />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<AboutAs />} />
          <Route path="/cars" element={<AllCarsPage />} />
          <Route path="/sell-car" element={<SellCar />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<ToneOfVoice />} />
          <Route path="/featured-cars/:id" element={<CarDetails />} />
          <Route path="/categories/:id" element={<CarsPage />} />
          <Route path="/members/:id" element={<MemberDetails />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/dealers/:id" element={<DealerDetails />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="categories" element={<Categories />} />
            <Route path="cars" element={<AllCar />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
