import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export interface ITemperatureValueObj {
  Unit: "C" | "F";
  Value: number;
}

export interface weatherDataDTO {
  WeatherText: string;
  Temperature: {
    Metric: ITemperatureValueObj;
    Imperial: ITemperatureValueObj;
  };
}

const useFetchDailyWeather = (cityKey: string) => {
  const [weatherObj, setWeatherObj] = useState<weatherDataDTO | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDailyData = async () => {
      try {
        setIsLoading(true);
        if (cityKey.length < 1) return;
        const res = await axios(
          `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${
            import.meta.env.VITE_API_KEY
          }`
        );
        if (res?.data) setWeatherObj(res.data[0]);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        toast.error("Something went wrong");
      }
    };
    fetchDailyData();
  }, [cityKey]);

  return { weatherObj, isLoading };
};

export default useFetchDailyWeather;
