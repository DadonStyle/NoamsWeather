import { useEffect, useContext } from "react";
import {
  CityContextObj,
  CurrentCityContext,
} from "../../../context/CurrentCityContext";
import axios from "axios";
import { toast } from "react-toastify";

const useFetchAutoComplete = (
  searchString: string,
  setOptions: (item: CityContextObj[]) => void
) => {
  const { setCityObj } = useContext(CurrentCityContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(
          `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${
            import.meta.env.VITE_API_KEY
          }&q=${searchString}`
        );
        if (res?.data) {
          const cityObj = res.data.find(
            (item: CityContextObj) => item.LocalizedName === searchString
          );
          setCityObj(cityObj || null);
          setOptions(res.data);
        }
      } catch (err) {
        toast.error("Something went wrong");
      }
    };
    if (searchString !== "") fetchData();
  }, [searchString, setCityObj, setOptions]);
};

export default useFetchAutoComplete;
