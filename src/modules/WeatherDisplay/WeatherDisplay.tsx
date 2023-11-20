import { useMemo } from "react";
import {
  Box,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import WeatherBox from "./components/WeatherBox/WeatherBox";
import { toast } from "react-toastify";
import { getDayFromDate } from "../../util/helpers";
import { RootState } from "../../redux/store";
import useFetchDailyWeather from "../../hooks/useFetchDailyWeather";
import useFetchForcast from "../../hooks/useFetchForcast";
import {
  IFavoritesObj,
  setFavoritesArr,
} from "../../redux/favorites/favoritesSlice";
import { setIsCelsius } from "../../redux/degreeUnit/degreeUnit";
import "./WeatherDisplay.css";
import CircularLoading from "../../shared/loading/circular";

const WeatherDisplay = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.isDarkMode);
  const isCelsius = useSelector((state: RootState) => state.isCelsius);
  const cityObj = useSelector((state: RootState) => state.currentCity);
  const favoritesArr = useSelector((state: RootState) => state.favorites);

  const isCityFavorite = useMemo(
    () => favoritesArr.find((item) => item.key === cityObj?.key),
    [cityObj, favoritesArr]
  );

  const { weatherObj, isLoading: weatherLoading } = useFetchDailyWeather(
    cityObj?.key
  );
  const { forcastArr, isLoading: forcastLoading } = useFetchForcast(
    cityObj?.key,
    isCelsius
  );

  const handleToggleC = () => dispatch(setIsCelsius(true));
  const handleToggleF = () => dispatch(setIsCelsius(false));

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
    if (!cityObj) {
      toast.error("Please choose a city first");
      return;
    }
    const newItem: IFavoritesObj = {
      country: cityObj.country,
      city: cityObj.city,
      key: cityObj.key,
    };
    if (isCityFavorite) {
      toast.error("Already marked as favorite");
      return;
    }
    dispatch(setFavoritesArr([...favoritesArr, newItem]));
    toast.success("Added successfully");
  };

  if (weatherLoading || forcastLoading) return <CircularLoading />;

  if (!cityObj?.key)
    return <Box className="empty-wrapper">Please choose a city to view</Box>;

  if (!weatherObj) return <Box className="empty-wrapper">No data to view</Box>;

  return (
    <Box
      className={`display-wrapper box-shadow-${isDarkMode ? "dark" : "light"}`}
    >
      <div className="display-header-wrapper">
        <div className="header-city-info">
          <div className="header-text">
            <span className="location-text">{`${cityObj?.country}, ${cityObj?.city}`}</span>
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
