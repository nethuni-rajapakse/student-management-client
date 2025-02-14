import React from "react";
import { UserCircle } from "lucide-react";
import { DepartmentCardProps, Department } from "../../types/department";

const DepartmentCard: React.FC<DepartmentCardProps> = ({
  departmentId,
  departmentName,
  headOfDepartment,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-gray-500">
            ID: {departmentId}
          </span>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Department
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {departmentName}
        </h3>

        <div className="flex items-center space-x-3 text-gray-700">
          <UserCircle className="w-5 h-5 text-gray-400" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">Head of Department</span>
            <span className="text-sm text-gray-500">{headOfDepartment}</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200">
          View Details →
        </button>
      </div>
    </div>
  );
};

export default DepartmentCard;
