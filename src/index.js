import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import liff from "@line/liff";
// import { LiffProvider } from 'react-liff';

// const liffId = process.env.REACT_APP_LINE_LIFF_ID;
// const stubEnabled = process.env.NODE_ENV !== 'production';
liff.init({ liffId: process.env.REACT_APP_LINE_LIFF_ID });

ReactDOM.render(
  <React.StrictMode>
    {/* <LiffProvider liffId={liffId} stubEnabled={stubEnabled}> */}
    <App />
    {/* </LiffProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
