import { configureStore } from "@reduxjs/toolkit";
import { categoryReducer } from "./categorySlice";
import { carsReducer } from "./carsSlice";
import { navbarReducer } from "./navbarSlice";
import { teamMembersReducer } from "./teamMemersSlice";
import { allCarsReducer } from "./allCarsSlice";
import { sliderReducer } from "./slider/sliderSlice";
import dealerReducer from "./dealerSlice";
import { blogReducer } from "./blogSlice";


export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    carsSlice: carsReducer,
    navbarSlice: navbarReducer,
    teamMembersSlice: teamMembersReducer,
    allCars: allCarsReducer, 
    slider: sliderReducer,
    dealers: dealerReducer,
    blogs: blogReducer,
  },
});