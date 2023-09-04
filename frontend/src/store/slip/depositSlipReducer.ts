import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from 'axios';
import axiosApi from "../../utilities/axios";
import dayjs, { Dayjs } from "dayjs";


export interface DepositItemInterface {
  id: string;
  deposit_category: string;
  deposit_price: number;
  deposit_date: Dayjs;
  other: string;
  state : string;
}
export interface DepositSlipInterface {
  id : number;
  no : string;
  slip_date : string | undefined;
  dealer_code : string;
  last_invoice_date : string | undefined;
  last_invoice : string;
  expected_date : string | undefined;
  remain_invoice : string ;
  sale : number;
  other: string;
  update_date: string;
  items : Array<DepositItemInterface>;
}

export interface DepositSlipStateType {
  slips: DepositSlipInterface[];
  status: 'idle' | 'loading' | 'failed'
}

const initialState: DepositSlipStateType = {
  slips: [],
  status: "idle"
}

export const getDepositSlipList = createAsyncThunk<DepositSlipInterface[]>(
  'DepositSlip/getDepositSlipList',
  async () => {
    const response: AxiosResponse<any> = await axiosApi.get("slip/deposit_slip/")
    return response.data?.deposits
  }
)

export const DepositSlipSlice = createSlice({
  name: 'depositSlip',
  initialState, 
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getDepositSlipList.fulfilled, (state, action) => {
        state.status = "idle";
        state.slips = action.payload;
      })
      .addCase(getDepositSlipList.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getDepositSlipList.pending, (state) => {
        state.status = "loading";
      })
  },
});

export default DepositSlipSlice.reducer;