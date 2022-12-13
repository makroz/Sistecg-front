import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import AxiosInstanceProvider from "./contexts/AxiosInstanceProvider";
import axiosInterceptors from "./interceptors/axiosInterceptors";

function App() {
  return (
    <AxiosInstanceProvider interceptors={axiosInterceptors}>
      <Home />
    </AxiosInstanceProvider>
  );
}

export default App;
