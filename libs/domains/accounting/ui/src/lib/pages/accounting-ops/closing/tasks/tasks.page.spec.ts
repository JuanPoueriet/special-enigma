import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tasks } from '@virteex/accounting-ui/lib/pages/accounting-ops/closing/tasks/tasks.page';

describe('Tasks', () => {
  let component: Tasks;
  let fixture: ComponentFixture<Tasks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tasks]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Tasks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
