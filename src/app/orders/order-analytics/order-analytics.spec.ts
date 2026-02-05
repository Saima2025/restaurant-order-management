import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAnalytics } from './order-analytics';

describe('OrderAnalytics', () => {
  let component: OrderAnalytics;
  let fixture: ComponentFixture<OrderAnalytics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderAnalytics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderAnalytics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
