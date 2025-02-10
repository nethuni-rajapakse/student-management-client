import axios from "axios";

const BASE_URL = "http://localhost:8081/api/v1/course";

export const getCourses = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};
