import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./user/pages/Landing";
import Login from "./user/pages/Login";
import Registration from "./user/pages/Registration";
import CreateDepartment from "./pages/department/CreateDepartment";
import Departments from "./pages/department/Departments";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        <Route path="/create-department" element={<CreateDepartment />} />
        <Route path="/all-departments" element={<Departments />} />
      </Routes>
    </Router>
  );
}

export default App;
