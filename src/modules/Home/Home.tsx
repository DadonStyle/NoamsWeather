import React, {
  useState,
  useContext,
  useDeferredValue,
  useCallback,
} from "react";
import SearchComponent from "../../shared/Search/SearchComponent";
import WeatherDisplay from "../WeatherDisplay/WeatherDisplay";
import {
  CityContextObj,
  CurrentCityContext,
} from "../../context/CurrentCityContext";
import useFetchAutoComplete from "./hooks/useFetchAutoComplete";
import "./Home.css";
import useCurrentLocation from "../../hooks/useCurrentLocation";

const Home = () => {
  const [searchString, setSearchString] = useState<string>("");
  const deferredSearchString = useDeferredValue(searchString);
  const [options, setOptions] = useState<CityContextObj[]>([]);
  const { setCityObj } = useContext(CurrentCityContext);

  useCurrentLocation(setSearchString);
  useFetchAutoComplete(deferredSearchString, setOptions);

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.currentTarget.value);
  };
  const handleOnSelectInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const cityObj = options.find(
        (item) => item.LocalizedName === e.target.value
      );

      setCityObj(cityObj || null);
    },
    [options, setCityObj]
  );

  return (
    <div className="home-wrapper">
      <SearchComponent
        onChangeFunc={handleOnChangeInput}
        onSelectFunc={handleOnSelectInput}
        searchString={deferredSearchString}
        options={options}
      />
      <WeatherDisplay />
    </div>
  );
};

export default Home;
