// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { toast } from "react-toastify";
import {
  CityContextObj,
  CurrentCityContext,
} from "../../context/CurrentCityContext";
import "./SearchComponent.css";
import { DarkModeContext } from "../../context/DarkModeContext";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mock = {
  data: [
    {
      Version: 1,
      Key: "1234",
      Type: "City",
      Rank: 20,
      LocalizedName: "Ashdod",
      Country: {
        ID: "KZ",
        LocalizedName: "Israel",
      },
      AdministrativeArea: {
        ID: "AST",
        LocalizedName: "Astana",
      },
    },
    {
      Version: 1,
      Key: "1234",
      Type: "City",
      Rank: 20,
      LocalizedName: "Tel Aviv",
      Country: {
        ID: "KZ",
        LocalizedName: "Israel",
      },
      AdministrativeArea: {
        ID: "AST",
        LocalizedName: "Astana",
      },
    },
  ],
};

const SearchComponent = () => {
  const [searchString, setSearchString] = useState<string>("Tel Aviv");
  const [options, setOptions] = useState<CityContextObj[]>([]);
  const { setCityObj } = useContext(CurrentCityContext);
  const { isDarkMode } = useContext(DarkModeContext);

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === "") {
      setOptions([]);
      return;
    }
    setSearchString(e.currentTarget.value);
  };

  const handleOnSelectInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cityObj = options.find(
      (item) => item.LocalizedName === e.target.value
    );
    setCityObj(cityObj || null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await axios(
        //   `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=Ka9SGgkjvd8HKugfGQXYEBdzphTizpID&q=${searchString}`
        // );
        const res = mock;
        if (res?.data) {
          const cityObj = res.data.find(
            (item: CityContextObj) => item.LocalizedName === searchString
          );
          setCityObj(cityObj || null);
          setOptions(res.data);
        }
        // console.log(res.data);
      } catch (err) {
        toast.error("API limit reached");
      }
    };
    if (searchString !== "") fetchData();
  }, [searchString, setCityObj]);

  return (
    <div className="search-wrapper">
      <Autocomplete
        freeSolo
        className={`search-input box-shadow-${isDarkMode ? "dark" : "light"}`}
        disablePortal
        options={options.map((item: CityContextObj) => item.LocalizedName)}
        sx={{ width: 300 }}
        value={searchString}
        onSelect={handleOnSelectInput}
        renderInput={(params) => (
          <TextField
            lang="en"
            onChange={handleOnChangeInput as () => void}
            {...params}
            label="City"
          />
        )}
      />
    </div>
  );
};

export default SearchComponent;
