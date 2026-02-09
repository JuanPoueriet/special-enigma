import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsPayable } from '@virteex/bi-ui/lib/pages/dashboard-main/widgets/accounts-payable/accounts-payable';

describe('AccountsPayable', () => {
  let component: AccountsPayable;
  let fixture: ComponentFixture<AccountsPayable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountsPayable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsPayable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
