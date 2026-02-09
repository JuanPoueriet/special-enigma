import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTerms } from '@virteex/admin-ui/lib/pages/masters/payment-terms/payment-terms.page';

describe('PaymentTerms', () => {
  let component: PaymentTerms;
  let fixture: ComponentFixture<PaymentTerms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentTerms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentTerms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
