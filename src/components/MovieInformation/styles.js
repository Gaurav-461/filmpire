import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  containerSpaceAround: {
    display: "flex",
    maxWidth: "1200px",
    justifyContent: "space-evenly",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      flexWrap: "wrap",
    },
  },
  poster: {
    borderRadius: "20px",
    width: "70%",
    // height: 'auto',
    objectFit: 'cover',
    marginBottom: '1rem',
    boxShadow:
      theme.palette.mode === "light" && "0.5em 1em 1em rgb(64, 64, 64)",
    border: theme.palette.mode === "dark" && ".1em solid white",
    [theme.breakpoints.down("md")]: {
      margin: "0 auto !important",
      width: "350px",
    },
    [theme.breakpoints.down("sm")]: {
      margin: '0 auto 1rem !important',
      width: "100%",
      height: "350px",
      marginBottom: "30px",
    },
  },
  genresContainer: {
    margin: '10px 0 !important',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    [theme.breakpoints.down("sm")]: {
      // paddingRight: 
    },
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down("sm")]: {
      padding: '0.5rem 1rem'
    },
  },
  backdropImageBlur: {
    backdropFilter: 'blur(40px)',
    background:  ' "" "" center no-repeat contain center',
    backgroundColor: 'white'
  },
  genresImage: {
    filter: theme.palette.mode === 'dark' && 'invert(1)',
    marginRight: '10px',
    
  },
  castImage: {
    borderRadius: '10px',
    width: '100%',
    maxWidth: '7em',
    height: '8em',
    objectFit: 'cover',
  },
  showCastButton:{
    height: '40px',
    marginTop: '10px !important'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection:'column'
    }
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '10'
  },
  video: {
    width: '50%',
    height: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      height: '50%',
    }
  }
}));
