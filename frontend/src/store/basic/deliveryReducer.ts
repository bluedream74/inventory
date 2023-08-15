import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from 'axios';
import { DeliveryInterface } from "../../pages/DeliveryRegister/DeliveryRegister";
import axiosApi from "../../utilities/axios";

export interface DeliveryStateType {
  deliveryList: DeliveryInterface[],
  status: "idle" | "loading" | "failed"
}

const initialState: DeliveryStateType = {
  deliveryList: [],
  status: "idle"
}

export const getDeliveryList = createAsyncThunk<DeliveryInterface[]>(
  "delivery/getDeliveryList",
  async () => {
    const response: AxiosResponse<DeliveryInterface[]> = await axiosApi.get("delivery_register/");
    return response.data?.deliveries;
  }
)

export const DeliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getDeliveryList.fulfilled, (state, action) => {
      state.status = "idle";
      state.deliveryList = action.payload;
    })
    .addCase(getDeliveryList.rejected, (state) => {
      state.status = "failed";
    })
    .addCase(getDeliveryList.pending, (state) => {
      state.status = "loading";
    })
  },
});

export default DeliverySlice.reducer;