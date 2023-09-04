import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from 'axios';
import axiosApi from "../../utilities/axios";


export interface PurchaseSlipItemInterface {
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
  status: string;
  other: string;
}
export interface PurchaseSlipInterface {
  id : number;
  no : string;
  slip_date : string | undefined;
  delivery_date : string | undefined;
  crash_credit: string;
  cost_category : string;
  factory_code : string;
  storehouse_code : string;
  charger_code : string;
  purchaseorder: number;
  other: string;
  update_date: string;
  items : Array<PurchaseSlipItemInterface>;
}

export interface PurchaseSlipStateType {
  slips: PurchaseSlipInterface[];
  status: 'idle' | 'loading' | 'failed'
}

const initialState: PurchaseSlipStateType = {
  slips: [],
  status: "idle"
}

export const getPurchaseSlipList = createAsyncThunk<PurchaseSlipInterface[]>(
  'purchase/getPurchaseSlipList',
  async () => {
    const response: AxiosResponse<any> = await axiosApi.get("slip/purchase_slip/")
    return response.data?.purchases
  }
)

export const PurchaseSlipSlice = createSlice({
  name: 'purchase',
  initialState, 
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getPurchaseSlipList.fulfilled, (state, action) => {
        state.status = "idle";
        state.slips = action.payload;
      })
      .addCase(getPurchaseSlipList.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getPurchaseSlipList.pending, (state) => {
        state.status = "loading";
      })
  },
});

export default PurchaseSlipSlice.reducer;