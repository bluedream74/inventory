import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from 'axios';
import { IncomingDepartmentInterface } from "../../pages/IncomingDepartmentRegister/IncomingDepartmentRegister";
import axiosApi from "../../utilities/axios";

export interface IncomingDepartmentStateType {
  incomingDepartmentList: IncomingDepartmentInterface[],
  status: "idle" | "loading" | "failed"
}

const initialState: IncomingDepartmentStateType = {
  incomingDepartmentList: [],
  status: "idle"
}

export const getIncomingDepartmentList = createAsyncThunk<IncomingDepartmentInterface[]>(
  "incomingDepartment/getIncomingDepartmentList",
  async () => {
    const response: AxiosResponse<IncomingDepartmentInterface[]> = await axiosApi.get("incomingDepartment_register/");
    return response.data.incomingDepartments;
  }
)

export const IncomingDepartmentSlice = createSlice({
  name: "incomingDepartment",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getIncomingDepartmentList.fulfilled, (state, action) => {
      state.status = "idle";
      state.incomingDepartmentList = action.payload;
    })
    .addCase(getIncomingDepartmentList.rejected, (state) => {
      state.status = "failed";
    })
    .addCase(getIncomingDepartmentList.pending, (state) => {
      state.status = "loading";
    })
  },
});

export default IncomingDepartmentSlice.reducer;