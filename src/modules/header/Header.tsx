import { useContext } from "react";
import { Button, IconButton } from "@mui/material";
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";
import { DarkModeContext } from "../../context/DarkModeContext";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const handleOnFavoriteClick = () => navigate("./favorites");
  const handleOnHomeClick = () => navigate("./");
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
            onClick={toggleDarkMode}
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
