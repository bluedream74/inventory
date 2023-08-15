import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from 'axios';
import { SizeInterface } from "../../pages/SizeRegister/SizeRegister";
import axiosApi from "../../utilities/axios";

export interface SizeStateType {
  sizeList: SizeInterface[],
  status: "idle" | "loading" | "failed"
}

const initialState: SizeStateType = {
  sizeList: [],
  status: "idle"
}

export const getSizeList = createAsyncThunk<SizeInterface[]>(
  "size/getSizeList",
  async () => {
    const response: AxiosResponse<SizeInterface[]> = await axiosApi.get("size_register/");
    return response.data?.sizes;
  }
)

export const SizeSlice = createSlice({
  name: "size",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getSizeList.fulfilled, (state, action) => {
      state.status = "idle";
      state.sizeList = action.payload;
    })
    .addCase(getSizeList.rejected, (state) => {
      state.status = "failed";
    })
    .addCase(getSizeList.pending, (state) => {
      state.status = "loading";
    })
  },
});

export default SizeSlice.reducer;