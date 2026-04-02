import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { RegisterPage } from './register.page';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '@virtex/shared-ui';
import { ReCaptchaV3Service, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha-19';
import { of, Observable } from 'rxjs';
import { ProfileService } from '@virtex/identity-ui';
import { CountryService, LanguageService, GeoLocationService, ConfigService } from '@virtex/shared-ui';
import { APP_CONFIG } from '@virtex/shared-config';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { vi } from 'vitest';

// Fake Loader for Translate
class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of({});
  }
}

describe('RegisterPage', () => {
  beforeAll(() => {
    try {
      TestBed.initTestEnvironment(
        BrowserDynamicTestingModule,
        platformBrowserDynamicTesting()
      );
    } catch (e) {}
  });

  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegisterPage,
        NoopAnimationsModule,
        TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: FakeLoader }
        })
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            register: vi.fn().mockReturnValue(of({})),
            currentUser: vi.fn().mockReturnValue(null),
            getSocialRegisterInfo: vi.fn().mockReturnValue(of({})),
            initiateSignup: vi.fn().mockReturnValue(of({})),
            verifySignup: vi.fn().mockReturnValue(of({ onboardingToken: 'token' })),
            completeOnboarding: vi.fn().mockReturnValue(of({}))
          }
        },
        {
          provide: ReCaptchaV3Service,
          useValue: { execute: vi.fn().mockReturnValue(of('mock-token')) }
        },
        { provide: RECAPTCHA_V3_SITE_KEY, useValue: 'mock-key' },
        {
          provide: CountryService,
          useValue: {
            currentCountry: vi.fn().mockReturnValue({ code: 'DO', currencyCode: 'DOP', name: 'Dominican Republic', formSchema: {}, taxIdRegex: '.*' }),
            currentCountryCode: vi.fn().mockReturnValue('do'),
            detectAndSetCountry: vi.fn(),
            getCountryConfig: vi.fn().mockReturnValue(of({ code: 'DO', currencyCode: 'DOP', name: 'Dominican Republic', formSchema: {}, taxIdRegex: '.*' })),
            lookupTaxId: vi.fn().mockReturnValue(of(null))
          }
        },
        { provide: ProfileService, useValue: { updateUser: vi.fn().mockReturnValue(of({})) } },
        {
          provide: LanguageService,
          useValue: {
            currentLang: vi.fn().mockReturnValue('es'),
            getInitialLanguage: vi.fn().mockReturnValue('es'),
            setLanguage: vi.fn()
          }
        },
        {
          provide: GeoLocationService,
          useValue: {
            getGeoLocation: vi.fn().mockReturnValue(of({ country: 'DO' })),
            mismatchSignal: vi.fn().mockReturnValue(null)
          }
        },
        {
          provide: ConfigService,
          useValue: {
            getRegistrationOptions: vi.fn().mockReturnValue(of({
                industries: ['tech'],
                companySizes: ['1-10']
            }))
          }
        },
        { provide: APP_CONFIG, useValue: { apiUrl: 'http://localhost' } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default country values', () => {
    expect(component.registerForm).toBeDefined();
    fixture.detectChanges();
  });

  it('should validate required fields', () => {
    const accountInfo = component.accountInfo;

    accountInfo.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      passwordGroup: {
        password: 'Password123!',
        confirmPassword: 'Password123!'
      }
    });

    const emailControl = accountInfo.get('email');
    emailControl?.setAsyncValidators(null);
    emailControl?.updateValueAndValidity();

    accountInfo.patchValue({ phone: '+1234567890' });

    expect(accountInfo.valid).toBeTruthy();
  });
});
