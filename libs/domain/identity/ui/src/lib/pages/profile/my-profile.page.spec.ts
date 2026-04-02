import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { MyProfilePage } from './my-profile.page';
import { ProfileService } from '../../profile.service';
import { AuthService, ToastService } from '@virtex/shared-ui';
import { NotificationService } from '@virtex/domain-identity-domain';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { vi } from 'vitest';

class FakeLoader implements TranslateLoader {
    getTranslation(lang: string) {
        return of({});
    }
}

describe('MyProfilePage', () => {
  beforeAll(() => {
    try {
      TestBed.initTestEnvironment(
        BrowserDynamicTestingModule,
        platformBrowserDynamicTesting()
      );
    } catch (e) {}
  });

  let component: MyProfilePage;
  let fixture: ComponentFixture<MyProfilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MyProfilePage,
        NoopAnimationsModule,
        TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: FakeLoader }
        })
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: AuthService,
          useValue: {
            currentUser: () => ({ id: '1', firstName: 'John', lastName: 'Doe', email: 'john@doe.com' }),
            getSessions: vi.fn(() => of([])),
            generateMfaSecret: vi.fn(() => of({ secret: 'secret', qrCodeUrl: 'qr' })),
            enableMfa: vi.fn(() => of({ backupCodes: [] })),
            checkAuthStatus: vi.fn(() => of({})),
            revokeSession: vi.fn(() => of({}))
          }
        },
        {
          provide: ProfileService,
          useValue: {
            updateProfile: vi.fn(() => of({})),
            getJobTitles: vi.fn(() => of(['Developer', 'Manager']))
          }
        },
        {
          provide: NotificationService,
          useValue: {
            showSuccess: vi.fn(),
            showError: vi.fn()
          }
        },
        {
          provide: ToastService,
          useValue: {
            showSuccess: vi.fn(),
            showError: vi.fn()
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MyProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
