import React from "react";
import { Radius, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TopNavigation = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  return (
    <nav className="h-16 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left section */}

        <div className="flex items-center gap-2" onClick={() => navigate("/")}>
          <span className="text-xl font-bold text-blue-600">Acsendia</span>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Profile */}
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User size={20} className="text-blue-600" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;
