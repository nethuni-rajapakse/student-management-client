import axios from "axios";

export const enrollInCourses = async (
  studentId: number,
  courseIds: number[]
) => {
  try {
    const response = await axios.post(
      `http://localhost:8081/students/${studentId}/courses`,
      courseIds
    );
    console.log("Enrollment successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error enrolling in courses:", error);
    throw error;
  }
};

export const getCoursesByStudentId = async (studentId: number) => {
  try {
    const response = await axios.get(
      `http://localhost:8081/students/${studentId}/courses`
    );
    console.log("Courses retrieved successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error retrieving courses:", error);
    throw error;
  }
};

export const deleteCourseForStudent = async (
  studentId: number,
  courseId: number
) => {
  try {
    const response = await axios.delete(
      `http://localhost:8081/students/${studentId}/courses/${courseId}`
    );
    console.log("Course deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};
