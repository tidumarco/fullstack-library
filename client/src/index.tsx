import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "components/App";
import { store } from "redux/store";
import "index.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

//
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="698274009785-fkp3uormmbnp491tk5rf7ro9g6dtkeiu.apps.googleusercontent.com">
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
