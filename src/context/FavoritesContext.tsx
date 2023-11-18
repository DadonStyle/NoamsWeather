import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export interface favoritesObj {
  cityName: string;
  cityKey: number;
  temp: number;
  unit: "C" | "F";
  weatherDesc: string;
}

interface FavoritesContextType {
  favoritesArr: favoritesObj[];
  setFavoritesArr: Dispatch<SetStateAction<favoritesObj[]>>;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favoritesArr: [] as favoritesObj[],
  setFavoritesArr: () => {},
});

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favoritesArr, setFavoritesArr] = useState<favoritesObj[]>([]);

  const value: FavoritesContextType = { favoritesArr, setFavoritesArr };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
