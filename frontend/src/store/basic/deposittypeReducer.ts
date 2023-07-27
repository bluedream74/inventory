import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from 'axios';
import { DeposittypeInterface } from "../../pages/DeposittypeRegister/DeposittypeRegister";
import axiosApi from "../../utilities/axios";

export interface DeposittypeStateType {
  deposittypeList: DeposittypeInterface[],
  status: "idle" | "loading" | "failed"
}

const initialState: DeposittypeStateType = {
  deposittypeList: [],
  status: "idle"
}

export const getDeposittypeList = createAsyncThunk<DeposittypeInterface[]>(
  "deposittype/getDeposittypeList",
  async () => {
    const response: AxiosResponse<DeposittypeInterface[]> = await axiosApi.get("basic/deposittype/");
    return response.data;
  }
)

export const DeposittypeSlice = createSlice({
  name: "deposittype",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getDeposittypeList.fulfilled, (state, action) => {
      state.status = "idle";
      state.deposittypeList = action.payload;
    })
    .addCase(getDeposittypeList.rejected, (state) => {
      state.status = "failed";
    })
    .addCase(getDeposittypeList.pending, (state) => {
      state.status = "loading";
    })
  },
});

export default DeposittypeSlice.reducer;