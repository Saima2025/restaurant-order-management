export interface OrderApi {
  orderId: string;
  orderDate: string;
  customer: {
    id: number;
    name: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  paymentMethod: 'CASH' | 'CARD' | 'ONLINE';
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED' | 'REFUNDED';
}
