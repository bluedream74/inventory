import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from 'axios';
import { ItemInterface } from "../../pages/ItemRegister/ItemRegister";
import axiosApi from "../../utilities/axios";

export interface ItemStateType {
  itemList: ItemInterface[],
  status: "idle" | "loading" | "failed"
}

const initialState: ItemStateType = {
  itemList: [],
  status: "idle"
}

export const getItemList = createAsyncThunk<ItemInterface[]>(
  "item/getItemList",
  async () => {
    const response: AxiosResponse<ItemInterface[]> = await axiosApi.get("item_register/");
    return response.data.items;
  }
)

export const ItemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getItemList.fulfilled, (state, action) => {
      state.status = "idle";
      state.itemList = action.payload;
    })
    .addCase(getItemList.rejected, (state) => {
      state.status = "failed";
    })
    .addCase(getItemList.pending, (state) => {
      state.status = "loading";
    })
  },
});

export default ItemSlice.reducer;