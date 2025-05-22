import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Log from "./pages/Log";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log" element={<Log />} />
      </Routes>
    </Router>
  );
}

export default App;
