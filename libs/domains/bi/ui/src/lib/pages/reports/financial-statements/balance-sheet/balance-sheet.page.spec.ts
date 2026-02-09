import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceSheet } from '@virteex/bi-ui/lib/pages/reports/financial-statements/balance-sheet/balance-sheet.page';

describe('BalanceSheet', () => {
  let component: BalanceSheet;
  let fixture: ComponentFixture<BalanceSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceSheet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceSheet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
