import { useEffect, useState } from "react";
import {
  getCoursesByStudentId,
  deleteCourseForStudent,
} from "../../services/EnrollmentService";
import { Course } from "../../types/CourseType";

const MyCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const studentId = 25;
      const response = await getCoursesByStudentId(studentId);
      setCourses(response);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleUnenroll = async (courseId: number) => {
    try {
      const studentId = 25;
      await deleteCourseForStudent(studentId, courseId);
      // Refresh the courses list after successful unenrollment
      fetchCourses();
    } catch (error) {
      console.error("Error unenrolling from course:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="mt-2 text-sm text-gray-600">
            View all your enrolled courses and track your academic progress
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
              <MyCourseCard
                key={course.courseId}
                course={course}
                onUnenroll={handleUnenroll}
              />
            ))}
          </div>
        )}
      </div>

      {/* Page Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-gray-50 opacity-50"></div>
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </div>
  );
};

interface CourseCardProps {
  course: Course;
  onUnenroll: (courseId: number) => Promise<void>;
}

const MyCourseCard = ({ course, onUnenroll }: CourseCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isUnenrolling, setIsUnenrolling] = useState(false);

  const handleUnenrollClick = async () => {
    if (window.confirm("Are you sure you want to unenroll from this course?")) {
      setIsUnenrolling(true);
      try {
        await onUnenroll(course.courseId);
      } finally {
        setIsUnenrolling(false);
      }
    }
  };

  return (
    <div
      className={`max-w-sm mx-auto bg-white rounded-2xl p-6 transform transition-all duration-300 ease-in-out border-2 border-green-500 ${
        isHovered ? "scale-102 shadow-xl" : "shadow-lg"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 transition-colors duration-300 hover:text-green-600">
            {course.courseName}
          </h2>
          <span className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-full">
            Enrolled
          </span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed">
          {course.description}
        </p>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
            Credits: {course.credits}
          </span>
          <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
            ID: {course.courseId}
          </span>
          <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
            {course.department}
          </span>
        </div>

        <div className="pt-2 space-y-2">
          <button className="w-full py-2.5 px-4 rounded-lg font-medium bg-green-100 text-green-600 hover:bg-green-200 transition-all duration-300 transform active:scale-95">
            View Course Details
          </button>
          <button
            onClick={handleUnenrollClick}
            disabled={isUnenrolling}
            className="w-full py-2.5 px-4 rounded-lg font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUnenrolling ? "Unenrolling..." : "Unenroll from Course"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
