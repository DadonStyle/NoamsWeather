import { configureStore } from "@reduxjs/toolkit";
import currentCityReducer from "./currentCity/currentCitySlice";
import favoritesReducer from "./favorites/favoritesSlice";
import darkModeSlice from "./darkMode/darkModeSlice";
import degreeUnitSlice from "./degreeUnit/degreeUnit";

export const store = configureStore({
  reducer: {
    currentCity: currentCityReducer,
    favorites: favoritesReducer,
    isDarkMode: darkModeSlice,
    isCelsius: degreeUnitSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDisptach = typeof store.dispatch;
