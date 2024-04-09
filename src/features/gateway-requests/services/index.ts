import { AuthenticatedHttp } from "@/features/common/http/axios";
import {
  PaginationRequest,
  PaginationResponse,
} from "@/features/common/types/pagination";
import { parsePaginationParams } from "@/features/common/utils/http";
import { Company } from "@/features/companies/types";
import { GatewayRequestAnswerAction } from "@/features/gateway-requests/modals/GatewayRequestAnswerModal";

export const getGatewayRequests = async (
  params: PaginationRequest
): Promise<PaginationResponse<Company>> => {
  return AuthenticatedHttp.get("/gateway/requests/", {
    params: parsePaginationParams(params),
  }).then((response) => response.data);
};

export const answerGatewayRequest = async (
  requestId: number,
  action: GatewayRequestAnswerAction
): Promise<{ message: string }> => {
  return AuthenticatedHttp.post(`/gateway/requests/${requestId}/${action}/`);
};
