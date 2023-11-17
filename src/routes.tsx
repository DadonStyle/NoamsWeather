import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./modules/Home/Home";
import Favorites from "./modules/Favorites/Favorites";

const AppRouters = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/favorites" element={<Favorites />} />
    <Route path="*" element={<Navigate to="/" replace={true} />} />
  </Routes>
);

export default AppRouters;
