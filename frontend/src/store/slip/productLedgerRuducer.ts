import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from 'axios';
import axiosApi from "../../utilities/axios";


export interface ProductLedgerInterface {
  id : number;
  product_code : string;
  product_name : string;
  max_price : number;
  size : string;
  total_order : number;
  total_purchaseorder : number;
  total_in : number ;
  total_out: number;
  remain_consignment: number;
  remain_collection: number;
  total_quantity: number;
  possible_number: number;
}

export interface ProductLedgerStateType {
  slips: ProductLedgerInterface[];
  status: 'idle' | 'loading' | 'failed'
}

const initialState: ProductLedgerStateType = {
  slips: [],
  status: "idle"
}

export const getProductLedgerList = createAsyncThunk<ProductLedgerInterface[]>(
  'productLedger/getProductLedgerList',
  async () => {
    const response: AxiosResponse<any> = await axiosApi.get("product_inventory/get_ledger/")
    return response.data
  }
)

export const ProductLedgerSlice = createSlice({
  name: 'productLedger',
  initialState, 
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductLedgerList.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "idle";
        state.slips = action.payload;
      })
      .addCase(getProductLedgerList.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getProductLedgerList.pending, (state) => {
        state.status = "loading";
      })
  },
});

export default ProductLedgerSlice.reducer;