import { useState, useContext } from "react";
import SearchComponent from "../../shared/Search/SearchComponent";
import WeatherDisplay from "../../shared/WeatherDisplay/WeatherDisplay";
import {
  CityContextObj,
  CurrentCityContext,
} from "../../context/CurrentCityContext";
import "./Home.css";
import useFetchAutoComplete from "./hooks/useFetchAutoComplete";

const Home = () => {
  const [searchString, setSearchString] = useState<string>("");
  const [options, setOptions] = useState<CityContextObj[]>([]);
  const { setCityObj } = useContext(CurrentCityContext);

  // useCurrentLocation(setSearchString); // when mock on comment this to save calls
  useFetchAutoComplete(searchString, setOptions);

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === "") {
      setOptions([]);
      return;
    }
    setSearchString(e.currentTarget.value);
  };
  const handleOnSelectInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cityObj = options.find(
      (item) => item.LocalizedName === e.target.value
    );
    setCityObj(cityObj || null);
  };

  return (
    <div className="home-wrapper">
      <SearchComponent
        onChangeFunc={handleOnChangeInput}
        onSelectFunc={handleOnSelectInput}
        searchString={searchString}
        options={options}
      />
      <WeatherDisplay />
    </div>
  );
};

export default Home;
