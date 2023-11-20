import { createTheme } from "@mui/material/styles";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const useGlobalMuiTheme = () => {
  const isDarkMode = useSelector((state: RootState) => state.isDarkMode);
  const theme = createTheme({
    palette: {
      primary: {
        main: isDarkMode ? "#FFFFFF" : "#121212",
      },
      secondary: {
        main: "#FFFFFF",
      },
    },
    components: {
      MuiChip: {
        styleOverrides: {
          root: {
            margin: 0,
            padding: 0,
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            textTransform: "none",
            color: isDarkMode ? "rgb(243, 232, 232)" : "#121212",
            "&:hover": {
              backgroundColor: isDarkMode ? "#4e031a" : "rgb(243, 232, 232)",
            },
            label: {
              color: isDarkMode ? "rgb(243, 232, 232)" : "#121212",
            },
            input: {
              color: isDarkMode ? "rgb(243, 232, 232)" : "#121212",
            },
            "&:disabled": {
              backgroundColor: "#FECDD6",
            },
          },
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: {
            color: isDarkMode ? "rgb(243, 232, 232)" : "#121212",
            maxHeight: "24px",
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            outline: "none !important",
            color: isDarkMode ? "rgb(243, 232, 232)" : "#121212",
            backgroundColor: isDarkMode ? "#4e031a" : "rgb(161, 148, 220)",
            "&.Mui-selected": {
              color: isDarkMode
                ? "rgb(243, 232, 232, 0.5)"
                : "rgba(18,18,18, 0.5)",
              backgroundColor: isDarkMode ? "rgba(151, 151, 151, 0.1)" : "",
            },
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: isDarkMode ? "rgb(243, 232, 232)" : "#121212",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            outline: "none !important",
            "&:hover": {
              backgroundColor: isDarkMode ? "#4e031a" : "rgb(243, 232, 232)",
            },
            "&:disabled": {
              backgroundColor: "#FECDD6",
            },
          },
        },
      },
    },
  });

  return theme;
};

export default useGlobalMuiTheme;
