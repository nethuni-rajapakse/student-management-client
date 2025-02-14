import React, { useState, useEffect } from "react";
import { createCourseProps } from "../../types/course";
import { updateCourse, getCourseById } from "../../services/CourseService";
import Swal from "sweetalert2";
import { getAllDepartments } from "../../services/DepartmentService";
import { Department } from "../../types/department";

interface UpdateCourseFormProps {
  courseId: number;
  onClose: () => void; // Function to close the modal
}

const UpdateCourseForm: React.FC<UpdateCourseFormProps> = ({
  courseId,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    courseName: "",
    description: "",
    departmentId: "",
    credits: "",
  });
  const [isLoading, setIsLoading] = useState(false);
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

    const fetchCourseDetails = async () => {
      try {
        const course = await getCourseById(courseId);
        setFormData({
          courseName: course.courseName || "",
          description: course.description || "",
          departmentId: course.departmentId?.toString() || "",
          credits: course.credits?.toString() || "",
        });
      } catch (error) {
        console.error("Failed to fetch course details:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load course details.",
        });
        onClose();
      }
    };

    fetchDepartments();
    fetchCourseDetails();
  }, [courseId, onClose]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const updatedCourse: createCourseProps = {
        courseName: formData.courseName,
        description: formData.description,
        departmentId: parseInt(formData.departmentId),
        credits: parseFloat(formData.credits),
      };

      await updateCourse(courseId, updatedCourse);
      Swal.fire({
        icon: "success",
        title: "Course Updated",
        text: "Course updated successfully",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
      onClose();
    } catch (error: any) {
      console.error("Failed to update course", error);
      let errorMessage = "Unknown error occurred";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update course",
        footer: errorMessage,
      });
    } finally {
      setIsLoading(false);
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

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-gray-500/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative max-w-md w-full bg-white rounded-xl shadow-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Update Course
          </h2>
          <button
            onClick={onClose}
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
        <p className="text-sm text-gray-600 mb-6">Update the course details</p>

        <form className="space-y-6" onSubmit={handleSubmit}>
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
              onClick={onClose}
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
                  Updating...
                </span>
              ) : (
                "Update Course"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourseForm;
