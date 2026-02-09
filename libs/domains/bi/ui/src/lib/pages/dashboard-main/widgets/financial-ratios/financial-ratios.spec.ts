import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialRatios } from '@virteex/bi-ui/lib/pages/dashboard-main/widgets/financial-ratios/financial-ratios';

describe('FinancialRatios', () => {
  let component: FinancialRatios;
  let fixture: ComponentFixture<FinancialRatios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialRatios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialRatios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
