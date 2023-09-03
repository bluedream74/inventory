import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from 'axios';
import axiosApi from "../../utilities/axios";
import { Dayjs } from "dayjs";


export interface SaleItemInterface {
  id: string;
  product_code: string;
  product_name: string;
  size_code: string;
  color_code: string;
  quantity: number;
  unit: string;
  rate: number;
  max_cost: number;
  max_price: number;
  min_cost: number;
  min_price: number;
  cost: number;
  price: number;
}
export interface SaleSlipInterface {
  id : number;
  no : string;
  spenden_no: string;
  slip_date : string | undefined;
  expected_shipping_date: string | undefined;
  arrival_date: string | undefined;
  invoice_date: string | undefined;
  shipping_date: string | undefined;
  cash_credit: string;
  delivery_code : string;
  storehouse_code : string;
  global_rate : string;
  charger_code : string;
  maker_code: string;
  exhibition_code : string;
  dealer_code : string;
  order: number;
  status : string;
  other: string;
  update_date: string;
  items : Array<SaleItemInterface>;
}

export interface SaleSlipStateType {
  slips: SaleSlipInterface[];
  status: 'idle' | 'loading' | 'failed'
}

const initialState: SaleSlipStateType = {
  slips: [],
  status: "idle"
}

export const getSaleSlipList = createAsyncThunk<SaleSlipInterface[]>(
  'saleSlip/getSaleSlipList',
  async () => {
    const response: AxiosResponse<any> = await axiosApi.get("slip/sale_slip/")
    return response.data?.sales
  }
)

export const SaleSlipSlice = createSlice({
  name: 'saleSlip',
  initialState, 
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getSaleSlipList.fulfilled, (state, action) => {
        state.status = "idle";
        state.slips = action.payload;
      })
      .addCase(getSaleSlipList.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getSaleSlipList.pending, (state) => {
        state.status = "loading";
      })
  },
});

export default SaleSlipSlice.reducer;