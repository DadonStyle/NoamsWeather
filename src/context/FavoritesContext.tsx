import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { CityContextObj } from "./CurrentCityContext";

export interface FavoritesObj extends CityContextObj {
  temp: number;
  unit: "C" | "F";
  weatherDesc: string;
}

interface FavoritesContextType {
  favoritesArr: FavoritesObj[];
  setFavoritesArr: Dispatch<SetStateAction<FavoritesObj[]>>;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favoritesArr: [] as FavoritesObj[],
  setFavoritesArr: () => {},
});

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favoritesArr, setFavoritesArr] = useState<FavoritesObj[]>([]);

  const value: FavoritesContextType = { favoritesArr, setFavoritesArr };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
