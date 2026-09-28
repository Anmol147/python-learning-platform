const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getProblems = async () => {
  const response = await fetch(`${API_BASE_URL}/problems`);

  if (!response.ok) {
    throw new Error("Failed to fetch problems");
  }

  return response.json();
};

export const getProblemById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/problems/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch problem");
  }

  return response.json();
};

export const getProblemHints = async (id) => {
  const response = await fetch(`${API_BASE_URL}/problems/${id}/hints`);

  if (!response.ok) {
    throw new Error("Failed to fetch hints");
  }

  return response.json();
};
export const getApiHealth = async () => {
  const response = await fetch(`${API_BASE_URL}/health`);

  if (!response.ok) {
    throw new Error("API health check failed");
  }

  return response.json();
};