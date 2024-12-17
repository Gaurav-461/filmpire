import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";

import Layout from "./Layout.jsx";
import { store } from "./app/store.js";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const App = () => {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
