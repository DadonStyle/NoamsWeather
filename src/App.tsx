import Header from "./modules/header/Header";
import { useContext } from "react";
import { DarkModeContext } from "./context/context";
import SearchComponent from "./shared/Search/SearchComponent";
import WeatherDisplay from "./modules/WeatherDisplay/WeatherDisplay";
import "./App.css";

const App = () => {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`main-container ${isDarkMode ? "dark-mode" : "light-mode"}`}
    >
      <Header />
      <SearchComponent />
      <WeatherDisplay />
    </div>
  );
};

export default App;
