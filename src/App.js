// src/App.js
// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuizCreator from "./component/QuizCreator";
import QuizTaker from "./component/QuizTaker";
import NavbarComponent from "./component/NavbarComponent";

function App() {
  return (
    <Router>
      <NavbarComponent />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<QuizCreator />} />
          <Route path="/take-quiz" element={<QuizTaker />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
