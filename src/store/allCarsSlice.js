import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
const initialState = {
  data: [],
  isloading: false,
  error: null,
  meta: null,
};
export const getAllCar = createAsyncThunk("cars/getAllCars", async ({page =1 , pageSize =2} = {}) => {
  const { data } = await api.get(`cars?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`); 
  return data;
});

const allCarsSlice = createSlice({
  name: "allCarsSlice",
  initialState,
    extraReducers: (builder) => {
    builder      .addCase(getAllCar.pending, (state) => {
        state.isloading = true;
        state.error = null;
        })
        .addCase(getAllCar.fulfilled, (state, action) => {
        state.isloading = false;
        state.data = action.payload.data || action.payload;
        state.meta = action.payload.meta || null;
        })
        .addCase(getAllCar.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error.message;
        });
    },
});

export const allCarsReducer = allCarsSlice.reducer;