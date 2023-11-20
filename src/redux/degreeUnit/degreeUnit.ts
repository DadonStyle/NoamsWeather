import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: boolean = false;

const degreeUnit = createSlice({
  name: "isCelsius",
  initialState,
  reducers: {
    setIsCelsius: (state, action: PayloadAction<boolean>) => {
      return (state = action.payload);
    },
  },
});

export const { setIsCelsius } = degreeUnit.actions;

export default degreeUnit.reducer;
