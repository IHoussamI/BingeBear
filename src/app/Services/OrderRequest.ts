// order-request.model.ts
export interface OrderRequest {
  sessionId: string;
  planId: number;
  clientEmail: string;
  firstName: string;
  lastName: string;
  phone?: string;
}
