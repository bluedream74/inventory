import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from 'axios';
import axiosApi from "../../utilities/axios";
import { Dayjs } from "dayjs";


export interface PurchaseorderSlipItemInterface {
  id: string;
  product: number;
  product_name: string;
  size: number;
  color: number;
  quantity: number;
  unit: string;
  max_cost: number;
  min_cost: number;
  max_price: number;
  min_price: number;
}
export interface PurchaseorderSlipInterface {
  id : number;
  no : string;
  slip_date : string | undefined;
  delivery_date : string | undefined;
  cost_category : string;
  factory_code : string;
  storehouse_code : string;
  charger_code : string;
  status : string;
  other: string;
  update_date: string;
  items : Array<PurchaseorderSlipItemInterface>;
}

export interface PurchaseorderSlipStateType {
  slips: PurchaseorderSlipInterface[];
  status: 'idle' | 'loading' | 'failed'
}

const initialState: PurchaseorderSlipStateType = {
  slips: [],
  status: "idle"
}

export const getPurchaseorderSlipList = createAsyncThunk<PurchaseorderSlipInterface[]>(
  'purchaseorder/getPurchaseorderSlipList',
  async () => {
    const response: AxiosResponse<any> = await axiosApi.get("slip/purchaseorder_slip/")
    return response.data?.purchaseorders
  }
)

export const PurchaseorderSlipSlice = createSlice({
  name: 'purchaseorder',
  initialState, 
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getPurchaseorderSlipList.fulfilled, (state, action) => {
        state.status = "idle";
        state.slips = action.payload;
      })
      .addCase(getPurchaseorderSlipList.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getPurchaseorderSlipList.pending, (state) => {
        state.status = "loading";
      })
  },
});

export default PurchaseorderSlipSlice.reducer;