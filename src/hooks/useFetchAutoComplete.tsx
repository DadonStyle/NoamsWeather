import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export interface autoCompleteDTO {
  Country: {
    LocalizedName: string;
  };
  LocalizedName: string;
  Key: string;
}

const useFetchAutoComplete = (searchString: string) => {
  const [options, setOptions] = useState<autoCompleteDTO[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(
          `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${
            import.meta.env.VITE_API_KEY
          }&q=${searchString}`
        );
        setOptions(res.data);
      } catch (err) {
        toast.error("Something went wrong");
      }
    };
    if (searchString !== "") fetchData();
  }, [searchString, setOptions]);

  return { options };
};

export default useFetchAutoComplete;
