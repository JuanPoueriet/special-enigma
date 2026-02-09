import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesChart } from '@virteex/bi-ui/lib/pages/dashboard-main/widgets/expenses-chart/expenses-chart';

describe('ExpensesChart', () => {
  let component: ExpensesChart;
  let fixture: ComponentFixture<ExpensesChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensesChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
