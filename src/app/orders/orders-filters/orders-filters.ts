import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-orders-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './orders-filters.html',
  styleUrl: './orders-filters.css',
})
export class OrdersFilters {
  
  @Output() filtersChange = new EventEmitter<any>();

  form:FormGroup

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
    search: [''],
    from: [''],
    to: [''],
    payment: [''],
    status: ['']
  });
    this.form.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => this.filtersChange.emit(value));
  }
}
