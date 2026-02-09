import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesChart } from '@virteex/bi-ui/lib/pages/dashboard-main/widgets/sales-chart/sales-chart';

describe('SalesChart', () => {
  let component: SalesChart;
  let fixture: ComponentFixture<SalesChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
