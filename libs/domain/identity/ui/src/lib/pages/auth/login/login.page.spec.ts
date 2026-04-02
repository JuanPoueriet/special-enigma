import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { LoginPage } from './login.page';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '@virtex/shared-ui';
import { ReCaptchaV3Service, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha-19';
import { of, Observable } from 'rxjs';
import { CountryService, LanguageService } from '@virtex/shared-ui';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AuthLayoutComponent } from '../components/auth-layout/auth-layout.component';
import { AuthInputComponent } from '../components/auth-input/auth-input.component';
import { AuthButtonComponent } from '../components/auth-button/auth-button.component';
import { SocialAuthButtonsComponent } from '../components/social-auth-buttons/social-auth-buttons.component';
import { vi } from 'vitest';

// Fake Loader for Translate
class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of({});
  }
}

describe('LoginPage', () => {
  beforeAll(() => {
    try {
      TestBed.initTestEnvironment(
        BrowserDynamicTestingModule,
        platformBrowserDynamicTesting()
      );
    } catch (e) {}
  });

  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginPage,
        NoopAnimationsModule,
        TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: FakeLoader }
        }),
        AuthLayoutComponent,
        AuthInputComponent,
        AuthButtonComponent,
        SocialAuthButtonsComponent,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            login: vi.fn().mockReturnValue(of({ user: { id: 1 }, accessToken: 'token' })),
            loginWithPasskey: vi.fn().mockReturnValue(Promise.resolve({ id: 1 })),
            verifyMfa: vi.fn().mockReturnValue(of({ user: { id: 1 } })),
            currentUser: () => ({ id: 1, preferredLanguage: 'es' }),
            isAuthenticated: () => true,
            getSocialRegisterInfo: () => of({})
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
            currentCountry: () => ({ code: 'DO', currencyCode: 'DOP', name: 'Dominican Republic' }),
            detectAndSetCountry: vi.fn(),
            currentCountryCode: () => 'DO',
            lookupTaxId: vi.fn().mockReturnValue(of(null))
          }
        },
        {
          provide: LanguageService,
          useValue: {
            currentLang: () => 'es',
            setLanguage: vi.fn(),
            getInitialLanguage: () => 'es'
          }
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form initially', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should be valid when filled', () => {
    component.loginForm.patchValue({
        email: 'test@example.com',
        password: 'password123'
    });
    expect(component.loginForm.valid).toBeTruthy();
  });
});
