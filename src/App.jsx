import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./views/Home";
import Form from "./views/Form";

import { KeepAlive, KeepAliveTransfer } from "./keep-alive";

const AliveHome = KeepAliveTransfer(Home, "home");
const AliveForm = KeepAliveTransfer(Form, "form");

function App() {
  return (
    <BrowserRouter>
      <KeepAlive>
        <div className="container">
          <ul className="nav">
            <li>
              <Link to={"/home"}>Home</Link>
            </li>
            <li>
              <Link to={"/form"}>Form</Link>
            </li>
          </ul>
          <div>
            <Routes>
              <Route path="/" element={<AliveHome />} />
              <Route path="/home" element={<AliveHome />} />
              <Route path="/form" element={<AliveForm />} />
            </Routes>
          </div>
        </div>
      </KeepAlive>
    </BrowserRouter>
  );
}

export default App;
