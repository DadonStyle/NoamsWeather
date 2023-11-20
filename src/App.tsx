import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import AppRouters from "./routes";
import AppHeader from "./modules/AppHeader/AppHeader.tsx";
import useGlobalMuiTheme from "./styles/useGlobalStyleMui.tsx";
import { RootState } from "./redux/store.ts";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const isDarkMode = useSelector((state: RootState) => state.isDarkMode);
  const theme = useGlobalMuiTheme();
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer autoClose={1_500} />
      <BrowserRouter>
        <div
          className={`app-container ${isDarkMode ? "dark-mode" : "light-mode"}`}
        >
          <AppHeader />
          <AppRouters />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
