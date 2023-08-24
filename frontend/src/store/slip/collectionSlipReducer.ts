import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from 'axios';
import axiosApi from "../../utilities/axios";
import { Dayjs } from "dayjs";


export interface CollectionItemInterface {
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
export interface CollectionSlipInterface {
  id : number;
  no : string;
  slip_date : string | undefined;
  shipping_date : string | undefined;
  delivery_code : string;
  storehouse_code : string;
  global_rate : string;
  charger_code : string;
  exhibition_code : string;
  update_date: string;
  other: string;
  items : Array<CollectionItemInterface>;
}

export interface CollectionSlipStateType {
  slips: CollectionSlipInterface[];
  status: 'idle' | 'loading' | 'failed'
}

const initialState: CollectionSlipStateType = {
  slips: [],
  status: "idle"
}

export const getCollectionSlipList = createAsyncThunk<CollectionSlipInterface[]>(
  'collectionSlip/getCollectionSlipList',
  async () => {
    const response: AxiosResponse<any> = await axiosApi.get("slip/collection_slip/")
    return response.data?.collections
  }
)

export const CollectionSlipSlice = createSlice({
  name: 'collectionSlip',
  initialState, 
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getCollectionSlipList.fulfilled, (state, action) => {
        state.status = "idle";
        state.slips = action.payload;
      })
      .addCase(getCollectionSlipList.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getCollectionSlipList.pending, (state) => {
        state.status = "loading";
      })
  },
});

export default CollectionSlipSlice.reducer;