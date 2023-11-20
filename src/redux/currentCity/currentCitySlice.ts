import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICityObj {
  country: string;
  city: string;
  key: string;
}

const initialState: ICityObj = {
  country: "",
  city: "",
  key: "",
};

const currentCitySlice = createSlice({
  name: "currentCity",
  initialState,
  reducers: {
    setCurrCity: (state, action: PayloadAction<ICityObj>) => {
      return (state = action.payload);
    },
  },
});

export const { setCurrCity } = currentCitySlice.actions;

export default currentCitySlice.reducer;
