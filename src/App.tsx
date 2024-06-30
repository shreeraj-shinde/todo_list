import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Todos from "./Pages/Todos";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todos />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
