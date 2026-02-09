import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pos } from '@virteex/crm-ui/lib/pages/sales/pos/pos.page';

describe('Pos', () => {
  let component: Pos;
  let fixture: ComponentFixture<Pos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
