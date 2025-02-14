import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./user/pages/Landing";
import Login from "./user/pages/Login";
import Registration from "./user/pages/Registration";
import SideNavigation from "./components/SideNavigation";
import TopNavigation from "./components/TopNavigation";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Top Navigation */}
        <TopNavigation />

        {/* Main Layout */}
        <div className="flex pt-16">
          {" "}
          {/* pt-16 accounts for the fixed top nav height */}
          {/* Side Navigation */}
          <div className="fixed left-0 top-16 h-[calc(100vh-4rem)]">
            <SideNavigation />
          </div>
          {/* Main Content */}
          <div className="flex-1 ml-64">
            {" "}
            {/* ml-64 matches the width of side nav */}
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
