import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from 'axios';
import { DealerInterface } from "../../pages/DealerRegister/DealerRegister";
import axiosApi from "../../utilities/axios";

export interface DealerStateType {
  dealerList: DealerInterface[],
  status: "idle" | "loading" | "failed"
}

const initialState: DealerStateType = {
  dealerList: [],
  status: "idle"
}

export const getDealerList = createAsyncThunk<DealerInterface[]>(
  "dealer/getDealerList",
  async () => {
    const response: AxiosResponse<DealerInterface[]> = await axiosApi.get("basic/dealer/");
    return response.data;
  }
)

export const DealerSlice = createSlice({
  name: "dealer",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getDealerList.fulfilled, (state, action) => {
      state.status = "idle";
      state.dealerList = action.payload;
    })
    .addCase(getDealerList.rejected, (state) => {
      state.status = "failed";
    })
    .addCase(getDealerList.pending, (state) => {
      state.status = "loading";
    })
  },
});

export default DealerSlice.reducer;