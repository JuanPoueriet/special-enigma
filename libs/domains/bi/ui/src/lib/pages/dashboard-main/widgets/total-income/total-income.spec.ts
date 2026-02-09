import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalIncome } from '@virteex/bi-ui/lib/pages/dashboard-main/widgets/total-income/total-income';

describe('TotalIncome', () => {
  let component: TotalIncome;
  let fixture: ComponentFixture<TotalIncome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalIncome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalIncome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
