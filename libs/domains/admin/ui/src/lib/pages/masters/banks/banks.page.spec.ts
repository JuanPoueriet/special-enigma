import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanksPage } from '@virteex/admin-ui/lib/pages/masters/banks/banks.page';

describe('BanksPage', () => {
  let component: BanksPage;
  let fixture: ComponentFixture<BanksPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BanksPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BanksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
