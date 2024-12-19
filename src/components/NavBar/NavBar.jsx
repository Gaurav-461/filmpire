/* eslint-disable react-hooks/exhaustive-deps */

import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";
import { Search, Sidebar } from "..";
import { fetchToken, createSessionId, movieApi } from "../../utils/auth";
import { setUser, userSelector } from "../../features/authSlice";
import colorModeContext from "../../context/colorModeContext";

const NavBar = () => {
  const colorMode = useContext(colorModeContext)
  const [mobileOpen, setMobileOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width:600px)");
  const classes = useStyles();
  const theme = useTheme();

  const { isAuthenticated, user } = useSelector(userSelector);
  const dispatch = useDispatch();

  const token = localStorage.getItem("request_token");
  const sessionIdFromLocalStorage = localStorage.getItem("session_id");

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await movieApi.get(
            `/account?session_id=${sessionIdFromLocalStorage}`
          );

          if (!userData) {
            console.log("Failed to fetch user data:-", userData);
            return
          }

          dispatch(setUser(userData));
          
        } else {
          const session_id = await createSessionId();

          if (!session_id) {
            console.error("Failed to create session ID.");
            return
          }

          const { data: userData } = await movieApi.get(
            `/account?session_id=${session_id}`
          );

          if (!userData) {
            console.error("Failed to fetch user data");
            return
          }

          dispatch(setUser(userData));
        }
      }
    };

    logInUser();
  }, [token]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: "none" }}
              onClick={() => setMobileOpen((prev) => !prev)}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}

          <IconButton color="inherit" sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {!isMobile && <Search />}

          <div>
            {isAuthenticated ? (
              <Button
                color="inherit"
                className={classes.linkButton}
                onClick={() => {}}
                component={Link}
                to={`profile/${user.id}`}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  alt="profile"
                />
              </Button>
            ) : (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            )}
          </div>

          {isMobile && <Search />}
        </Toolbar>
      </AppBar>

      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              open={mobileOpen}
              onClose={() => setMobileOpen((prev) => !prev)}
              variant="temporary"
              anchor="right"
              className={classes.drawerBackground}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
