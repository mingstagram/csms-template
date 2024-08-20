import React, { Suspense } from "react";
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import "./assets/scss/style.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, HashRouter } from "react-router-dom";
import Loader from "./layouts/loader/Loader";
import "./styles/fonts.css"; // CSS 파일을 import

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
