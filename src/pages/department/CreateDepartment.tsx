import DepartmentModal from "../../components/department/CreateDepartmentForm";

const CreateDepartment = () => {
  return (
    <div>
      <h2 className="text-4xl font-bold text-gray-900 mb-2 justify-center flex">
        Create Department
      </h2>
      <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
      <DepartmentModal />
    </div>
  );
};

export default CreateDepartment;
