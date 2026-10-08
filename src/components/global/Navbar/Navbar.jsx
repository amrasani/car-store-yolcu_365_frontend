import React, { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
// import { navLinks } from "../../../data/links";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getNavbarData } from "../../../store/navbarSlice";
import { useEffect } from "react";
import logo from "../../../assets/images/yolcu360_logo.svg";
import { ThemeContext } from "../../../context/ThemeContext";

const Navbar = () => {
  const dispatch = useDispatch();

  const { data, isloading, error } = useSelector((state) => state.navbarSlice);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    dispatch(getNavbarData());
  }, [dispatch]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  // const handelSubmit = (e) => {
  //   e.preventDefault();
  //   const trimmedQuery = searchQuery.trim();
  //   if (!trimmedQuery) return;
  //   navigate(`/search?q=${trimmedQuery}`);
  // };

  // useEffect(() => {
  //   const trimmedQuery = searchQuery.trim();
  //   if (trimmedQuery) {
  //     navigate(`/search?q=${trimmedQuery}`);
  //   }
  // }, [searchQuery, navigate]);

  useEffect(() => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      const delayDebounceFn = setTimeout(() => {
        navigate(`/search?q=${trimmedQuery}`);
      }, 1000);
    }
  }, [searchQuery, navigate]);
  return (
    <div>
      <nav className=" navbar navbar-expand-lg bg-body-tertiary shadow-sm fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="إيمتيكار" className="navbar-logo-custom" style={{ width: "120px", height: "auto" }}/>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* {navLinks.map((link) => (
                <li key={link.id} className="nav-item">
                  <Link className="nav-link" to={link.link}>
                    {link.title}
                  </Link>
                </li>
              ))} */}

              {isloading && <li className="nav-item">جاري تحميل القائمة...</li>}
              {error && (
                <li className="nav-item text-danger">خطأ في تحميل القائمة</li>
              )}

              {data?.data?.map((item) => (
                <li key={item.id} className="nav-item">
                  <Link className="nav-link" to={item.link}>
                    {item.title}
                  </Link>
                </li>
              ))}
              <button
                className="btn btn-outline-secondary"
                onClick={toggleTheme}
              >
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </button>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="ابحث"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {/* <button className="btn btn-outline-success" type="submit">
                <FaSearch />
              </button> */}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
