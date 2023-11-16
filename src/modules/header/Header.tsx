import { useContext } from "react";
import { Button, IconButton } from "@mui/material";
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";
import { DarkModeContext } from "../../context/context";
import "./Header.css";

const Header = () => {
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);

  return (
    <div className="header-wrapper">
      <div className="header-logo">Noams Weather</div>
      <div className="buttons-wrapper">
        <div>
          <Button>Home</Button>
          <Button>Favorites</Button>
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
