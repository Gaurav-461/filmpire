/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import { Footer, NavBar } from "./components/index.js";
import useStyles from "./styles";

const Layout = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <NavBar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
