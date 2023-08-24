import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from 'axios';
import { EntrustInterface } from "../../pages/EntrustRegister/EntrustRegister";
import axiosApi from "../../utilities/axios";

export interface EntrustStateType {
  entrustList: EntrustInterface[],
  status: "idle" | "loading" | "failed"
}

const initialState: EntrustStateType = {
  entrustList: [],
  status: "idle"
}

export const getEntrustList = createAsyncThunk<EntrustInterface[]>(
  "entrust/getEntrustList",
  async () => {
    const response: AxiosResponse<EntrustInterface[]> = await axiosApi.get("entrust_register/");
    return response.data?.entrusts;
  }
)

export const EntrustSlice = createSlice({
  name: "entrust",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getEntrustList.fulfilled, (state, action) => {
      state.status = "idle";
      state.entrustList = action.payload;
    })
    .addCase(getEntrustList.rejected, (state) => {
      state.status = "failed";
    })
    .addCase(getEntrustList.pending, (state) => {
      state.status = "loading";
    })
  },
});

export default EntrustSlice.reducer;