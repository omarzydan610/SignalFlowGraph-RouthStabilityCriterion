import axios from "axios";

const API_URL = "http://localhost:5000/solve-signal-flow-graph"; // Replace with your backend URL

const solveSignalFlowGraph = async (nodes, matrix) => {
  try {
    const response = await axios.post(API_URL, { nodes, matrix });
    return response.data;
  } catch (error) {
    console.error("Error solving signal flow graph:", error);
    throw error;
  }
};

export default solveSignalFlowGraph;
