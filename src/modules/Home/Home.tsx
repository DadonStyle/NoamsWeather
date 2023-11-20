import React, {
  useState,
  useContext,
  useDeferredValue,
  useCallback,
  useEffect,
} from "react";
import SearchComponent from "../../shared/Search/SearchComponent";
import WeatherDisplay from "../WeatherDisplay/WeatherDisplay";
import {
  CityContextObj,
  CurrentCityContext,
} from "../../context/CurrentCityContext";
import useFetchAutoComplete from "./hooks/useFetchAutoComplete";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import "./Home.css";

const Home = () => {
  const { cityObj, setCityObj } = useContext(CurrentCityContext);
  const [searchString, setSearchString] = useState<string>(
    cityObj?.LocalizedName || ""
  );
  const [options, setOptions] = useState<CityContextObj[]>([]);
  const deferredSearchString = useDeferredValue(searchString);

  const findCityInOptions = useCallback(
    (cityName: string) =>
      options.find((item) => item.LocalizedName === cityName),
    [options]
  );

  const { cityName } = useCurrentLocation();

  useFetchAutoComplete(deferredSearchString, setOptions);

  useEffect(() => {
    if (cityName && !cityObj?.LocalizedName) {
      setSearchString(cityName);
      const newCityObj = findCityInOptions(cityName);
      if (newCityObj) {
        setCityObj(newCityObj);
      }
    }
  }, [
    cityName,
    cityObj?.LocalizedName,
    findCityInOptions,
    options,
    setCityObj,
  ]);

  const handleOnSelectInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newCityObj = findCityInOptions(e.target.value);
      if (newCityObj) setCityObj(newCityObj);
    },
    [findCityInOptions, setCityObj]
  );

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.currentTarget.value);
  };

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
