import { useState, useEffect, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface locationObj {
  lat: number;
  lon: number;
}

const useCurrentLocation = (setState: Dispatch<SetStateAction<string>>) => {
  const [location, setLocation] = useState<locationObj>({ lat: 0, lon: 0 });

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
          `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=Ka9SGgkjvd8HKugfGQXYEBdzphTizpID&q=${location.lat}%2C%20%20${location.lon}`
        );
        setState(res.data?.LocalizedName);
      } catch (err) {
        toast.error("API limit reached");
      }
    };
    fetchData();
  }, [location.lat, location.lon, setState]);
};

export default useCurrentLocation;
