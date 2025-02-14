import React from "react";
import { Users, Building2, BookOpen, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SideNavigation = () => {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = React.useState("");

  const menuItems = {
    users: ["Lecturers", "Students"],
    departments: ["Lecturers", "Courses"],
  };

  const toggleSection = (section: React.SetStateAction<string>) => {
    setExpandedSection(expandedSection === section ? "" : section);
  };

  return (
    <nav className="w-64 h-screen bg-white border-r border-gray-200">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Academic Portal
        </h2>

        {/* Students Section */}
        <div className="mb-2">
          <button
            onClick={() => toggleSection("students")}
            className="w-full flex items-center justify-between p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              <Users size={20} />
              <span>Users</span>
            </div>
            <ChevronDown
              size={16}
              className={`transform transition-transform ${
                expandedSection === "students" ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedSection === "students" && (
            <div className="ml-8 mt-1 space-y-1">
              {menuItems.users.map((item) => (
                <button
                  key={item}
                  className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Departments Section */}
        <div className="mb-2">
          <button
            onClick={() => {
              toggleSection("departments");
              navigate("/all-departments");
            }}
            className="w-full flex items-center justify-between p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              <Building2 size={20} />

              <span>Departments</span>
            </div>
            <ChevronDown
              size={16}
              className={`transform transition-transform ${
                expandedSection === "departments" ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedSection === "departments" && (
            <div className="ml-8 mt-1 space-y-1">
              {menuItems.departments.map((item) => (
                <button
                  key={item}
                  className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Courses Section */}
        <div className="mb-2">
          <button
            onClick={() => navigate("/all-courses")}
            className="w-full flex items-center justify-between p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              <BookOpen size={20} />
              <span>Courses</span>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default SideNavigation;
