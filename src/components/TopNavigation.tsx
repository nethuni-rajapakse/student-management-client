import React from "react";
import { Radius, User } from "lucide-react";

const TopNavigation = () => {
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  return (
    <nav className="h-16 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg lg:hidden">
            <Radius size={20} />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-blue-600">Acsendia</span>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Profile */}
          <div className="relative">
            <button
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User size={20} className="text-blue-600" />
              </div>
              <span className="hidden md:inline text-sm font-medium"> </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;
