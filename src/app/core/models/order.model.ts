import { OrderItem } from "./order-item.model";

export interface Order {
  id: string;
  date: string;
  paymentMethod: 'cash' | 'card' | 'online';
  status: 'completed' | 'pending' | 'cancelled' | 'refunded';
  items: OrderItem[];
  total: number;
}
