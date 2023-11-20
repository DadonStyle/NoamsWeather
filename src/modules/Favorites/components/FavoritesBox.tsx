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
  CityContextObj,
  CurrentCityContext,
} from "../../../context/CurrentCityContext";

interface FavoritesBoxProps extends FavoritesObj {
  refetchFunc: (key: string, isCel: boolean) => void;
}

const FavoritesBox = ({
  LocalizedName,
  Key,
  temp,
  Country,
  unit,
  weatherDesc,
  refetchFunc,
}: FavoritesBoxProps) => {
  const { favoritesArr, setFavoritesArr } = useContext(FavoritesContext);
  const { setCityObj } = useContext(CurrentCityContext);
  const { isDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const handleRemoveFromFavorites = () => {
    setFavoritesArr(favoritesArr.filter((item) => item.Key !== Key));
    toast.success("removed successfully");
  };

  const handleOnBoxClick = () => {
    const cityObj: CityContextObj = {
      Key,
      LocalizedName,
      Country,
    };
    setCityObj(cityObj);
    refetchFunc(Key, unit === "C");
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
          <span>{LocalizedName}</span>
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
