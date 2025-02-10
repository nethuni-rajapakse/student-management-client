import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./user/pages/Landing";
import Login from "./user/pages/Login";
import Registration from "./user/pages/Registration";
import ExploreCourses from "./course/pages/ExploreCourses";
import MyCourses from "./course/pages/MyCourses";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        {/*Student*/}
        <Route path="/all-courses" element={<ExploreCourses />} />
        <Route path="/my-courses" element={<MyCourses />} />
      </Routes>
    </Router>
  );
}

export default App;
