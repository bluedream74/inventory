import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from 'axios';
import { CustomerInterface } from "../../pages/CustomerRegister/CustomerRegister";
import axiosApi from "../../utilities/axios";

export interface CustomerStateType {
  customerList: CustomerInterface[],
  status: "idle" | "loading" | "failed"
}

const initialState: CustomerStateType = {
  customerList: [],
  status: "idle"
}

export const getCustomerList = createAsyncThunk<CustomerInterface[]>(
  "customer/getCustomerList",
  async () => {
    const response: AxiosResponse<CustomerInterface[]> = await axiosApi.get("basic/customer/");
    return response.data;
  }
)

export const CustomerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getCustomerList.fulfilled, (state, action) => {
      state.status = "idle";
      state.customerList = action.payload;
    })
    .addCase(getCustomerList.rejected, (state) => {
      state.status = "failed";
    })
    .addCase(getCustomerList.pending, (state) => {
      state.status = "loading";
    })
  },
});

export default CustomerSlice.reducer;