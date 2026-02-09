import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatCard } from '@virteex/shared-ui/lib/components/stat-card/stat-card';

describe('StatCard', () => {
  let component: StatCard;
  let fixture: ComponentFixture<StatCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
