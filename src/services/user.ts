import axiosInstance from "./axios";
import type { User } from "../types/Types";

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: "admin" | "agent" | "customer";
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  role?: "admin" | "agent" | "customer";
}

export interface UsersResponse {
  users: User[];
}

export const getUsers = async (): Promise<User[]> => {
  const res = await axiosInstance.get<UsersResponse>("/auth/users");
  return res.data.users;
};

export const getUserById = async (id: string): Promise<User> => {
  const res = await axiosInstance.get<User>(`/auth/user${id}`);
  return res.data;
};

export const registerUser = async (payload: CreateUserPayload): Promise<User> => {
  const res = await axiosInstance.post<User>("/auth/register", payload);
  return res.data;
};

export const updateUser = async (id: string, payload: UpdateUserPayload): Promise<User> => {
  const res = await axiosInstance.put<User>(`/auth/user${id}`, payload);
  return res.data;
};

export const activateUser = async (id: string): Promise<User> => {
  const res = await axiosInstance.patch<User>(`/auth/user${id}/activate`);
  return res.data;
};

export const deactivateUser = async (id: string): Promise<User> => {
  const res = await axiosInstance.patch<User>(`/auth/user${id}/deactivate`);
  return res.data;
};