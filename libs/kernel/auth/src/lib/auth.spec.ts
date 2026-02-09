import { Test } from '@nestjs/testing';
import { AuthModule } from '@virteex/auth/lib/auth.module';

describe('AuthModule', () => {
  it('should compile', async () => {
    const module = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    expect(module).toBeDefined();
  });
});
