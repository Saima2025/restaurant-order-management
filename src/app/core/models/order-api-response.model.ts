import { OrderApi } from './order-api-model'

export interface OrdersApiResponse {
  success: boolean;
  message: string;
  meta: {
    totalRecords: number;
    page: number;
    pageSize: number;
    totalPages: number;
    fromDate: string;
    toDate: string;
  };
  data: OrderApi[];
}
