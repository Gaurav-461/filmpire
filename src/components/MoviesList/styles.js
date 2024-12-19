import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  moviesContainer: {
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
}));
