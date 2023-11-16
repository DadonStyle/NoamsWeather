import { Box, Button } from "@mui/material";
import "./WeatherDisplay.css";
import WeatherBox from "./components/WeatherBox/WeatherBox";

const WeatherDisplay = () => {
  return (
    <Box className="display-wrapper">
      <div className="display-header-wrapper">
        <div className="header-city-info">
          <img src="" alt="logo" />
          <div className="header-text">
            <span>Tel Aviv</span>
            <span>38 degree</span>
          </div>
        </div>
        <Button>Add to Favorites</Button>
      </div>
      <div className="weather-info">Scattered clouds get data from api</div>
      <div className="weater-days-wrapper">
        <WeatherBox />
      </div>
    </Box>
  );
};

export default WeatherDisplay;
