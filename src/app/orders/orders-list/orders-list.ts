import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Order } from '../../core/models/order.model';
import { NgIf, NgFor, CurrencyPipe, DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.html',
  styleUrls: ['./orders-list.css'],
  imports: [NgIf, NgFor, CurrencyPipe, DatePipe, CommonModule],
})
export class OrdersList implements OnInit {
  @Input() orders: Order[] = [];
  @Output() selectOrder = new EventEmitter<Order>();

  // Pagination
  pageSize = 10;      // Number of orders per page
  currentPage = 1;   // Current page
  pagedOrders: Order[] = [];

  // Loading state
  loading = false;

  trackById = (_: number, o: Order) => o.id;

  ngOnInit() {
    this.updatePagedOrders();
  }

  // Watch for changes in orders
  ngOnChanges() {
    this.updatePagedOrders();
  }

  updatePagedOrders() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedOrders = this.orders.slice(start, end);
  }

  // Pagination controls
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedOrders();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedOrders();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.orders.length / this.pageSize);
  }
}
