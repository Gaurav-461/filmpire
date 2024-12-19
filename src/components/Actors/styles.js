import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  containerSpaceAround: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    margin: "10px 0 !important",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      flexWrap: "wrap",
    },
  },
  profileImage: {
    borderRadius: "20px",
    width: "80%",
    boxShadow:
      theme.palette.mode === "light" && "0.5em 1em 1em rgb(64, 64, 64)",
    border: theme.palette.mode === "dark" && ".1em solid white",
    [theme.breakpoints.down("md")]: {
      margin: "0 auto !important",
      width: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto !important",
      width: "100%",
      height: "350px",
      marginBottom: "30px",
    },
  },
}));
