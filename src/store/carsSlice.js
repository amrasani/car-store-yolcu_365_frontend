import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const initialState = {
  data: [],
  isloading: false,
  error: null,
};

export const getAllCars = createAsyncThunk("unique-cars-slice/getAllCars", async () => {
  const { data } = await api.get("categories?populate=*");
  return data;
});

const carsSlice = createSlice({
  name: "carsSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllCars.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(getAllCars.fulfilled, (state, action) => {
        state.isloading = false;
        
        // 🌟 استخلاص مصفوفة الـ data الصافية القادمة من Strapi
        const rawData = action.payload.data || action.payload;
        
        // نقوم بعمل خارطة تنظيف سريعة للتأكد من هيكل البيانات سواء كان Strapi v4 أو v5
        state.data = Array.isArray(rawData) 
          ? rawData.map(item => ({
              id: item.id,
              documentId: item.documentId,
              title: item.attributes ? item.attributes.title : item.title,
              description: item.attributes ? item.attributes.description : item.description,
              image: item.attributes ? item.attributes.image : item.image
            }))
          : [];
      })
      .addCase(getAllCars.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error.message;
      });
  },
});

export const carsReducer = carsSlice.reducer;