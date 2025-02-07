import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./user/pages/Landing";
import Login from "./user/pages/Login";
import Registration from "./user/pages/Registration";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </Router>
  );
}

export default App;
