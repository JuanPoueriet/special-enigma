import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArAgingChart } from '@virteex/bi-ui/lib/pages/dashboard-main/widgets/ar-aging-chart/ar-aging-chart';

describe('ArAgingChart', () => {
  let component: ArAgingChart;
  let fixture: ComponentFixture<ArAgingChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArAgingChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArAgingChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
