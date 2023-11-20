import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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

interface useWeatherData {
  setForcast: (item: forcastDataDTO[]) => void;
}

const useWeatherData = (cityKey: string, isCelsius: boolean) => {
  const [weatherObj, setWeatherObj] = useState<weatherDataDTO | null>(null);
  const [forcastArr, setForcastArr] = useState<forcastDataDTO[]>([]);

  const fetchDailyData = async (key: string) => {
    try {
      const res = await axios(
        `http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${
          import.meta.env.VITE_API_KEY
        }`
      );
      if (res?.data) setWeatherObj(res.data[0]);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const fetchForcast = async (key: string, isCelsiusDegree: boolean) => {
    try {
      const res = await axios(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${
          import.meta.env.VITE_API_KEY
        }&metric=${isCelsiusDegree}`
      );
      if (res.data.DailyForecasts) setForcastArr(res.data.DailyForecasts);
      else setForcastArr([]);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const refetchFunc = (cityKey: string, isCelsius: boolean) => {
    if (cityKey.length < 1) return;
    fetchDailyData(cityKey);
    fetchForcast(cityKey, isCelsius);
  };

  useEffect(() => {
    if (cityKey.length < 1) return;
    fetchDailyData(cityKey);
    fetchForcast(cityKey, isCelsius);
  }, [cityKey, isCelsius]);

  return { weatherObj, forcastArr, refetchFunc };
};

export default useWeatherData;
