export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "agent" | "customer";
}

export interface LoginResponse {
  token: string;
  user: User;
}