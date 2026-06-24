import axiosInstance from "./axios";
import type {
  CreateTicketPayload,
  CreateTicketResponse,
} from "../types/Types";

export const createTicket = async (
  payload: CreateTicketPayload
): Promise<CreateTicketResponse> => {
  const response =
    await axiosInstance.post<CreateTicketResponse>(
      "/tickets",
      payload
    );

  return response.data;
};