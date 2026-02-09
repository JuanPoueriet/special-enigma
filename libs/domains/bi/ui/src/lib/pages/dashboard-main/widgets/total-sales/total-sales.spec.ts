import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSales } from '@virteex/bi-ui/lib/pages/dashboard-main/widgets/total-sales/total-sales';

describe('TotalSales', () => {
  let component: TotalSales;
  let fixture: ComponentFixture<TotalSales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalSales]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalSales);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
