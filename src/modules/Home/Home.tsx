import React, { useState, useDeferredValue, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDisptach } from "../../redux/store";
import SearchComponent from "../../shared/Search/SearchComponent";
import WeatherDisplay from "../WeatherDisplay/WeatherDisplay";
import useFetchAutoComplete from "../../hooks/useFetchAutoComplete";
import useCurrentLocation from "../../hooks/useFetchCurrentLocation";
import { RootState } from "../../redux/store";
import {
  setCurrCity,
  ICityObj,
} from "../../redux/currentCity/currentCitySlice";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch<AppDisptach>();
  const cityObj = useSelector((state: RootState) => state.currentCity);
  const [searchString, setSearchString] = useState<string>(cityObj?.city || "");
  const deferredSearchString = useDeferredValue(searchString);
  const { options } = useFetchAutoComplete(deferredSearchString);

  const findCityInOptions = useCallback(
    (cityName: string) => {
      const match = options.find((item) => item.LocalizedName === cityName);
      const newCityObj: ICityObj = {
        country: match?.Country.LocalizedName || "",
        city: match?.LocalizedName || "",
        key: match?.Key || "",
      };
      return newCityObj;
    },
    [options]
  );

  useCurrentLocation(setSearchString);

  const handleOnSelectInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newCityObj = findCityInOptions(e.target.value);
      if (newCityObj.key.length > 0) dispatch(setCurrCity(newCityObj));
    },
    [dispatch, findCityInOptions]
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
