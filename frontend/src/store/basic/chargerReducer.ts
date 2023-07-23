import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from 'axios';
import { ChargerInterface } from "../../pages/ChargerRegister/ChargerRegister";
import axiosApi from "../../utilities/axios";

export interface ChargerStateType {
  chargerList: ChargerInterface[],
  status: "idle" | "loading" | "failed"
}

const initialState: ChargerStateType = {
  chargerList: [],
  status: "idle"
}

export const getChargerList = createAsyncThunk<ChargerInterface[]>(
  "charger/getChargerList",
  async () => {
    const response: AxiosResponse<ChargerInterface[]> = await axiosApi.get("basic/charger/");
    return response.data;
  }
)

export const ChargerSlice = createSlice({
  name: "charger",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getChargerList.fulfilled, (state, action) => {
      state.status = "idle";
      state.chargerList = action.payload;
    })
    .addCase(getChargerList.rejected, (state) => {
      state.status = "failed";
    })
    .addCase(getChargerList.pending, (state) => {
      state.status = "loading";
    })
  },
});

export default ChargerSlice.reducer;