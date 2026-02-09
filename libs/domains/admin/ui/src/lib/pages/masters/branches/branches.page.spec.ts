import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Branches } from '@virteex/admin-ui/lib/pages/masters/branches/branches.page';

describe('Branches', () => {
  let component: Branches;
  let fixture: ComponentFixture<Branches>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Branches]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Branches);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
