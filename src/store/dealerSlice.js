import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const initialState = {
  data: [],
  isloading: false,
  error: null,
  meta: null,
  dealer: null,
  cars: [],
};
export const getAllDealers = createAsyncThunk("dealers-actions", async ({page =1 ,pageSize = 6}) => {
  const { data } = await api.get(`dealers?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`);
  return data;
});
export const getDealerDetails = createAsyncThunk("dealer-details-actions", async (id) => {
  const { data } = await api.get(`dealers/${id}?populate[cars][populate]=*`);
  return data;
});

const dealerSlice = createSlice({
  name: "dealers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDealers.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(getAllDealers.fulfilled, (state, action) => {
        state.isloading = false;
        
        state.data = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(getAllDealers.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error.message;
      })
      .addCase(getDealerDetails.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(getDealerDetails.fulfilled, (state, action) => {
        state.isloading = false;
        state.dealer = action.payload.data;
        state.cars = action.payload.data.cars;
        
      })
      .addCase(getDealerDetails.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error.message;
      });
  },
});


export default dealerSlice.reducer;