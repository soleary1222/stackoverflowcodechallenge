import React from "react";
import "./App.css";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DetailView from "./components/detail";
import Home from "./components/home";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:questionId" element={<DetailView />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
