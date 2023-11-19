/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { CityContextObj } from "../../context/CurrentCityContext";
import { DarkModeContext } from "../../context/DarkModeContext";
import "./SearchComponent.css";

// reusable component, this is why i use any instead of specific types
interface SearchComponentProps {
  onChangeFunc: (item: any) => void;
  onSelectFunc: (item: any) => void;
  options: any[];
  searchString: string;
}

const SearchComponent = ({
  onChangeFunc,
  onSelectFunc,
  options,
  searchString,
}: SearchComponentProps) => {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div className="search-wrapper">
      <Autocomplete
        freeSolo
        className={`search-input box-shadow-${isDarkMode ? "dark" : "light"}`}
        disablePortal
        options={options.map((item: CityContextObj) => item.LocalizedName)}
        sx={{ width: 300 }}
        value={searchString}
        onSelect={onSelectFunc}
        renderInput={(params) => (
          <TextField
            lang="en"
            onChange={onChangeFunc as () => void}
            {...params}
            label="City"
          />
        )}
      />
    </div>
  );
};

export default SearchComponent;
