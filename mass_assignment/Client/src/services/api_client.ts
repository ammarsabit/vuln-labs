const API_BASE_URL = "https://piedpiper-8ve5.onrender.com/api"
// const API_BASE_URL = "http://localhost:5000/api"

// Helper to get token from localStorage
export const getToken = (): string | null => {
  return localStorage.getItem("token")
}

// Helper to set token in localStorage
export const setToken = (token: string): void => {
  localStorage.setItem("token", token)
}

// Helper to remove token from localStorage
export const removeToken = (): void => {
  localStorage.removeItem("token")
}

// Types
export interface User {
  id: string
  name: string
  email: string
  isAdmin: boolean
}

export interface AuthResponse {
  message: string
  token: string
  user: User
}

export interface ProfileResponse {
  user: User
}

export interface FlagResponse {
  message: string
  flag: string
}

export interface UpdateEmailResponse {
  message: string
  token: string
  user: User
}

// API functions
export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Registration failed")
  }

  return response.json()
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Login failed")
  }

  return response.json()
}

export async function getProfile(): Promise<ProfileResponse> {
  const token = getToken()

  if (!token) {
    throw new Error("No token found")
  }

  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to fetch profile")
  }

  return response.json()
}

export async function updateEmail(newEmail: string): Promise<UpdateEmailResponse> {
  const token = getToken()

  if (!token) {
    throw new Error("No token found")
  }

  const response = await fetch(`${API_BASE_URL}/users/update_email`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email: newEmail }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to update email")
  }

  return response.json()
}

export async function getAdminFlag(): Promise<FlagResponse> {
  const token = getToken()

  if (!token) {
    throw new Error("No token found")
  }

  const response = await fetch(`${API_BASE_URL}/admin/flag`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to fetch flag")
  }

  return response.json()
}
