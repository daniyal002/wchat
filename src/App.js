import "./App.css";
import React from "react";
import LogIn from "./pages/LogIn/LogIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
function App() {
  const [idInstance, setIdInstance] = React.useState("");
  const [apiTokenInstance, setApiTokenInstance] = React.useState("");
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <LogIn
                idInstance={idInstance}
                setIdInstance={setIdInstance}
                apiTokenInstance={apiTokenInstance}
                setApiTokenInstance={setApiTokenInstance}
              />
            }
          />
          <Route path="/Main" element={<Main />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
