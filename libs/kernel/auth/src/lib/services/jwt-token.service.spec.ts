import { Test, TestingModule } from '@nestjs/testing';
import { JwtTokenService, TokenIssueOptions } from './jwt-token.service';
import { SecretManagerService } from './secret-manager.service';
import * as jwt from 'jsonwebtoken';
import { UnauthorizedException } from '@nestjs/common';
import Redis from 'ioredis';

jest.mock('./secret-manager.service');
jest.mock('ioredis');

describe('JwtTokenService', () => {
  let service: JwtTokenService;
  let secretManager: SecretManagerService;
  let redisMock: any;

  beforeEach(async () => {
    redisMock = {
        get: jest.fn(),
        set: jest.fn(),
    };
    (Redis as any).mockImplementation(() => redisMock);
    process.env['REDIS_URL'] = 'redis://localhost:6379';

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtTokenService,
        {
          provide: SecretManagerService,
          useValue: {
            getSecret: jest.fn().mockImplementation((key, def) => {
                if (key === 'JWT_ALLOWED_ALGORITHMS') return 'HS256';
                return def;
            }),
            getJwtSecret: jest.fn().mockReturnValue('super-secret'),
          },
        },
      ],
    }).compile();

    service = module.get<JwtTokenService>(JwtTokenService);
    secretManager = module.get<SecretManagerService>(SecretManagerService);
  });

  it('should issue and verify a token', async () => {
    const payload = { sub: 'user123' };
    const options: TokenIssueOptions = { tokenType: 'access' };

    const token = service.issueToken(payload, options);
    expect(token).toBeDefined();

    const verified = await service.verifyToken(token, 'access');
    expect(verified.sub).toBe('user123');
  });

  it('should fail if algorithm is none', async () => {
    const payload = { sub: 'user123' };
    const token = jwt.sign(payload, '', { algorithm: 'none' } as any);

    await expect(service.verifyToken(token, 'access')).rejects.toThrow(UnauthorizedException);
  });

  it('should check for revoked tokens in redis', async () => {
    const payload = { sub: 'user123' };
    const token = service.issueToken(payload, { tokenType: 'access' });
    const decoded: any = jwt.decode(token);

    redisMock.get.mockResolvedValue('1');

    await expect(service.verifyToken(token, 'access')).rejects.toThrow('JWT revoked');
    expect(redisMock.get).toHaveBeenCalledWith(`revoked:${decoded.jti}`);
  });

  it('should detect replay with enforceOneTime', async () => {
    const payload = { sub: 'user123' };
    const token = service.issueToken(payload, { tokenType: 'stepup' });
    const decoded: any = jwt.decode(token);

    redisMock.get.mockResolvedValue(null); // Not revoked
    await service.verifyToken(token, 'stepup', true);
    expect(redisMock.set).toHaveBeenCalled();

    redisMock.get.mockResolvedValue('1'); // Now it is "used" (we use same get for isUsed)
    await expect(service.verifyToken(token, 'stepup', true)).rejects.toThrow('JWT replay detected');
  });
});
