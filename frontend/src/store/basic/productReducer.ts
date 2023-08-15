import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from 'axios';
import { ProductInterface } from "../../pages/ProductRegister/ProductRegister";
import axiosApi from "../../utilities/axios";

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
    const response: AxiosResponse<ProductInterface[]> = await axiosApi.get("product_register/");
    return response.data.products;
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