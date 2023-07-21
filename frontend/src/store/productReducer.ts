import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "./index";
import axios, { AxiosResponse } from 'axios';
import { ProductInterface } from "../pages/ProductRegister/ProductRegister";

export interface ProductStateType {
  productList: ProductInterface[],
  status: "idle" | "loading" | "failed"
}

const initialState: ProductStateType = {
  productList: [],
  status: "idle"
}

export const getProductList = createAsyncThunk<ProductInterface[]>(
  "product/getProductList",
  async () => {
    const response: AxiosResponse<ProductInterface[]> = await axios.get("/api/product_register");
    return response.data;
  }
)

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getProductList.fulfilled, (state, action) => {
      state.status = "idle";
      state.productList = action.payload;
    })
    .addCase(getProductList.rejected, (state) => {
      state.status = "failed";
    })
    .addCase(getProductList.pending, (state) => {
      state.status = "loading";
    })
  },
});

export default ProductSlice.reducer;