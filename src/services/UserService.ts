import axios from "axios";

const BASE_URL = "http://localhost:8081/api/v1/user";

export const registerUser = async (formData: any) => {
  try {
    const response = await axios.post(BASE_URL, formData, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
