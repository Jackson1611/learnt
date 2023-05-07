import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Skills from "./components/Skill/Skills";
import LearningSkill from "./components/Skill/LearningSkill";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/skills/learning" element={<LearningSkill />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
