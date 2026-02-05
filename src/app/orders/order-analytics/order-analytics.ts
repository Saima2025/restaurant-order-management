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

  dailyRevenue$!: Observable<{ date: string; total: number }[]>;

  @Input()
  set orders(orders$: Observable<Order[]> | null | undefined) {

    // 🛡️ Guard against undefined input
    if (!orders$) return;

    this.dailyRevenue$ = orders$.pipe(
      map(orders => {
        const completed = orders.filter(o => o.status === 'completed');

        const grouped = completed.reduce<Record<string, number>>(
          (acc, o) => {
            const date = o.date.split('T')[0];
            acc[date] = (acc[date] ?? 0) + o.total;
            return acc;
          },
          {}
        );

        return Object.entries(grouped)
          .map(([date, total]) => ({ date, total }))
          .sort((a, b) => b.total - a.total);
      }),
      shareReplay({ bufferSize: 1, refCount: true }) // ⚡ performance
    );
  }
}
