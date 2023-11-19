import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CurrentCityContext } from "../../../context/CurrentCityContext";

interface TemperatureValueObject {
  Unit: "C" | "F";
  Value: number;
}

export interface weatherDataDTO {
  IsDayTime: boolean;
  WeatherText: string;
  Temperature: {
    Metric: TemperatureValueObject;
    Imperial: TemperatureValueObject;
  };
}

export interface forcastDataDTO {
  Date: string;
  EpochDate: number;
  Temperature: {
    Minimum: TemperatureValueObject;
    Maximum: TemperatureValueObject;
  };
}

interface useFetchWeatherData {
  setForcast: (item: forcastDataDTO[]) => void;
}

const useFetchWeatherData = (isCelsius: boolean) => {
  const { cityObj } = useContext(CurrentCityContext);
  const [weatherObj, setWeatherObj] = useState<weatherDataDTO | null>(null);
  const [forcastArr, setForcastArr] = useState<forcastDataDTO[]>([]);

  useEffect(() => {
    const fetchDailyData = async () => {
      try {
        const res = await axios(
          `http://dataservice.accuweather.com/currentconditions/v1/${
            cityObj?.Key
          }?apikey=${import.meta.env.VITE_API_KEY}`
        );
        if (res?.data) setWeatherObj(res.data[0]);
      } catch (err) {
        toast.error("Something went wrong");
      }
    };
    const fetchForcast = async () => {
      try {
        const res = await axios(
          `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${
            cityObj?.Key
          }?apikey=${import.meta.env.VITE_API_KEY}&metric=${isCelsius}`
        );
        if (res.data.DailyForecasts) setForcastArr(res.data.DailyForecasts);
        else setForcastArr([]);
      } catch (err) {
        toast.error("Something went wrong");
      }
    };
    if (cityObj !== null) {
      fetchDailyData();
      fetchForcast();
    }
  }, [cityObj, isCelsius]);

  return { weatherObj, forcastArr };
};

export default useFetchWeatherData;
