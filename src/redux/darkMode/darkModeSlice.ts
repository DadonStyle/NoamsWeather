import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

const darkModeSlice = createSlice({
  name: "isDarkMode",
  initialState,
  reducers: {
    toggleDarkMode: (_state) => {
      return (_state = !_state);
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
