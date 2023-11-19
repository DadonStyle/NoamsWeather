import { useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";
import FavoritesBox from "./components/FavoritesBox";
import { Box } from "@mui/material";
import "./Favorites.css";

const Favorites = () => {
  const { favoritesArr } = useContext(FavoritesContext);

  if (favoritesArr.length < 1)
    return <Box className="empty-wrapper">No favorites found</Box>;

  return (
    <div className="favorites-wrapper">
      {favoritesArr.map((item) => (
        <FavoritesBox
          key={item.cityKey}
          cityName={item.cityName}
          cityKey={item.cityKey}
          temp={item.temp}
          unit={item.unit}
          weatherDesc={item.weatherDesc}
        />
      ))}
    </div>
  );
};

export default Favorites;
