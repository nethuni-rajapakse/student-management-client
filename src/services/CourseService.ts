import axios from "axios";
import { createCourseProps } from "../types/course";

const BASE_URL = "http://localhost:8081/api/v1/course";

export const createCourse = async (formData: createCourseProps) => {
  try {
    const response = await axios.post(BASE_URL, formData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

export const getAllCourses = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const getCourseById = async (CourseId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/${CourseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course by id:", error);
    throw error;
  }
};

export const updateCourse = async (
  CourseId: number,
  formData: createCourseProps
) => {
  try {
    const response = await axios.put(`${BASE_URL}/${CourseId}`, formData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

export const deleteCourse = async (CourseId: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${CourseId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};

export const getCourseByDepartment = async (departmentId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/department/${departmentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course by department:", error);
    throw error;
  }
};

export const searchCourses = async (searchTerm: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/search?query=${searchTerm}`);
    return response.data;
  } catch (error) {
    console.error("Error searching courses:", error);
    throw error;
  }
};
