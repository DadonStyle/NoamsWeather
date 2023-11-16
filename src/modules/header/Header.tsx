import { useContext } from 'react';
import { IconButton } from '@mui/material';
import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material';
import { DarkModeContext } from '../../context/context';

const Header = () => {
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);

  return (
    <div>
      Header
      <div>
        <IconButton
          onClick={toggleDarkMode}
          sx={{ ml: 1, outline: 'none !important' }}
          color='inherit'
        >
          {isDarkMode ? <DarkModeOutlined /> : <LightModeOutlined />}
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
