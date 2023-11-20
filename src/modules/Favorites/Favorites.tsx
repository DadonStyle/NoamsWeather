import { useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";
import FavoritesBox from "./components/FavoritesBox";
import { Box } from "@mui/material";
import useWeatherData from "../../hooks/useWeatherData";
import "./Favorites.css";

const Favorites = () => {
  const { favoritesArr } = useContext(FavoritesContext);

  const { refetchFunc } = useWeatherData("", false);

  if (favoritesArr.length < 1)
    return <Box className="empty-wrapper">No favorites found</Box>;

  return (
    <div className="favorites-wrapper">
      {favoritesArr.map((item) => (
        <FavoritesBox
          key={item.Key}
          LocalizedName={item.LocalizedName}
          Country={item.Country}
          Key={item.Key}
          temp={item.temp}
          unit={item.unit}
          weatherDesc={item.weatherDesc}
          refetchFunc={refetchFunc}
        />
      ))}
    </div>
  );
};

export default Favorites;
