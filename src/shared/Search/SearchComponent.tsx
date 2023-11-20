/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, TextField } from "@mui/material";
import { autoCompleteDTO } from "../../hooks/useFetchAutoComplete";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import "./SearchComponent.css";

// using any type to keep the component reusable
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
  const isDarkMode = useSelector((state: RootState) => state.isDarkMode);

  return (
    <div className="search-wrapper">
      <Autocomplete
        freeSolo
        className={`search-input box-shadow-${isDarkMode ? "dark" : "light"}`}
        disablePortal
        options={options.map((item: autoCompleteDTO) => item.LocalizedName)}
        sx={{ width: 300 }}
        value={searchString}
        onSelect={onSelectFunc}
        renderInput={(params) => (
          <TextField
            key={params.id}
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
