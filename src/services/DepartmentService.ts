import axios from "axios";
import { newDepartment, Department } from "../types/department";

const BASE_URL = "http://localhost:8081/api/v1/department";

export const createDepartment = async (formData: newDepartment) => {
  try {
    const response = await axios.post(BASE_URL, formData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating department:", error);
    throw error;
  }
};

export const getAllDepartments = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};
