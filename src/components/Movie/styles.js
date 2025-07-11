import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  movie: {
    padding: '10px',
  },
  title: {
    color: theme.palette.text.primary,
    textOverflow: 'ellipsis',
    width: '230px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    marginTop: '10px',
    marginBottom: '0',
    textAlign: 'center'
  },
  links: {
    alignItems: 'center',
    fontWeight: 'bolder',
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      flexDirection: 'column'
    },
  },
  image: {
    borderRadius: '10px',
    height: '300px',
    marginBottom: '10px',
    transition: 'ease .2s',
    '&:hover': {
      transform: 'scale(1.05)'
    }
  }
}));
