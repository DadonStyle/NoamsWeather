import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface locationObj {
  lat: number;
  lon: number;
}

const useCurrentLocation = () => {
  const [location, setLocation] = useState<locationObj>({ lat: 0, lon: 0 });
  const [cityName, setCityName] = useState<string>("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((item) => {
      setLocation({ lat: item.coords.latitude, lon: item.coords.longitude });
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location.lat === 0 || location.lon === 0) return;
        const res = await axios(
          `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${
            import.meta.env.VITE_API_KEY
          }&q=${location.lat}%2C%20%20${location.lon}`
        );
        setCityName(res.data?.LocalizedName);
      } catch (err) {
        toast.error("Something went wrong");
      }
    };
    fetchData();
  }, [location.lat, location.lon]);

  return { cityName };
};

export default useCurrentLocation;
