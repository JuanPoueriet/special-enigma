import { TestBed } from '@angular/core/testing';
import { SessionService } from '@virteex/shared-util-auth/lib/services/session.service';
import { TokenService } from '@virteex/shared-util-auth/lib/services/token.service';
import { vi } from 'vitest';

describe('SessionService', () => {
  let service: SessionService;
  let tokenServiceSpy: {
    setTokens: any;
    getAccessToken: any;
    getRefreshToken: any;
    clearTokens: any;
  };

  beforeEach(() => {
    tokenServiceSpy = {
      setTokens: vi.fn(),
      getAccessToken: vi.fn(),
      getRefreshToken: vi.fn(),
      clearTokens: vi.fn()
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: TokenService, useValue: tokenServiceSpy }
      ]
    });
    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and set user', () => {
    const mockToken = 'header.' + btoa(JSON.stringify({ sub: '123', email: 'test@example.com' })) + '.sig';
    tokenServiceSpy.getAccessToken.mockReturnValue(mockToken);

    service.login(mockToken, 'refresh');

    expect(tokenServiceSpy.setTokens).toHaveBeenCalledWith(mockToken, 'refresh');
    expect(service.isLoggedIn()).toBe(true);
    expect(service.user()?.email).toBe('test@example.com');
  });

  it('should logout', () => {
    service.logout();
    expect(tokenServiceSpy.clearTokens).toHaveBeenCalled();
    expect(service.isLoggedIn()).toBe(false);
  });
});
