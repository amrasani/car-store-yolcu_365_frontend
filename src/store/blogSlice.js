import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
const initialState = {
  data: [],
  isloading: false,
  error: null,
};
export const getAllArticles = createAsyncThunk("cars-actions", async () => {
  const { data } = await api.get("articles?populate[0]=cover&populate[1]=category_article&populate[2]=author_article");
  return data;
});
const blogSlice = createSlice({
  name: "blogSlice",
  initialState,
    extraReducers: (builder) => {
    builder      .addCase(getAllArticles.pending, (state) => {
        state.isloading = true;
        state.error = null;
        })
        .addCase(getAllArticles.fulfilled, (state, action) => {
            
        state.isloading = false;
        state.data = action.payload.data; 
        })
        .addCase(getAllArticles.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error.message;
        });
    },
});
export const blogReducer = blogSlice.reducer;
