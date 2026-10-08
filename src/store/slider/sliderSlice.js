import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
const initialState = {
  data: [],
  isloading: false,
    error: null,
};
export const getSlider = createAsyncThunk("sliders-actions", async () => {
  const { data } = await api.get(`sliders?populate=*`); 
  return data;
});
const sliderSlice = createSlice({
  name: "sliderSlice",
  initialState,
    extraReducers: (builder) => {
    builder      .addCase(getSlider.pending, (state) => {
        state.isloading = true;
        state.error = null;
        })
        .addCase(getSlider.fulfilled, (state, action) => {
            // console.log(action);
        state.isloading = false;
        state.data = action.payload.data || action.payload;
        })
        .addCase(getSlider.rejected, (state, action) => {
            
        state.isloading = false;
        state.error = action.error.message;
        });
    },
});
export const sliderReducer = sliderSlice.reducer;