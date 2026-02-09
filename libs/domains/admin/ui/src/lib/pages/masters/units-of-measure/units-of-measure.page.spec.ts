import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsOfMeasure } from '@virteex/admin-ui/lib/pages/masters/units-of-measure/units-of-measure.page';

describe('UnitsOfMeasure', () => {
  let component: UnitsOfMeasure;
  let fixture: ComponentFixture<UnitsOfMeasure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitsOfMeasure]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitsOfMeasure);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
