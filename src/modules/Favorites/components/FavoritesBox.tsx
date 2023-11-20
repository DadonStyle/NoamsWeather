import { toast } from "react-toastify";
import { Box, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ICityObj,
  setCurrCity,
} from "../../../redux/currentCity/currentCitySlice";
import useFetchDailyWeather from "../../../hooks/useFetchDailyWeather";
import { RootState } from "../../../redux/store";
import { setFavoritesArr } from "../../../redux/favorites/favoritesSlice";
import "./FavoritesBox.css";
import CircularLoading from "../../../shared/loading/circular";

interface FavoritesBoxProps {
  cityKey: string;
  city: string;
  country: string;
}

const FavoritesBox = ({ cityKey, city, country }: FavoritesBoxProps) => {
  const favoritesArr = useSelector((state: RootState) => state.favorites);
  const isCelsius = useSelector((state: RootState) => state.isCelsius);
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.isDarkMode);
  const navigate = useNavigate();

  const { weatherObj, isLoading } = useFetchDailyWeather(cityKey);

  const handleRemoveFromFavorites = () => {
    dispatch(
      setFavoritesArr(favoritesArr.filter((item) => item.key !== cityKey))
    );
    toast.success("removed successfully");
  };

  const handleOnBoxClick = () => {
    const cityObj: ICityObj = {
      key: cityKey,
      city,
      country,
    };
    dispatch(setCurrCity(cityObj));
    navigate("/");
  };

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

  if (isLoading) return <CircularLoading />;

  return (
    <div className="favorites-unit-wrapper">
      <Box
        onClick={handleOnBoxClick}
        className={`favorites-box-wrapper  ${
          isDarkMode ? "dark" : "light"
        }-theme`}
      >
        <div className="favorites-box-header">
          <span className="favorites-city-name">{city}</span>
          <span>{showDegree()}</span>
        </div>
        <span className="favorites-weather-text">
          {weatherObj?.WeatherText}
        </span>
      </Box>
      <Button
        className="favorites-remove-button"
        onClick={handleRemoveFromFavorites}
      >
        remove
      </Button>
    </div>
  );
};

export default FavoritesBox;
