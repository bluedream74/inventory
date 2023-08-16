import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from 'axios';
import { ColorInterface } from "../../pages/ColorRegister/ColorRegister";
import axiosApi from "../../utilities/axios";

export interface ColorStateType {
  colorList: ColorInterface[],
  status: "idle" | "loading" | "failed"
}

const initialState: ColorStateType = {
  colorList: [],
  status: "idle"
}

export const getColorList = createAsyncThunk<ColorInterface[]>(
  "color/getColorList",
  async () => {
    const response: AxiosResponse<ColorInterface[]> = await axiosApi.get("color_register/");
    return response.data?.colors;
  }
)

export const ColorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getColorList.fulfilled, (state, action) => {
      state.status = "idle";
      state.colorList = action.payload;
    })
    .addCase(getColorList.rejected, (state) => {
      state.status = "failed";
    })
    .addCase(getColorList.pending, (state) => {
      state.status = "loading";
    })
  },
});

export default ColorSlice.reducer;