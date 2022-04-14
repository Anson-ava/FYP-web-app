import React from "react";
import "./App.css";
import TopBar from "./TorBar";
import Home from "./pages/Home";
import Camera from "./pages/camera";
import Service from "./pages/service";
import Photo from "./pages/photo";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/service" element={<Service />} />
        <Route path="/photo" element={<Photo />} />
      </Routes>
    </Router>
  );
}

export default App;
