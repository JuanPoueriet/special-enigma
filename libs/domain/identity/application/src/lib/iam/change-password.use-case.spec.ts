import { Test, TestingModule } from '@nestjs/testing';
import { ChangePasswordUseCase } from './change-password.use-case';
import { UserRepository, AuthService, AuditLogRepository, SessionRepository, CachePort } from '@virtex/domain-identity-domain';
import { UnauthorizedException } from '@virtex/kernel-exceptions';

describe('ChangePasswordUseCase', () => {
  let useCase: ChangePasswordUseCase;

  const mockUserRepo = { findById: vi.fn(), save: vi.fn() };
  const mockAuthService = { verifyPassword: vi.fn(), hashPassword: vi.fn() };
  const mockAuditRepo = { save: vi.fn() };
  const mockSessionRepo = { deleteByUserId: vi.fn(), findByUserId: vi.fn() };
  const mockCachePort = { del: vi.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChangePasswordUseCase,
        { provide: UserRepository, useValue: mockUserRepo },
        { provide: AuthService, useValue: mockAuthService },
        { provide: AuditLogRepository, useValue: mockAuditRepo },
        { provide: SessionRepository, useValue: mockSessionRepo },
        { provide: CachePort, useValue: mockCachePort },
      ],
    }).compile();
    useCase = module.get<ChangePasswordUseCase>(ChangePasswordUseCase);
  });

  it('should change password and invalidate sessions', async () => {
    mockUserRepo.findById.mockResolvedValue({ id: 'u1', passwordHash: 'old' });
    mockAuthService.verifyPassword.mockResolvedValue(true);
    mockAuthService.hashPassword.mockResolvedValue('new-hash');
    mockSessionRepo.findByUserId.mockResolvedValue([{ id: 's1' }, { id: 's2' }]);

    await useCase.execute('u1', { currentPassword: 'old', newPassword: 'new' });

    expect(mockUserRepo.save).toHaveBeenCalled();
    expect(mockCachePort.del).toHaveBeenCalledWith('session:s1');
    expect(mockCachePort.del).toHaveBeenCalledWith('session:s2');
    expect(mockSessionRepo.deleteByUserId).toHaveBeenCalledWith('u1');
    expect(mockAuditRepo.save).toHaveBeenCalled();
  });

  it('should throw if old password is wrong', async () => {
    mockUserRepo.findById.mockResolvedValue({ id: 'u1', passwordHash: 'old' });
    mockAuthService.verifyPassword.mockResolvedValue(false);
    await expect(useCase.execute('u1', { currentPassword: 'wrong', newPassword: 'new' })).rejects.toThrow(UnauthorizedException);
  });
});
