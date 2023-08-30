import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from 'axios';
import { FactoryInterface } from "../../pages/FactoryRegister/FactoryRegister";
import axiosApi from "../../utilities/axios";

export interface FactoryStateType {
factoryList: FactoryInterface[],
  status: "idle" | "loading" | "failed"
}

const initialState: FactoryStateType = {
  factoryList: [],
  status: "idle"
}

export const getFactoryList = createAsyncThunk<FactoryInterface[]>(
  "factory/getFactoryList",
  async () => {
    const response: AxiosResponse<any> = await axiosApi.get("factory_register/");
    return response.data?.factories;
  }
)

export const FactorySlice = createSlice({
  name: "factory",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getFactoryList.fulfilled, (state, action) => {
      state.status = "idle";
      state.factoryList = action.payload;
    })
    .addCase(getFactoryList.rejected, (state) => {
      state.status = "failed";
    })
    .addCase(getFactoryList.pending, (state) => {
      state.status = "loading";
    })
  },
});

export default FactorySlice.reducer;