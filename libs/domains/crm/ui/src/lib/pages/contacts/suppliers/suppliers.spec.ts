import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Suppliers } from '@virteex/crm-ui/lib/pages/contacts/suppliers/suppliers.page';

describe('Suppliers', () => {
  let component: Suppliers;
  let fixture: ComponentFixture<Suppliers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Suppliers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Suppliers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
