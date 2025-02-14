import { useState, useEffect } from "react";
import { getAllCourses, searchCourses } from "../../services/CourseService";
import { getDepartmentById } from "../../services/DepartmentService";
import { Course } from "../../types/course";
import CourseCard from "../../components/course/CourseCard";
import CreateCourseButton from "../../components/course/CreateCourseForm";

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [departments, setDepartments] = useState<Record<number, string>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const fetchDepartments = async (coursesData: Course[]) => {
    const departmentMap: Record<number, string> = {};
    const departmentPromises = coursesData.map(async (course: Course) => {
      if (course.departmentId && !departmentMap[course.departmentId]) {
        const department = await getDepartmentById(course.departmentId);
        departmentMap[course.departmentId] = department.departmentName;
      }
    });

    await Promise.all(departmentPromises);
    setDepartments(departmentMap);
  };

  useEffect(() => {
    const fetchInitialCourses = async () => {
      try {
        const coursesData = await getAllCourses();
        setCourses(coursesData);
        await fetchDepartments(coursesData);
      } catch (error) {
        console.error("Failed to fetch initial courses:", error);
      }
    };

    fetchInitialCourses();
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.trim() === "") {
        const coursesData = await getAllCourses();
        setCourses(coursesData);
        return;
      }

      try {
        const searchResults = await searchCourses(searchQuery);
        setCourses(searchResults);
        await fetchDepartments(searchResults);
      } catch (error) {
        console.error("Failed to search courses:", error);
      }
    };

    const timeoutId = setTimeout(handleSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header section with search and create button */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex-shrink-0">
            <CreateCourseButton />
          </div>
        </div>

        {/* Courses grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.courseId}
              courseId={course.courseId}
              courseName={course.courseName}
              description={course.description}
              departmentName={departments[course.departmentId] || "Unknown"}
              credits={course.credits}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
