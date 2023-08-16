import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from 'axios';
import { SeasonInterface } from "../../pages/SeasonRegister/SeasonRegister";
import axiosApi from "../../utilities/axios";

export interface SeasonStateType {
  seasonList: SeasonInterface[],
  status: "idle" | "loading" | "failed"
}

const initialState: SeasonStateType = {
  seasonList: [],
  status: "idle"
}

export const getSeasonList = createAsyncThunk<SeasonInterface[]>(
  "season/getSeasonList",
  async () => {
    const response: AxiosResponse<SeasonInterface[]> = await axiosApi.get("season_register/");
    return response.data?.seasons;
  }
)

export const SeasonSlice = createSlice({
  name: "season",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getSeasonList.fulfilled, (state, action) => {
      state.status = "idle";
      state.seasonList = action.payload;
    })
    .addCase(getSeasonList.rejected, (state) => {
      state.status = "failed";
    })
    .addCase(getSeasonList.pending, (state) => {
      state.status = "loading";
    })
  },
});

export default SeasonSlice.reducer;