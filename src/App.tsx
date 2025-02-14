import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./user/pages/Landing";
import Login from "./user/pages/Login";
import Registration from "./user/pages/Registration";
import Departments from "./pages/department/Departments";

import Courses from "./pages/course/Courses";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        <Route path="/all-departments" element={<Departments />} />
        <Route path="/all-courses" element={<Courses />} />
      </Routes>
    </Router>
  );
}

export default App;
