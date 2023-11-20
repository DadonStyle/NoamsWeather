import { useSelector } from "react-redux";
import FavoritesBox from "./components/FavoritesBox";
import { Box } from "@mui/material";
import { RootState } from "../../redux/store";
import "./Favorites.css";

const Favorites = () => {
  const favoritesArr = useSelector((state: RootState) => state.favorites);

  if (favoritesArr.length < 1)
    return <Box className="empty-wrapper">No favorites found</Box>;

  return (
    <div className="favorites-wrapper">
      {favoritesArr.map((item) => (
        <FavoritesBox
          key={item.key}
          cityKey={item.key}
          city={item.city}
          country={item.country}
        />
      ))}
    </div>
  );
};

export default Favorites;
