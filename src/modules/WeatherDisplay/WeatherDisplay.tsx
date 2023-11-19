import { useContext, useState } from "react";
import {
  Box,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import WeatherBox from "./components/WeatherBox/WeatherBox";
import { toast } from "react-toastify";
import { DarkModeContext } from "../../context/DarkModeContext";
import { CurrentCityContext } from "../../context/CurrentCityContext";
import { FavoritesContext, FavoritesObj } from "../../context/FavoritesContext";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { getDayFromDate } from "../../util/helpers";
import useFetchWeatherData from "./hooks/useWeatherData";
import "./WeatherDisplay.css";

const WeatherDisplay = () => {
  const [isCelsius, setIsCelsius] = useState<boolean>(true);
  const { isDarkMode } = useContext(DarkModeContext);
  const { cityObj } = useContext(CurrentCityContext);
  const { favoritesArr, setFavoritesArr } = useContext(FavoritesContext);
  const isCityFavorite = favoritesArr.find(
    (item) => item.cityKey === cityObj?.Key
  );

  const { weatherObj, forcastArr } = useFetchWeatherData(isCelsius);

  const handleToggleC = () => setIsCelsius(true);
  const handleToggleF = () => setIsCelsius(false);

  const showDegree = () => {
    if (weatherObj !== null) {
      return (
        <span className="weather-unit-span">
          {`${
            isCelsius
              ? weatherObj?.Temperature.Metric.Value
              : weatherObj?.Temperature.Imperial.Value
          }° ${
            isCelsius
              ? weatherObj?.Temperature.Metric.Unit
              : weatherObj?.Temperature.Imperial.Unit
          }`}
        </span>
      );
    }
    return <span />;
  };

  const handleAddFavorites = () => {
    if (!weatherObj || !cityObj) {
      toast.error("Please choose a city first");
      return;
    }
    const newItem = {
      cityName: cityObj.LocalizedName,
      cityKey: cityObj.Key,
      temp: isCelsius
        ? weatherObj.Temperature.Metric.Value
        : weatherObj.Temperature.Imperial.Value,
      unit: isCelsius
        ? weatherObj?.Temperature.Metric.Unit
        : weatherObj?.Temperature.Imperial.Unit,
      weatherDesc: weatherObj.WeatherText,
    } as FavoritesObj;
    if (isCityFavorite) {
      toast.error("Already marked as favorite");
      return;
    }
    setFavoritesArr((prevFavoritesArr) => [...prevFavoritesArr, newItem]);
    toast.success("Added successfully");
  };

  if (!cityObj?.LocalizedName)
    return <Box className="empty-wrapper">Please choose a city to view</Box>;

  return (
    <Box
      className={`display-wrapper box-shadow-${isDarkMode ? "dark" : "light"}`}
    >
      <div className="display-header-wrapper">
        <div className="header-city-info">
          <div className="header-text">
            <span>{`${cityObj?.Country?.LocalizedName}, ${cityObj?.LocalizedName}`}</span>
            <div className="header-temp-wrapper">
              {showDegree()}
              {weatherObj?.Temperature && (
                <ToggleButtonGroup
                  value={isCelsius ? "right" : "left"}
                  exclusive
                >
                  <ToggleButton onClick={handleToggleF} value="left">
                    {weatherObj?.Temperature.Imperial.Unit}
                  </ToggleButton>
                  <ToggleButton onClick={handleToggleC} value="right">
                    {weatherObj?.Temperature.Metric.Unit}
                  </ToggleButton>
                </ToggleButtonGroup>
              )}
            </div>
          </div>
        </div>
        <div>
          <IconButton
            className={`${isDarkMode ? "dark" : "light"}-mode-border`}
            onClick={handleAddFavorites}
          >
            {isCityFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </div>
      </div>
      <div className="weather-info">{weatherObj?.WeatherText}</div>
      <div className="weater-days-wrapper">
        {forcastArr.map((item) => (
          <WeatherBox
            key={item.EpochDate}
            day={getDayFromDate(item.Date)}
            minTemp={item.Temperature.Minimum.Value}
            maxTemp={item.Temperature.Maximum.Value}
            unit={item.Temperature.Maximum.Unit}
          />
        ))}
      </div>
    </Box>
  );
};

export default WeatherDisplay;
