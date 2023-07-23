import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from 'axios';
import { ExhibitionInterface } from "../../pages/ExhibitionRegister/ExhibitionRegister";
import axiosApi from "../../utilities/axios";

export interface ExhibitionStateType {
  exhibitionList: ExhibitionInterface[],
  status: "idle" | "loading" | "failed"
}

const initialState: ExhibitionStateType = {
  exhibitionList: [],
  status: "idle"
}

export const getExhibitionList = createAsyncThunk<ExhibitionInterface[]>(
  "exhibition/getExhibitionList",
  async () => {
    const response: AxiosResponse<ExhibitionInterface[]> = await axiosApi.get("basic/exhibition/");
    return response.data;
  }
)

export const ExhibitionSlice = createSlice({
  name: "exhibition",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getExhibitionList.fulfilled, (state, action) => {
      state.status = "idle";
      state.exhibitionList = action.payload;
    })
    .addCase(getExhibitionList.rejected, (state) => {
      state.status = "failed";
    })
    .addCase(getExhibitionList.pending, (state) => {
      state.status = "loading";
    })
  },
});

export default ExhibitionSlice.reducer;