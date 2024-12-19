import { Provider } from "react-redux";

import Layout from "./Layout.jsx";
import { store } from "./app/store.js";
import ToggleColorModeProvider from './context/ToggleColorModeProvider'

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const App = () => {

  return (
    <Provider store={store}>
      <ToggleColorModeProvider>
        <Layout />
      </ToggleColorModeProvider>
    </Provider>
  );
};

export default App;
