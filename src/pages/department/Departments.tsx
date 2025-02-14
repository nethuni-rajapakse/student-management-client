import { useEffect, useState } from "react";
import { getAllDepartments } from "../../services/DepartmentService";
import { getLecturerById } from "../../services/LecturerService";
import { Department } from "../../types/department";
import DepartmentCard from "../../components/department/DepartmentCard";
import AddDepartmentButton from "../../components/department/CreateDepartmentForm";

const Departments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [headNames, setHeadNames] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchDepartments = async () => {
      const data = await getAllDepartments();
      setDepartments(data);

      const headFetchPromises = data.map(async (department: Department) => {
        if (department.headOfDepartmentId) {
          const lecturer = await getLecturerById(department.headOfDepartmentId);
          return {
            [department.departmentId]:
              lecturer.firstName + " " + lecturer.lastName,
          };
        }
        return { [department.departmentId]: "Not Assigned" };
      });

      const headResults = await Promise.all(headFetchPromises);

      // Merge results into a single object
      const heads = headResults.reduce(
        (acc, head) => ({ ...acc, ...head }),
        {}
      );
      setHeadNames(heads);
    };

    fetchDepartments();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col items-start">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Departments</h2>
          <div className="h-1 w-24 bg-blue-600 rounded-full"></div>
        </div>
        <AddDepartmentButton />
      </div>
      <ul>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((department) => (
            <DepartmentCard
              key={department.departmentId}
              departmentId={department.departmentId}
              departmentName={department.departmentName}
              headOfDepartment={
                headNames[department.departmentId] || "Not Assigned"
              }
            />
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Departments;
