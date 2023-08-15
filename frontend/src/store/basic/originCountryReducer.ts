import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from 'axios';
import { OriginCountryInterface } from "../../pages/OriginCountry/OriginCountryRegister";
import axiosApi from "../../utilities/axios";

export interface OriginCountryStateType {
  originCountryList: OriginCountryInterface[],
  status: "idle" | "loading" | "failed"
}

const initialState: OriginCountryStateType = {
  originCountryList: [],
  status: "idle"
}

export const getOriginCountryList = createAsyncThunk<OriginCountryInterface[]>(
  "originCountry/getOriginCountryList",
  async () => {
    const response: AxiosResponse<OriginCountryInterface[]> = await axiosApi.get("origin_country_register/");
    return response.data.origincountries;
  }
)

export const OriginCountrySlice = createSlice({
  name: "originCountry",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getOriginCountryList.fulfilled, (state, action) => {
      state.status = "idle";
      state.originCountryList = action.payload;
    })
    .addCase(getOriginCountryList.rejected, (state) => {
      state.status = "failed";
    })
    .addCase(getOriginCountryList.pending, (state) => {
      state.status = "loading";
    })
  },
});

export default OriginCountrySlice.reducer;