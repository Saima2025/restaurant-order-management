import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { OrdersApiResponse } from '../core/models/order-api-response.model';
import { Order } from '../core/models/order.model';
// import ordersData from './assets/mockdata'; // path relative to ts file ;
@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  orders$!: Observable<Order[]>;
  
  private readonly url = 'assets/mockdata.json';

  constructor(private http: HttpClient) {
    this.orders$ = this.http.get<OrdersApiResponse>(this.url).pipe(
      map(res => res.data.map(this.mapToOrder)),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  ngOnInit() {}

  private mapToOrder(api: any): Order {
  const items: { name: string; quantity: number; unitPrice: number }[] = api.items.map((i: any) => ({
    name: i.name,
    quantity: i.quantity,
    unitPrice: i.price
  }));

  const total: number = items.reduce((sum: number, item: { name: string; quantity: number; unitPrice: number }) => {
    return sum + item.quantity * item.unitPrice;
  }, 0);

    return {
      id: api.orderId,
      date: api.orderDate,
      paymentMethod: api.paymentMethod.toLowerCase(),
      status: api.status.toLowerCase(),
      items: api.items.map((i: any) => ({
        name: i.name,
        quantity: i.quantity,
        unitPrice: i.price
      })),
      total: total
    };
  }
}
