import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataImports } from '@virteex/admin-ui/lib/pages/data-imports/data-imports.page';

describe('DataImports', () => {
  let component: DataImports;
  let fixture: ComponentFixture<DataImports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataImports]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataImports);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
