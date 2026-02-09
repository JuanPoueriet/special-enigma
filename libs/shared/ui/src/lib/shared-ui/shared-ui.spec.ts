import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedUi } from '@virteex/shared-ui/lib/shared-ui/shared-ui';

describe('SharedUi', () => {
  let component: SharedUi;
  let fixture: ComponentFixture<SharedUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedUi],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
