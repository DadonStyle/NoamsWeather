import Header from './modules/header/Header';
import './App.css';
import { useContext } from 'react';
import { DarkModeContext } from './context/context';

const App = () => {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`main-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
    >
      <Header />
    </div>
  );
};

export default App;
