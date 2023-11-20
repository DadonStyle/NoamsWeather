import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: boolean = false;

const degreeUnit = createSlice({
  name: "isCelsius",
  initialState,
  reducers: {
    setIsCelsius: (_state, action: PayloadAction<boolean>) => {
      return (_state = action.payload);
    },
  },
});

export const { setIsCelsius } = degreeUnit.actions;

export default degreeUnit.reducer;
