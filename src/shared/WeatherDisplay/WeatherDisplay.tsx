import { useContext, useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from "axios";
import {
  Box,
  Button,
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import mockForcast from "./5Days.json";
import { getDayFromDate } from "../../util/helpers";
import "./WeatherDisplay.css";

interface TemperatureValueObject {
  Unit: "C" | "F";
  Value: number;
}

interface weatherDataDTO {
  IsDayTime: boolean;
  WeatherText: string;
  Temperature: {
    Metric: TemperatureValueObject;
    Imperial: TemperatureValueObject;
  };
}

interface forcastDataDTO {
  Date: string;
  EpochDate: number;
  Temperature: {
    Minimum: TemperatureValueObject;
    Maximum: TemperatureValueObject;
  };
}

// const mock = {
//   data: [
//     {
//       IsDayTime: true,
//       WeatherText: "sunny AF",
//       Temperature: {
//         Metric: {
//           Unit: "C",
//           Value: 24,
//         },
//         Imperial: {
//           Unit: "F",
//           Value: 320,
//         },
//       },
//     },
//   ],
// };

const WeatherDisplay = () => {
  const [weatherObj, setWeatherObj] = useState<weatherDataDTO | null>(null);
  const [forcastArr, setForcastArr] = useState<forcastDataDTO[]>([]);
  const [isCelsius, setIsCelsius] = useState<boolean>(true);
  const { isDarkMode } = useContext(DarkModeContext);
  const { currCityObj } = useContext(CurrentCityContext);
  const { favoritesArr, setFavoritesArr } = useContext(FavoritesContext);
  const isCityFavorite = favoritesArr.find(
    (item) => item.cityKey === currCityObj?.Key
  );

  useEffect(() => {
    const fetchDailyData = async () => {
      try {
        const res = await axios(
          `http://dataservice.accuweather.com/currentconditions/v1/${
            currCityObj?.Key
          }?apikey=${import.meta.env.VITE_API_KEY}`
        );
        // const res = mock;
        if (res?.data) setWeatherObj(res.data[0]);
      } catch (err) {
        // toast.error("Something went wrong");
      }
    };
    const fetchForcast = async () => {
      try {
        const res = await axios(
          `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${
            currCityObj?.Key
          }?apikey=${import.meta.env.VITE_API_KEY}&metric=${isCelsius}`
        );
        console.log(res.data.DailyForecasts);
        // const res = mockForcast;
        if (res.data.DailyForecasts) setForcastArr(res.data.DailyForecasts);
        else setForcastArr([]);
      } catch (err) {
        // toast.error("Something went wrong");
      }
    };
    if (currCityObj !== null) {
      fetchDailyData();
      fetchForcast();
    } else {
      setWeatherObj(null);
    }
  }, [currCityObj, isCelsius]);

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
    if (!weatherObj || !currCityObj) {
      toast.error("Please choose a city first");
      return;
    }
    const newItem = {
      cityName: currCityObj.LocalizedName,
      cityKey: currCityObj.Key,
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

  if (!currCityObj?.LocalizedName)
    return <Box className="empty-wrapper">Please choose a city to view</Box>;

  return (
    <Box
      className={`display-wrapper box-shadow-${isDarkMode ? "dark" : "light"}`}
    >
      <div className="display-header-wrapper">
        <div className="header-city-info">
          <div className="header-text">
            <span>{`${currCityObj?.Country?.LocalizedName}, ${currCityObj?.LocalizedName}`}</span>
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
