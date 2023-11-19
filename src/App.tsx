import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import AppRouters from "./routes";
import Header from "./modules/Header/Header.tsx";
import { DarkModeContext } from "./context/DarkModeContext.tsx";
import useGlobalMuiTheme from "./styles/useGlobalStyleMui.tsx";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const theme = useGlobalMuiTheme();
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer autoClose={1_500} />
      <BrowserRouter>
        <div
          className={`app-container ${isDarkMode ? "dark-mode" : "light-mode"}`}
        >
          <Header />
          <AppRouters />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
