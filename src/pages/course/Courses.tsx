import { useState, useEffect } from "react";
import { getAllCourses } from "../../services/CourseService";
import { getDepartmentById } from "../../services/DepartmentService";
import { CourseCardProps } from "../../types/course";
import CourseCard from "../../components/course/CourseCard";
import CreateCourseButton from "../../components/course/CreateCourseForm";

const Courses = () => {
  const [courses, setCourses] = useState<CourseCardProps[]>([]);
  const [departments, setDepartments] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchCoursesAndDepartments = async () => {
      try {
        // Fetch all courses
        const coursesData = await getAllCourses();
        setCourses(coursesData);

        // Fetch department names for each course
        const departmentMap: Record<number, string> = {};
        const departmentPromises = coursesData.map(async (course) => {
          if (course.departmentId && !departmentMap[course.departmentId]) {
            const department = await getDepartmentById(course.departmentId);
            departmentMap[course.departmentId] = department.departmentName;
          }
        });

        // Wait for all department fetches to complete
        await Promise.all(departmentPromises);
        setDepartments(departmentMap);
      } catch (error) {
        console.error("Failed to fetch courses or departments:", error);
      }
    };

    fetchCoursesAndDepartments();
  }, []);

  return (
    <div>
      <ul>
        <CreateCourseButton />
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
      </ul>
    </div>
  );
};

export default Courses;
