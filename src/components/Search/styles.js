import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  searchContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      marginTop: "-10px",
      marginBottom: "10px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "auto",
      padding: "8px 30px",
      borderRadius: "50px",
      backgroundColor: theme.palette.mode === 'dark' ? "rgba(106, 106, 106, 0.25)": "rgba(74, 144, 226, 0.85)",
    },
    display: 'flex',
  },
  searchField: {
    color: theme.palette.mode === 'light' && 'black',
    transition: "all 0.2s",
    "&:focus": {
      width: "300px",
    },
  },
}));
