import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./pages/Menu";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
