import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from 'axios';
import axiosApi from "../../utilities/axios";
import { Dayjs } from "dayjs";


export interface ConsignmentItemInterface {
  id: string;
  product_code: string;
  product_name: string;
  product_part_number: string;
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
  profit: number;
}
export interface ConsignmentSlipInterface {
  id : number;
  no : string;
  slip_date : string | undefined;
  entrust_code : string;
  storehouse_code : string;
  global_rate : string;
  charger_code : string;
  exhibition_code : string;
  status : string;
  other: string;
  update_date: string;
  items : Array<ConsignmentItemInterface>;
}

export interface ConsignmentSlipStateType {
  slips: ConsignmentSlipInterface[];
  status: 'idle' | 'loading' | 'failed'
}

const initialState: ConsignmentSlipStateType = {
  slips: [],
  status: "idle"
}

export const getConsignmentSlipList = createAsyncThunk<ConsignmentSlipInterface[]>(
  'consignmentSlip/getConsignmentSlipList',
  async () => {
    const response: AxiosResponse<any> = await axiosApi.get("slip/consignment_slip/")
    return response.data?.consignments
  }
)

export const ConsignmentSlipSlice = createSlice({
  name: 'consignmentSlip',
  initialState, 
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getConsignmentSlipList.fulfilled, (state, action) => {
        state.status = "idle";
        state.slips = action.payload;
      })
      .addCase(getConsignmentSlipList.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getConsignmentSlipList.pending, (state) => {
        state.status = "loading";
      })
  },
});

export default ConsignmentSlipSlice.reducer;