import axios from "axios";
import { LecturerName, Lecturer, CreateLecturerProps } from "../types/lecturer";

const BASE_URL = "http://localhost:8081/api/v1/lecturer";

export const createLecturer = async (formData: CreateLecturerProps) => {
  try {
    const response = await axios.post(BASE_URL, formData, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.error("Error creating lecturer:", error);
    throw error;
  }
};

export const getLecturerById = async (
  lecturerId: number
): Promise<Lecturer> => {
  try {
    const response = await axios.get(`${BASE_URL}/${lecturerId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching lecturer:", error);
    throw error;
  }
};
