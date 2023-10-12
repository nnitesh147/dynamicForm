import { useState } from "react";
import "./App.css";
import Application from "./Application";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SubmitPage from "./SubmitPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Application />} />
        <Route path="/submit" element={<SubmitPage />} />
      </Routes>
    </Router>
  );
};

export default App;
