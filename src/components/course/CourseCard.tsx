import React, { useEffect, useState } from "react";
import { BookOpen, Clock, Building } from "lucide-react";
import { CourseCardProps } from "../../types/course";
import UpdateCourseButton from "../../components/course/UpdateCourseButton";
import DeleteCourseButton from "../../components/course/DeleteCourseButton";

const CourseCard: React.FC<CourseCardProps> = ({
  courseId,
  courseName,
  description,
  departmentName,
  credits,
}) => {
  const [courses, setCourses] = useState<CourseCardProps[]>([]);

  // Fetch courses (you might have an API call here)
  const fetchCourses = async () => {
    // Replace with your actual data fetching logic
    const response = await fetch("/api/courses");
    const data = await response.json();
    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []); // Empty dependency array means it runs once when the component mounts

  const handleCourseUpdate = (updatedCourse: CourseCardProps) => {
    // Logic for updating the course (you can call your API here)
    // After updating, refetch courses
    fetchCourses();
  };

  const handleCourseDelete = (courseId: number) => {
    // Logic for deleting the course (you can call your API here)
    // After deleting, refetch courses
    fetchCourses();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-md">
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-extrabold text-gray-900">
              {courseName}
            </h3>
            <div className="flex items-center p-x-4 space-x-2">
              <UpdateCourseButton courseId={courseId} />
              <DeleteCourseButton courseId={courseId} />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Building size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-gray-600">
              {departmentName}
            </span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock size={20} className="text-blue-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Credits</span>
              <span className="text-sm font-medium text-gray-900">
                {credits}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen size={20} className="text-blue-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Course ID</span>
              <span className="text-sm font-medium text-gray-900">
                #{courseId}
              </span>
            </div>
          </div>
        </div>

        <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
          View Course Details
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
