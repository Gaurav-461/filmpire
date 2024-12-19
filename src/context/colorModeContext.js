import { createContext } from "react";

const colorModeContext = createContext();

export const ColorModeProvider = colorModeContext.Provider;

export default colorModeContext;
