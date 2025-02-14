import axios from "axios";
import { CreateStudentProps } from "../types/student";

const BASE_URL = "http://localhost:8081/api/v1/student";

export const createStudent = async (formData: CreateStudentProps) => {
  try {
    const response = await axios.post(BASE_URL, formData, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};

export const getStudents = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export const getStudentById = async (studentId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/${studentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching student:", error);
    throw error;
  }
};

export const updateStudent = async (
  studentId: number,
  formData: CreateStudentProps
) => {
  try {
    const response = await axios.put(`${BASE_URL}/${studentId}`, formData, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

export const deleteStudent = async (studentId: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${studentId}`);
    return response;
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
};
