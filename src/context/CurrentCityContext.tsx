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
  currCityObj: CityContextObj | null;
  setCityObj: Dispatch<SetStateAction<CityContextObj | null>>;
}

export const CurrentCityContext = createContext<CurrentCityContextType>({
  currCityObj: null,
  setCityObj: () => {},
});

interface CurrentCityProviderProps {
  children: ReactNode;
}

export const CurrentCityProvider = ({ children }: CurrentCityProviderProps) => {
  const [currCityObj, setCityObj] = useState<CityContextObj | null>(null);

  const value: CurrentCityContextType = {
    currCityObj,
    setCityObj,
  };

  return (
    <CurrentCityContext.Provider value={value}>
      {children}
    </CurrentCityContext.Provider>
  );
};
