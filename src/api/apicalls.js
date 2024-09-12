const API_URL = "http://localhost:5000/api";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  console.log("Token retrieved from localStorage:", token); // Add this line to debug
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const register = async (userData) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error("Failed to register user");
  return response.json();
};

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to login");
  }

  const data = await response.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    console.log("Token successfully saved to localStorage:", data.token);
  } else {
    console.error("Token not received in login response");
  }

  return data;
};

export const fetchProjects = async () => {
  const response = await fetch(`${API_URL}/projects`, {
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch projects");
  return response.json();
};

export const createProject = async (projectData) => {
  const response = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(projectData),
  });
  if (!response.ok) throw new Error("Failed to create project");
  return response.json();
};

export const updateProject = async (id, projectData) => {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(projectData),
  });
  if (!response.ok) throw new Error("Failed to update project");
  return response.json();
};

export const deleteProject = async (id) => {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete project");
  return response.json();
};

export const fetchTasks = async () => {
  const response = await fetch(`${API_URL}/tasks`, { headers: getHeaders() });
  if (!response.ok) throw new Error("Failed to fetch tasks");
  return response.json();
};

export const createTask = async (taskData) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(taskData),
  });
  if (!response.ok) throw new Error("Failed to create task");
  return response.json();
};

export const updateTask = async (id, taskData) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(taskData),
  });
  if (!response.ok) throw new Error("Failed to update task");
  return response.json();
};

export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete task");
  return response.json();
};

export const fetchUserData = async () => {
  const response = await fetch(`${API_URL}/users/me`, {
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch user data");
  return response.json();
};
