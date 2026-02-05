import { Component,Input } from '@angular/core';
import { Order } from '../../core/models/order.model';
import { CurrencyPipe , NgFor ,NgIf} from '@angular/common';

@Component({
  selector: 'app-order-details',
  imports: [CurrencyPipe, NgFor,NgIf],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css',
})
export class OrderDetails {
  @Input() order: Order | null = null;

}
