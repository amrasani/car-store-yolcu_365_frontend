import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
const initialState = {
  data: [],
  isloading: false,
  error: null,
};
export const getAllTeamMembers = createAsyncThunk("team-members-actions", async () => {
  const { data } = await api.get("members?populate=*");
  return data;
});
const teamMembersSlice = createSlice({
  name: "teamMembersSlice",
  initialState,
    extraReducers: (builder) => {
    builder
      .addCase(getAllTeamMembers.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(getAllTeamMembers.fulfilled, (state, action) => {
        state.isloading = false;
        state.data = action.payload.data || action.payload;
      })
      .addCase(getAllTeamMembers.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error.message;
      });
    },
});

export const teamMembersReducer = teamMembersSlice.reducer;