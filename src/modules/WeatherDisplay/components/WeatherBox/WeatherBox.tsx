import { useContext } from "react";
import { Box } from "@mui/material";
import { calcAverage } from "../../../../util/helpers";
import { DarkModeContext } from "../../../../context/DarkModeContext";
import "./WeatherBox.css";

interface WeatherBoxProps {
  day: string;
  minTemp: number;
  maxTemp: number;
  unit: "C" | "F";
}

const WeatherBox = ({ day, minTemp, maxTemp, unit }: WeatherBoxProps) => {
  const { isDarkMode } = useContext(DarkModeContext);
  return (
    <Box
      className={`weather-box-wrapper ${isDarkMode ? "dark" : "light"}-theme`}
    >
      <span>{day}</span>
      <span>
        {maxTemp}°{unit}
        <span className="small-min-temp">
          {minTemp}°{unit}
        </span>
      </span>
    </Box>
  );
};

export default WeatherBox;
