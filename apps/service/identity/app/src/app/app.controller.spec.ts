import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService, UserRepository } from '@virtex/domain-identity-domain';
import { LoginUserUseCase } from '@virtex/domain-identity-application';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getData: jest.fn().mockReturnValue({ status: 'ok' }),
          },
        },
        {
            provide: AuthService,
            useValue: {
                verifyToken: jest.fn(),
            }
        },
        {
            provide: UserRepository,
            useValue: {
                findById: jest.fn(),
            }
        },
        {
            provide: LoginUserUseCase,
            useValue: {
                execute: jest.fn(),
            }
        }
      ],
    }).compile();
  });

  describe('getData', () => {
    it('should return an operational status payload', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual(
        expect.objectContaining({
          status: 'ok',
        }),
      );
    });
  });
});
