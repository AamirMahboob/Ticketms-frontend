import axiosInstance from "./axios";
import type {
  LoginPayload,
  LoginResponse,
} from "../types/auth";

export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    "/auth/login",
    payload
  );

  return response.data;
};