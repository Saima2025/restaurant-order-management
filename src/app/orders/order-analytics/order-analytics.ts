import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map, shareReplay } from 'rxjs';
import { Order } from '../../core/models/order.model';

@Component({
  selector: 'app-order-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-analytics.html',
  styleUrls: ['./order-analytics.css'],
})
export class OrderAnalytics {

  dailyRevenue$!: Observable<{ date: string; total: number }[]>;// an observable of an array of objects.

  @Input()
  set orders(orders$: Observable<Order[]> | null | undefined) { // this function is called whenever parent sends a new observale.Basically a setter function.

    if (!orders$) return;

    this.dailyRevenue$ = orders$.pipe(
      map(orders => {
        const completed = orders.filter(o => o.status === 'completed');

        const grouped = completed.reduce<Record<string, number>>( //Reduces the array of completed orders into an object where keys are dates and values are total revenue for that day
          (acc, o) => {
            const date = o.date.split('T')[0];
            acc[date] = (acc[date] ?? 0) + o.total;
            return acc;
          },
          {}
        );

        return Object.entries(grouped)
          .map(([date, total]) => ({ date, total })) // transforms [key, value] into { date, total } objects.
          .sort((a, b) => b.total - a.total);
      }),
      shareReplay({ bufferSize: 1, refCount: true }) // caches the last emitted value and unsubscribes automatically
    );
  }
}
