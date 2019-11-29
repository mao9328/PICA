import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersOpenReportComponent } from './orders-open-report.component';

describe('OrdersOpenReportComponent', () => {
  let component: OrdersOpenReportComponent;
  let fixture: ComponentFixture<OrdersOpenReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersOpenReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersOpenReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
