import { useEffect, useState } from "react";
import { getCourses } from "../../services/CourseService";
import CourseCard from "../components/CourseCard";
import { enrollInCourses } from "../../services/EnrollmentService";
import { Course } from "../../types/CourseType";
import { useNavigate } from "react-router-dom";

const ExploreCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleSelectCourse = (courseId: number, isSelected: boolean) => {
    setSelectedCourses((prevSelectedCourses) =>
      isSelected
        ? [...prevSelectedCourses, courseId]
        : prevSelectedCourses.filter((id) => id !== courseId)
    );
  };

  const handleEnroll = async () => {
    try {
      if (selectedCourses.length > 0) {
        const studentId = 25;
        await enrollInCourses(studentId, selectedCourses);
        navigate("/my-courses");
        setSelectedCourses([]);
      }
    } catch (error) {
      console.error("Enrollment failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Explore Courses</h1>
          <p className="mt-2 text-sm text-gray-600">
            Discover and enroll in courses that match your interests
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-pulse text-gray-500">
              Loading courses...
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard
                key={course.courseId}
                course={course}
                onSelect={handleSelectCourse}
              />
            ))}
          </div>
        )}

        {/* Floating Enrollment Button */}
        {selectedCourses.length > 0 && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-white rounded-full shadow-2xl p-2">
              <button
                onClick={handleEnroll}
                className="group relative flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <span className="font-medium">
                  Enroll in {selectedCourses.length} Course
                  {selectedCourses.length > 1 ? "s" : ""}
                </span>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Page Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-50 opacity-50"></div>
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </div>
  );
};

export default ExploreCourses;
