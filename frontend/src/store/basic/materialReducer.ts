import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from 'axios';
import { MaterialInterface } from "../../pages/MaterialRegister/MaterialRegister";
import axiosApi from "../../utilities/axios";

export interface MaterialStateType {
  materialList: MaterialInterface[],
  status: "idle" | "loading" | "failed"
}

const initialState: MaterialStateType = {
  materialList: [],
  status: "idle"
}

export const getMaterialList = createAsyncThunk<MaterialInterface[]>(
  "material/getMaterialList",
  async () => {
    const response: AxiosResponse<MaterialInterface[]> = await axiosApi.get("material_register/");
    return response.data?.materials;
  }
)

export const MaterialSlice = createSlice({
  name: "material",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getMaterialList.fulfilled, (state, action) => {
      state.status = "idle";
      state.materialList = action.payload;
    })
    .addCase(getMaterialList.rejected, (state) => {
      state.status = "failed";
    })
    .addCase(getMaterialList.pending, (state) => {
      state.status = "loading";
    })
  },
});

export default MaterialSlice.reducer;