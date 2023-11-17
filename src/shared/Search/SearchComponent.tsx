import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

interface resItemDTO {
  AdministrativeArea: object;
  Country: object;
  Key: string;
  LocalizedName: string;
  Rank: string;
  Type: string;
  Version: string;
}

const SearchComponent = () => {
  const [searchString, setSearchString] = useState<string>("");
  console.log(searchString);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(
          `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=fSCkz5ObyhJr7j6aTm4NGnpcUXUCJWTr&q=${searchString}`
        );
        if (res?.data)
          setOptions(res.data.map((item: resItemDTO) => item.LocalizedName));
      } catch (err) {
        console.log(err);
      }
    };
    if (searchString !== "") fetchData();
  }, [searchString]);

  const handleOnChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === "") {
      setOptions([]);
      setSearchString("");
      return;
    }
    setSearchString(e.currentTarget.value);
  };

  return (
    <div className="search-wrapper">
      <Autocomplete
        disablePortal
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
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
