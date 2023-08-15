import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from 'axios';
import { StorehouseInterface } from "../../pages/StorehouseRegister/StorehouseRegister";
import axiosApi from "../../utilities/axios";

export interface StorehouseStateType {
  storehouseList: StorehouseInterface[],
  status: "idle" | "loading" | "failed"
}

const initialState: StorehouseStateType = {
  storehouseList: [],
  status: "idle"
}

export const getStorehouseList = createAsyncThunk<StorehouseInterface[]>(
  "storehouse/getStorehouseList",
  async () => {
    const response: AxiosResponse<StorehouseInterface[]> = await axiosApi.get("storehouse_register/");
    return response.data?.storehouses;
  }
)

export const StorehouseSlice = createSlice({
  name: "storehouse",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getStorehouseList.fulfilled, (state, action) => {
      state.status = "idle";
      state.storehouseList = action.payload;
    })
    .addCase(getStorehouseList.rejected, (state) => {
      state.status = "failed";
    })
    .addCase(getStorehouseList.pending, (state) => {
      state.status = "loading";
    })
  },
});

export default StorehouseSlice.reducer;