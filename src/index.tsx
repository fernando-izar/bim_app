import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initializeApp } from "firebase/app";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD09e965HWRM5TfdoaIm1qXEuMTnPZSzWw",
  authDomain: "bim-app-fc.firebaseapp.com",
  projectId: "bim-app-fc",
  storageBucket: "bim-app-fc.appspot.com",
  messagingSenderId: "49023160366",
  appId: "1:49023160366:web:52290d6c918dbd8df10fbf",
};

initializeApp(firebaseConfig);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
