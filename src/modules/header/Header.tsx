import { Button, IconButton } from "@mui/material";
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { toggleDarkMode } from "../../redux/darkMode/darkModeSlice";
import "./Header.css";

const Header = () => {
  const disptach = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.isDarkMode);
  const navigate = useNavigate();
  const handleOnFavoriteClick = () => navigate("./favorites");
  const handleOnHomeClick = () => navigate("./");
  const handleOnDarkMode = () => disptach(toggleDarkMode());

  return (
    <div className={`header-wrapper ${isDarkMode ? "dark-header" : ""}`}>
      <div onClick={handleOnHomeClick} className="header-logo">
        Noams Weather
      </div>
      <div className="buttons-wrapper">
        <div>
          <Button onClick={handleOnHomeClick}>Home</Button>
          <Button onClick={handleOnFavoriteClick}>Favorites</Button>
        </div>
        <div>
          <IconButton
            onClick={handleOnDarkMode}
            sx={{ ml: 1, outline: "none !important" }}
            color="inherit"
          >
            {isDarkMode ? <DarkModeOutlined /> : <LightModeOutlined />}
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
