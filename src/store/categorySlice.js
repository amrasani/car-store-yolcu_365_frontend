import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../src/api";
import { data } from "react-router-dom";

const initialState = {
  data: [],
  isloading: false,
  error: null,
};
export const getAllCategories = createAsyncThunk(
  "categories-actions",
  async () => {
    const { data } = await api.get("featured-cars?populate=*");
    return data;
  },
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      // في ملف categorySlice.js
.addCase(getAllCategories.fulfilled, (state, action) => {
    state.isloading = false;
    state.data = action.payload.data || []; 
    
    
})
      .addCase(getAllCategories.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error.message;
      });
  },
});

export const categoryReducer = categorySlice.reducer;
