import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersClosedReportComponent } from './orders-closed-report.component';

describe('OrdersClosedReportComponent', () => {
  let component: OrdersClosedReportComponent;
  let fixture: ComponentFixture<OrdersClosedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersClosedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersClosedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
