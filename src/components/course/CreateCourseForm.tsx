import React, { useState, useEffect } from "react";
import { createCourseProps } from "../../types/course";
import { createCourse } from "../../services/CourseService";
import Swal from "sweetalert2";
import { getAllDepartments } from "../../services/DepartmentService";
import { Department } from "../../types/department";

const CreateCourseForm = () => {
  const [formData, setFormData] = useState({
    courseName: "",
    description: "",
    departmentId: "",
    credits: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getAllDepartments();
        setDepartments(data);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 200);
  };

  useEffect(() => {
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
      const courseData: createCourseProps = {
        courseName: formData.courseName,
        description: formData.description,
        departmentId: parseInt(formData.departmentId),
        credits: parseFloat(formData.credits),
      };

      await createCourse(courseData);
      Swal.fire({
        icon: "success",
        title: "Course Added",
        text: "Course created successfully",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
      setFormData({
        courseName: "",
        description: "",
        departmentId: "",
        credits: "",
      });
      closeModal();
    } catch (error: any) {
      console.error("Failed to create course", error);
      let errorMessage = "Unknown error occurred";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to create course",
        footer: errorMessage,
      });
    } finally {
      setIsLoading(false);
      () => {
        window.location.reload();
      };
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        Create Course
      </button>

      {isOpen && (
        <div
          className={`fixed inset-0 z-40 flex items-center justify-center mt-23 p-4 transition-opacity duration-200 ease-in-out
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
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Create New Course
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
              Add a new course to Ascendia
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Form fields remain the same */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="courseName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Course Name
                  </label>
                  <input
                    type="text"
                    id="courseName"
                    name="courseName"
                    value={formData.courseName}
                    onChange={handleChange}
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 
                           placeholder-gray-500 text-gray-900 rounded-md focus:outline-none 
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Enter course name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 
                           placeholder-gray-500 text-gray-900 rounded-md focus:outline-none 
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Enter course description"
                    rows={4}
                  />
                </div>

                <div>
                  <label
                    htmlFor="departmentId"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Department
                  </label>
                  <select
                    id="departmentId"
                    name="departmentId"
                    value={formData.departmentId}
                    onChange={handleChange}
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 
                           text-gray-900 rounded-md focus:outline-none 
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  >
                    <option value="">Select a department</option>
                    {departments.map((dept) => (
                      <option key={dept.departmentId} value={dept.departmentId}>
                        {dept.departmentName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="credits"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Credits
                  </label>
                  <input
                    type="number"
                    id="credits"
                    name="credits"
                    step="0.1"
                    value={formData.credits}
                    onChange={handleChange}
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 
                           placeholder-gray-500 text-gray-900 rounded-md focus:outline-none 
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Enter course credits"
                  />
                </div>
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
                    "Create Course"
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

export default CreateCourseForm;
