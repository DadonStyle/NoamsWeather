import { Box, Button } from '@mui/material';
import './WeatherDisplay.css';

const WeatherDisplay = () => {
  return (
    <Box className='display-wrapper'>
      <div className='display-header-wrapper'>
        <div className='header-city-info'>
          <img src='' alt='logo' />
          <div className='header-text'>
            <span>Tel Aviv</span>
            <span>38 degree</span>
          </div>
        </div>
        <Button>Add to Favorites</Button>
      </div>
      <body></body>
    </Box>
  );
};

export default WeatherDisplay;
