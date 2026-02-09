import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarianceAnalysis } from '@virteex/accounting-ui/lib/pages/accounting-ops/variance-analysis/variance-analysis.page';

describe('VarianceAnalysis', () => {
  let component: VarianceAnalysis;
  let fixture: ComponentFixture<VarianceAnalysis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VarianceAnalysis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VarianceAnalysis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
