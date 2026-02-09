import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Repository } from '@virteex/admin-ui/lib/pages/documents/repository/repository.page';

describe('Repository', () => {
  let component: Repository;
  let fixture: ComponentFixture<Repository>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Repository]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Repository);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
