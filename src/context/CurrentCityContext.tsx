import {
  createContext,
  Dispatch,
  ReactNode,
  useState,
  SetStateAction,
} from "react";

export interface CityContextObj {
  Country: {
    LocalizedName: string;
  };
  LocalizedName: string;
  Key: string;
}

interface CurrentCityContextType {
  cityObj: CityContextObj | null;
  setCityObj: Dispatch<SetStateAction<CityContextObj | null>>;
}

export const CurrentCityContext = createContext<CurrentCityContextType>({
  cityObj: null,
  setCityObj: () => {},
});

interface CurrentCityProviderProps {
  children: ReactNode;
}

export const CurrentCityProvider = ({ children }: CurrentCityProviderProps) => {
  const [cityObj, setCityObj] = useState<CityContextObj | null>(null);

  const value: CurrentCityContextType = {
    cityObj,
    setCityObj,
  };

  return (
    <CurrentCityContext.Provider value={value}>
      {children}
    </CurrentCityContext.Provider>
  );
};
