import { Box, CircularProgress } from "@mui/material";

const styles = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
};

const Loader = () => {
  return (
    <Box sx={styles}>
      <CircularProgress />
    </Box>
  );
};

export default Loader;
