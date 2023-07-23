import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from 'axios';
import { BrandInterface } from "../../pages/BrandRegister/BrandRegister";
import axiosApi from "../../utilities/axios";

export interface BrandStateType {
  brandList: BrandInterface[],
  status: "idle" | "loading" | "failed"
}

const initialState: BrandStateType = {
  brandList: [],
  status: "idle"
}

export const getBrandList = createAsyncThunk<BrandInterface[]>(
  "brand/getBrandList",
  async () => {
    const response: AxiosResponse<BrandInterface[]> = await axiosApi.get("basic/brand/");
    return response.data;
  }
)

export const BrandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getBrandList.fulfilled, (state, action) => {
      state.status = "idle";
      state.brandList = action.payload;
    })
    .addCase(getBrandList.rejected, (state) => {
      state.status = "failed";
    })
    .addCase(getBrandList.pending, (state) => {
      state.status = "loading";
    })
  },
});

export default BrandSlice.reducer;