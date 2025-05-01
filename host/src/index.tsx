import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import App from "./App";
import { store } from "./store";
import ErrorBoundary from "./components/ErrorBoundary";
import GlobalStyle from "./styles/GlobalStyle";
import { lightTheme, darkTheme } from "./styles/theme";
import { RootState } from "./store";
import "./i18n";

const ThemedApp: React.FC = () => {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const theme = themeMode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ThemeProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
