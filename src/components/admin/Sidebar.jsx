import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return <div className="w-25">
    <div
        class="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary"
        style={{ width: "280px",
          height:"95%",
         }}
      >
        <a
          href="/"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <svg
            class="bi pe-none me-2"
            width="40"
            height="32"
            aria-hidden="true"
          >
            <use xlink:href="#bootstrap"></use>
          </svg>
          <span class="fs-4">لوحة تحكم المدير</span>
        </a>
        <hr />
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <Link to={"dashboard"} class="nav-link active" aria-current="page">
              <svg
                class="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use xlink:href="#home"></use>
              </svg>
              الرئيسية
            </Link>
          </li>
          <li>
            <Link to={"categories"} class="nav-link link-body-emphasis">
              <svg
                class="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use xlink:href="#speedometer2"></use>
              </svg>
              التصنيفات
            </Link>
          </li>
          <li>
            <Link to={"cars"} class="nav-link link-body-emphasis">
              <svg
                class="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use xlink:href="#table"></use>
              </svg>
              السيارات
            </Link>
          </li>
          <li>
            <a href="#" class="nav-link link-body-emphasis">
              <svg
                class="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use xlink:href="#grid"></use>
              </svg>
              المعارض
            </a>
          </li>
          <li>
            <a href="#" class="nav-link link-body-emphasis">
              <svg
                class="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use xlink:href="#people-circle"></use>
              </svg>
              العملاء
            </a>
          </li>
        </ul>
        <hr />
      </div>
  </div>;
};

export default Sidebar;
