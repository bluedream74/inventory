import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from 'axios';
import { BrandInterface } from "../../pages/BrandRegister/BrandRegister";
import axiosApi from "../../utilities/axios";
import { resolveDateFormat } from "@mui/x-date-pickers/internals/utils/date-utils";

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
  status: string;
  productCode: string;
  productName: string;
  productPartNumber: string;
  sizeCode: string;
  colorCode: string;
  quantity: number;
  unit: string;
  rate: number;
  maxCost: number;
  maxPrice: number;
  minCost: number;
  minPrice: number;
  cost: number;
  price: number;
  profit: number;
}

export interface OrderSlipStateType {
  slips: OrderSlipInterface[];
  status: 'idle' | 'loading' | 'failed'
}

const initialState: OrderSlipStateType = {
  slips: [],
  status: "idle"
}

export const getSlipList = createAsyncThunk<OrderSlipInterface[]>(
  'orderSlip/getOrderSlipList',
  async () => {
    const response: AxiosResponse<OrderSlipInterface[]> = await axiosApi.get("slip/order_slip/")
    return response.data
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