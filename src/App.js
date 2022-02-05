import React from "react";
import "./App.css";
import TopBar from "./TorBar";
import Home from "./pages/Home";
import Camera from "./pages/Camera";
import Service from "./pages/Service";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/Service" element={<Service />} />
      </Routes>
    </Router>
  );
}

export default App;
