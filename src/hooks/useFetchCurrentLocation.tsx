import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { autoCompleteDTO } from "./useFetchAutoComplete";
import { ICityObj, setCurrCity } from "../redux/currentCity/currentCitySlice";
import { RootState } from "../redux/store";

interface geolocationShortDTO extends autoCompleteDTO {}

const useCurrentLocation = (setSearchString: (city: string) => void) => {
  const dispatch = useDispatch();
  const cityKey = useSelector((state: RootState) => state.currentCity.key);
  useEffect(() => {
    const fetchData = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async (item) => {
          if (item.coords.latitude === 0 || item.coords.longitude === 0) return;
          const res = await axios(
            `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${
              import.meta.env.VITE_API_KEY
            }&q=${item.coords.latitude}%2C%20%20${item.coords.longitude}`
          );
          const data: geolocationShortDTO = res.data;
          dispatch(
            setCurrCity({
              city: data.LocalizedName,
              country: data.Country.LocalizedName,
              key: data.Key,
            } as ICityObj)
          );
          setSearchString(data.LocalizedName);
        });
      } catch (err) {
        toast.error("Location api limit reached");
      }
    };
    if (cityKey.length > 0) return;
    fetchData();
  }, []);
};

export default useCurrentLocation;
