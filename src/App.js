import logo from "./logo.svg";
import "./App.css";
import Login from "./naverlogin";
import MainPage from "./main";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage></MainPage>}></Route>;
    </Routes>
  );
}

export default App;
