import { useEffect, useState } from "react";
import { getAllDepartments } from "../../services/DepartmentService";
import { Department } from "../../types/department";
import DepartmentCard from "../../components/department/DepartmentCard";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Departments = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const data = await getAllDepartments();
      setDepartments(data);
    };

    fetchDepartments();
  }, []);

  const handleAddDepartment = () => {
    navigate("/create-department");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col items-start">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Departments</h2>
          <div className="h-1 w-24 bg-blue-600 rounded-full"></div>
        </div>
        <button
          onClick={handleAddDepartment}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          Add Department
        </button>
      </div>
      <ul>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((department) => (
            <DepartmentCard
              key={department.departmentId}
              departmentId={department.departmentId}
              departmentName={department.departmentName}
              headOfDepartment={"Not Assigned"}
            />
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Departments;
