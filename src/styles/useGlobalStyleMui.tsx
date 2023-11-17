import { useContext } from "react";

import { createTheme } from "@mui/material/styles";
import { DarkModeContext } from "../context/DarkModeContext";

const useGlobalMuiTheme = () => {
  const { isDarkMode } = useContext(DarkModeContext);
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
