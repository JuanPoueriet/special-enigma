import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiCard } from '@virteex/shared-ui/lib/components/kpi-card/kpi-card';

describe('KpiCard', () => {
  let component: KpiCard;
  let fixture: ComponentFixture<KpiCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpiCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpiCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
