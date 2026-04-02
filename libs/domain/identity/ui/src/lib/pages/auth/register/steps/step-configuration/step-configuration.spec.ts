import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { StepConfiguration } from './step-configuration';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CountryService } from '@virtex/shared-ui';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { vi } from 'vitest';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { APP_CONFIG } from '@virtex/shared-config';

describe('StepConfiguration', () => {
  beforeAll(() => {
    try {
      TestBed.initTestEnvironment(
        BrowserDynamicTestingModule,
        platformBrowserDynamicTesting()
      );
    } catch (e) {}
  });

  let component: StepConfiguration;
  let fixture: ComponentFixture<StepConfiguration>;
  let mockCountryService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockCountryService = {
      currentCountry: vi.fn().mockReturnValue({ code: 'DO', name: 'Dominican Republic', currencyCode: 'DOP', taxIdRegex: '.*' }),
      currentCountryCode: vi.fn().mockReturnValue('do'),
      getCountryConfig: vi.fn().mockReturnValue(of({ code: 'DO', name: 'Dominican Republic', currencyCode: 'DOP', taxIdRegex: '.*' })),
      lookupTaxId: vi.fn().mockReturnValue(of({ isValid: true, name: 'Test Company' }))
    };

    mockRouter = {
      url: '/es/do/auth/register',
      navigateByUrl: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [StepConfiguration, ReactiveFormsModule, TranslateModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: CountryService, useValue: mockCountryService },
        { provide: Router, useValue: mockRouter },
        { provide: APP_CONFIG, useValue: { apiUrl: 'http://localhost' } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StepConfiguration);
    component = fixture.componentInstance;
    component.group = new FormGroup({
      country: new FormControl('DO'),
      taxId: new FormControl('')
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCountryConfig and navigate on country change', () => {
    const event = { target: { value: 'US' } };
    component.onCountryChange(event);

    expect(mockCountryService.getCountryConfig).toHaveBeenCalledWith('US');
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/es/us/auth/register');
  });
});
