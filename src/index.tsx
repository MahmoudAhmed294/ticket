import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "store/store";
import App from "./App";
import ThemeProvider from "theme/theme";
import "i18n/i18n";
import { SnackbarProvider } from "notistack";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <SnackbarProvider maxSnack={1}>
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
