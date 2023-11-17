
import SearchComponent from "../../shared/Search/SearchComponent";
import WeatherDisplay from "../WeatherDisplay/WeatherDisplay";

import "./Home.css";

const Home = () => {

  return (
    <div className="home-wrapper">
      <SearchComponent />
      <WeatherDisplay />
    </div>
  );
};

export default Home;
