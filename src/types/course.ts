export interface Course {
  courseId: number;
  courseName: string;
  description: string;
  departmentId: number;
  credits: number;
}

export interface createCourseProps {
  courseName: string;
  description: string;
  departmentId: number;
  credits: number;
}

export interface CourseCardProps {
  courseId: number;
  courseName: string;
  description: string;
  departmentName: string;
  credits: number;
}
