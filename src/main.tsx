import React from "react";

import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { DarkModeProvider } from "./context/DarkModeContext.tsx";
import "./index.css";
import { CurrentCityProvider } from "./context/CurrentCityContext.tsx";
import { FavoritesProvider } from "./context/FavoritesContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DarkModeProvider>
      <CurrentCityProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </CurrentCityProvider>
    </DarkModeProvider>
  </React.StrictMode>
);
