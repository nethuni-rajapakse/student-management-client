import React, { useState } from "react";
import { createDepartment } from "../../services/DepartmentService";
import Swal from "sweetalert2";

const CreateDepartmentForm = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 200);
  };

  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const payload = { departmentName };
      await createDepartment(payload);
      Swal.fire({
        icon: "success",
        title: "Department Created",
        text: "Department has been created successfully",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2000,
      });
      setDepartmentName("");
      closeModal();
    } catch (error: any) {
      console.error("Failed to create department", error);
      let errorMessage = "Unknown error occurred";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to create department",
        footer: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Create Department
      </button>

      {isOpen && (
        <div
          className={`fixed inset-0 z-40 flex items-center justify-center p-4 transition-opacity duration-200 ease-in-out
            ${isClosing ? "opacity-0" : "opacity-100"}`}
        >
          <div
            className="fixed inset-0 bg-gray-500/75 backdrop-blur-sm"
            onClick={handleOverlayClick}
          />
          <div
            className={`relative max-w-md w-full bg-white rounded-xl shadow-2xl p-8 transition-all duration-200 ease-in-out
              ${
                isClosing
                  ? "opacity-0 scale-95 translate-y-4"
                  : "opacity-100 scale-100 translate-y-0"
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Create New Department
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-500 focus:outline-none transition-colors duration-200"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Add a new department to your organization
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="departmentName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Department Name
                </label>
                <input
                  type="text"
                  id="departmentName"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 
                           placeholder-gray-500 text-gray-900 rounded-md focus:outline-none 
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter department name"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 
                         rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 
                         focus:ring-gray-500 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent 
                         text-sm font-medium rounded-md text-white transition-colors duration-200
                         ${
                           isLoading
                             ? "bg-blue-400 cursor-not-allowed"
                             : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                         }`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating...
                    </span>
                  ) : (
                    "Create Department"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateDepartmentForm;
