import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, firstValueFrom, map, Observable, shareReplay, take } from 'rxjs';
import { Order } from '../../core/models/order.model';
import { OrdersService } from '../../services/orders.service';
import { OrdersFilters } from '../orders-filters/orders-filters';
import { OrdersList } from '../orders-list/orders-list';
import { OrderDetails } from '../order-details/order-details';
import { OrderAnalytics } from '../order-analytics/order-analytics';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-page',
  imports: [OrdersFilters,OrdersList,OrderDetails,AsyncPipe,OrderAnalytics,AsyncPipe,CommonModule],
  templateUrl: './orders-page.html',
  styleUrl: './orders-page.css',
})
export class OrdersPage implements OnInit {
 /** Public streams used in template */
  orders$!: Observable<Order[]>;
  completedOrders$!: Observable<Order[]>;
  filteredOrders$!: Observable<Order[]>;

  /** Internal state */
  private filters$ = new BehaviorSubject<any | null>(null);
  selectedOrder$ = new BehaviorSubject<Order | null>(null);

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit() {
    this.orders$ = this.ordersService.orders$;

    //   firstValueFrom(this.orders$).then(data => {
    //   console.log('CONFIRMED orders:', data);
    // });
    
    this.completedOrders$ = this.orders$.pipe( // Filters orders$ to only include orders with status === 'completed'.
      map(orders => orders.filter(o => o.status === 'completed')),
       shareReplay(1)
    );

    this.filteredOrders$ = combineLatest([this.completedOrders$,this.filters$]).pipe( //Combines the completed orders and current filters. 
      map(([orders, filters]) =>
        filters ? this.applyFilters(orders, filters) : orders // If filters exist, applies them via applyFilters; otherwise returns all completed orders.
      ),
      take(1), // completes after first emission
      shareReplay(1) // caches the result.
    );
      
  }

  /** Called by filters component */
  updateFilters(filters: any) {
    this.filters$.next(filters);
    this.filteredOrders$ = this.orders$.pipe(
      map(orders => this.applyFilters(orders, filters))
    );    
  }

  /** Called when an order is selected */
  selectOrder(order: Order) {
    this.selectedOrder$.next(order);
  }

  /** Pure filter function */
  private applyFilters(orders: Order[], filters: any): Order[] {
    return orders.filter(o =>
      (!filters.search || o.id.includes(filters.search)) &&
      (!filters.payment || o.paymentMethod === filters.payment) &&
      (!filters.from || o.date >= filters.from) &&
      (!filters.to || o.date <= filters.to) && 
      (!filters.status || o.status.toLowerCase() === filters.status.toLowerCase())
    );
  }

}
