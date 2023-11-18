import { useContext, useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from "axios";
import { Box, Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import WeatherBox from "./components/WeatherBox/WeatherBox";
import { DarkModeContext } from "../../context/DarkModeContext";
import { CurrentCityContext } from "../../context/CurrentCityContext";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import mockForcast from "./5Days.json";
import "./WeatherDisplay.css";
import { getDayFromDate } from "../../util/helpers";

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mock = {
  data: [
    {
      IsDayTime: true,
      WeatherText: "sunny AF",
      Temperature: {
        Metric: {
          Unit: "C",
          Value: 24,
        },
        Imperial: {
          Unit: "F",
          Value: 320,
        },
      },
    },
  ],
};

const WeatherDisplay = () => {
  const [weatherObj, setWeatherObj] = useState<weatherDataDTO | null>(null);
  const [forcastArr, setForcastArr] = useState<forcastDataDTO[]>([]);
  const [isCelsius, setIsCelsius] = useState<boolean>(true);
  const { isDarkMode } = useContext(DarkModeContext);
  const { currCityObj } = useContext(CurrentCityContext);

  useEffect(() => {
    const fetchDailyData = async () => {
      try {
        // const res = await axios(
        //   `http://dataservice.accuweather.com/currentconditions/v1/${currCityObj?.Key}?apikey=Ka9SGgkjvd8HKugfGQXYEBdzphTizpID`
        // );
        const res = mock;
        if (res?.data) setWeatherObj(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchForcast = async () => {
      try {
        // const res = await axios(
        //   `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${currCityObj?.Key}?apikey=Ka9SGgkjvd8HKugfGQXYEBdzphTizpID&metric=${isCelsius}`
        // );
        const res = mockForcast;
        if (res.data.DailyForecasts) setForcastArr(res.data.DailyForecasts);
        console.log(res.data.DailyForecasts);
      } catch (err) {
        console.log(err);
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
        <span>{`${
          isCelsius
            ? weatherObj?.Temperature.Metric.Value
            : weatherObj?.Temperature.Imperial.Value
        } ${
          isCelsius
            ? weatherObj?.Temperature.Metric.Unit
            : weatherObj?.Temperature.Imperial.Unit
        }`}</span>
      );
    }
    return <span></span>;
  };

  return (
    <Box
      className={`display-wrapper box-shadow-${isDarkMode ? "dark" : "light"}`}
    >
      <div className="display-header-wrapper">
        <div className="header-city-info">
          <div className="header-text">
            <span>{`${currCityObj?.Country?.LocalizedName || "Country"}, ${
              currCityObj?.LocalizedName || "City"
            }`}</span>
            {showDegree()}
            {weatherObj?.Temperature && (
              <ToggleButtonGroup value={isCelsius ? "right" : "left"} exclusive>
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
        <Button>Add to Favorites</Button>
      </div>
      <div className="weather-info">
        {weatherObj?.WeatherText || "Weather description"}
      </div>
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
