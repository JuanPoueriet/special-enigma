import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AuthService } from '@virteex/shared-ui/src/lib/core/services/auth';
import { API_URL } from '@virteex/shared-ui/src/lib/core/tokens/api-url.token';
import { NotificationService } from '@virteex/shared-ui/src/lib/core/services/notification';
import { WebSocketService } from '@virteex/shared-ui/src/lib/core/services/websocket.service';
import { ModalService } from '@virteex/shared-ui/src/lib/services/modal.service';
import { ErrorHandlerService } from '@virteex/shared-ui/src/lib/core/services/error-handler.service';
import { Subject } from 'rxjs';
import { vi } from 'vitest';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockRouter = {
    navigate: vi.fn(),
    navigateByUrl: vi.fn().mockResolvedValue(true),
  };

  const mockNotificationService = {
    showSuccess: vi.fn(),
    showError: vi.fn(),
  };

  const mockWebSocketService = {
    connectionReady$: new Subject(),
    connect: vi.fn(),
    emit: vi.fn(),
    listen: vi.fn().mockReturnValue(new Subject()),
    disconnect: vi.fn(),
  };

  const mockModalService = {
    open: vi.fn(),
  };

  const mockErrorHandlerService = {
    handleError: vi.fn().mockImplementation((op, err) => { throw err; }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: API_URL, useValue: 'http://test-api/v1' },
        { provide: Router, useValue: mockRouter },
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: WebSocketService, useValue: mockWebSocketService },
        { provide: ModalService, useValue: mockModalService },
        { provide: ErrorHandlerService, useValue: mockErrorHandlerService },
      ],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have correct API URL', () => {
    service.login({ email: 'test@test.com', password: '123', recaptchaToken: 'token' }).subscribe();
    const req = httpMock.expectOne('http://test-api/v1/auth/login');
    expect(req.request.method).toBe('POST');
  });
});
