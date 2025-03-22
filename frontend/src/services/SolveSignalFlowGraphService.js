import axios from "axios";

const API_URL = "http://localhost:5050/analyze";

const solveSignalFlowGraph = async (graph) => {
  try {
    const response = await axios.post(API_URL, { graph });
    return response.data;
  } catch (error) {
    console.error("Error solving signal flow graph:", error);
    throw error;
  }
};

export default solveSignalFlowGraph;
