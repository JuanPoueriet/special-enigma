import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ForgotPasswordPage } from './forgot-password.page';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService, LanguageService, RECAPTCHA_SITE_KEY } from '@virtex/shared-ui';
import { of, Observable } from 'rxjs';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ReCaptchaV3Service, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha-19';
import { APP_CONFIG } from '@virtex/shared-config';
import { vi } from 'vitest';

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of({});
  }
}

describe('ForgotPasswordPage', () => {
  beforeAll(() => {
    try {
      TestBed.initTestEnvironment(
        BrowserDynamicTestingModule,
        platformBrowserDynamicTesting()
      );
    } catch (e) {}
  });

  let component: ForgotPasswordPage;
  let fixture: ComponentFixture<ForgotPasswordPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ForgotPasswordPage,
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
            forgotPassword: vi.fn().mockReturnValue(of({ message: 'Success' }))
          }
        },
        {
          provide: ReCaptchaV3Service,
          useValue: { execute: vi.fn().mockReturnValue(of('mock-token')) }
        },
        {
          provide: LanguageService,
          useValue: {
            currentLang: () => 'es',
            setLanguage: vi.fn()
          }
        },
        { provide: APP_CONFIG, useValue: { apiUrl: 'http://localhost' } },
        { provide: RECAPTCHA_V3_SITE_KEY, useValue: 'mock-key' },
        { provide: RECAPTCHA_SITE_KEY, useValue: 'mock-key' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
