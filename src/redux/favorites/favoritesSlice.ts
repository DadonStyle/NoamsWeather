import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICityObj } from "../currentCity/currentCitySlice";

export interface IFavoritesObj extends ICityObj {}

const initialState: IFavoritesObj[] = [];

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavoritesArr: (_state, action: PayloadAction<IFavoritesObj[]>) => {
      return (_state = action.payload);
    },
  },
});

export const { setFavoritesArr } = favoritesSlice.actions;

export default favoritesSlice.reducer;
