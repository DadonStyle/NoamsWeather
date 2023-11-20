import { useState, useEffect } from "react";
import { ITemperatureValueObj } from "./useFetchDailyWeather";
import { toast } from "react-toastify";
import axios from "axios";

export interface forcastDataDTO {
  Date: string;
  EpochDate: number;
  Temperature: {
    Minimum: ITemperatureValueObj;
    Maximum: ITemperatureValueObj;
  };
}

const useFetchForcast = (cityKey: string, isCelsius: boolean) => {
  const [forcastArr, setForcastArr] = useState<forcastDataDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchForcast = async () => {
      try {
        setIsLoading(true);
        const res = await axios(
          `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${
            import.meta.env.VITE_API_KEY
          }&metric=${isCelsius}`
        );
        if (res.data.DailyForecasts) setForcastArr(res.data.DailyForecasts);
        else setForcastArr([]);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        toast.error("Something went wrong");
      }
    };
    if (cityKey.length < 1) return;
    fetchForcast();
  }, [cityKey, isCelsius]);

  return { forcastArr, isLoading };
};

export default useFetchForcast;
