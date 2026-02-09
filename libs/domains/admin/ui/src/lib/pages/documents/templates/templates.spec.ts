import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Templates } from '@virteex/admin-ui/lib/pages/documents/templates/templates.page';

describe('Templates', () => {
  let component: Templates;
  let fixture: ComponentFixture<Templates>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Templates]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Templates);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
