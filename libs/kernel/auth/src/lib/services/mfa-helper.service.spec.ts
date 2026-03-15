import { Test, TestingModule } from '@nestjs/testing';
import { MfaHelperService } from './mfa-helper.service';

describe('MfaHelperService', () => {
  let service: MfaHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MfaHelperService],
    }).compile();

    service = module.get<MfaHelperService>(MfaHelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a secret', () => {
    const secret = service.generateSecret();
    expect(secret).toBeDefined();
    expect(typeof secret).toBe('string');
    expect(secret.length).toBeGreaterThan(0);
  });

  it('should generate and verify a token', () => {
    const secret = service.generateSecret();
    const token = service.generateToken(secret);
    expect(token).toBeDefined();
    expect(token.length).toBe(6);

    const isValid = service.verifyToken(token, secret);
    expect(isValid).toBe(true);
  });

  it('should fail for invalid token', () => {
    const secret = service.generateSecret();
    const isValid = service.verifyToken('000000', secret);
    expect(isValid).toBe(false);
  });

  it('should fail for invalid secret', () => {
    const isValid = service.verifyToken('123456', 'INVALIDSECRET');
    expect(isValid).toBe(false);
  });
});
