import React from "react";
import "./App.css";
import TopBar from "./component/TopBar";
import Home from "./pages/home";
import Camera from "./pages/camera";
import Service from "./pages/service";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/service" element={<Service />} />
      </Routes>
    </Router>
  );
}

export default App;
