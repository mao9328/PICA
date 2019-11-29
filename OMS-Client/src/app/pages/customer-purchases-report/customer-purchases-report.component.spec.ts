import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPurchasesReportComponent } from './customer-purchases-report.component';

describe('CustomerPurchasesReportComponent', () => {
  let component: CustomerPurchasesReportComponent;
  let fixture: ComponentFixture<CustomerPurchasesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPurchasesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPurchasesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
