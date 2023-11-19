import { useContext } from "react";
import {
  FavoritesContext,
  FavoritesObj,
} from "../../../context/FavoritesContext";
import { toast } from "react-toastify";
import { Box, Button } from "@mui/material";
import "./FavoritesBox.css";
import { DarkModeContext } from "../../../context/DarkModeContext";
import { useNavigate } from "react-router-dom";
import {
  CurrentCityContext,
  CityContextObj,
} from "../../../context/CurrentCityContext";

const FavoritesBox = ({
  cityName,
  cityKey,
  temp,
  unit,
  weatherDesc,
}: FavoritesObj) => {
  const { favoritesArr, setFavoritesArr } = useContext(FavoritesContext);
  const { isDarkMode } = useContext(DarkModeContext);
  const { setCityObj } = useContext(CurrentCityContext);
  const navigate = useNavigate();

  const handleRemoveFromFavorites = () => {
    setFavoritesArr(favoritesArr.filter((item) => item.cityKey !== cityKey));
    toast.success("removed successfully");
  };

  const handleOnBoxClick = () => {
    setCityObj({
      Key: cityKey,
      LocalizedName: cityName,
      Country: { LocalizedName: "israel" },
    } as CityContextObj);
    navigate("/");
  };

  return (
    <div className="favorites-unit-wrapper">
      <Box
        onClick={handleOnBoxClick}
        className={`favorites-box-wrapper  ${
          isDarkMode ? "dark" : "light"
        }-theme`}
      >
        <div className="favorites-box-header">
          <span>{cityName}</span>
          <span>
            {temp}° {unit}
          </span>
        </div>
        <span>{weatherDesc}</span>
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
