import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SubmitPage from "./SubmitPage";
import DynamicForm from "./DynamicForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DynamicForm />} />
        <Route path="/submit" element={<SubmitPage />} />
      </Routes>
    </Router>
  );
};

export default App;
