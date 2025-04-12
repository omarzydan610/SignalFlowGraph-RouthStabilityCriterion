import axios from "axios";

const API_URL = "http://localhost:5050/routh-stability";

const solveRouthHurwitz = async (characteristicEquation) => {
  try {
    const response = await axios.post(API_URL, { characteristicEquation });
    console.log("Response:", response);
    return response.data;
  } catch (error) {
    console.error("Error solving routh", error);
    throw error;
  }
};

export default solveRouthHurwitz;
