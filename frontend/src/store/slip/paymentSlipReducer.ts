import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from 'axios';
import axiosApi from "../../utilities/axios";
import dayjs, { Dayjs } from "dayjs";


export interface PaymentItemInterface {
  id: string;
  payment_category: string;
  payment_price: number;
  payment_date: Dayjs;
  other: string;
  status: string;
}
export interface PaymentSlipInterface {
  id : number;
  no : string;
  slip_date : string | undefined;
  supplier_code : string;
  last_payment_date : string | undefined;
  last_payment : string;
  expected_date : string | undefined;
  remain_payment : string ;
  purchase: number;
  other: string;
  update_date: string;
  items : Array<PaymentItemInterface>;
}

export interface PaymentSlipStateType {
  slips: PaymentSlipInterface[];
  status: 'idle' | 'loading' | 'failed'
}

const initialState: PaymentSlipStateType = {
  slips: [],
  status: "idle"
}

export const getPaymentSlipList = createAsyncThunk<PaymentSlipInterface[]>(
  'paymentSlip/getPaymentSlipList',
  async () => {
    const response: AxiosResponse<any> = await axiosApi.get("slip/payment_slip/")
    return response.data?.payments
  }
)

export const PaymentSlipSlice = createSlice({
  name: 'paymentSlip',
  initialState, 
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getPaymentSlipList.fulfilled, (state, action) => {
        state.status = "idle";
        state.slips = action.payload;
      })
      .addCase(getPaymentSlipList.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getPaymentSlipList.pending, (state) => {
        state.status = "loading";
      })
  },
});

export default PaymentSlipSlice.reducer;