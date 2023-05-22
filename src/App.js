import "./App.css";
import React from "react";
import LogIn from "./pages/LogIn/LogIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/Main" element={<Main />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
