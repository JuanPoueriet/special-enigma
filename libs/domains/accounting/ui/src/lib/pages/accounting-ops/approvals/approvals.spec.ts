import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Approvals } from '@virteex/accounting-ui/lib/pages/accounting-ops/approvals/approvals';

describe('Approvals', () => {
  let component: Approvals;
  let fixture: ComponentFixture<Approvals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Approvals]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Approvals);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
