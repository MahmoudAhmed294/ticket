import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "store/store";
import App from "./App";
import ThemeProvider from "theme/theme";
import "i18n/i18n";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
          <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
