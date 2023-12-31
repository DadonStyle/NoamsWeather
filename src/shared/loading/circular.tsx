import { CircularProgress } from "@mui/material";

const CircularLoading = () => {
  return (
    <CircularProgress
      sx={{
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        top: "40%",
        width: "120px !important",
        height: "120px !important",
      }}
    />
  );
};

export default CircularLoading;
