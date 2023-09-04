import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from 'axios';
import axiosApi from "../../utilities/axios";
import { IOrderSlip } from "../../pages/OrderSlip/OrderSlip";

export interface OrderSlipInterface {
  id: number;
  no: string | null;
  slipDate: Date;
  deliveryDate: Date;
  shoppingDate: Date;
  deliveryPlaceCode: string;
  storehouseCode: string;
  globalRate: number;
  chargerCode: string;
  receiverCode: string;
  exhibitionCode:string;
  dealerCode : string;
  status: string;
  other: string;
}

export interface OrderSlipStateType {
  slips: IOrderSlip[];
  status: 'idle' | 'loading' | 'failed'
}

const initialState: OrderSlipStateType = {
  slips: [],
  status: "idle"
}

export const getSlipList = createAsyncThunk<OrderSlipInterface[]>(
  'orderSlip/getOrderSlipList',
  async () => {
    const response: AxiosResponse<any> = await axiosApi.get("slip/order_slip/")
    return response.data?.orders
  }
)

export const OrderSlipSlice = createSlice({
  name: 'orderSlip',
  initialState, 
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getSlipList.fulfilled, (state, action) => {
        state.status = "idle";
        state.slips = action.payload;
      })
      .addCase(getSlipList.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getSlipList.pending, (state) => {
        state.status = "loading";
      })
  },
});

export default OrderSlipSlice.reducer;