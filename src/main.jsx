import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "../node_modules/bootstrap/dist/css/bootstrap.rtl.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { QuickViewProvider } from "./context/QuickViewContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <QuickViewProvider>
          <App />
        </QuickViewProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
