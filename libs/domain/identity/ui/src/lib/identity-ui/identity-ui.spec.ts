import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdentityUi } from './identity-ui';

describe('IdentityUi', () => {
  beforeAll(() => {
    try {
      TestBed.initTestEnvironment(
        BrowserDynamicTestingModule,
        platformBrowserDynamicTesting()
      );
    } catch (e) {}
  });
  let component: IdentityUi;
  let fixture: ComponentFixture<IdentityUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentityUi],
    }).compileComponents();

    fixture = TestBed.createComponent(IdentityUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
