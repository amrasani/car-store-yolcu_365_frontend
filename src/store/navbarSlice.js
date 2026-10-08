import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
const initialState = {
  data: [],
  isloading: false,
  error: null,
};
export const getNavbarData = createAsyncThunk("navbar-actions", async () => {
  const { data } = await api.get("navbar-items?populate=*");
  return data;
});

const navbarSlice = createSlice({
    name: "navbarSlice",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getNavbarData.pending, (state) => {
            state.isloading = true;
            state.error = null;
        })
        .addCase(getNavbarData.fulfilled, (state, action) => {
            state.isloading = false;
            state.data = action.payload;
            
        })
        .addCase(getNavbarData.rejected, (state, action) => {
            state.isloading = false;
            state.error = action.error.message;
        });
    },
});
export const navbarReducer = navbarSlice.reducer;